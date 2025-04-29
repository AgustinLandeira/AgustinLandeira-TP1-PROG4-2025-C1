import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { musica } from '../../interfaz/musica';
import { RouterLink } from '@angular/router';

import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-musica',
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './musica.component.html',
  styleUrl: './musica.component.css'
})
export class MusicaComponent implements OnInit {

  correctas : number = 0
  incorrectas : number = 0
  respuestaUsuario : string = ""
  gifMusica: string = "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Mobile%20Music.gif"
  indiceMusicaActual : number = 0
  temporizador!: Subscription
  tiempo:number = 90
  tiempoRestante = signal<number>(this.tiempo)

  listaMusica: musica[] = [
    {nombre:"a sky full of stars",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Coldplay%20-%20A%20Sky%20Full%20Of%20Stars%20(Official%20Video)%20(mp3cut.net).mp3"},
    {nombre: "viva la vida",url: "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Coldplay%20-%20Viva%20La%20Vida%20(Official%20Video)%20(mp3cut.net).mp3"},
    {nombre: "perfect",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Ed%20Sheeran%20-%20Perfect%20(Official%20Music%20Video)%20(mp3cut.net).mp3"},
    {nombre: "firework",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Katy%20Perry%20-%20Firework%20(Official%20Music%20Video)%20(mp3cut.net).mp3"},
    {nombre:"happier",url: "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Marshmello%20ft%20(mp3cut.net).mp3"},
    {nombre:"story of my life",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/One%20Direction%20-%20Story%20of%20My%20Life%20(mp3cut.net).mp3"},
    {nombre:"fireflies",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Owl%20City%20-%20Fireflies%20(Official%20Music%20Video)%20(mp3cut.net).mp3"},
    {nombre:"diamonds",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Rihanna%20-%20Diamonds%20(mp3cut.net).mp3"},
    {nombre:"snap",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Rosa%20Linn%20-%20Snap%20-%20(Official%20Eurovision%20Music%20Video)%20(mp3cut.net).mp3"},
    {nombre:"eye of the tiger",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Survivor%20-%20Eye%20Of%20The%20Tiger%20(Official%20HD%20Video)%20(mp3cut.net).mp3"},
    {nombre:"waka waka",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Waka%20Waka%20(Esto%20es%20Africa)%20(Cancion%20Oficial%20de%20la%20Copa%20Mundial%20de%20la%20FIFA%20Sudafrica%202010)%20(mp3cut.net).mp3"}
  ]
  
  musicaActual? : musica
  partidaGanada:boolean = false;
  partidaPerdida:boolean = false;
  yaTermino:boolean = false

  audioPlayer?:HTMLAudioElement

  ngOnInit(): void {
      
    this.musicaActual = this.elegirMusica(this.listaMusica)

    this.iniciarTemporizador()
  }

  iniciarTemporizador(){

    let contador = interval(1000)

    this.temporizador = contador.subscribe(()=>{

      this.tiempo -= 1
      this.tiempoRestante.set(this.tiempo)

      if(this.tiempoRestante() <= 0){

        this.partidaPerdida = true
        this.apagarMusica()
        this.terminarTemporizador()
      }

    })
  }

  terminarTemporizador(){

    this.temporizador.unsubscribe()
  }

  elegirMusica(lista: musica[]){

    this.indiceMusicaActual = Math.floor(Math.random() * lista.length)

    return lista[this.indiceMusicaActual]
  }

  eliminarMusica(indiceAEliminar:number){

    this.listaMusica.splice(indiceAEliminar,1)
    console.log(this.listaMusica)
  }

  ponerMusica(audioPlayer: HTMLAudioElement){

    this.audioPlayer = audioPlayer
    this.audioPlayer.play();
    
  }


  apagarMusica(){

    this.audioPlayer?.pause()
  }

  finalizarMusica(){
    this.yaTermino = true
  }

  verificarRespuesta(){

    if(this.musicaActual?.nombre.toLowerCase() == this.respuestaUsuario.toLowerCase()){

      this.correctas += 1
    }else{
      this.incorrectas += 1
    }

    this.eliminarMusica(this.indiceMusicaActual)
    console.log(this.listaMusica.length)
    if(this.listaMusica.length > 0){
      this.musicaActual = this.elegirMusica(this.listaMusica)
    }else{
      this.verResultadoPartida()
    }
    
    this.respuestaUsuario = ""
    this.yaTermino = false
    
    
  }

  verResultadoPartida(){

    
    if(this.correctas > this.incorrectas){
      
      this.partidaGanada = true
      this.apagarMusica()
      this.terminarTemporizador()
      
    }else{
      this.partidaPerdida = true
      this.apagarMusica()
      this.terminarTemporizador()
      
    }
  }
  reiniciar(){
    this.terminarTemporizador()
    this.tiempo = 90
    this.correctas = 0
    this.incorrectas = 0
    this.listaMusica =  [
      {nombre:"a sky full of stars",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Coldplay%20-%20A%20Sky%20Full%20Of%20Stars%20(Official%20Video)%20(mp3cut.net).mp3"},
      {nombre: "viva la vida",url: "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Coldplay%20-%20Viva%20La%20Vida%20(Official%20Video)%20(mp3cut.net).mp3"},
      {nombre: "perfect",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Ed%20Sheeran%20-%20Perfect%20(Official%20Music%20Video)%20(mp3cut.net).mp3"},
      {nombre: "firework",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Katy%20Perry%20-%20Firework%20(Official%20Music%20Video)%20(mp3cut.net).mp3"},
      {nombre:"happier",url: "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Marshmello%20ft%20(mp3cut.net).mp3"},
      {nombre:"story of my life",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/One%20Direction%20-%20Story%20of%20My%20Life%20(mp3cut.net).mp3"},
      {nombre:"fireflies",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Owl%20City%20-%20Fireflies%20(Official%20Music%20Video)%20(mp3cut.net).mp3"},
      {nombre:"diamonds",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Rihanna%20-%20Diamonds%20(mp3cut.net).mp3"},
      {nombre:"snap",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Rosa%20Linn%20-%20Snap%20-%20(Official%20Eurovision%20Music%20Video)%20(mp3cut.net).mp3"},
      {nombre:"eye of the tiger",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Survivor%20-%20Eye%20Of%20The%20Tiger%20(Official%20HD%20Video)%20(mp3cut.net).mp3"},
      {nombre:"waka waka",url:"https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Waka%20Waka%20(Esto%20es%20Africa)%20(Cancion%20Oficial%20de%20la%20Copa%20Mundial%20de%20la%20FIFA%20Sudafrica%202010)%20(mp3cut.net).mp3"}
    ]
    
    this.partidaPerdida = false
    this.partidaGanada = false
    this.respuestaUsuario = ""
    this.indiceMusicaActual = 0
    this.yaTermino = false

    this.ngOnInit()
  }
}
