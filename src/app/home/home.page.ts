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
            nombre: "Kill 'Em All",
            tipo: "Polerón",
            marca: "Metallica",
            precio: 14000,
        },
        {
            imagen: "assets/img/productos/placeholder2.webp",
            nombre: "Cráneo Flameante",
            tipo: "Polera",
            marca: "Metallica",
            precio: 12000,
        },
        {
            imagen: "assets/img/productos/placeholder3.webp",
            nombre: "Blanca Logo Negro",
            tipo: "Polera",
            marca: "Metallica",
            precio: 12000,
        },
        {
            imagen: "assets/img/productos/placeholder4.webp",
            nombre: "Master of Puppets",
            tipo: "Polera",
            marca: "Metallica",
            precio: 11000,
        },
        {
            imagen: "assets/img/productos/placeholder5.webp",
            nombre: "72 Seasons",
            tipo: "Polera",
            marca: "Metallica",
            precio: 13000,
        },
        {
            imagen: "assets/img/productos/placeholder6.webp",
            nombre: "Kill 'Em All",
            tipo: "Polera",
            marca: "Metallica",
            precio: 13000,
        },
        {
            imagen: "assets/img/productos/placeholder7.webp",
            nombre: "Logo 72 Seasons",
            tipo: "Polera",
            marca: "Metallica",
            precio: 15000,
        },
        {
            imagen: "assets/img/productos/placeholder8.webp",
            nombre: "Ride The Lightning",
            tipo: "Polerón",
            marca: "Metallica",
            precio: 16000,
        },
        {
            imagen: "assets/img/productos/placeholder9.webp",
            nombre: "Through The Never",
            tipo: "Polerón",
            marca: "Metallica",
            precio: 15000,
        },
        {
            imagen: "assets/img/productos/placeholder10.webp",
            nombre: "Aniversario 30",
            tipo: "Polera",
            marca: "Metallica",
            precio: 15000,
        },
        {
            imagen: "assets/img/productos/placeholder11.webp",
            nombre: "Cráneo Mecánico",
            tipo: "Polera",
            marca: "Metallica x Fortnite",
            precio: 18000,
        },
        {
            imagen: "assets/img/productos/placeholder12.webp",
            nombre: "Call of Ktulu",
            tipo: "Polera",
            marca: "Metallica",
            precio: 13000,
        },
        {
            imagen: "assets/img/productos/placeholder13.webp",
            nombre: "St. Anger",
            tipo: "Polera",
            marca: "Metallica",
            precio: 12000,
        },
        {
            imagen: "assets/img/productos/placeholder14.webp",
            nombre: "Death Magnetic",
            tipo: "Polera",
            marca: "Metallica",
            precio: 11000,
        },
    ];

    busqueda = [...this.productos];
    
    constructor(private router:Router) {}

    buscarProducto(event:any) {
        const query = event.target.value.toLowerCase();
        this.busqueda = this.productos.filter((producto:any) => 
            producto.nombre.toLowerCase().includes(query) || // busca por nombre
            producto.tipo.toLowerCase().includes(query) // pero tambien por tipo
        );
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
