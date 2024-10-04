import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
    selector: 'app-password-cambio',
    templateUrl: './password-cambio.page.html',
    styleUrls: ['./password-cambio.page.scss'],
})
export class PasswordCambioPage implements OnInit {
    
    pass1:string = "";
    pass2:string = "";
    
    constructor(private router:Router, private alertController: AlertController, private bd:ServicebdService) { }
    
    ngOnInit() {
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
        
        this.router.navigate(['/home']);
    }
}
