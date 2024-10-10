import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CamaraService } from 'src/app/services/camara.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
    selector: 'app-editar',
    templateUrl: './editar.page.html',
    styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
    
    nombre:string = "James";
    email:string = "james@72seasons.com";

    imageSrc: string = "";
    
    constructor(private router:Router, private bd:ServicebdService, private camara:CamaraService) { }
    
    ngOnInit() {
        this.cargarFotoDePerfil();
    }

    async cargarFotoDePerfil() {
        this.imageSrc = await this.camara.getImagenActual();
    }

    async tomarFoto() {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
            });
            
            this.imageSrc = image.webPath || "";
            this.camara.setImagenActual(this.imageSrc);
        } catch(e) {
            this.bd.presentAlert("Tomando Foto Imagen", "Error tomando la foto: " + JSON.stringify(e));
        }
    }
    
    validarEditar() {
        if(this.nombre == "" || this.email == "") {
            this.bd.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }

        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regexEmail.test(this.email)) {
            this.bd.presentAlert("Correo Inválido", "Se ha ingresado un correo con formato inválido. Intentelo de nuevo.");
            return;
        }

        this.bd.presentAlert("ÉXITO", "Los datos han sido editados.");
        // this.router.navigate(['/home']);
    }
}
