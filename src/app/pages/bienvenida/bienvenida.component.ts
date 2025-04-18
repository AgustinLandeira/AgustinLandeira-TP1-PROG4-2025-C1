import { Component, inject } from '@angular/core';
import { DbService } from '../../services/db.service';
import { NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bienvenida',
  imports: [RouterLink],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {

  auth = inject(AuthService)

  constructor(){}

  cerrarSesion(){

    this.auth.cerrarSesion()
  }
}
