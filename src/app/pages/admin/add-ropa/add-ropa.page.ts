import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
    selector: 'app-add-ropa',
    templateUrl: './add-ropa.page.html',
    styleUrls: ['./add-ropa.page.scss'],
})
export class AddRopaPage implements OnInit {
    
    producto:any = {
        pr_imagen: "",
        pr_nombre: "",
        pr_tipo: "",
        pr_marca: "",
        pr_precio: 1,
    }

    usuarioActual:Usuarios | null = null;
    
    constructor(private bd:ServicebdService, private router:Router) { }
    
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
        if(this.producto.pr_imagen == "" || this.producto.pr_nombre == "" || this.producto.pr_marca == "" || this.producto.pr_tipo == "") {
            this.bd.presentAlert("Datos Inválidos", "Los datos no pueden estar vacíos.");
            return;
        }
        
        if(this.producto.pr_precio < 1) {
            this.bd.presentAlert("Precio Inválido", "El precio no puede ser negativo o cero.");
            return;
        }
        
        this.bd.insertarProducto(this.producto.pr_nombre, this.producto.pr_tipo, this.producto.pr_marca, this.producto.pr_precio, this.producto.pr_imagen);
    }
}
