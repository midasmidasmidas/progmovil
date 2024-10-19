export class Usuarios {
    user_id!: number;
    user_tipo!: number; // 1 normal, 2 admin
    user_nombre!: string;
    user_correo!: string;
    user_pass!: string;
    user_foto: string = "";

    user_pregunta!: number; // integer, son preguntas pre-hechas asi que las saca del index una array
    user_respuesta!: string; // la respuesta es input del usuario
}
