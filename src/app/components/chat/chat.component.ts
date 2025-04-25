import { Component, inject, OnInit, signal } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { usuarioChat } from '../../interfaz/usuarioChat';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  //mensajes : usuarioChat[] | undefined = []
  listaMensaje = signal<usuarioChat[] | undefined>([])
  usuarioActual : string = ""
  nuevoMensaje : string = ""

  //servicios
  dbChat = inject(ChatService)
  auth = inject(AuthService)
  
 async ngOnInit() {
    
  //recuperar los mensajes
  this.listaMensaje.set(await this.dbChat.traerMensaje())
  console.log(this.listaMensaje())
  this.usuarioActual = this.auth.nombreLogueado()

  this.dbChat.canal.on("postgres_changes",{
      event: "*",
      schema: "public"
    },(payload)=>{// se ejecuta en cada cambio de la bd

      console.log(payload)

      switch(payload.eventType){

        case "INSERT":

          console.log("entramos al insert")
          const mensajeNuevo = payload.new as usuarioChat

          this.listaMensaje.update((mensajesAnteriores)=>{

            mensajesAnteriores?.push(mensajeNuevo)
            console.log("lista vieja: ")
            console.log(mensajesAnteriores)
            if(mensajesAnteriores)return [...mensajesAnteriores]
            return undefined
            
          })
          break;
        case "UPDATE":
          break;
      }
    })
    this.dbChat.canal.subscribe()
 }

 enviar(){

  const nuevoMensaje: usuarioChat = {

    mensaje:this.nuevoMensaje,
    usuario: this.usuarioActual,
    fecha: new Date().toISOString()

  }

  this.dbChat.subirMensaje(nuevoMensaje)
  this.nuevoMensaje = ""

 }
}
