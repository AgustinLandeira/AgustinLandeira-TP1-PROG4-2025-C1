import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  httpClient = inject(HttpClient)
  nombre : string = ""
  resultado ?: any 
  constructor() {

    // //devuelve la peticion en si como observable
    // //se ejecuta solamente cuando nos suscribamos y ahi nos da la respuesta
    // const promesa : Observable<any> = this.httpClient.get("https://api.github.com/users/AgustinLandeira")

    // //con esto obtenemos la respuesta ya que nos suscribimos
    // //cuando termine mande a esta funcion como param la respuesta(definimos la accion al recibir respuesta)
    // const suscripcion = promesa.subscribe((respuesta:any)=>{

    //   this.resultado = respuesta
    //   //console.log(this.resultado)
    //   suscripcion.unsubscribe()

    // })
  }
  
  traer(){
    //devuelve la peticion en si como observable
    //se ejecuta solamente cuando nos suscribamos y ahi nos da la respuesta
    const promesa : Observable<any> = this.httpClient.get("https://api.github.com/users/AgustinLandeira")

    //con esto obtenemos la respuesta ya que nos suscribimos
    //cuando termine mande a esta funcion como param la respuesta(definimos la accion al recibir respuesta)
    const suscripcion = promesa.subscribe((respuesta:any)=>{

      this.resultado = respuesta
      console.log(this.resultado)
      suscripcion.unsubscribe()

    })

  }

}

/*

 traerPorNombre(nombre: string) {
    // Crear petición
    const peticion: Observable<any> = this.httpClient.get<any>("https://pokeapi.co/api/v2/pokemon/" + nombre)

    // Suscribirse y definir acción al recibir respuesta
    const suscripcion: Subscription = peticion.subscribe((respuesta) => {
      this.pokemonActual = respuesta; 

      // Cerrar la suscripción
      suscripcion.unsubscribe();
    });

*/
