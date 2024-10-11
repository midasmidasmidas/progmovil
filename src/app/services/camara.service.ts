import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from './servicebd.service';

@Injectable({
    providedIn: 'root'
})
export class CamaraService {
    imageSrc: string = "assets/img/user.png";
    
    constructor(private nativeStorage:NativeStorage, private bd:ServicebdService) { 
        this.cargarFotoDePerfil();
    }
    
    async cargarFotoDePerfil() {
        try {
            const data = await this.nativeStorage.getItem("fotoPerfil");
            this.imageSrc = data.image || "";
            this.setImagenActual(this.imageSrc);
        } catch(e) {
            // this.bd.presentAlert("Obteniendo Foto", "Error obteniendo la foto de perfil");
        }
    }
    
    async setImagenActual(image: string) {
        this.imageSrc = image;
    }
    
    async getImagenActual(): Promise<string> {
        return this.imageSrc;
    }
}
