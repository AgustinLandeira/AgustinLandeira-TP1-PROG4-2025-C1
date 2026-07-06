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

  traerPaises() {
    return this.http
      .get<any>("https://countriesnow.space/api/v0.1/countries/flag/images")
      .pipe(
        map(response =>
          response.data.map((pais: any) => ({
            nombre: pais.name,
            imagen: pais.flag
          }))
        )
    );
  }
}
