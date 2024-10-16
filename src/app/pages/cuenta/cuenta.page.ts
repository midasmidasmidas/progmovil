import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { CamaraService } from 'src/app/services/camara.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
    selector: 'app-cuenta',
    templateUrl: './cuenta.page.html',
    styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements ViewWillEnter {
    
    imageSrc: string = "assets/img/user.png";
    loading:boolean = false;

    usuarioActual:Usuarios | null = null;
    
    constructor(private camara: CamaraService, private bd:ServicebdService) {
    }
    
    ionViewWillEnter(){
        this.loadImage();
        this.cargarDatosDeUsuario();
    }
    
    ngOnInit() {
        this.loadImage();
        this.cargarDatosDeUsuario();
    }

    cargarDatosDeUsuario() {
        this.bd.fetchUsuarioActual().subscribe(user => {
            this.usuarioActual = user;
        });
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
