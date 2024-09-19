import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-edit-ropa',
    templateUrl: './edit-ropa.page.html',
    styleUrls: ['./edit-ropa.page.scss'],
})
export class EditRopaPage implements OnInit {
    
    imagen:string = "";
    nombre:string =  "";
    marca:string = "";
    precio:number = 1;
    
    constructor(private router:Router, private alertController: AlertController) { }
    
    ngOnInit() {
    }

    validarProducto() {
        if(this.imagen == "" || this.nombre == "" || this.marca == "") {
            this.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }
        
        if(this.precio < 1) {
            this.presentAlert("Precio Inválido", "El precio no puede ser negativo o cero.");
            return;
        }

        this.router.navigate(['/home']);
    }

    async presentAlert(title:string, msg:string, sub:string = "") {
        const alert = await this.alertController.create({
            header: title,
            subHeader: sub,
            message: msg,
            buttons: ['OK'],
        });
        
        await alert.present();
    }
    
}
