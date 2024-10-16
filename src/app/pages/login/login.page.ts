import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    
    email:string = "";
    nombre:string = "";
    pass1:string = "";

    isLoggingIn:boolean = false;
    
    constructor(private router:Router, private bd:ServicebdService, private nativeStorage:NativeStorage) { }
    
    ngOnInit() {
    }
    
    async confirmarLogin() {
        if(this.isLoggingIn) return; // no intentar el login multiples veces
        this.isLoggingIn = true;

        if(this.email == "" || this.nombre == "" || this.pass1 == "") {
            this.bd.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            this.isLoggingIn = false;
            return;
        }
        
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regexEmail.test(this.email)) {
            this.bd.presentAlert("Correo Inválido", "Se ha ingresado un correo con formato inválido. Intentelo de nuevo.");
            this.isLoggingIn = false;
            return;
        }
        
        const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if(!regexPassword.test(this.pass1)) {
            this.bd.presentAlert("Contraseña Incorrecta", "Intentelo de nuevo.");
            this.isLoggingIn = false;
            return;
        }

        try {
            const user = await this.bd.usuarioLogin(this.email, this.pass1, this.nombre);
            if(user) {
                this.bd.presentAlert("Iniciar Sesion", `Sesión iniciada con éxito.`);
                this.router.navigate(['/home']);
            } else {
                this.bd.presentAlert("Error al Iniciar Sesion", "Verifique los datos ingresados.");
            }
        } catch (e) {
            this.bd.presentAlert("Error al Iniciar Sesion", "Verifique los datos ingresados: " + JSON.stringify(e));
        } finally {
            this.isLoggingIn = false;
        }
    }
}
