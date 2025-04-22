import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth.service';
import {createClient, SupabaseClient} from '@supabase/supabase-js'
import {PostgrestQueryBuilder} from  '@supabase/postgrest-js'
import { UsuarioMayorMenor } from '../../../class/ahorcadoUsuario';


@Injectable({
  providedIn: 'root'
})
export class MayorMenorScoreService {

  authUSer = inject(AuthService)
  tablaCartasScore : PostgrestQueryBuilder<any, any, "mayor-menor score", unknown>

  constructor() {

    this.tablaCartasScore = this.authUSer.suparbase.from("mayor-menor score")

  }

  async guardarDatosUsuario(usuarioAhorcado:UsuarioMayorMenor){

    const {data,error} = await this.tablaCartasScore.insert([usuarioAhorcado])

    console.log(data)
    console.log(error)
  }
}
