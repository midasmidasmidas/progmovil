import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    
    email:string = "";
    nombre:string = "";
    pass1:string = "";
    
    constructor(private router:Router, private alertController: AlertController) { }
    
    ngOnInit() {
    }
    
    confirmarLogin() {
        if(this.email == "" || this.nombre == "" || this.pass1 == "") {
            this.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }
        
        const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if(!regex.test(this.pass1)) {
            this.presentAlert("Contraseña Incorrecta", "Intentelo de nuevo.");
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
