import { Component, OnInit } from '@angular/core';

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
            imagen: "assets/img/productos/placeholder2.webp",
            nombre: "Polera Cráneo Flameante",
            marca: "Metallica",
            precio: 12000,
        },
    ]
    
    constructor() { }
    
    ngOnInit() {
    }
    
}
