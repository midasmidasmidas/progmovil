import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.page.html',
    styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

    wishlist: any = [
        {
            pr_id: 1,
            pr_nombre: "Cargando...",
            pr_tipo: "Cargando..",
            pr_marca: "",
            pr_precio: 0,
            pr_imagen: "",
        },
    ]

    wishlistIDs:number[] = [];
    loading:boolean = false;
    
    constructor(private nativeStorage:NativeStorage, private bd:ServicebdService, private router:Router) { }
    
    ngOnInit() {
        this.iniciarWishlist();
    }
    
    async iniciarWishlist() {
        this.loading = true;
        try {
            this.wishlist = [];
            const data = await this.nativeStorage.getItem("wishlist");
            this.wishlistIDs = data.array || [];
            this.wishlistIDs.forEach(async id => {
                const producto = await this.bd.consultarProductoPorId(id.toString());
                if(producto) {
                    this.wishlist.push(producto);
                }
            });
        } catch(e) {
            // this.bd.presentAlert("Lista de Deseados", "Error consiguiendo lista de deseados: " + JSON.stringify(e))
        } finally {
            this.loading = false;
        }
    }

    removerDeWishlist(idRemover:number) {
        const carritoIndex = this.wishlist.findIndex((product: { pr_id: number; }) => product.pr_id === idRemover);
        if(carritoIndex !== -1) {
            this.wishlist.splice(carritoIndex, 1);
            this.wishlistIDs.splice(carritoIndex, 1);

            this.nativeStorage.setItem("wishlist", { array: this.wishlistIDs })
            .then(
                () => this.bd.presentAlert("Lista de Deseados", "Producto eliminado de lista de deseados"),
                e => this.bd.presentAlert("Lista de Deseados", "Error consiguiendo lista de deseados: " + JSON.stringify(e))
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
