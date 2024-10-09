import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

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
    
    constructor(private router:Router) {
    }
    
    ngOnInit() {
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
