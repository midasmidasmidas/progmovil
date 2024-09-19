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

    emailTest:string = "james@72seasons.com"
    nombreTest:string = "James"
    pass1Test:string = "BellTolls1!"
    
    constructor(private router:Router, private alertController: AlertController) { }
    
    ngOnInit() {
    }
    
    confirmarLogin() {
        if(this.email == "" || this.nombre == "" || this.pass1 == "") {
            this.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }
        
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regexEmail.test(this.email)) {
            this.presentAlert("Correo Inválido", "Se ha ingresado un correo con formato inválido. Intentelo de nuevo.");
            return;
        }

        const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if(!regexPassword.test(this.pass1)) {
            this.presentAlert("Contraseña Incorrecta", "Intentelo de nuevo.");
            return;
        }

        // esto es exclusivamente para testeo del login. se debe reemplazar luego cuando hagamos sesiones reales
        if(this.email != this.emailTest || this.nombre != this.nombreTest || this.pass1 != this.pass1Test) {
            this.presentAlert("Datos incorrectos.", "Intentelo de nuevo.");
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
