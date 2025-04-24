import { Component, inject, OnInit, signal } from '@angular/core';
import { PaisesService } from '../../services/api/paises.service';
import { Observable, Subscription } from 'rxjs';
import { imagen } from '../../interfaz/imagen';
import { pais } from '../../interfaz/pais';

@Component({
  selector: 'app-preguntados',
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit {

  apiPaises = inject(PaisesService)

  correctas: number = 0
  incorrectas:number = 0

  listaPaises: any[] = []
  listaOpciones:any = []
  
  sub? : Subscription
  
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

  mezclarPaises(paises: any[]){

    for (let i = paises.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio
      [paises[i], paises[j]] = [paises[j], paises[i]]; // Intercambia elementos
    }

    return paises;
  }

  iniciarJuego(){

    //elegimos el primer pais
    this.paisActual.set(this.elegirPrimerPais(this.listaPaises))
    //elegimos las opciones

    this.listaOpciones = this.eligirOpciones(this.listaPaises,this.paisActual()!.nombre)
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
    
    return seleccionados

  }

  sacarPaisActual(indiceAEliminar:number){

    this.listaPaises.splice(indiceAEliminar, 1);
    
  }

  compararRespuesta(opcion: string){

    
    if(opcion == this.paisActual()?.nombre){

      this.correctas += 1
      this.sacarPaisActual(this.contador)
      this.contador += 1
      this.paisActual.set(this.elegirSiguientePais(this.listaPaises,this.contador))
      this.listaOpciones = this.eligirOpciones(this.listaPaises,this.paisActual()!.nombre)

    }else{
      this.incorrectas += 1
    }

  }
  ngOnDestroy(): void { //borramos la inscripcion para que no anda dando vueltas a pesar de que se elimine el componente
        this.sub?.unsubscribe();
    }
  reiniciar(){

  }
}
