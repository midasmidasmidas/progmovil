import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Productos } from './productos';
import { AlertController, Platform } from '@ionic/angular';
import { Compras } from './compras';

@Injectable({
    providedIn: 'root'
})
export class ServicebdService {
    
    public database!: SQLiteObject;
    
    tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto(pr_id INTEGER PRIMARY KEY autoincrement, pr_nombre VARCHAR(128) NOT NULL, pr_tipo VARCHAR(128) NOT NULL, pr_marca VARCHAR(128) NOT NULL, pr_precio INTEGER NOT NULL, pr_imagen TEXT NOT NULL);";
    registroProducto: string = "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (1, 'craneo', 'polera', 'metallica', 3000, 'assets/img/productos/placeholder1.webp')";
    listadoProductos = new BehaviorSubject([]);
    
    tablaCompra: string = "CREATE TABLE IF NOT EXISTS compra(compra_id INTEGER PRIMARY KEY autoincrement, compra_pr_id INTEGER NOT NULL, compra_precio INTEGER NOT NULL, compra_fecha TEXT NOT NULL, compra_user_id INTEGER NOT NULL);";
    registroCompra: string = "INSERT OR IGNORE INTO compra(compra_id, compra_pr_id, compra_precio, compra_precio, compra_fecha, compra_user_id) VALUES (1, 3, 'st anger', 5000, '2024-10-15 19:39', 9);";
    listadoCompras = new BehaviorSubject([]);
    
    private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
    
    constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
        this.crearBD();
    }
    
    dbState(){
        return this.isDBReady.asObservable();
    }
    
    async presentAlert(titulo:string, msj:string) {
        const alert = await this.alertController.create({
            header: titulo,
            message: msj,
            buttons: ['OK'],
        });
        
        await alert.present();
    }
    
    crearBD() {
        // verificar la plataforma
        this.platform.ready().then(()=>{
            // procedemos a crear la Base de Datos
            this.sqlite.create({
                name: 'productos.db',
                location:'default'
            }).then((db: SQLiteObject)=>{
                // capturar y guardar la conexión a la Base de Datos
                this.database = db;
                // llamar a la función de creación de tablas
                this.crearTablas();
                this.consultarProductos();
                // modificar el observable del status de la base de datos
                this.isDBReady.next(true);
            }).catch(e=>{
                this.presentAlert("Creación de BD", "Error creando la BD: " + JSON.stringify(e));
            })
        })
    }
    
    async crearTablas(){
        try {
            //mandar a ejecutar las tablas en el orden especifico
            await this.database.executeSql(this.tablaProducto,[]);
            await this.database.executeSql(this.tablaCompra,[]);
            
            //generamos los insert en caso que existan
            await this.database.executeSql(this.registroProducto,[]);
            await this.database.executeSql(this.registroCompra,[]);
            
        } catch(e) {
            this.presentAlert("Creación de Tabla", "Error creando las Tablas: " + JSON.stringify(e));
        }
    }
    
    // funciones de retorno de observables
    fetchProductos(): Observable<Productos[]>{
        return this.listadoProductos.asObservable();
    }
    
    fetchCompras(): Observable<Compras[]>{
        return this.listadoCompras.asObservable();
    }
    
    consultarProductos(){
        return this.database.executeSql('SELECT * FROM producto',[]).then(res=>{
            // variable para almacenar el resultado de la consulta
            let items: Productos[] = [];
            // verificar si tenemos registros en la consulta
            if(res.rows.length > 0){
                //recorro el resultado
                for(var i = 0; i < res.rows.length; i++){
                    // agregar el registro a mi variable
                    items.push({
                        pr_id: res.rows.item(i).pr_id,
                        pr_nombre: res.rows.item(i).pr_nombre,
                        pr_tipo: res.rows.item(i).pr_tipo,
                        pr_marca: res.rows.item(i).pr_marca,
                        pr_precio: res.rows.item(i).pr_precio,
                        pr_imagen: res.rows.item(i).pr_imagen,
                    })
                }
            }
            this.listadoProductos.next(items as any);
        })
    }
    
    async consultarProductoPorId(id: string): Promise<Productos | null> {
        try {
            const res = await this.database.executeSql('SELECT * FROM producto WHERE pr_id = ?', [id]);
            if (res.rows.length > 0) {
                const item = res.rows.item(0);
                return {
                    pr_id: item.pr_id,
                    pr_nombre: item.pr_nombre,
                    pr_tipo: item.pr_tipo,
                    pr_marca: item.pr_marca,
                    pr_precio: item.pr_precio,
                    pr_imagen: item.pr_imagen,
                } as Productos;
            } else {
                return null;
            }
        } catch (e) {
            this.presentAlert("Consultando Producto", "Error consultando producto: " + JSON.stringify(e));
            return null;
        }
    }
    
    consultarCompras(){
        return this.database.executeSql('SELECT * FROM compra',[]).then(res=>{
            let items: Compras[] = [];
            if(res.rows.length > 0){
                for(var i = 0; i < res.rows.length; i++){
                    items.push({
                        compra_id: res.rows.item(i).compra_id,
                        compra_pr_id: res.rows.item(i).compra_pr_id,
                        compra_user_id: res.rows.item(i).compra_user_id,
                        compra_fecha: res.rows.item(i).compra_fecha,
                        compra_precio: res.rows.item(i).compra_precio,
                    })
                }
            }
            this.listadoProductos.next(items as any);
        })
    }
    
    
    modificarProducto(id:string, nombre:string, tipo: string, marca:string, precio:number, imagen:string) {
        return this.database.executeSql('UPDATE producto SET pr_nombre = ?, pr_tipo = ?, pr_marca = ?, pr_precio = ?, pr_imagen = ? WHERE pr_id = ?',[nombre, tipo, marca, precio, imagen, id]).then(res=>{
            this.presentAlert("Modificar", "Producto Modificado");
            this.consultarProductos();
        }).catch(e=>{
            this.presentAlert("Modificar", "Error: " + JSON.stringify(e));
        })
        
    }
    
    modificarCompra(c_id:string, p_id:string, precio:number, fecha:string, u_id:number) {
        return this.database.executeSql('UPDATE compra SET compra_pr_id = ?, compra_precio = ?, compra_fecha = ?, compra_user_id = ? WHERE pr_id = ?',[p_id, precio, fecha, u_id, c_id]).then(res=>{
            this.presentAlert("Modificar", "Compra Modificada");
            this.consultarProductos();
        }).catch(e=>{
            this.presentAlert("Modificar", "Error: " + JSON.stringify(e));
        })
        
    }
    
    eliminarProducto(id:string){
        return this.database.executeSql('DELETE FROM producto WHERE pr_id = ?',[id]).then(res=>{
            this.presentAlert("Eliminar", "Producto Eliminado");
            this.consultarProductos();
        }).catch(e=>{
            this.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
        })
        
    }
    
    eliminarCompra(id:string){
        return this.database.executeSql('DELETE FROM compra WHERE compra_id = ?',[id]).then(res=>{
            this.presentAlert("Eliminar", "Compra Eliminada");
            this.consultarProductos();
        }).catch(e=>{
            this.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
        })
        
    }
    
    insertarProducto(nombre:string, tipo: string, marca:string, precio:number, imagen:string){
        return this.database.executeSql('INSERT INTO producto(pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (?,?,?,?,?)',[nombre, tipo, marca, precio, imagen]).then(res=>{
            this.presentAlert("Insertar", "Producto Guardado");
            this.consultarProductos();
        }).catch(e=>{
            this.presentAlert("Insertar", "Error: " + JSON.stringify(e));
        })
    }
    
    insertarCompra(p_id:string, precio:number, fecha:string, u_id:number){
        return this.database.executeSql('INSERT INTO producto(compra_pr_id, compra_precio, compra_fecha, compra_user_id) VALUES (?,?,?,?)',[p_id, precio, fecha, u_id]).then(res=>{
            this.presentAlert("Insertar", "Compra Guardada");
            this.consultarProductos();
        }).catch(e=>{
            this.presentAlert("Insertar", "Error: " + JSON.stringify(e));
        })
    }
    
    formatearFechaActual():string {
        const fechaActual = new Date();
        
        const dia = String(fechaActual.getDate()).padStart(2, '0');
        const meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const mes = meses[fechaActual.getMonth()];
        const anho = fechaActual.getFullYear();
        
        const hora = String(fechaActual.getHours()).padStart(2, '0');
        const minuto = String(fechaActual.getMinutes()).padStart(2, '0');
        
        return `${dia}/${mes}/${anho} ${hora}:${minuto} UTC`;
    }
}
