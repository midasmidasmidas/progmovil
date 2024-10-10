import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { CamaraService } from 'src/app/services/camara.service';

@Component({
    selector: 'app-cuenta',
    templateUrl: './cuenta.page.html',
    styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements ViewWillEnter {
    
    imageSrc: string = '';
    
    constructor(private camara: CamaraService) {
    }

    ionViewWillEnter(){
        this.loadImage();
    }
    
    ngOnInit() {
    }
    
    async loadImage() {
        this.imageSrc = await this.camara.getImagenActual();
    }
    
}
