import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    
    productos: any = [
        {
            pr_id: 1,
            pr_nombre: "Cargando...",
            pr_tipo: "Cargando...",
            pr_marca: "",
            pr_precio: 0,
            pr_imagen: "",
        },
    ];
    
    busqueda = [...this.productos];
    
    constructor(private router:Router, private bd:ServicebdService) {}
    
    ngOnInit() {
        // verifico si la BD esta disponible
        this.bd.dbState().subscribe(data => {
            if(data) {
                // subscribir al observable de la consulta
                this.bd.fetchProductos().subscribe(res => {
                    this.productos = res;
                    this.busqueda = [...this.productos];
                })
            }
        })
    }
        
    buscarProducto(event:any) {
        const query = event.target.value.toLowerCase();
        this.busqueda = this.productos.filter((producto:any) => 
            producto.pr_nombre.toLowerCase().includes(query) || // busca por nombre
            producto.pr_tipo.toLowerCase().includes(query) // pero tambien por tipo
    );
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
