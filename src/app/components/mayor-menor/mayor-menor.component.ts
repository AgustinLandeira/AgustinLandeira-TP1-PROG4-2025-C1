import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { imagen } from '../../interfaz/imagen';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UsuarioMayorMenor } from '../../class/mayorMenorUsuario';
import { AuthService } from '../../services/auth.service';
import { AhorcadoComponent } from '../ahorcado/ahorcado.component';

@Component({
  selector: 'app-mayor-menor',
  imports: [RouterLink,CommonModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit,OnDestroy {

  //usuarioahorcado
  usuario ?: UsuarioMayorMenor
  existe: boolean | null = null

  //servicos
  user = inject(AuthService)

  //variables para el tiempo
  tiempoFinal :string = ""
  temporizador!: Subscription
  contador = 60
  tiempoRestante = signal<number>(this.contador)
  vueltas = 0

  //datos de la partida
  aciertos : number = 0
  errados: number = 0
  partidaGanada = false
  partidaPerdida = false

  //listas
  urls:string[] = [
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/cartas/uno-espada.jpg",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/cartas/2-espada.jpg",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/cartas/3-espada.jpg",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/cartas/cuatro-espada.jpg",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/cartas/5-espada.jpg",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/cartas/6-espada.jpg",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/cartas/7-espada.jpg",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/cartas/8-espada.jpg",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/cartas/9-espada.png",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/cartas/10-espada.jpg",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/cartas/11-espada.jpg",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/cartas/12-espada.jpg"

  ]
  listaCartas : imagen[] = []

  //imagenes
  cartaActual?: imagen
  siguienteCarta?:imagen

  ngOnInit(): void {
      
    this.listaCartas = this.agregarCartas(this.urls)
    this.cartaActual = this.elegirPrimeraCarta(this.listaCartas)
   
    this.siguienteCarta = this.elegirSiguienteCarta(this.listaCartas,this.cartaActual)
    this.iniciarTemporizador()
  }

  iniciarTemporizador(){

    let contador = interval(1000)
    
    this.temporizador = contador.subscribe(()=>{

      this.contador -= 1
      this.tiempoRestante.set(this.contador)
      console.log(this.contador)
      if(this.tiempoRestante() <= 0){
       

        this.partidaPerdida = true
        this.terminarTemporizador()
        this.guardarDatos()
        
      }
    })
  }

  terminarTemporizador(){

    this.temporizador.unsubscribe()
    this.guardarTiempo()
    
  }

  guardarTiempo(){
    
    const tiempoMs = this.tiempoRestante() * 1000; //lo convertimos a milisegundos pq los date usa milisegundos
    const fecha = new Date(tiempoMs);// nos devuelve un objeto de tipo Date ej:(00:00:00)
    //toISOSstring nos devuele un formato de tipo string: 1970-01-01T00:00:45.000Z
    //substruing nos trae los caracteres desde la psocion 14 a 18
    this.tiempoFinal = fecha.toISOString().substring(14, 19); // "mm:ss"
    
  }

  agregarCartas(listaUrl:string[]):imagen[]{

    let lista: imagen[]= []
    let contador = 1
    for(let url of listaUrl){

      lista.push({valor:contador,imagen:url})
      contador += 1
    }

    return lista
  }

  elegirPrimeraCarta(listaCartas:imagen[]){

    const cartaAleatoria = listaCartas[Math.floor(Math.random() * listaCartas.length)]
    return cartaAleatoria
  }

  elegirSiguienteCarta(listaCartas:imagen[],cartaActual:imagen){

    
    listaCartas = listaCartas.filter(imagen => imagen.valor != cartaActual.valor)
    
    const proximaCarta = listaCartas[Math.floor(Math.random() * listaCartas.length)]
    
    

    return proximaCarta
  }
  cambiarCartaActual(){
      this.cartaActual = this.siguienteCarta
  }

  verificar(opcion:string){

    if(this.cartaActual && this.siguienteCarta){

      if(opcion == "mayor"){

        if(this.cartaActual?.valor < this.siguienteCarta?.valor){
  
          this.aciertos += 1
        }else{
          this.errados += 1
        }
  
      }else if(opcion == "menor" ){
  
        if(this.cartaActual?.valor > this.siguienteCarta?.valor){
  
          this.aciertos += 1
        }else{
          this.errados += 1
        }
      }
      
      this.cambiarCartaActual()
      this.siguienteCarta = this.elegirSiguienteCarta(this.listaCartas,this.cartaActual)
      this.vueltas += 1

    }

    if(this.vueltas > 10)this.vueltas -= 1
    this.verificarResultadoFinal()
  }

  verificarResultadoFinal(){

    if(this.vueltas == 10 && this.aciertos > this.errados){

      this.partidaGanada = true
      this.terminarTemporizador()
      this.guardarDatos()

    }else if(this.vueltas == 10 && this.errados > this.aciertos){

      this.partidaPerdida = true
      this.terminarTemporizador()
      this.guardarDatos()
      
    }
  }

  reiniciar(){

    this.terminarTemporizador()

    this.contador = 60
    this.aciertos = 0
    this.errados = 0
    this.vueltas =0
    this.partidaGanada = false
    this.partidaPerdida = false
    this.ngOnInit()
  }

  guardarDatos(){

    if(this.partidaGanada){
      this.usuario = new UsuarioMayorMenor(this.user.nombreLogueado()?.usuario,this.user.nombreLogueado()?.mail,
      this.tiempoFinal,this.aciertos,this.errados,"Ganada")
      // this.verificarUsuario(this.usuario)
      this.subirDatos(this.usuario)

    }else if(this.partidaPerdida){
      this.usuario = new UsuarioMayorMenor(this.user.nombreLogueado()?.usuario,this.user.nombreLogueado()?.mail,this.tiempoFinal,this.aciertos,this.errados,"Perdida")
      // this.verificarUsuario(this.usuario)
      this.subirDatos(this.usuario)
    }
    
    
  }

  async subirDatos(usuario:UsuarioMayorMenor){

    const {data,error} = await this.user.suparbase.from("mayor-menor_score").insert([usuario])
    console.log("error: ")
    console.log(error)
    if(error){
      console.log("actualizando")
      await this.user.suparbase.from('mayor-menor_score').update(usuario).eq('mail',usuario.mail)
    }

  }

  ngOnDestroy(): void {
      this.temporizador.unsubscribe()
  }

  
}
