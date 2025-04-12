import { Component, inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators} from "@angular/forms"
import { RouterLink } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Usuario } from '../../class/usuario';
import { GithubService } from '../../services/github.service';
@Component({
  selector: 'app-registro',
  imports: [FormsModule,ReactiveFormsModule,RouterLink,],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{

  formGroup ?:FormGroup
  db = inject(DbService)
  github = inject(GithubService)

  ngOnInit(): void {
      
    this.formGroup = new FormGroup({

      nombre: new FormControl("",[Validators.min(4),Validators.required,Validators.maxLength(9)]),
      apellido : new FormControl("",[Validators.min(5),Validators.required,Validators.maxLength(12)]),
      edad : new FormControl("",[Validators.required,Validators.pattern("^[1-9]+$")])
    })
  }

  registrarUsuario(){

    if(this.formGroup?.invalid)return

    const usuario :Usuario = new Usuario(this.nombre?.value,this.apellido?.value,parseInt(this.edad?.value))

    this.db.agregarUsuario(usuario)
  }

  get nombre(){

    return this.formGroup?.get("nombre")
  }

  get apellido(){

    return this.formGroup?.get("apellido")
  }

  get edad(){

    return this.formGroup?.get("edad")
  }
}
