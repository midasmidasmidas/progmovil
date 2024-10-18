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
    
    loading:boolean = false;

    usuarioActual:Usuarios | null = null;
    
    constructor(public camara: CamaraService, private bd:ServicebdService, private nativeStorage:NativeStorage) {
    }
    
    ionViewWillEnter(){
        this.cargarDatosDeUsuario();
        this.camara.cargarFotoDePerfil();
    }
    
    ngOnInit() {
        this.cargarDatosDeUsuario();
        this.camara.cargarFotoDePerfil();
    }

    async cargarDatosDeUsuario() {
        this.loading = true;
        try {
            const userID = await this.nativeStorage.getItem("user_id");
            this.usuarioActual = await this.bd.consultarUsuarioPorId(userID);
        } catch(e) {

        } finally {
            this.loading = false;
        }
    }
}
