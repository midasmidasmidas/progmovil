import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.page.html',
    styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
    
    carrito: any = [
        {
            pr_id: 1,
            pr_nombre: "Cargando...",
            pr_tipo: "Cargando...",
            pr_marca: "",
            pr_precio: 0,
            pr_imagen: "",
        },
    ]
    
    carritoIDs:number[] = [];
    
    loading:boolean = false;

    usuarioActual:Usuarios | null = null;

    precioTotal:number = 0;
    
    constructor(private router:Router, private nativeStorage:NativeStorage, private bd:ServicebdService) {
    }
    
    ngOnInit() {
        this.iniciarCarrito();

        this.bd.fetchUsuarioActual().subscribe(user => {
            this.usuarioActual = user;
        });
    }
    
    async iniciarCarrito() {
        this.loading = true;
        try {
            const data = await this.nativeStorage.getItem("carrito");
            const invalidas:number[] = []; // las que hacen referencia a un producto que ya no esta en la base de datos (removido, cambio de id, etc)
            this.carrito = [];
            this.carritoIDs = data.array || [];
            this.precioTotal = 0;
            await Promise.all(this.carritoIDs.map(async (id) => {
                const producto = await this.bd.consultarProductoPorId(id.toString());
                if(producto) {
                    this.carrito.push(producto);
                    this.precioTotal += producto.pr_precio;
                } else {
                    invalidas.push(id);
                }
            }));
            this.carritoIDs = this.carritoIDs.filter(id => !invalidas.includes(id));
        } catch(e) {
            // this.bd.presentAlert("Carrito de Compras", "Error consiguiendo carrito: " + JSON.stringify(e))
        } finally {
            this.loading = false;
        }
    }
    
    removerDeCarrito(idRemover:number, precio:number) {
        const carritoIndex = this.carrito.findIndex((product: { pr_id: number; }) => product.pr_id === idRemover);
        if(carritoIndex !== -1) {
            this.carrito.splice(carritoIndex, 1);
            this.carritoIDs.splice(carritoIndex, 1);

            this.precioTotal -= precio;
            
            this.nativeStorage.setItem("carrito", { array: this.carritoIDs })
            .then(
                () => this.bd.presentAlert("Carrito de Compras", "Producto eliminado del carrito"),
                e => this.bd.presentAlert("Carrito de Compras", "Error consiguiendo carrito: " + JSON.stringify(e))
            );
        }
    }
    
    confirmarCompra() {
        this.carritoIDs.forEach(async id => {
            const producto = await this.bd.consultarProductoPorId(id.toString());
            if(producto && this.usuarioActual) {
                let fechaFormateada:string = this.bd.formatearFechaActual();
                this.bd.insertarCompra(producto.pr_id, producto.pr_precio, fechaFormateada, this.usuarioActual.user_id);
                
                // vaciar carrito al comprar
                this.carrito = [];
                this.carritoIDs = [];
                this.nativeStorage.setItem("carrito", { array: [] })
            }
        });

        this.bd.presentAlert("Compra", "Compra completada con éxito");
    }
    
    irProducto(x:any)
    {
        let navExtras: NavigationExtras = {
            state:{
                productoEnviado: x,
            }
        }
        
        this.router.navigate(['/producto'], navExtras);
    }
    
}
