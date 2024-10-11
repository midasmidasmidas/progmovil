import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.page.html',
    styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
    
    carrito: any = [
        {
            pr_id: 4,
            pr_imagen: "assets/img/productos/placeholder1.webp",
            pr_nombre: "Kill 'em All",
            pr_tipo: "Poleron",
            pr_marca: "Metallica",
            pr_precio: 7000,
        },
        {
            pr_id: 3,
            pr_imagen: "assets/img/productos/placeholder3.webp",
            pr_nombre: "Blanca Logo Negro",
            pr_tipo: "Polera",
            pr_marca: "Metallica",
            pr_precio: 8000,
        },
        {
            pr_id: 7,
            pr_imagen: "assets/img/productos/placeholder5.webp",
            pr_nombre: "72 Seasons",
            pr_tipo: "Polera",
            pr_marca: "Metallica",
            pr_precio: 12000,
        },
    ]

    carritoIDs:number[] = [];

    loading:boolean = false;
    
    constructor(private router:Router, private nativeStorage:NativeStorage, private bd:ServicebdService) {
    }
    
    ngOnInit() {
        this.iniciarCarrito();
    }

    async iniciarCarrito() {
        this.loading = true;
        try {
            this.carrito = [];
            const data = await this.nativeStorage.getItem("carrito");
            this.carritoIDs = data.array || [];
            this.carritoIDs.forEach(async id => {
                const producto = await this.bd.consultarProductoPorId(id.toString());
                if(producto) {
                    this.carrito.push(producto);
                }
            });
        } catch(e) {
            // this.bd.presentAlert("Carrito de Compras", "Error consiguiendo carrito: " + JSON.stringify(e))
        } finally {
            this.loading = false;
        }
    }

    removerDeCarrito(idRemover:number) {
        const carritoIndex = this.carrito.findIndex((product: { pr_id: number; }) => product.pr_id === idRemover);
        if(carritoIndex !== -1) {
            this.carrito.splice(carritoIndex, 1);
            this.carritoIDs.splice(carritoIndex, 1);

            this.nativeStorage.setItem("carrito", { array: this.carritoIDs })
            .then(
                () => this.bd.presentAlert("Carrito de Compras", "Producto eliminado del carrito"),
                e => this.bd.presentAlert("Carrito de Compras", "Error consiguiendo carrito: " + JSON.stringify(e))
            );
        }
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
