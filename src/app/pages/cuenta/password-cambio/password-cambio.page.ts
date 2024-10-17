import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
    selector: 'app-password-cambio',
    templateUrl: './password-cambio.page.html',
    styleUrls: ['./password-cambio.page.scss'],
})
export class PasswordCambioPage implements OnInit {
    
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
        if(this.pass1 == "" || this.pass2 == "") {
            this.bd.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
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
        
        if(this.usuarioActual) {
            this.bd.usuarioEditar(this.usuarioActual.user_nombre, this.usuarioActual.user_correo, this.pass1, this.usuarioActual.user_foto, this.usuarioActual.user_id);
        } else {
            this.bd.presentAlert("Datos no cargados", "Espere un momento antes de cambiar su contraseña");
            return;
        }
        
        this.router.navigate(['/home']);
    }
}
