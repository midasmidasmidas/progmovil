import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-edit-ropa',
    templateUrl: './edit-ropa.page.html',
    styleUrls: ['./edit-ropa.page.scss'],
})
export class EditRopaPage implements OnInit {
    
    imagen:string = "";
    nombre:string =  "";
    tipo:string = "";
    marca:string = "";
    precio:number = 1;
    
    constructor(private router:Router, private alertController:AlertController, private activedroute: ActivatedRoute) {
        //realizar la captura de la informacion que viene por navigationExtras
        this.activedroute.queryParams.subscribe(param =>{
            //validamos si viene o no información
            if(this.router.getCurrentNavigation()?.extras.state){
                //capturamos la informacion
                this.imagen = this.router.getCurrentNavigation()?.extras?.state?.['imagen'];
                this.nombre = this.router.getCurrentNavigation()?.extras?.state?.['nombre'];
                this.tipo = this.router.getCurrentNavigation()?.extras?.state?.['tipo'];
                this.marca = this.router.getCurrentNavigation()?.extras?.state?.['marca'];
                this.precio = this.router.getCurrentNavigation()?.extras?.state?.['precio'];
            }
        });
    }
    
    ngOnInit() {
    }

    validarProducto() {
        if(this.imagen == "" || this.nombre == "" || this.marca == "" || this.tipo == "") {
            this.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }
        
        if(this.precio < 1) {
            this.presentAlert("Precio Inválido", "El precio no puede ser negativo o cero.");
            return;
        }

        this.router.navigate(['/home']);
    }

    async presentAlert(title:string, msg:string, sub:string = "") {
        const alert = await this.alertController.create({
            header: title,
            subHeader: sub,
            message: msg,
            buttons: ['OK'],
        });
        
        await alert.present();
    }
    
}
