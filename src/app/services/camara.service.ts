import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from './servicebd.service';

@Injectable({
    providedIn: 'root'
})
export class CamaraService {
    imageSrcKey = "imageSrc";
    imageSrc: string = "";
    
    constructor(private nativeStorage: NativeStorage, private bd:ServicebdService) {}
    
    async setImagenActual(image: string) {
        this.imageSrc = image;
        await this.nativeStorage.setItem(this.imageSrcKey, { image });
    }
    
    async getImagenActual(): Promise<string> {
        try {
            const data = await this.nativeStorage.getItem(this.imageSrcKey);
            this.imageSrc = data.image;
            return this.imageSrc;
        } catch(e) {
            this.bd.presentAlert("Consiguiendo Imagen", "Error consiguiendo la imagen: " + JSON.stringify(e));
            return '';
        }
    }
}
