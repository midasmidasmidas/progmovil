export class Usuarios {
    user_id!: number;
    user_tipo!: number; // 1 normal, 2 admin
    user_nombre!: string;
    user_correo!: string;
    user_pass!: string;
    user_foto: string = "";
}
