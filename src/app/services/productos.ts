export class Productos {
    pr_id!: number; // auto incrementable en la base de datos
    pr_nombre!: string;
    pr_tipo!: string;
    pr_marca!: string;
    pr_precio!: number;
    pr_imagen!: string; // url de la imagen. puede ser url local o imagen hosteada en otro lugar
}
