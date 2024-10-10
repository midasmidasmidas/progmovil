import { Component, OnInit } from '@angular/core';
import { CamaraService } from 'src/app/services/camara.service';

@Component({
    selector: 'app-cuenta',
    templateUrl: './cuenta.page.html',
    styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
    
    imageSrc: string = '';
    
    constructor(private camara: CamaraService) {
        this.loadImage();
    }
    
    ngOnInit() {
    }
    
    async loadImage() {
        this.imageSrc = await this.camara.getImagenActual();
    }
    
}
