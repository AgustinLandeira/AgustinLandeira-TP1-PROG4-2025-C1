import { Component, inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators} from "@angular/forms"
import { Router, RouterLink } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Usuario } from '../../class/usuario';
import { GithubService } from '../../services/github.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
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
  authService = inject(AuthService)
  router = inject(Router)

  error : boolean = false;
  tipoError: string = ""
  errorNombre: string = "";
  errorApellido: string = ""
  errorEdad: string = ""
  //registroExitoso: boolean = false
  errorMail : string = ""
  errorcontra : string = ""

  

  ngOnInit(): void {
    
    //creamos el formulario
    this.formGroup = new FormGroup({

      //creamos un controlador con dos parametros:valor inicial y array de validadores
      nombre: new FormControl("",[Validators.minLength(4),Validators.required,Validators.maxLength(9)]),
      apellido : new FormControl("",[Validators.minLength(5),Validators.required,Validators.maxLength(12)]),
      edad : new FormControl("",[Validators.required,Validators.pattern("^[1-9]+$")]),
      mail : new FormControl("",[Validators.required,Validators.email,Validators.minLength(6),Validators.maxLength(20)]),
      contra : new FormControl("",[Validators.minLength(6),Validators.required,Validators.maxLength(12)])
    })
  }

  //registramos el usuario a la bd
  async registrarUsuario(){

    if(this.formGroup?.invalid)return // si es invalido el formulario no seguimos

    //creamos una instancia de usuario para agregarlo a la bd
    const usuario :Usuario = new Usuario(this.nombre?.value,this.apellido?.value,parseInt(this.edad?.value),
    this.mail?.value)

    await this.authService.crearCuenta(this.mail?.value,this.contra?.value)//enviamos los datos
    
    if(this.authService.registrado()){//verificamos si funciono registrarse
      
      this.authService.guardarNombreUsuario(this.mail?.value)
      this.db.agregarUsuario(usuario)
      this.mostrarRegistroExitoso()
      this.router.navigateByUrl("/bienvenida")
      
    }
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

  get mail(){
    return this.formGroup?.get("mail")
  }

  get contra(){
    return this.formGroup?.get("contra")
  }

  //encuentro el error especifico
  //params(control: el controlador,el campo del registro)
  identificarErrores(control :any,campo: string){

    if( control?.hasError("required") && control.touched ){

      this.tipoError = "este campo es requerido"
      this.error = true

    }else if (control?.hasError("minlength") && control.touched){

      this.tipoError = `este campo tiene que tener un minimo de ${control.getError("minlength").requiredLength} carcateres`
      this.error = true

    }else if (control.hasError("maxlength") && control.touched){

      this.tipoError = `este campo tiene que tener un maximo de ${control.getError("maxlength").requiredLength} caracteres`
      this.error = true

    }else if(control?.hasError("pattern") && control?.touched){

      this.tipoError = "la edad es invalida"
      this.error = true
    }else if(control?.hasError("email") && control?.touched){

      this.tipoError = "mail invalido"
      this.error = true
    }else{
      this.error = false
    }
    
    if(this.error)this.identificarCampoError(campo)

    return this.error
  }

  //identifico al campo que tiene el error
  identificarCampoError(campo: string){

    if(campo == "nombre"){

      this.errorNombre = this.tipoError

    }else if(campo == "apellido"){

      this.errorApellido = this.tipoError

    }else if(campo == "mail"){

      this.errorMail = this.tipoError

    }else if(campo == "edad"){

      this.errorEdad = this.tipoError

    }else{
      this.errorcontra = this.tipoError
    }
  }

  mostrarRegistroExitoso(){
    Swal.fire({
          title: "Te logueaste correctamente !!",
          text: "Bienvenido devuelta a la sala de juegos",
          background:"#1c1c1c",
          color : "#ffffff",
          confirmButtonColor: 'orange',
          icon : "success",
          iconColor: "orange",
          confirmButtonText: "Aceptar"
        })
  }


}
