import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-historial',
    templateUrl: './historial.page.html',
    styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
    
    historial: any = [
        {
            imagen: "assets/img/productos/placeholder6.webp",
            nombre: "Polera Kill 'Em All",
            fecha: "30/08/2024",
            precio: 13000,
        },
        {
            imagen: "assets/img/productos/placeholder2.webp",
            nombre: "Polera Cráneo Flameante",
            fecha: "30/08/2024",
            precio: 12000,
        },
        {
            imagen: "assets/img/productos/placeholder3.webp",
            nombre: "Polera Blanca Logo Negro",
            fecha: "18/08/2024",
            precio: 8000,
        },
        {
            imagen: "assets/img/productos/placeholder1.webp",
            nombre: "Hoodie Kill 'em All",
            fecha: "12/08/2024",
            precio: 9000,
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
