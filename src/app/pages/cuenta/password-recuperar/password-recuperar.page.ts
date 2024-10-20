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

    pregunta:string = "Ingrese su correo primero.";
    respuesta:string = "";
    correoVerificado:boolean = false;

    usuarioActual:Usuarios | null = null;
    
    constructor(private router:Router, private bd:ServicebdService) { }
    
    ngOnInit() {
    }

    async validarCorreo() {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regexEmail.test(this.email)) {
            this.correoVerificado = false;
            this.pregunta = "Ingrese su correo primero.";
        } else {
            this.usuarioActual = await this.bd.consultarUsuarioPorCorreo(this.email);
            if(this.usuarioActual) {
                this.pregunta = this.bd.preguntas[this.usuarioActual!.user_pregunta];
                this.correoVerificado = true;
            } else {
                this.pregunta = "Ingrese su correo primero.";
                this.correoVerificado = false;
            }
        }
    }
    
    async validarPassword() {
        if(this.email == "" || this.pass1 == "" || this.pass2 == "") {
            this.bd.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }

        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regexEmail.test(this.email)) {
            this.bd.presentAlert("Correo Inválido", "Se ha ingresado un correo con formato inválido. Intentelo de nuevo.");
            return;
        } else {
            this.usuarioActual = await this.bd.consultarUsuarioPorCorreo(this.email);
            if(this.usuarioActual) {
                this.pregunta = this.bd.preguntas[this.usuarioActual!.user_pregunta];
                this.correoVerificado = true;
            } else {
                this.pregunta = "Ingrese su correo primero.";
                this.correoVerificado = false;
            }
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

        const respuestaVerificada = await this.bd.consultarPreguntaDeSeguridad(this.email, this.respuesta)
        if(!respuestaVerificada)
        {
            this.bd.presentAlert("Pregunta de Seguridad", "La respuesta está incorrecta.");
            return;
        }

        if(this.usuarioActual) {
            if(this.correoVerificado) {
                this.bd.usuarioEditar(this.usuarioActual.user_nombre, this.usuarioActual.user_correo, this.pass1, this.usuarioActual.user_foto, this.usuarioActual.user_id);
                this.bd.presentAlert("Éxito", "Contraseña Recuperada.");
                this.router.navigate(['/login']);
            } else {
                this.bd.presentAlert("Correo Invalido", "Ingrese el correo del que quiera recuperar la contraseña.");
            }
        } else {
            this.bd.presentAlert("Datos no cargados", "Espere un momento antes de recuperar su contraseña");
            return;
        }
    }
}
