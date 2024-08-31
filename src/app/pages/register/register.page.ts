import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    
    email:string = "";
    nombre:string = "";
    pass1:string = "";
    pass2:string = "";
    
    constructor(private router:Router, private alertController: AlertController) { }
    
    ngOnInit() {
    }

    confirmarRegistro() {
        if(this.email == "" || this.nombre == "" || this.pass1 == "" || this.pass2 == "") {
            this.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }

        const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if(!regex.test(this.pass1)) {
            this.presentAlert("Contraseña Inválida", "La contraseña debe tener al menos 8 carácteres, una letra mayúscula, y un símbolo.");
            return;
        }

        if(this.pass1 != this.pass2) {
            this.presentAlert("Contraseñas No Coinciden", "Las contraseñas no coinciden.");
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
