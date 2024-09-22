import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-producto',
    templateUrl: './producto.page.html',
    styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
    
    imagen:string = "assets/img/productos/placeholder1.webp";
    nombre:string =  "NOMBRE";
    tipo:string = "TIPO";
    marca:string = "MARCA";
    precio:number = 0;
    
    constructor(private router: Router, private activedroute: ActivatedRoute) {
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
    
    irEditarProducto()
    {
        let navExtras: NavigationExtras = {
            state:{
                imagen: this.imagen,
                nombre: this.nombre,
                tipo: this.tipo,
                marca: this.marca,
                precio: this.precio,
            }
        }
        
        this.router.navigate(['/admin/edit-ropa'], navExtras);
    }
    
}
