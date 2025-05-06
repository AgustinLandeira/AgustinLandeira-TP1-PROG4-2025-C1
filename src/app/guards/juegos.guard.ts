import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const juegosGuard: CanActivateFn = async (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  const { data, error } = await authService.suparbase.auth.getSession();

  if (data.session) {
    // Ya hay una sesión iniciada
    console.log("Ya estás logueado. jsugando...");
    console.log(data.session)
    
    return true;
  }
  router.navigate(["/bienvenida"]);
  // No hay sesión
  
  Swal.fire({
    "title":"Error al entrar al juego",
    icon:"error",
    text:"Tenes que iniciar sesion para poder jugar",
    background:"#1c1c1c",
    color:"orange",
    confirmButtonColor: 'orange'

  })
  return false;
};
