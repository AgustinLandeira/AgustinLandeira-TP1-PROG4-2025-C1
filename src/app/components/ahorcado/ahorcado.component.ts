import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule,RouterLink],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent implements OnInit {

  letras: string[] = 'abcdefghijklmnñopqrstuvwxyz'.split('');
  
  parteActual : string = "";
  partesAhorcado = [
    
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//ahorcado-parte1.png",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//ahorcado-parte2.png",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//ahorcado-parte3.png",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//ahorcado-parte4.png",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//ahorcado-parte5.png",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//ahorcado-parte6.png"
  ]

  palabras = ["independiente","computadora","mouse","teclado","pantalla","microfono","programacion","facultad"]

  palabraElegida = ""
  palabraLetra : string[] = []
  palabraDesconocida: string = "";
  letrasUsadas : string[] = []

  error : number = 0

  mostralModaVictoria:boolean = false
  mostrarModelDerrota:boolean = false

  temporizador!:Subscription
  contador = 200
  tiempoRestante = signal<number> (this.contador); // 10 minutos
  ngOnInit(): void {
    
    this.palabraElegida = this.elegirPalabra(this.palabras)//elegimos una palabra
    this.palabraLetra = this.palabraElegida.split("")//la convertimos en una lista esa palabra

    this.parteActual = this.partesAhorcado[this.error]
    this.formarPalabra(this.palabraLetra)
    this.iniciarTemporizador()

  }

  iniciarTemporizador(){
    let contador = interval(1000)//nos devuelve un observable

    //Nos suscribimos a ese observable
    //para que ese observable actua nos tenemos que inscribir
    this.temporizador = contador.subscribe(()=>{
      this.contador -= 1
      this.tiempoRestante.set(this.contador) 
      console.log(this.tiempoRestante)

      if(this.tiempoRestante() <= 0){

        this.detenerTemporizador()
        this.mostrarModelDerrota = true
      }
    })
  }
  elegirPalabra(lista: string[]):string{

    let indice = Math.floor(Math.random() * lista.length)
    const palabraElegida = lista[indice]

    return palabraElegida
  }

  formarPalabra(listaLetras: string[]){
    
    for(let i = 0;i < listaLetras.length;i++){

      this.palabraDesconocida += "_ "
    }
    
  }
  compararLetra(letraElegida : string){

    console.log(letraElegida)
    this.agregarLetraUsada(letraElegida)

    const indices :number[] = [];

    if(this.palabraLetra.includes(letraElegida)){

      let posicion = this.palabraLetra.indexOf(letraElegida)//busca la primera aparicion de la letra buscada

      //el while va a ejecutarse mientras siga encontrando la letra 
      //cuando no encuentre mas,indexof devuelve -1

      while (posicion !== -1){

        indices.push(posicion)            //valor buscado //desde indice y devuelve -1 cuando no haya mas coincidencias
        posicion = this.palabraLetra.indexOf(letraElegida,posicion+1)//posicion + 1 asi no se repite el mismo indice
        console.log(indices);
      }
      
      //juntamos la palabra
      this.palabraDesconocida= this.palabraDesconocida.replace(/\s/g,""); // el /s nos saca las tabulaciones,saltos de linea y espacios y /g que sea todas las ocurrencias
      
      //la dividimos pero sin espacio
      let arrayPalabra = this.palabraDesconocida.split("")

      for(let indice in indices){

        arrayPalabra[indices[indice]] = letraElegida
      }
      
      this.palabraDesconocida = arrayPalabra.join(" ")
      
      this.verificarPartidaGanada()

    }else{
      this.error += 1
      this.parteActual = this.partesAhorcado[this.error]
      this.detenerTemporizador()
      this.verificarPartidaPerdida()
    }
    
  }

  agregarLetraUsada(letra:string){

    this.letrasUsadas.push(letra)
  }

  verificarPartidaGanada(){
    if(this.palabraDesconocida.replace(/\s/g,"") == this.palabraElegida){

      this.detenerTemporizador()
      this.mostralModaVictoria = true

    }
  }

  verificarPartidaPerdida(){
    if(this.error == 5){

      this.mostrarModelDerrota = true 

    }
  }

  detenerTemporizador(){
    this.temporizador?.unsubscribe()
  }

  reiniciarJuego(){

    this.temporizador?.unsubscribe()
    this.contador = 200
    this.tiempoRestante.set(this.contador)
    this.mostralModaVictoria = false
    this.mostrarModelDerrota = false
    this.palabraDesconocida = ""
    this.letrasUsadas = []
    this.error = 0
    this.ngOnInit()

  }
}
