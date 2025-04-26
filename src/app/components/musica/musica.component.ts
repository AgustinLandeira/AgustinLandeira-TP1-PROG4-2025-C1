import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { musica } from '../../interfaz/musica';

@Component({
  selector: 'app-musica',
  imports: [FormsModule],
  templateUrl: './musica.component.html',
  styleUrl: './musica.component.css'
})
export class MusicaComponent implements OnInit {

  correctas : number = 0
  incorrectas : number = 0
  respuestaUsuario : string = ""
  musicaSonando = false
  gifMusica: string = "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes/audios/Mobile%20Music.gif"
  indiceMusicaActual : number = 0

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


  ngOnInit(): void {
      
    this.musicaActual = this.elegirMusica(this.listaMusica)


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
    audioPlayer.play();
    this.musicaSonando = true;  // Esto activa la animación de la imagen si la tienes configurada
  }


  pausarMusica(){

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
    

    
    
  }

  verResultadoPartida(){

    if(this.correctas > this.incorrectas){
      alert("ganaste")
    }else{
      alert("perdiste")
    }
  }
  reiniciar(){

  }
}
