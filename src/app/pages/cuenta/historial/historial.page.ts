import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-historial',
    templateUrl: './historial.page.html',
    styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
    
    historial: any = [
        {
            imagen: "assets/img/placeholder2.jpg",
            nombre: "Nombre 1",
            fecha: "30/08/2024",
            precio: 3000,
        },
        {
            imagen: "assets/img/placeholder2.jpg",
            nombre: "Nombre 2",
            fecha: "30/08/2024",
            precio: 8000,
        },
        {
            imagen: "assets/img/placeholder2.jpg",
            nombre: "Nombre 3",
            fecha: "30/08/2024",
            precio: 2000,
        },
    ] 
    
    constructor() { }
    
    ngOnInit() {
    }
    
}
