import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js'
import {PostgrestQueryBuilder} from  '@supabase/postgrest-js'
import { Usuario } from '../class/usuario';
@Injectable({
  providedIn: 'root'
})
export class DbService {

  suparbase : SupabaseClient<any, "public", any>
  tablaUsuarios : PostgrestQueryBuilder<any, any, "usuarios", unknown>
  usuarioActual = {
    nombre: ""
  }
  
  constructor() {

    //nos conectamos a supabase poniendo la url de la bd y key api
    this.suparbase = createClient("https://sibndstdwpyfrhowrqui.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpYm5kc3Rkd3B5ZnJob3dycXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4OTY2NDMsImV4cCI6MjA2MDQ3MjY0M30.znnkchrr9NrYdXncKtJN_nBSWV_yUMiIUtQWhdB1LEQ")


    console.log(this.suparbase)

    this.tablaUsuarios = this.suparbase.from("usuarios");
    console.log(this.tablaUsuarios)
  }

  async agregarUsuario(usuario: Usuario){

    const {data,error} = await this.tablaUsuarios.insert([usuario])
    console.log(error)
    console.log(data)

  }


}
