import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Usuario } from '../../class/usuario';
import { AuthService } from '../../services/auth.service';

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
  errorMail: string = "";
  errorContra: string = ""
  errorGlobal: boolean = false

  authService = inject(AuthService)
  router = inject(Router)

  listaUsuarios : Usuario[] = []
  ngOnInit(): void {
      
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

  identificarCampoError(campo: string){

    if(campo == "mail"){

      this.errorMail = this.tipoError
    }else{

      this.errorContra = this.tipoError
    }
  }

  async logearse(){

    await this.authService.iniciarSesion(this.mail.value,this.contra.value)

    if(this.authService.sesionEncontrada() == true){

      this.authService.guardarNombreUsuario(this.mail.value)
      this.router.navigateByUrl("/bienvenida")
    }


  }
}

