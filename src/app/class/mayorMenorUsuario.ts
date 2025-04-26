import { Usuario } from "./usuario";

export class UsuarioMayorMenor {

    'usuario': string;
    tiempo_finalizacion: string;
    cartas_acertadas:number;
    cartas_erradas:number;
    partida:string;

    constructor(usuario:string,tiempo_finalizacion:string,cartas_acertadas: number,cartas_erradas:number,partida:string){

        this.usuario = usuario
        this.tiempo_finalizacion = tiempo_finalizacion
        this.cartas_acertadas = cartas_acertadas
        this.cartas_erradas = cartas_erradas
        this.partida = partida
    }

}