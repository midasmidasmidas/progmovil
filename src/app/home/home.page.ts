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
