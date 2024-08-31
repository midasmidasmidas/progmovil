import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    productos: any = [
        {
            imagen: "assets/img/productos/placeholder1.webp",
            nombre: "Hoodie Kill 'Em All",
            marca: "Metallica",
            precio: 14000,
        },
        {
            imagen: "assets/img/productos/placeholder2.webp",
            nombre: "Polera Cráneo Flameante",
            marca: "Metallica",
            precio: 12000,
        },
        {
            imagen: "assets/img/productos/placeholder3.webp",
            nombre: "Polera Blanca Logo Negro",
            marca: "Metallica",
            precio: 12000,
        },
        {
            imagen: "assets/img/productos/placeholder4.webp",
            nombre: "Polera Master of Puppets",
            marca: "Metallica",
            precio: 11000,
        },
        {
            imagen: "assets/img/productos/placeholder5.webp",
            nombre: "Polera 72 Seasons",
            marca: "Metallica",
            precio: 13000,
        },
        {
            imagen: "assets/img/productos/placeholder6.webp",
            nombre: "Polera Kill 'Em All",
            marca: "Metallica",
            precio: 13000,
        },
        {
            imagen: "assets/img/productos/placeholder7.webp",
            nombre: "Polera Logo 72 Seasons",
            marca: "Metallica",
            precio: 15000,
        },
    ] 
    
    constructor(private router:Router) {}

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
