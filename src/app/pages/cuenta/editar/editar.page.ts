import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-editar',
    templateUrl: './editar.page.html',
    styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
    
    nombre:string = "James";
    email:string = "james@72seasons.com";
    
    constructor(private router:Router, private alertController: AlertController) { }
    
    ngOnInit() {
    }
    
    validarEditar() {
        if(this.nombre == "" || this.email == "") {
            this.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }

        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regexEmail.test(this.email)) {
            this.presentAlert("Correo Inválido", "Se ha ingresado un correo con formato inválido. Intentelo de nuevo.");
            return;
        }

        this.presentAlert("ÉXITO", "Los datos han sido editados.");
        // this.router.navigate(['/home']);
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
