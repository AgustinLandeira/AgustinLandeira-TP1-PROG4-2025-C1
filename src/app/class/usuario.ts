export class Usuario{

    "nombre":string;
    "apellido":string;
    "edad": number;
    "mail": string;
    

    constructor(nombre:string,apellido: string,edad:number,mail:string){

        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.mail = mail
    }
}