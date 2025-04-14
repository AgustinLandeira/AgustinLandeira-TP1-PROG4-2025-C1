import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Usuario } from '../../class/usuario';

@Component({
  selector: 'app-login',
  imports: [RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formGroup ?: any

  tipoError : string = "";
  error : boolean = false
  errorNombre: string = "";
  errorApellido: string = ""

  db = inject(DbService)
  listaUsuarios : Usuario[] = []
  ngOnInit(): void {
      
    this.formGroup = new FormGroup({

      "nombre" : new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(9)]),
      "apellido": new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(12)])

    })

    this.db.traerListado().then((usuario) =>{

      this.listaUsuarios = usuario
      console.log(this.listaUsuarios)
    })


  }

  constructor(private router: Router){

  }

  get Nombre(){

    return this.formGroup?.get("nombre")
  }

  get Apellido(){
    return this.formGroup?.get("apellido")
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

    }else{
      this.error = false
    }

    if(this.error)this.identificarCampoError(campo)
    
    return this.error
  }

  identificarCampoError(campo: string){

    if(campo == "nombre"){

      this.errorNombre = this.tipoError
    }else{

      this.errorApellido = this.tipoError
    }
  }

  logearse(){

    const respuesta = this.listaUsuarios.map( usuario => usuario.nombre == this.Nombre.value && usuario.apellido == this.Apellido.value)
    
    if(respuesta.includes(true)){

      console.log("entre")
      this.router.navigate(["/bienvenida"])
    }


  }
}

