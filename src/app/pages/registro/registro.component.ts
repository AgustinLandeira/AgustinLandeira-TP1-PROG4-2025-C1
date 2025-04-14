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
  //usamos los servicios
  db = inject(DbService)
  github = inject(GithubService)
  error : boolean = false;
  tipoError: string = ""
  errorNombre: string = "";
  errorApellido: string = ""
  errorEdad: string = ""

  ngOnInit(): void {
      
    //creamos el formulario
    this.formGroup = new FormGroup({

      //creamos un controlador con dos parametros:valor inicial y array de validadores
      nombre: new FormControl("",[Validators.minLength(4),Validators.required,Validators.maxLength(9)]),
      apellido : new FormControl("",[Validators.minLength(5),Validators.required,Validators.maxLength(12)]),
      edad : new FormControl("",[Validators.required,Validators.pattern("^[1-9]+$")])
    })
  }

  registrarUsuario(){

    
    console.log(this.formGroup)
    if(this.formGroup?.invalid)return

    console.log("paso")
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

  identificarErrores(control :any,campo: string){

    if( control?.hasError("required") && control.touched ){

      this.tipoError = "este campo es requerido"
      this.error = true

    }else if (control?.hasError("minlength") && control.touched){

      this.tipoError = "este campo tiene que tener un minimo de 4 caracteres"
      this.error = true

    }else if (control.hasError("maxlength") && control.touched){

      this.tipoError = "este campo tiene que tener un maximo de 9 caracteres"
      this.error = true

    }else if(control?.hasError("pattern") && control?.touched){

      this.tipoError = "la edad es invalida"
      this.error = true
    }else{
      this.error = false
    }
    
    if(this.error)this.identificarCampoError(campo)

    return this.error
  }

  identificarCampoError(campo: string){

    if(campo == "nombre"){

      this.errorNombre = this.tipoError
    }else if(campo == "apellido"){

      this.errorApellido = this.tipoError
    }else{
      this.errorEdad = this.tipoError
    }
  }
}
