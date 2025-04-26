import { Injectable, signal } from '@angular/core';
import { PostgrestQueryBuilder } from '@supabase/postgrest-js';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Swal from "sweetalert2"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  suparbase : SupabaseClient<any, "public", any>

  registrado = signal<any | null>(null)
  sesionEncontrada = signal<boolean | null>(null)
  nombreLogueado = signal<any  | null>(null)

  obj ?: any
  constructor() { 

    this.suparbase = createClient("https://sibndstdwpyfrhowrqui.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpYm5kc3Rkd3B5ZnJob3dycXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4OTY2NDMsImV4cCI6MjA2MDQ3MjY0M30.znnkchrr9NrYdXncKtJN_nBSWV_yUMiIUtQWhdB1LEQ")

      //detecta cuando se inicia o cierra la sesion
      //recibe un callback(event,sesion)
      this.suparbase.auth.onAuthStateChange((event, session) => {
        if (session === null) {
          
          //this.sesionEncontrada.set(false)
          this.nombreLogueado.set(null)
          // this.nombreLogueado.set(null);
          // this.router.navigateByUrl("/login");
          return;
        }
        
        this.suparbase.auth.getUser().then(({ data, error }) => {
          // this.user.set(data.user);
          // this.router.navigateByUrl("/");
          
          this.buscarSesionIniciada(data.user?.email)
          
        });
      });
    
  }

  async crearCuenta(email:string,contraseña:string){

    const {data,error} = await this.suparbase.auth.signUp({

      email: email,
      password:contraseña
    })

    if(!error){
      
      this.registrado.set(true)
      
    }else{
      this.registrado.set(false)
    }
      
    
    

  }

  async iniciarSesion(email:string,contraseña:string){

    const {data,error} = await this.suparbase.auth.signInWithPassword({
      email:email,
      password:contraseña
    })

    if(!error){

      this.sesionEncontrada.set(true)
    }else{
      this.sesionEncontrada.set(false)
    }
    
    
  }

  async cerrarSesion(){

    const {error} = await this.suparbase.auth.signOut();

    
    if(!error){
      this.nombreLogueado.set("")
    }
  }

  async guardarNombreUsuario(mailLogueado : string){

    const {data,error} = await this.suparbase.from("usuarios").select("nombre,mail")

    if(error){
      return ;
    }

    for(let usuario of data){

      if(usuario.mail == mailLogueado){

        this.nombreLogueado.set(usuario.nombre)
        
        break
      }
    }
  }

  async buscarSesionIniciada(mail:string | undefined){

    const {data,error} = await this.suparbase.from("usuarios").select("nombre").eq("mail",mail)

    
    if (data && data.length > 0) {
      const nombre = data[0].nombre;
      
      this.nombreLogueado.set(nombre)
      //this.sesionEncontrada.set(true)

    }
  }

 
}
// this.suparbase.auth.onAuthStateChange((event,sesion)=>{
    //   console.log(event)
    //   switch(event){

    //     case "SIGNED_IN":
    //       console.log("abriste sesion")
    //       break;
    //     case "SIGNED_OUT"  : 
    //       console.log("cerraste sesion")
    //       break;
    //     case "INITIAL_SESSION":
    //       console.log("no pasa nada");
    //       break;
        
        
    //   }
    //   if(sesion == null){
    //     // console.log(event)
    //     // console.log("NO HAY SESION")
    //     return ;
    //   }
      
    //   console.log(event)
    //   this.suparbase.auth.getUser().then(({data,error})=>{

    //     console.log(data.user)
    //     console.log(error)
    //   })
    // })