export class UsuarioAhorcado{

    usuario:string | null | undefined;
    mail:string | null | undefined;
    tiempoFinalizacion:string;
    letrasAcertadas:number;
    letrasFalladas:number;
    letrasSeleccionadas:number;
    partida:string;

    constructor(usuario:string | undefined | null,mail:string | null | undefined,tiempo:string,acertadas:number,erradas:number,totalLetras:number,resultado:string){
        this.usuario = usuario
        this.mail = mail
        this.tiempoFinalizacion = tiempo
        this.letrasAcertadas = acertadas
        this.letrasFalladas = erradas
        this.letrasSeleccionadas = totalLetras
        this.partida = resultado
    }

}