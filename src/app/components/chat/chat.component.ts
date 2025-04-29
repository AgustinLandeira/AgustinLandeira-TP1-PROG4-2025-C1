import { Component, inject, OnInit, signal } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { usuarioChat } from '../../interfaz/usuarioChat';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule,RouterLink,],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit,AfterViewChecked  {

  //mensajes : usuarioChat[] | undefined = []
  listaMensaje = signal<usuarioChat[] | undefined>([])
  usuarioActual : string | undefined | null = ""
  nuevoMensaje : string = ""

  //servicios
  dbChat = inject(ChatService)
  auth = inject(AuthService)
  
  
 async ngOnInit() {
    
  //recuperar los mensajes
  this.listaMensaje.set(await this.dbChat.traerMensaje())
  console.log(this.listaMensaje())
  this.usuarioActual = this.auth.nombreLogueado()?.usuario

  this.dbChat.canal.on("postgres_changes",{
      event: "*",
      schema: "public"
    },(payload)=>{// se ejecuta en cada cambio de la bd

      //console.log(payload)

      switch(payload.eventType){

        case "INSERT":

          //console.log("entramos al insert")
          const mensajeNuevo = payload.new as usuarioChat

          this.listaMensaje.update((mensajesAnteriores)=>{

            mensajesAnteriores?.push(mensajeNuevo)
            // console.log("lista vieja: ")
            // console.log(mensajesAnteriores)
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

  if(this.nuevoMensaje == "")return ;
  const nuevoMensaje: usuarioChat = {

    mensaje:this.nuevoMensaje,
    usuario: this.usuarioActual,
    fecha: new Date().toISOString()

  }

  this.dbChat.subirMensaje(nuevoMensaje)
  this.nuevoMensaje = ""

 }

 @ViewChild('ultimoMensaje') ultimoMensaje!: ElementRef;

  // Esto se llama automáticamente después de que se renderiza el DOM
  ngAfterViewChecked() {
    this.scrollAlFinal();
  }

  scrollAlFinal() {
    try {
      this.ultimoMensaje.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error("Error al hacer scroll:", err);
    }
  }


}
