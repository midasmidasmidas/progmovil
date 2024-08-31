import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.page.html',
    styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
    
    carrito: any = [
        {
            imagen: "assets/img/placeholder.webp",
            nombre: "Nombre 1",
            marca: "Marca 1",
            precio: 3000,
        },
        {
            imagen: "assets/img/placeholder.webp",
            nombre: "Nombre 2",
            marca: "Marca 2",
            precio: 8000,
        },
        {
            imagen: "assets/img/placeholder.webp",
            nombre: "Nombre 3",
            marca: "Marca 3",
            precio: 2000,
        },
    ]
    
    constructor() { }
    
    ngOnInit() {
    }
    
}
