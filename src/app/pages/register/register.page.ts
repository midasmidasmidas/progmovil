import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

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

    pregunta:string = "0";
    respuesta:string = "";
    
    constructor(private router:Router, private bd:ServicebdService) { }
    
    ngOnInit() {
    }

    async confirmarRegistro() {
        if(this.email == "" || this.nombre.trim() == "" || this.pass1 == "" || this.pass2 == "" || this.respuesta.trim() == "") {
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

        const correoUsado = await this.bd.consultarCorreoRegistrado(this.email);
        if(correoUsado) {
            this.bd.presentAlert("Correo Existente", "Ya existe una cuenta usando este correo.");
            return;
        }

        if(this.pass1 != this.pass2) {
            this.bd.presentAlert("Contraseñas No Coinciden", "Las contraseñas no coinciden.");
            return;
        }

        await this.bd.usuarioRegistrar(this.nombre, this.email, this.pass1, this.pregunta, this.respuesta);
        this.router.navigate(['/home']);
    }
}
