import { inject, Injectable, Signal, signal } from '@angular/core';
import { AuthService } from '../../auth.service';
import {createClient, SupabaseClient} from '@supabase/supabase-js'
import {PostgrestQueryBuilder} from  '@supabase/postgrest-js'
import { UsuarioMayorMenor } from '../../../class/ahorcadoUsuario';
import { Usuario } from '../../../class/usuario';


@Injectable({
  providedIn: 'root'
})
export class MayorMenorScoreService {

  authUSer = inject(AuthService)
  tablaCartasScore : PostgrestQueryBuilder<any, any, "mayor-menor score", unknown>
  usuarioExistente ={  

    id: null
  }
  existe = signal<boolean | null>(null)
  constructor() {

    this.tablaCartasScore = this.authUSer.suparbase.from("mayor-menor score")

  }

  async subirNuevosDatos(usuarioMayorMenor:UsuarioMayorMenor){

    const { data, error } = await this.tablaCartasScore.select("*");

    console.log("Filas completas:", data);
    console.log("Cantidad de filas:", data?.length);
    
    if(data){
      for(let nombre of data){

          if(nombre.usuario == usuarioMayorMenor.usuario){
            
            this.existe.set(true)
            this.usuarioExistente.id = nombre.id
            console.log("actualizando...")
            const {data:dataUpdated,error:errorUpdate} = await this.tablaCartasScore.update(usuarioMayorMenor).eq("id",this.usuarioExistente.id)

            
            console.log(dataUpdated)
            console.log(errorUpdate)
            return;
          }
      }

      if(this.existe() != true){

        console.log("agregando...")
        const {data:dataInsert,error:erorInsert} = await this.tablaCartasScore.insert([usuarioMayorMenor])

        console.log(dataInsert)
        console.log(erorInsert)
      }
      
    }
  }
    
}
