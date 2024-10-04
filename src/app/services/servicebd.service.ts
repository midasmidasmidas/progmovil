import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Productos } from './productos';

@Injectable({
    providedIn: 'root'
})
export class ServicebdService {
    
    public database!: SQLiteObject;

    tablaProducto:string = "CREATE TABLE IF NOT EXISTS producto(pr_id INTEGER PRIMARY KEY autoincrement, pr_nombre VARCHAR(128) NOT NULL, pr_tipo VARCHAR(128) NOT NULL, pr_marca VARCHAR(128) NOT NULL, pr_precio INTEGER NOT NULL, pr_imagen TEXT NOT NULL);";

    registroProducto:string = "INSERT INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (1, 'super craneo', 'polera', 'metalicos', 100, 'http:super.png');";

    // var para guardar registros de un select
    listadoProductos = new BehaviorSubject([]);

    // variable para manipular el estado de la base de datos
    private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
    
    constructor(private sqlite:SQLite, private platform:Platform, private alertController:AlertController) {
        // comentado por ahora
        // this.crearBD();
    }

    // funciones para retornar observables
    fetchProductos(): Observable<Productos[]> {
        return this.listadoProductos.asObservable();
    };

    dbState() {
        return this.isDBReady.asObservable();
    }

    // codigo de alertas
    async presentAlert(titulo:string, msg:string, sub:string = "", boton:string = "OK") {
        const alert = await this.alertController.create({
            header: titulo,
            subHeader: sub,
            message: msg,
            buttons: [boton],
        });

        await alert.present();
    }
    
    // crear base de datos / nueva conexion
    crearBD() {
        // verificar plataforma
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: 'productos.db',
                location: 'default'
            }).then((db:SQLiteObject) => {
                // capturar y guardar la conexion con la base de datos
                this.database = db;
                // llamar a la funcion de creacion de tablas
                this.crearTablas();
                // modificar el observable del estatus de la base de datos
                this.isDBReady.next(true);
            }).catch(e => {
                this.presentAlert("Creacion BD", "Error creando la base de datos: " + JSON.stringify(e));
            })
        })
    }

    async crearTablas() {
        try {
            // ejecutar la sentencia de creacion de tablas en el orden especifico (primero las independientes, luego las dependientes)
            await this.database.executeSql(this.tablaProducto, []);

            // generamos los insert en caso de que existan
            await this.database.executeSql(this.registroProducto, []);
        } catch(e) {
            this.presentAlert("Creacion Tablas", "Error creando las tablas: " + JSON.stringify(e));
        }
    }
    
}
