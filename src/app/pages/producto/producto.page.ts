import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
    selector: 'app-producto',
    templateUrl: './producto.page.html',
    styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
    
    producto:any = {
        pr_id: 1,
        pr_nombre: "NOMBRE",
        pr_tipo: "TIPO",
        pr_marca: "MARCA",
        pr_precio: 1,
        pr_imagen: "assets/img/productos/placeholder1.webp",
    }
    
    constructor(private router: Router, private activedroute: ActivatedRoute, private bd:ServicebdService) {
        // realizar la captura de la informacion que viene por navigationExtras
        this.activedroute.queryParams.subscribe(param =>{
            // validamos si viene o no información
            if(this.router.getCurrentNavigation()?.extras.state){
                // capturamos la informacion
                this.producto = this.router.getCurrentNavigation()?.extras?.state?.['productoEnviado'];
            }
        });
    }
    
    ngOnInit() {
    }

    modificar() {
        let navExtras: NavigationExtras = {
            state: {
                productoEnviado: this.producto
            }
        }

        this.router.navigate(['/admin/edit-ropa'], navExtras);
    }
    
    eliminar() {
        this.bd.eliminarProducto(this.producto.pr_id);
    }
}
