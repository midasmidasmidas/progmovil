import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { CamaraService } from 'src/app/services/camara.service';

@Component({
    selector: 'app-cuenta',
    templateUrl: './cuenta.page.html',
    styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements ViewWillEnter {
    
    imageSrc: string = "assets/img/user.png";
    loading:boolean = false;
    
    constructor(private camara: CamaraService) {
        this.loadImage();
    }
    
    ionViewWillEnter(){
        this.loadImage();
    }
    
    ngOnInit() {
    }
    
    async loadImage() {
        this.loading = true;
        try {
            this.imageSrc = await this.camara.getImagenActual();
        } finally {
            this.loading = false;
        }
    }
    
}
