import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { imagen } from '../../interfaz/imagen';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mayor-menor',
  imports: [RouterLink,CommonModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit {

  temporizador!: Subscription
  contador = 60
  tiempoRestante = signal<number>(this.contador)
  vueltas = 0

  aciertos : number = 0
  errados: number = 0
  partidaGanada = false
  partidaPerdida = false

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

      if(this.tiempoRestante() <= 0){

        this.terminarTemporizador()
        this.partidaPerdida = true
      }
    })
  }

  terminarTemporizador(){
    this.temporizador.unsubscribe()
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

    console.log(listaCartas)
    listaCartas = listaCartas.filter(imagen => imagen.valor != cartaActual.valor)
    
    const proximaCarta = listaCartas[Math.floor(Math.random() * listaCartas.length)]
    
    console.log(proximaCarta)

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

    }else if(this.vueltas == 10 && this.errados > this.aciertos){
      this.partidaPerdida = true

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
}
