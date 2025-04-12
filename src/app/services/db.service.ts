import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js'
import {PostgrestQueryBuilder} from  '@supabase/postgrest-js'
import { Usuario } from '../class/usuario';
@Injectable({
  providedIn: 'root'
})
export class DbService {

  suparbase : SupabaseClient<any, "public", any>
  tablaUsuarios : PostgrestQueryBuilder<any, any, "tp1", unknown>
  constructor() {

    //nos conectamos a supabase poniendo la url de la bd y key api
    this.suparbase = createClient("https://jbbrrijnxnpxpiozmzby.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiYnJyaWpueG5weHBpb3ptemJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MTQxODEsImV4cCI6MjA1OTk5MDE4MX0.OJxmCEfyzzIbUqXuJX6cnNgifETDAZYWAjR054TyfG0"
    )

    console.log(this.suparbase)

    this.tablaUsuarios = this.suparbase.from("tp1");
  }

  async agregarUsuario(usuario: Usuario){

    const {data,error} = await this.tablaUsuarios.insert([usuario])
    console.log(error)
    console.log(data)


  }
}
