import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    productos: any = [
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
        {
            imagen: "assets/img/placeholder.webp",
            nombre: "Nombre 4",
            marca: "Marca 4",
            precio: 6000,
        },
    ] 
    
    constructor() {}
    
}
