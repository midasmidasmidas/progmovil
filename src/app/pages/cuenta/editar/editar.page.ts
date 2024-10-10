import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
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
    
    constructor(private router:Router, private bd:ServicebdService, private camara:CamaraService, private alertController:AlertController) { }
    
    ngOnInit() {
        this.cargarFotoDePerfil();
    }
    
    async cargarFotoDePerfil() {
        this.imageSrc = await this.camara.getImagenActual();
    }
    
    async tomarFoto() {
        const alert = await this.alertController.create({
            header: "Seleccionar Opción",
            buttons: [
                {
                    text: "Tomar Foto",
                    handler: () => { this.fotoDeCamara(); }
                },
                {
                    text: "Seleccionar de la Galería",
                    handler: () => { this.fotoDeGaleria(); }
                }
            ]
        });
        
        await alert.present();
    }

    async fotoDeCamara() {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
            });
            
            this.imageSrc = image.webPath || "";
            this.camara.setImagenActual(this.imageSrc);
        } catch(e) {
            this.bd.presentAlert("Tomando Foto", "Error tomando la foto");
        }
    }
    
    async fotoDeGaleria() {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                source: CameraSource.Photos,
            });
            
            this.imageSrc = image.webPath || "";
            this.camara.setImagenActual(this.imageSrc);
        } catch(e) {
            this.bd.presentAlert("Seleccionar Imagen", "Error seleccionando la imagen");
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
