import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-info-juegos',
  imports: [RouterLink],
  templateUrl: './info-juegos.component.html',
  styleUrl: './info-juegos.component.css'
})
export class InfoJuegosComponent {

  juegos = [
    {
      nombre: 'Ahorcado',
      descripcion: 'Adivina la palabra antes de que el personaje sea colgado y antes de que termine el tiempo,de lo contrario, perderas.'
    },
    {
      nombre: 'Preguntados',
      descripcion: "Responde cual es el nombre de dicho pais al ver la bandera en menos de 60 segundos.Tendras 10 opurtunidades,en caso de empate,tendras una pregunta mas."
    },
    {
      nombre: 'Mayor o menor',
      descripcion: 'Adivina si la proxima carta sera mayor o menor.Tendras 10 opurtunidades,en caso de empate,tendras que adivinar una carta mas'
    },
    {
      nombre: 'Music Quiz',
      descripcion: 'Escucha las 11 canciones y adivina cuales son sus nombres en menos de 90 segundos. Ideal para fanáticos de la música.'
    }
  ];
}
