import { Component, inject, OnInit, signal } from '@angular/core';
import { PaisesService } from '../../services/api/paises.service';
import { interval, Observable, Subscription } from 'rxjs';
import { imagen } from '../../interfaz/imagen';
import { pais } from '../../interfaz/pais';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntados',
  imports: [RouterLink,CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit {

  apiPaises = inject(PaisesService)

  correctas: number = 0
  incorrectas:number = 0
  vueltas : number = 0

  partidaGanada : boolean = false
  partidaPerdida : boolean = false

  listaPaises: any[] = []
  listaOpciones:any = []
  
  sub? : Subscription
  temporizador! : Subscription
  tiempo : number = 60
  reloj = signal<number>(this.tiempo)
  
  paisActual = signal< pais| null>(null)

  contador:number = 0
  ngOnInit(): void {
      
    this.sub = this.apiPaises.traerPaises()
    .subscribe(data =>{//le asignmos la suscripcion al observable para poder emitir los datos que este representando
      
      const listaAleatoria = this.mezclarPaises(data);//le asigno a mi propiedad los personajes
      
      this.listaPaises = listaAleatoria.slice(0, 25);//elegimos los primeros 25 paises
      console.log(this.listaPaises)
      this.iniciarJuego()
      
    });
    
  }
  iniciarJuego(){

    //elegimos el primer pais
    this.paisActual.set(this.elegirPrimerPais(this.listaPaises))
    //elegimos las opciones

    this.listaOpciones = this.eligirOpciones(this.listaPaises,this.paisActual()!.nombre)
    this.inciarTiempo()
  }
  inciarTiempo(){

    let contar = interval(1000)

    this.temporizador = contar.subscribe(()=>{

      this.tiempo -= 1
      this.reloj.set(this.tiempo)

      if(this.reloj() <= 0){

        this.terminarTemporizador()
        this.partidaPerdida = true
      }



    })
  }

  terminarTemporizador(){

    this.temporizador?.unsubscribe()
  }

  mezclarPaises(paises: any[]){

    for (let i = paises.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio
      [paises[i], paises[j]] = [paises[j], paises[i]]; // Intercambia elementos
    }

    return paises;
  }

  

  elegirPrimerPais(listaPaises: any[]){
    
    const pais = listaPaises[this.contador]
    return pais
  }

  elegirSiguientePais(lista: any[],contador:number){

    const siguientePais = lista[contador]

    return siguientePais

  }
  eligirOpciones(lista: any[],paisActual:string){

    let listaSinPaisActual = lista.filter(pais => pais.nombre != paisActual)
    // Elegir 3 aleatorios sin repetir
    let seleccionados = listaSinPaisActual.sort(() => Math.random() - 0.5).slice(0, 3).map(pais => pais.nombre); // Toma los primeros 3 y sus nombre

    seleccionados.push(paisActual)
    
    seleccionados = seleccionados.sort(() => Math.random() - 0.5);

    return seleccionados

  }

  sacarPaisActual(indiceAEliminar:number){

    this.listaPaises.splice(indiceAEliminar, 1);
    
  }

  compararRespuesta(opcion: string){

    this.vueltas += 1

    if(opcion == this.paisActual()?.nombre){

      this.correctas += 1
      this.sacarPaisActual(this.contador)
      this.contador += 1
      this.paisActual.set(this.elegirSiguientePais(this.listaPaises,this.contador))
      this.listaOpciones = this.eligirOpciones(this.listaPaises,this.paisActual()!.nombre)

    }else{
      this.incorrectas += 1
      
      this.sacarPaisActual(this.contador)
      this.contador += 1
      this.paisActual.set(this.elegirSiguientePais(this.listaPaises,this.contador))
      this.listaOpciones = this.eligirOpciones(this.listaPaises,this.paisActual()!.nombre)
    }
    this.verificarPartidaTerminada()
  }

  verificarPartidaTerminada(){

    if(this.vueltas == 11 && this.incorrectas > this.correctas){

      this.terminarTemporizador()
      this.partidaPerdida = true

    }else if(this.vueltas == 11 && this.correctas > this.incorrectas){
      this.terminarTemporizador()
      this.partidaGanada = true
    }

  }
  ngOnDestroy(): void { //borramos la inscripcion para que no anda dando vueltas a pesar de que se elimine el componente
        this.sub?.unsubscribe();
    }
  reiniciar(){

    this.terminarTemporizador()
    this.partidaGanada = false
    this.partidaPerdida = false
    this.correctas = 0
    this.incorrectas = 0
    this.contador = 0
    this.vueltas = 0
    this.tiempo = 60

    this.ngOnInit()

  }
}
