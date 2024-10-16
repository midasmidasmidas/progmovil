import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
    selector: 'app-password-recuperar',
    templateUrl: './password-recuperar.page.html',
    styleUrls: ['./password-recuperar.page.scss'],
})
export class PasswordRecuperarPage implements OnInit {

    email:string = "";
    pass1:string = "";
    pass2:string = "";

    usuarioActual:Usuarios | null = null;
    
    constructor(private router:Router, private bd:ServicebdService) { }
    
    ngOnInit() {
        this.bd.fetchUsuarioActual().subscribe(user => {
            this.usuarioActual = user;
        });
    }
    
    validarPassword() {
        if(this.email == "" || this.pass1 == "" || this.pass2 == "") {
            this.bd.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }

        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regexEmail.test(this.email)) {
            this.bd.presentAlert("Correo Inválido", "Se ha ingresado un correo con formato inválido. Intentelo de nuevo.");
            return;
        }

        const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if(!regex.test(this.pass1)) {
            this.bd.presentAlert("Contraseña Inválida", "La contraseña debe tener al menos 8 carácteres, una letra mayúscula, y un símbolo.");
            return;
        }

        if(this.pass1 != this.pass2) {
            this.bd.presentAlert("Contraseñas No Coinciden", "Las contraseñas no coinciden.");
            return;
        }

        this.router.navigate(['/home']);
    }
}
