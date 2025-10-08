import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  http = inject(HttpClient)
  lista: any[] = []
  constructor() { }

  traerPaises(){

    return this.http.get<any>("https://restcountries.com/v3.1/all?fields=name,flags,translations") // realizamos un metodo http(usamos el get) para extraer los datos y devuelve un observable
    .pipe(map(response =>{ // usamos el pipe para procesar los datos del observable
      //con el map recorremos cada personaje
      return response.map((personaje:{name:any;flags:any;}) =>({ //de cada personaje solamente extraemos su nombre y imagen

        nombre : personaje.name.common,//obtenemos el nombre del pais
        imagen : personaje.flags.png//personaje.image// obtenemos la imagen del pais

      }));

    }));
  }
}
