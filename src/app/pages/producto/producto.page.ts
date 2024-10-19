import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
    selector: 'app-producto',
    templateUrl: './producto.page.html',
    styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
    
    producto:any = {
        pr_id: 1,
        pr_nombre: "Cargando...",
        pr_tipo: "Cargando...",
        pr_marca: "Cargando...",
        pr_precio: 0,
        pr_imagen: "",
    }

    carritoIDs:number[] = [];

    wishlistIDs:number[] = [];
    enWishlist:boolean = false;

    usuarioActual:Usuarios | null = null;
    
    constructor(private router: Router, private activedroute: ActivatedRoute, public bd:ServicebdService, private nativeStorage:NativeStorage) {
        // realizar la captura de la informacion que viene por navigationExtras
        this.activedroute.queryParams.subscribe(param =>{
            // validamos si viene o no información
            if(this.router.getCurrentNavigation()?.extras.state){
                // capturamos la informacion
                this.producto = this.router.getCurrentNavigation()?.extras?.state?.['productoEnviado'];
            }
        });
    }
    
    ngOnInit() {
        this.nativeStorage.getItem("carrito")
        .then(data => {
                this.carritoIDs = data.array;
            },
            // e => this.bd.presentAlert("Carrito de Compras", "Error consiguiendo carrito: " + JSON.stringify(e))
        );

        this.nativeStorage.getItem("wishlist")
        .then(data => {
                this.wishlistIDs = data.array;
                this.enWishlist = this.wishlistIDs.includes(this.producto.pr_id);
            },
            // e => this.bd.presentAlert("Lista de Deseados", "Error consiguiendo lista de deseados: " + JSON.stringify(e))
        );

        this.bd.fetchUsuarioActual().subscribe(user => {
            this.usuarioActual = user;
        });
    }

    addToCarrito(x:number) {
        this.carritoIDs.push(x);
        this.nativeStorage.setItem("carrito", { array: this.carritoIDs })
        .then(
            () => this.bd.presentAlert("Carrito de Compras", "Producto añadido al carrito"),
            e => this.bd.presentAlert("Carrito de Compras", "Error consiguiendo carrito: " + JSON.stringify(e))
        );
    }

    addToWishlist(x:number) {
        this.wishlistIDs.push(x);
        this.nativeStorage.setItem("wishlist", { array: this.wishlistIDs })
        .then(
            () => this.bd.presentAlert("Lista de Deseados", "Producto añadido a lista de deseados"),
            e => this.bd.presentAlert("Lista de Deseados", "Error consiguiendo lista de deseados: " + JSON.stringify(e))
        );
        this.enWishlist = true;
    }

    removerDeWishlist(idRemover:number) {
        const carritoIndex = this.wishlistIDs.findIndex((id: number) => id === idRemover);
        if(carritoIndex !== -1) {
            this.wishlistIDs.splice(carritoIndex, 1);
            this.nativeStorage.setItem("wishlist", { array: this.wishlistIDs })
            .then(
                () => this.bd.presentAlert("Lista de Deseados", "Producto eliminado de lista de deseados"),
                e => this.bd.presentAlert("Lista de Deseados", "Error consiguiendo lista de deseados: " + JSON.stringify(e))
            );
        }
        this.enWishlist = false;
    }

    modificar() {
        let navExtras: NavigationExtras = {
            state: {
                idProducto: this.producto.pr_id
            }
        }

        this.router.navigate(['/admin/edit-ropa'], navExtras);
    }
    
    eliminar() {
        this.bd.eliminarProducto(this.producto.pr_id);
        this.router.navigate(['/home']);
    }
}
