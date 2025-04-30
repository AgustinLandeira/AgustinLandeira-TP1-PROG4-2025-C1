export class UsuarioMusica{

    usuario:string | null | undefined;
    mail:string | null | undefined;
    tiempoFinalizacion:string;
    cancionesAcertadas:number;
    cancionesErradas:number;
    partida:string;

    constructor(usuario:string | undefined | null,mail:string | null | undefined,tiempo:string,acertadas:number,erradas:number,resultado:string){
        this.usuario = usuario
        this.mail = mail
        this.tiempoFinalizacion = tiempo
        this.cancionesAcertadas = acertadas
        this.cancionesErradas = erradas
        this.partida = resultado
    }
}