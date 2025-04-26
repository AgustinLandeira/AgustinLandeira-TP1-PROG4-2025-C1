import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth.service';
import { PostgrestQueryBuilder } from '@supabase/postgrest-js';
import { UsuarioAhorcado } from '../../../class/ahorcadoUsuario';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoScoreService {

  auth = inject(AuthService)
  tablaAhorcadoScore : PostgrestQueryBuilder<any, any, "ahorcadoScore", unknown>
  constructor() {

    this.tablaAhorcadoScore = this.auth.suparbase.from("ahorcadoScore")
  }

  async verUsuarioExistente(usuarioAhorcado:UsuarioAhorcado):Promise<boolean>{

    const { data, error } = await this.tablaAhorcadoScore
    .select('usuario')
    .neq('usuario', '') //
    

    if(error)return false

    console.log(data)
    if(data){

      const resultado = data.filter(linea => linea.usuario == usuarioAhorcado.usuario)

      return resultado.length > 0
    }
    return false
  }

  async actualizarDAtos(usuarioAhorcado:UsuarioAhorcado){

    const {data,error} = await this.tablaAhorcadoScore.update(usuarioAhorcado).eq("usuario",usuarioAhorcado.usuario)

    console.log(data)
    console.log(error)

    if (!error) {
      // Volver a obtener los datos para asegurarse de que el cache esté actualizado
      const { data: nuevoData, error: nuevoError } = await this.tablaAhorcadoScore.select('*');
      if (!nuevoError) {
        console.log("Datos actualizados: ", nuevoData);
      }
    }
  }

  
}
