import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  
  console.log(authService.nombreLogueado)
  if(authService.nombreLogueado == null){
  //dejar pasar
    console.log("dejo pasar")
    return true

  }else{
    //no dejar pasar
    return false;
  }

  
};
