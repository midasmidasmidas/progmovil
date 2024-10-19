import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Productos } from './productos';
import { AlertController, Platform } from '@ionic/angular';
import { Compras } from './compras';
import { Usuarios } from './usuarios';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ServicebdService {
    
    public database!: SQLiteObject;
    
    tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto(pr_id INTEGER PRIMARY KEY autoincrement, pr_nombre TEXT NOT NULL, pr_tipo TEXT NOT NULL, pr_marca TEXT NOT NULL, pr_precio INTEGER NOT NULL, pr_imagen TEXT NOT NULL);";
    registroProducto: string[] = [
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (1, 'Kill Em All', 'Poleron', 'Metallica', 18000, 'assets/img/productos/1.webp')",
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (2, 'Craneo Flameante', 'Polera', 'Metallica', 14000, 'assets/img/productos/2.webp')",
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (3, 'Logo Blanco', 'Polera', 'Metallica', 12000, 'assets/img/productos/3.webp')",
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (4, 'Master Of Puppets', 'Polera', 'Metallica', 14000, 'assets/img/productos/4.webp')",
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (5, '72 Seasons', 'Polera', 'Metallica', 13000, 'assets/img/productos/5.webp')",
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (6, 'KIll Em All', 'Polera', 'Metallica', 14000, 'assets/img/productos/6.webp')",
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (7, 'Logo M72', 'Polera', 'Metallica', 12000, 'assets/img/productos/7.webp')",
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (8, 'Ride The Lightning', 'Poleron', 'Metallica', 18000, 'assets/img/productos/8.webp')",
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (9, 'Through The Never', 'Poleron', 'Metallica', 17000, 'assets/img/productos/9.webp')",
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (10, 'Anivesario 30', 'Polera', 'Metallica', 14000, 'assets/img/productos/10.webp')",
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (11, 'Craneo Mecanico', 'Polera', 'Metallica x Fortnite', 16000, 'assets/img/productos/11.webp')",
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (12, 'Call Of Ktulu', 'Polera', 'Metallica', 13000, 'assets/img/productos/12.webp')",
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (13, 'St. Anger', 'Polera', 'Metallica', 13000, 'assets/img/productos/13.webp')",
        "INSERT or IGNORE INTO producto(pr_id, pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (14, 'Death Magnetic', 'Polera', 'Metallica', 13000, 'assets/img/productos/14.webp')",
    ]
    listadoProductos = new BehaviorSubject([]);
    
    tablaCompra: string = "CREATE TABLE IF NOT EXISTS compra(compra_id INTEGER PRIMARY KEY autoincrement, compra_pr_id INTEGER NOT NULL, compra_precio INTEGER NOT NULL, compra_fecha TEXT NOT NULL, compra_user_id INTEGER NOT NULL);";
    registroCompra: string = "INSERT OR IGNORE INTO compra(compra_id, compra_pr_id, compra_precio, compra_precio, compra_fecha, compra_user_id) VALUES (1, 3, 'st anger', 5000, '2024-10-15 19:39', 9);";
    listadoComprasPorUsuario = new BehaviorSubject([]); // no es necesario mostrar TODAS las compras, asi que solo se guardan las del usuario
    
    tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(user_id INTEGER PRIMARY KEY autoincrement, user_tipo INTEGER NOT NULL, user_nombre TEXT NOT NULL, user_correo TEXT NOT NULL UNIQUE, user_pass TEXT NOT NULL, user_foto TEXT);";
    registroUsuario: string[] = [
        "INSERT or IGNORE INTO usuario(user_id, user_tipo, user_nombre, user_correo, user_pass, user_foto) VALUES (1, 1, 'james', 'user@usuario.com', 'UserPass1!', 'https://darak0z.github.io/img/smirnov/smirnov_thumbsUp.png');",
        "INSERT or IGNORE INTO usuario(user_id, user_tipo, user_nombre, user_correo, user_pass) VALUES (2, 2, 'admin', 'admin@usuario.com', 'AdminPass1!');",
    ]
    listadoUsuarioActual = new BehaviorSubject<Usuarios>({ user_id: 0, user_tipo: 1, user_nombre: "", user_correo: "", user_pass: "", user_foto: ""}); // solo se guarda el actual. no se necesita guardar TODOS los usuarios.
    
    user_logged:boolean = false;
    user_id:number = 0;
    
    private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
    
    constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController, private nativeStorage:NativeStorage, private router:Router) {
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
                name: 'fashion.db',
                location:'default'
            }).then(async (db: SQLiteObject)=>{
                // capturar y guardar la conexión a la Base de Datos
                this.database = db;
                // llamar a la función de creación de tablas
                await this.crearTablas();
                this.consultarProductos();
                // login al iniciar la app
                this.checkLogin();
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
            await this.database.executeSql(this.tablaUsuario,[]);
            
            //generamos los insert en caso que existan
            for(const sentencia of this.registroProducto) {
                await this.database.executeSql(sentencia, []);
            }

            await this.database.executeSql(this.registroCompra,[]);
            await this.database.executeSql(this.registroUsuario[0],[]);
            await this.database.executeSql(this.registroUsuario[1],[]);
            
        } catch(e) {
            this.presentAlert("Creación de Tabla", "Error creando las Tablas: " + JSON.stringify(e));
        }
    }
    
    // funciones de retorno de observables
    fetchProductos(): Observable<Productos[]>{
        return this.listadoProductos.asObservable();
    }
    
    fetchComprasPorUsuario(): Observable<Compras[]>{
        return this.listadoComprasPorUsuario.asObservable();
    }
    
    fetchUsuarioActual(): Observable<Usuarios>{
        return this.listadoUsuarioActual.asObservable();
    }
    
    async checkLogin() {
        try {
            const isLogged = await this.nativeStorage.getItem("user_logged");
            if(isLogged) {
                const user_id = await this.nativeStorage.getItem("user_id") || 0;
                const user = await this.consultarUsuarioPorId(user_id.toString());
                if(user && user_id > 0) {
                    await this.usuarioLogin(user.user_correo, user.user_pass, user.user_nombre);
                }
            }
        } catch(e) {
            this.presentAlert("Iniciar Sesion", "Error iniciando sesion: " + JSON.stringify(e));
        }
    }
    
    async cerrarSesion() {
        this.user_logged = false;
        this.user_id = 0;
        await this.nativeStorage.setItem("user_logged", false);
        await this.nativeStorage.setItem("user_id", 0);
        
        this.listadoUsuarioActual.next({ user_id: 0, user_tipo: 1, user_nombre: "", user_correo: "", user_pass: "", user_foto: "" });

        this.router.navigate(['/home']);
    }
    
    consultarProductos(){
        return this.database.executeSql('SELECT * FROM producto',[]).then(res=>{
            let items: Productos[] = [];
            if(res.rows.length > 0){
                for(var i = 0; i < res.rows.length; i++){
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
    
    async consultarComprasPorUsuario(u_id:number){
        const res = await this.database.executeSql('SELECT * FROM compra WHERE compra_user_id = ?', [u_id]);
        let items: Compras[] = [];
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
                items.push({
                    compra_id: res.rows.item(i).compra_id,
                    compra_pr_id: res.rows.item(i).compra_pr_id,
                    compra_user_id: res.rows.item(i).compra_user_id,
                    compra_fecha: res.rows.item(i).compra_fecha,
                    compra_precio: res.rows.item(i).compra_precio,
                });
            }
        }
        this.listadoComprasPorUsuario.next(items as any);
        return items;
    }
    
    async usuarioLogin(correo:string, pass:string, nombre:string): Promise<Usuarios | null> {
        try {
            const res = await this.database.executeSql('SELECT * FROM usuario WHERE user_correo = ? AND user_pass = ? AND user_nombre = ?', [correo.toLowerCase(), pass, nombre]);
            if(res.rows.length > 0) {
                const item = res.rows.item(0);
                const usuario = {
                    user_id: item.user_id,
                    user_tipo: item.user_tipo,
                    user_nombre: item.user_nombre,
                    user_correo: item.user_correo,
                    user_pass: item.user_pass,
                    user_foto: item.user_foto,
                } as Usuarios;
                
                this.user_logged = true;
                this.user_id = usuario.user_id;
                await this.nativeStorage.setItem("user_logged", true);
                await this.nativeStorage.setItem("user_id", usuario.user_id);
                
                this.listadoUsuarioActual.next(usuario);

                return usuario;
            } else {
                return null;
            }
        } catch (e) {
            this.presentAlert("Iniciando Sesion", "Error iniciando sesion: " + JSON.stringify(e));
            return null;
        }
    }
    
    async consultarUsuarioPorId(id: string): Promise<Usuarios | null> {
        try {
            const res = await this.database.executeSql('SELECT * FROM usuario WHERE user_id = ?', [id]);
            if (res.rows.length > 0) {
                const item = res.rows.item(0);
                return {
                    user_id: item.user_id,
                    user_tipo: item.user_tipo,
                    user_nombre: item.user_nombre,
                    user_correo: item.user_correo,
                    user_pass: item.user_pass,
                    user_foto: item.user_foto,
                } as Usuarios;
            } else {
                return null;
            }
        } catch (e) {
            // this.presentAlert("Consultando Usuario", "Error consultando usuario: " + JSON.stringify(e));
            return null;
        }
    }

    async consultarFotoPorId(id: string): Promise<string | null> {
        try {
            const res = await this.database.executeSql('SELECT user_foto FROM usuario WHERE user_id = ?', [id]);
            if (res.rows.length > 0) {
                const item = res.rows.item(0);
                return item.user_foto;
            } else {
                return null;
            }
        } catch (e) {
            // this.presentAlert("Consultando Usuario", "Error consultando usuario: " + JSON.stringify(e));
            return null;
        }
    }

    async consultarCorreoRegistrado(correo: string): Promise<boolean> {
        const res = await this.database.executeSql('SELECT * FROM usuario WHERE user_correo = ?', [correo]);
        return res.rows.length > 0;
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
        }).catch(e=>{
            this.presentAlert("Modificar", "Error: " + JSON.stringify(e));
        })
    }
    
    usuarioEditar(nombre:string, correo:string, pass:string, foto:string, u_id:number) {
        return this.database.executeSql('UPDATE usuario SET user_nombre = ?, user_correo = ?, user_pass = ?, user_foto = ? WHERE user_id = ?',[nombre, correo, pass, foto, u_id]).then(res=>{
            this.presentAlert("Perfil", "Perfil Editado");
        }).catch(e=>{
            this.presentAlert("Perfil", "Error: " + JSON.stringify(e));
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
        }).catch(e=>{
            this.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
        })
    }

    async eliminarUsuario(id:string){
        try {
            const res = await this.database.executeSql('DELETE FROM usuario WHERE user_id = ?', [id]);
            this.presentAlert("Éxito", "Cuenta Eliminada");
        } catch (e) {
            this.presentAlert("Error", "Error al eliminar cuenta: " + JSON.stringify(e));
        }
    }
    
    insertarProducto(nombre:string, tipo: string, marca:string, precio:number, imagen:string){
        return this.database.executeSql('INSERT INTO producto(pr_nombre, pr_tipo, pr_marca, pr_precio, pr_imagen) VALUES (?,?,?,?,?)',[nombre, tipo, marca, precio, imagen]).then(res=>{
            this.presentAlert("Insertar", "Producto Guardado");
            this.consultarProductos();
        }).catch(e=>{
            this.presentAlert("Insertar", "Error: " + JSON.stringify(e));
        })
    }
    
    insertarCompra(p_id:number, precio:number, fecha:string, u_id:number){
        return this.database.executeSql('INSERT INTO compra(compra_pr_id, compra_precio, compra_fecha, compra_user_id) VALUES (?,?,?,?)',[p_id, precio, fecha, u_id]).then(res=>{
            // this.presentAlert("Insertar", "Compra Guardada");
        }).catch(e=>{
            this.presentAlert("Insertar", "Error: " + JSON.stringify(e));
        })
    }
    
    usuarioRegistrar(nombre:string, correo:string, pass:string) {
        return this.database.executeSql('INSERT INTO usuario(user_tipo, user_nombre, user_correo, user_pass) VALUES (?,?,?,?)',[1, nombre, correo.toLowerCase(), pass]).then(res=>{
            this.presentAlert("Registrar", "Cuenta creada con éxito");
            this.usuarioLogin(correo, pass, nombre);
        }).catch(e=>{
            this.presentAlert("Registrar", "Error: " + JSON.stringify(e));
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
