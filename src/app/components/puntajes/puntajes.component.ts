import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsuarioAhorcado } from '../../class/ahorcadoUsuario';
import { UsuarioMayorMenor } from '../../class/mayorMenorUsuario';
import { UsuarioPreguntados } from '../../class/usuarioPreguntados';
import { UsuarioMusica } from '../../class/usuarioMusica';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-puntajes',
  imports: [RouterLink],
  templateUrl: './puntajes.component.html',
  styleUrl: './puntajes.component.css'
})
export class PuntajesComponent implements OnInit {

  auth = inject(AuthService)
  listaAhorcado = signal<UsuarioAhorcado[] | null>(null)
  listadoMayorMenor = signal<UsuarioMayorMenor[] | null>(null)
  listadoPreguntados = signal<UsuarioPreguntados[] | null>(null)
  listadoMusica = signal<UsuarioMusica[] | null>(null)

  ngOnInit(): void {
      
    this.traerListadoAhorcado()
    this.traerListadoMayorMenor()
    this.traerListadoPreguntados()
    this.traerListadoMusica()
    
  }

  async traerListadoAhorcado(){
    const {data,error} = await this.auth.suparbase.from("ahorcadoScore").select("*")
    .order("partida",{ascending:true})
    .order("letrasAcertadas",{ascending:false})
    .order("tiempoFinalizacion",{ascending:false})
    
  

    if(!error){
      this.listaAhorcado.set(data)
      
    }
  }

  async traerListadoMayorMenor(){
    const {data,error} = await this.auth.suparbase.from("mayor-menor_score").select("*")
    .order("partida",{ascending:true})
    .order("cartas_acertadas",{ascending:false})
    .order("tiempo_finalizacion",{ascending:false})
    
   
    if(!error){

      this.listadoMayorMenor.set(data)
      
    }
  }

  async traerListadoPreguntados(){
    const {data,error} = await this.auth.suparbase.from("preguntadosScore")
    .select("*")
    .order("partida",{ascending:true})
    .order("preguntasAcertadas",{ascending:false})
    .order("tiempoFinalizacion",{ascending:false})
    
    
    
    
    if(!error){

      this.listadoPreguntados.set(data)
      
    }
  }

  async traerListadoMusica(){
    const {data,error} = await this.auth.suparbase.from("musicaScore").select("*")
    .order("partida",{ascending:true})
    .order("cancionesAcertadas",{ascending:false})
    .order("tiempoFinalizacion",{ascending:false})
    
    if(!error){
      
      this.listadoMusica.set(data)
      
    }
  }

 
}
