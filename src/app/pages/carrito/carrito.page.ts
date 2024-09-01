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
            imagen: "assets/img/productos/placeholder1.webp",
            nombre: "Hoodie Kill 'em All",
            marca: "Metallica",
            precio: 7000,
        },
        {
            imagen: "assets/img/productos/placeholder3.webp",
            nombre: "Polera Blanca Logo Negro",
            marca: "Metallica",
            precio: 8000,
        },
        {
            imagen: "assets/img/productos/placeholder5.webp",
            nombre: "Polera 72 Seasons",
            marca: "Metallica",
            precio: 12000,
        },
    ]
    
    constructor(private router:Router) {}
    
    ngOnInit() {
    }

    irProducto(x:any)
    {
        let navExtras: NavigationExtras = {
            state:{
              imagen: x.imagen,
              nombre: x.nombre,
              marca: x.marca,
              precio: x.precio,
            }
        }

        this.router.navigate(['/producto'], navExtras);
    }
    
}
