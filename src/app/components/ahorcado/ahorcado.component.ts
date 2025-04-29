import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioAhorcado } from '../../class/ahorcadoUsuario';
import { AuthService } from '../../services/auth.service';
import { AhorcadoScoreService } from '../../services/juegos/ahorcado/ahorcado-score.service';

@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule,RouterLink],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent implements OnInit {

  //servicios
  authAhorcado = inject(AuthService)
  ahorcadoScore = inject(AhorcadoScoreService)

  usuario? : UsuarioAhorcado

  letras: string[] = 'abcdefghijklmnñopqrstuvwxyz'.split('');
  letrasSeleccionadas = 0
  
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
  aciertos = 0

  mostralModaVictoria:boolean = false
  mostrarModelDerrota:boolean = false

  temporizador!:Subscription
  contador = 60
  tiempoRestante = signal<number> (this.contador); // 60 segundos
  tiempoFinal:string = ""
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
        this.guardarDatos()
      }
    })
  }

  guardarTemporizador(){

    const tiempoMs = this.tiempoRestante() * 1000; //lo convertimos a milisegundos pq los date usa milisegundos
    const fecha = new Date(tiempoMs);// nos devuelve un objeto de tipo Date ej:(00:00:00)
    //toISOSstring nos devuele un formato de tipo string: 1970-01-01T00:00:45.000Z
    //substruing nos trae los caracteres desde la psocion 14 a 18
    this.tiempoFinal = fecha.toISOString().substring(14, 19); // "mm:ss"
    console.log(this.tiempoFinal)

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

    this.letrasSeleccionadas += 1
    this.agregarLetraUsada(letraElegida)

    const indices :number[] = [];

    if(this.palabraLetra.includes(letraElegida)){
      this.aciertos += 1
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
      this.guardarDatos()

    }
  }

  verificarPartidaPerdida(){
    if(this.error == 5){
      this.detenerTemporizador()
      this.mostrarModelDerrota = true
      this.guardarDatos()

    }
  }

  detenerTemporizador(){
    this.temporizador?.unsubscribe()
    this.guardarTemporizador()
  }

  reiniciarJuego(){

    this.temporizador?.unsubscribe()
    this.contador = 60
    this.tiempoRestante.set(this.contador)
    this.mostralModaVictoria = false
    this.mostrarModelDerrota = false
    this.palabraDesconocida = ""
    this.letrasUsadas = []
    this.error = 0
    this.aciertos = 0
    this.letrasSeleccionadas = 0
    this.ngOnInit()

  }

  async guardarDatos(){

    if(this.mostralModaVictoria){

      this.usuario = new UsuarioAhorcado(this.authAhorcado.nombreLogueado()?.usuario,this.tiempoFinal,this.aciertos,this.error,
      this.letrasSeleccionadas,"ganada")
    }else{
      this.usuario = new UsuarioAhorcado(this.authAhorcado.nombreLogueado()?.usuario,this.tiempoFinal,this.aciertos,this.error,
      this.letrasSeleccionadas,"perdida")
    }
    console.log(this.usuario)

    const resultado = await this.ahorcadoScore.verUsuarioExistente(this.usuario)

    console.log("EL resultado es: ")
    console.log(resultado)

    if(resultado){

      console.log("actualizando......")
      this.ahorcadoScore.actualizarDAtos(this.usuario)
    }else{
      console.log("se perdio")
    }
  }
}
