import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  httpClient = inject(HttpClient)
  nombre : string = ""
  resultado = signal<any | null>(null) ;// El valor de la signal se setea con el método .set(valor).
  constructor() {  }
  
  traer(){
    //devuelve la peticion en si como observable
    //se ejecuta solamente cuando nos suscribamos y ahi nos da la respuesta
    const promesa : Observable<any> = this.httpClient.get("https://api.github.com/users/AgustinLandeira")

    //con esto obtenemos la respuesta ya que nos suscribimos
    //cuando termine mande a esta funcion como param la respuesta(definimos la accion al recibir respuesta)
    const suscripcion = promesa.subscribe((respuesta:any)=>{

      this.resultado.set(respuesta)
      console.log(this.resultado)
      suscripcion.unsubscribe()

    })

  }

}

