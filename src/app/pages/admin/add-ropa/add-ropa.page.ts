import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
    selector: 'app-add-ropa',
    templateUrl: './add-ropa.page.html',
    styleUrls: ['./add-ropa.page.scss'],
})
export class AddRopaPage implements OnInit {
    
    imagen:string = "";
    nombre:string =  "";
    tipo:string = "";
    marca:string = "";
    precio:number = 1;
    
    constructor(private router:Router, private alertController: AlertController, private bd:ServicebdService) { }
    
    ngOnInit() {
    }
    
    validarProducto() {
        if(this.imagen == "" || this.nombre == "" || this.marca == "" || this.tipo == "") {
            this.bd.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }
        
        if(this.precio < 1) {
            this.bd.presentAlert("Precio Inválido", "El precio no puede ser negativo o cero.");
            return;
        }

        this.router.navigate(['/home']);
    }
}
