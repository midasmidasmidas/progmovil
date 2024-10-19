import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
    selector: 'app-pasarela',
    templateUrl: './pasarela.page.html',
    styleUrls: ['./pasarela.page.scss'],
})
export class PasarelaPage implements OnInit {

    carrito: any = [
        {
            pr_id: 1,
            pr_nombre: "Cargando...",
            pr_tipo: "Cargando...",
            pr_marca: "",
            pr_precio: 0,
            pr_imagen: "",
        },
    ]
    
    carritoIDs:number[] = [];
    
    usuarioActual:Usuarios | null = null;
    
    tarj_nombre:string = "";
    tarj_numero:string = "";
    tarj_cvv:string = "";
    tarj_fechaMM:string = "";
    tarj_fechaAA:string = "";
    
    constructor(private bd:ServicebdService, private activedroute:ActivatedRoute, private router:Router, private nativeStorage:NativeStorage) {
        this.activedroute.queryParams.subscribe(param =>{
            if(this.router.getCurrentNavigation()?.extras.state){
                this.carrito = this.router.getCurrentNavigation()?.extras?.state?.['carrito'];
                this.carritoIDs = this.router.getCurrentNavigation()?.extras?.state?.['carritoIDs'];
                this.usuarioActual = this.router.getCurrentNavigation()?.extras?.state?.['usuarioActual'];
            }
        });
    }
    
    ngOnInit() {
    }
    
    checkPasarela() {
        if(this.tarj_nombre == "")
        {
            this.bd.presentAlert("Datos Inválidos", "El nombre no puede estar vacío.");
            return;
        }
        
        const numeroRegex = /^\d{8,19}$/;
        if(!numeroRegex.test(this.tarj_numero.toString()))
        {
            this.bd.presentAlert("Datos Inválidos", "El numero debe ser de minimo 8 digitos, y maximo 16, sin guiones ni espacios.");
            return;
        }
        
        // esto no debería pasar pero por si las moscas
        // algunas tarjetas americanas tienen un CVV de 4 digitos
        const cvvRegex = /^[0-9]{3,4}$/;
        if(!cvvRegex.test(this.tarj_cvv.toString()))
        {
            this.bd.presentAlert("Datos Inválidos", "El CVV/CVC debe ser de 3 digitos. (En ocaciones especiales, 4)");
            return;
        }
        
        const yearRegex = /^[0-9]{2}$/;
        if(!yearRegex.test(this.tarj_fechaAA))
        {
            this.bd.presentAlert("Datos Inválidos", "El año debe ser solo los ultimos 2 digitos.");
            return;
        }
        
        const monthRegex = /^(0[1-9]|1[0-2])$/;
        if(!monthRegex.test(this.tarj_fechaMM))
        {
            this.bd.presentAlert("Datos Inválidos", "El mes debe ser entre 01 a 12.");
            return;
        }
        
        this.bd.presentAlert("Procesando Compra", "Esto puede tardar un poco...");
        
        setTimeout(() => {
            this.confirmarCompra();
        }, 1.75 * 1000);
    }
    
    confirmarCompra() {
        this.carritoIDs.forEach(async id => {
            const producto = await this.bd.consultarProductoPorId(id.toString());
            if(producto && this.usuarioActual) {
                let fechaFormateada:string = this.bd.formatearFechaActual();
                this.bd.insertarCompra(producto.pr_id, producto.pr_precio, fechaFormateada, this.usuarioActual.user_id);
            }
        });
        
        // vaciar carrito al comprar
        this.carrito = [];
        this.carritoIDs = [];
        this.nativeStorage.setItem("carrito", { array: [] })
        
        this.bd.presentAlert("Compra", "Compra completada con éxito");
    }
    
}
