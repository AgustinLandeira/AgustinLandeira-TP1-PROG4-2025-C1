import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Usuario } from '../../class/usuario';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  imports: [RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  //formulario
  formGroup ?: any

  //errores
  tipoError : string = "";
  error : boolean = false
  errorMail: string = "";
  errorContra: string = ""
  errorGlobal: boolean = false

  //servicios
  authService = inject(AuthService)
  router = inject(Router)

  //para autocompletar
  mailAutocompleto: string = "";
  contraAutoCompleto : string = ""

  listaUsuarios : Usuario[] = []
  ngOnInit(): void {
    //creo el formulario
    this.formGroup = new FormGroup({

      "mail" : new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(24),Validators.email]),
      "contra": new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(12)])

    })

  }

  get mail(){

    return this.formGroup?.get("mail")
  }

  get contra(){
    return this.formGroup?.get("contra")
  }
  //identifico los errores puntuales y el tipo de error
  identificarErrores(control :any,campo: string){

    if( control?.hasError("required") && control.touched ){

      this.tipoError = "este campo es requerido"
      this.error = true
    }else if (control?.hasError("minlength") && control.touched){

      this.tipoError = `este campo tiene que tener un minimo de ${control.getError("minlength").requiredLength} caracteres`
      this.error = true

    }else if (control.hasError("maxlength") && control.touched){

      this.error = true
      
      this.tipoError = `este campo tiene que tener un maximo de ${control.getError("maxlength").requiredLength} caracteres` 

    }else if (control.hasError("email") && control.touched){

      this.error = true
      
      this.tipoError = "El mail es invalido" 

    }else{
      this.error = false
    }

    if(this.error)this.identificarCampoError(campo)
    
    return this.error
  }
  //identifico de que campo viene el error
  identificarCampoError(campo: string){

    if(campo == "mail"){

      this.errorMail = this.tipoError
    }else{

      this.errorContra = this.tipoError
    }
  }

  async logearse(){ //me logueo a una cuenta ya creada

    await this.authService.iniciarSesion(this.mail.value,this.contra.value)

    if(this.authService.sesionEncontrada() == true){

      this.authService.guardarNombreUsuario(this.mail.value)
      this.mostrarLogueoExitoso()
      this.router.navigateByUrl("/bienvenida")
    }
  }

  mostrarLogueoExitoso(){

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

  autocompletar(test:string){

    switch(test){

      case "test1":
        this.mailAutocompleto = "test1@example.com"
        this.contraAutoCompleto = "primertest"
        break;
      
        case "test2":
          this.mailAutocompleto = "test2@example.com"
          this.contraAutoCompleto = "segundotest"
          break;
        default:
          this.mailAutocompleto = "test3@example.com"
          this.contraAutoCompleto = "tercertest"
          break;
    }
    
    // el metodo patchValue sirve para asignar valores a los campos del formulario de forma parcial(rellenas los campos que necesito)
    this.formGroup?.patchValue({
      "mail" : this.mailAutocompleto,
      "contra": this.contraAutoCompleto
    })

  }
}

