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
  tablaCartasScore : PostgrestQueryBuilder<any, any,'mayor-menor_score', unknown>
  existe: boolean = false
  constructor() {

    this.tablaCartasScore = this.authUSer.suparbase.from('mayor-menor_score')

  }

  async verificarUsuarioExistente(usuario:UsuarioMayorMenor){
    console.log("comienzo:")
    console.log(this.existe)
    const {data,error} = await this.tablaCartasScore.select('*')

    if(error){
      console.log("hay un error")
      return ;
    }
    console.log(data)
    if(data){
      
      for(let fila of data){

        if(fila.usuario == usuario.usuario){

          this.existe = true
          this.actualizarDatos(usuario,fila.id)
          
          break;
        }
      }
      if(this.existe != true){
        this.agregarDatos(usuario)
      }
      this.existe = false
    }
  }

  async actualizarDatos(usuario:UsuarioMayorMenor,id:number){

    const {data,error} = await this.tablaCartasScore.update(usuario).eq('id',id)

    if(error){

      console.log("hay un error al actualizar")
    }
    console.log(data)
  }

  agregarDatos(usuario:UsuarioMayorMenor){

    console.log("estaria agregando")
  }



}





// async subirNuevosDatos(usuarioMayorMenor:UsuarioMayorMenor){

  //   const { data, error } = await this.tablaCartasScore.select("*");

  //   console.log("Filas completas:", data);
  //   console.log("Cantidad de filas:", data?.length);

  //   if(data){
  //     for(let nombre of data){

  //         if(nombre.usuario == usuarioMayorMenor.usuario){

  //           this.existe.set(true)
  //           this.usuarioExistente.id = nombre.id
  //           console.log("actualizando...")
  //           const {data:dataUpdated,error:errorUpdate} = await this.tablaCartasScore.update(usuarioMayorMenor).eq("id",this.usuarioExistente.id)


  //           console.log(dataUpdated)
  //           console.log(errorUpdate)
  //           return;
  //         }
  //     }

  //     if(this.existe() != true){

  //       console.log("agregando...")
  //       const {data:dataInsert,error:erorInsert} = await this.tablaCartasScore.insert([usuarioMayorMenor])

  //       console.log(dataInsert)
  //       console.log(erorInsert)
  //     }

  //   }
  // }