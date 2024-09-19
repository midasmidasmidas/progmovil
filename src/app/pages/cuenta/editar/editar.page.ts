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
    correo:string = "james@72seasons.com";
    
    constructor(private router:Router, private alertController: AlertController) { }
    
    ngOnInit() {
    }
    
    validarEditar() {
        if(this.nombre == "" || this.correo == "") {
            this.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
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
