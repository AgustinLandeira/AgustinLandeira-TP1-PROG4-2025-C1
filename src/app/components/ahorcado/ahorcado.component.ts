import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  imports: [],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent implements OnInit {

  letras = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q",
    "r","s","t","u","v","w","x","y","z"]
  parteActual : string = ""
  partesAhorcado = [
    
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//ahorcado-parte1.png",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//ahorcado-parte2.png",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//ahorcado-parte3.png",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//ahorcado-parte4.png",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//ahorcado-parte5.png",
    "https://sibndstdwpyfrhowrqui.supabase.co/storage/v1/object/public/imagenes//ahorcado-parte5.png"
  ]

  ngOnInit(): void {
      
    this.parteActual = this.partesAhorcado[0]

  }
}
