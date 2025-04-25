import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { PostgrestQueryBuilder } from '@supabase/postgrest-js';
import { usuarioChat } from '../../interfaz/usuarioChat';
import { RealtimeChannel } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  authChat = inject(AuthService)
  tablaChat : PostgrestQueryBuilder<any, any, "chat", unknown>
  canal : RealtimeChannel

  constructor() {
    this.tablaChat  = this.authChat.suparbase.from('chat')

    //creo un canal
    // el on le dice al canal que va a estar escichando un evento y devuelve el canal y el.susbcribe se suscribe a los cambios para que la app escuche
    this.canal = this.authChat.suparbase.channel("schema-db-changes");
    // canal.on("postgres_changes",{
    //   event: "*",
    //   schema: "public"
    // },(payload)=>{// se ejecuta en cada cambio de la bd
    //   console.log(payload)

    // })
    
  }


  async traerMensaje(){

    const {data,error} = await this.tablaChat.select('*').order('fecha',{ascending:true})

    console.log(data)
    if(error || !data)return ;

    
    return data as usuarioChat[]
    
  }

  async subirMensaje(mensaje:usuarioChat){

    const {data,error} = await this.tablaChat.insert([mensaje])
    console.log("ya agregue")
    console.log(data)
    console.log(error)
  }

}
