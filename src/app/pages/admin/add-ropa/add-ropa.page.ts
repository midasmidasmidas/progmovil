import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
    selector: 'app-add-ropa',
    templateUrl: './add-ropa.page.html',
    styleUrls: ['./add-ropa.page.scss'],
})
export class AddRopaPage implements OnInit {
    
    producto:any = {
        pr_imagen: "",
        pr_nombre: "",
        pr_tipo: "",
        pr_marca: "",
        pr_precio: 1,
    }
    
    constructor(private bd:ServicebdService) { }
    
    ngOnInit() {
    }
    
    validarProducto() {
        if(this.producto.pr_imagen == "" || this.producto.pr_nombre == "" || this.producto.pr_marca == "" || this.producto.pr_tipo == "") {
            this.bd.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }
        
        if(this.producto.pr_precio < 1) {
            this.bd.presentAlert("Precio Inválido", "El precio no puede ser negativo o cero.");
            return;
        }
        
        this.bd.insertarProducto(this.producto.pr_nombre, this.producto.pr_tipo, this.producto.pr_marca, this.producto.pr_precio, this.producto.pr_imagen);
    }
}
