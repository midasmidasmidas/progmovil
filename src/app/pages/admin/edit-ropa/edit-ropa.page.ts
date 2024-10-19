import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
    selector: 'app-edit-ropa',
    templateUrl: './edit-ropa.page.html',
    styleUrls: ['./edit-ropa.page.scss'],
})
export class EditRopaPage implements OnInit {
    
    producto:any = {
        pr_id: 1,
        pr_nombre: "",
        pr_tipo: "",
        pr_marca:"",
        pr_precio: 1,
        pr_imagen: "",
    }

    usuarioActual:Usuarios | null = null;

    constructor(private router:Router, private activedroute: ActivatedRoute, private bd:ServicebdService) {
        // realizar la captura de la informacion que viene por navigationExtras
        this.activedroute.queryParams.subscribe(async param =>{
            // validamos si viene o no información
            if(this.router.getCurrentNavigation()?.extras.state){
                // capturamos la informacion
                const productoID = this.router.getCurrentNavigation()?.extras?.state?.['idProducto'];
                this.producto = await this.bd.consultarProductoPorId(productoID);
            }
        });
    }
    
    ngOnInit() {
        // no muestra los botones para ir a la pagina de añadir o editar si no eres admin, pero por si acaso.
        this.bd.fetchUsuarioActual().subscribe(user => {
            this.usuarioActual = user;

            if(user.user_tipo != 2) {
                this.bd.presentAlert("Permisos", "No tienes permiso de entrar en esa pagina");
                this.router.navigate(['/login']);
            }
        });
    }

    validarProducto() {
        if(this.producto.pr_imagen.trim() == "" || this.producto.pr_nombre.trim() == "" || this.producto.pr_marca.trim() == "" || this.producto.pr_tipo.trim() == "") {
            this.bd.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }
        
        if(this.producto.pr_precio < 1) {
            this.bd.presentAlert("Precio Inválido", "El precio no puede ser negativo o cero.");
            return;
        }

        this.bd.modificarProducto(this.producto.pr_id, this.producto.pr_nombre, this.producto.pr_tipo, this.producto.pr_marca, this.producto.pr_precio, this.producto.pr_imagen);
        this.router.navigate(['/home']);
    }
}
