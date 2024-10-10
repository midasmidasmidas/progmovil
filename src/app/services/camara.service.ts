import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from './servicebd.service';

@Injectable({
    providedIn: 'root'
})
export class CamaraService {
    imageSrc: string = "";
    
    constructor() {}
    
    async setImagenActual(image: string) {
        this.imageSrc = image;
    }
    
    async getImagenActual(): Promise<string> {
        return this.imageSrc;
    }
}
