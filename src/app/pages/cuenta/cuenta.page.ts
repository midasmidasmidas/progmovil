import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ViewWillEnter } from '@ionic/angular';
import { CamaraService } from 'src/app/services/camara.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
    selector: 'app-cuenta',
    templateUrl: './cuenta.page.html',
    styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements ViewWillEnter, OnInit {
    
    imageSrc: string = "assets/img/user.png";
    loading:boolean = false;

    usuarioActual:Usuarios | null = null;
    
    constructor(private camara: CamaraService, private bd:ServicebdService, private nativeStorage:NativeStorage) {
    }
    
    ionViewWillEnter(){
        this.loadImage();
        this.cargarDatosDeUsuario();
    }
    
    ngOnInit() {
        this.loadImage();
        this.cargarDatosDeUsuario();
    }

    async cargarDatosDeUsuario() {
        const userID = await this.nativeStorage.getItem("user_id");
        this.usuarioActual = await this.bd.consultarUsuarioPorId(userID);
        this.imageSrc = this.usuarioActual?.user_foto || "assets/img/user.png";
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
