export class Compras {
    compra_id!: number;
    compra_pr_id!: number;
    compra_precio!: number;
    compra_fecha!: string; // se formatea luego con las funciones de sqlite
    compra_user_id!: number;
}
