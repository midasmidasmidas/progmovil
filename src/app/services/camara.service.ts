import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from './servicebd.service';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
    providedIn: 'root'
})
export class CamaraService {
    imageSrc: string = "assets/img/user.png";

    loading:boolean = false;
    
    constructor(private nativeStorage:NativeStorage, private bd:ServicebdService, private alertController:AlertController) { 
        this.cargarFotoDePerfil();
    }
    
    async cargarFotoDePerfil() {
        try {
            const userID = await this.nativeStorage.getItem("user_id");
            const user = await this.bd.consultarUsuarioPorId(userID);
            this.imageSrc = user?.user_foto || "assets/img/user.png";
        } catch(e) {
            // this.bd.presentAlert("Obteniendo Foto", "Error obteniendo la foto de perfil");
        }
    }
    
    async getImagenActual(): Promise<string> {
        return this.imageSrc;
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
        this.loading = true;
        try {
            await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Base64,
                source: CameraSource.Camera,
            }).then(foto => {
                this.imageSrc = `data:image/jpeg;base64,${foto.base64String}`;
            }).catch(e => {
                // this.bd.presentAlert("Tomando Foto", "Error guardando la foto: " + JSON.stringify(e));
            });
        } catch(e) {
            this.bd.presentAlert("Tomando Foto", "Error tomando la foto");
        } finally {
            this.loading = false;
        }
    }
    
    async fotoDeGaleria() {
        this.loading = true;
        try {
            await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Base64,
                source: CameraSource.Photos,
            }).then(foto => {
                this.imageSrc = `data:image/jpeg;base64,${foto.base64String}`;
            }).catch(e => {
                // this.bd.presentAlert("Tomando Foto", "Error guardando la foto: " + JSON.stringify(e));
            });
        } catch(e) {
            this.bd.presentAlert("Seleccionar Imagen", "Error seleccionando la imagen");
        } finally {
            this.loading = false;
        }
    }
}
