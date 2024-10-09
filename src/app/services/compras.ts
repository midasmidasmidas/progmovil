export class Compras {
    compra_id!: number;
    compra_productoID!: number;
    compra_productoNombre!: string;
    compra_precio!: number;
    compra_fecha!: string; // se formatea luego con las funciones de sqlite
    compra_userID!: number; // FOREIGN KEY
    // compra_completada!: boolean;
    // nada mas por ahora?
}
