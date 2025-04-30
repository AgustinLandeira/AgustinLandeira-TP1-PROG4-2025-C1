import { Component, inject } from '@angular/core';
import { DbService } from '../../services/db.service';
import { NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bienvenida',
  imports: [RouterLink],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {

  auth = inject(AuthService)

  //url
  urlAhorcado:string = "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//ahorcado2.jpg" ;
  urlPreguntados: string = "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//quiz-time.jpg";
  urlMayorMenor :string = "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//mayor-menor.png";
  urlMusica : string = "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//music.jpg";
  urlInfo : string = "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//info.png"
  urlEstadistica : string = "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//skills.png";

  constructor(){}

  cerrarSesion(){

    this.confirmarCierreDeSesion()
    
  }

  confirmarCierreDeSesion(){
  
      Swal.fire({
        title: "Cerrando sesion..",
        text: "¿Estas seguro que queres cerrar Sesion?",
        background:"#1c1c1c",
        color : "#ffffff",
        confirmButtonColor: 'orange',
        icon : "warning",
        iconColor: "orange",
        confirmButtonText: "cerrar sesion",
        denyButtonText: "Cancelar",
        denyButtonColor: "orange",
        showDenyButton: true

      }).then((resultado)=>{

        if(resultado.isConfirmed){

          Swal.fire({
            title: "Cierre de sesion exitoso",
            icon: "success",
            iconColor: "orange",
            background:"#1c1c1c",
            color : "#ffffff",
            text: "Si queres jugar a un juego,accede a tu cuenta!!!!!!.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: 'orange',
          }).then((resultado)=>{
            if(resultado.isConfirmed)this.auth.cerrarSesion()
          })
        }
      })
    }
}
