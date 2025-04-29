export class UsuarioAhorcado{

    usuario:string | null | undefined;
    tiempoFinalizacion:string;
    letrasAcertadas:number;
    letrasFalladas:number;
    letrasSeleccionadas:number;
    partida:string;

    constructor(usuario:string | undefined | null,tiempo:string,acertadas:number,erradas:number,totalLetras:number,resultado:string){
        this.usuario = usuario
        this.tiempoFinalizacion = tiempo
        this.letrasAcertadas = acertadas
        this.letrasFalladas = erradas
        this.letrasSeleccionadas = totalLetras
        this.partida = resultado
    }

}