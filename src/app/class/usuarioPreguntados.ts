export class UsuarioPreguntados{

    usuario: string | null | undefined;
    mail: string | null | undefined;
    tiempoFinalizacion: string;
    preguntasAcertadas:number;
    preguntasErradas:number;
    partida:string;

    constructor(usuario:string | null | undefined,mail:string | null | undefined,tiempoFinalizacion:string,preguntasAcertadas: number,preguntasErradas:number,partida:string){

        this.usuario = usuario
        this.mail = mail
        this.tiempoFinalizacion = tiempoFinalizacion
        this.preguntasAcertadas = preguntasAcertadas
        this.preguntasErradas = preguntasErradas
        this.partida = partida
    }
}