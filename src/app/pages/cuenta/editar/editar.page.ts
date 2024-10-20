import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ViewWillEnter } from '@ionic/angular';
import { CamaraService } from 'src/app/services/camara.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
    selector: 'app-editar',
    templateUrl: './editar.page.html',
    styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit, ViewWillEnter {
    
    nombre:string = "";
    email:string = "";

    loading:boolean = false;
    
    usuarioActual:Usuarios | null = null;

    constructor(private nativeStorage:NativeStorage, private bd:ServicebdService, public camara:CamaraService, private router:Router) { }
    
    ngOnInit() {
        this.cargarDatosDeUsuario();
        this.camara.cargarFotoDePerfil();
    }

    ionViewWillEnter(){
        this.cargarDatosDeUsuario();
        this.camara.cargarFotoDePerfil();
    }

    async cargarDatosDeUsuario(){
        const userID = await this.nativeStorage.getItem("user_id");
        this.usuarioActual = await this.bd.consultarUsuarioPorId(userID);

        this.nombre = this.usuarioActual?.user_nombre || "";
        this.email = this.usuarioActual?.user_correo || "";
    }
    
    async validarEditar() {
        if(this.nombre.trim() == "" || this.email == "") {
            this.bd.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }
        
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regexEmail.test(this.email)) {
            this.bd.presentAlert("Correo Inválido", "Se ha ingresado un correo con formato inválido. Intentelo de nuevo.");
            return;
        }

        const correoUsado = await this.bd.consultarCorreoRegistrado(this.email);
        if(correoUsado && this.email != this.usuarioActual?.user_correo) {
            this.bd.presentAlert("Correo Existente", "Ya existe una cuenta usando este correo.");
            return;
        }

        if(this.usuarioActual && this.camara.imageSrc) {
            this.bd.usuarioEditar(this.nombre, this.email, this.usuarioActual.user_pass, this.camara.imageSrc, this.usuarioActual.user_id);
            this.bd.presentAlert("Éxito", "Perfil editado.");
            this.router.navigate(['/cuenta']);
        } else {
            this.bd.presentAlert("Datos no cargados", "Espere un momento antes de guardar los cambios");
        }
    }
}
