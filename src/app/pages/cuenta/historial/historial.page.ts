import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
    selector: 'app-historial',
    templateUrl: './historial.page.html',
    styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
    
    historial: any = [
        {
            pr_id: 1,
            pr_nombre: "Cargando...",
            pr_tipo: "Cargando...",
            pr_marca: "",
            pr_precio: 0,
            pr_imagen: "",
        },
    ] 

    usuarioActual:Usuarios | null = null;

    loading:boolean = false;

    constructor(private router:Router, private bd:ServicebdService) {}
    
    ngOnInit() {
        this.loading = true;
        this.bd.fetchUsuarioActual().subscribe(user => {
            this.usuarioActual = user;

            this.bd.dbState().subscribe(async data => {
                if(data && this.usuarioActual) {
                    try {
                        this.historial = [];
                        const compras = await this.bd.consultarComprasPorUsuario(user.user_id);
                        
                        compras.forEach(async (compra) => {
                            const producto = await this.bd.consultarProductoPorId(compra.compra_pr_id.toString());
                            if(producto) {
                                this.historial.push({ ...producto, compra_fecha: compra.compra_fecha });
                            }
                        });
                    } catch(e) {
                        // this.bd.presentAlert("Historial de Compras", "Error consiguiendo historial: " + JSON.stringify(e))
                    } finally {
                        this.loading = false;
                    }
                }
            })
        });
    }
    
    irProducto(x:any)
    {
        let navExtras: NavigationExtras = {
            state:{
                pr_id: x.pr_id,
                pr_nombre: x.pr_nombre,
                pr_tipo: x.pr_tipo,
                pr_marca: x.pr_marca,
                pr_precio: x.pr_precio,
                pr_imagen: x.pr_imagen,
            }
        }
        
        this.router.navigate(['/producto'], navExtras);
    }
    
}
