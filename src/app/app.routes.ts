import { Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
// import { RegistroComponent } from './pages/registro/registro.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { SobreMiComponent } from './pages/sobre-mi/sobre-mi.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { ErrorComponent } from './pages/error/error.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { juegosGuard } from './guards/juegos.guard';

export const routes: Routes = [
    
    {
        "path": "login",
        //component:LoginComponent,nos trae el login de forma perezosa
        loadComponent: ()=> import("./pages/login/login.component").then((modulo)=>modulo.LoginComponent),
        canActivate: [authGuard]
    
    },
    {
        "path": "registro",
        //component:RegistroComponent
        loadComponent: () => import("./pages/registro/registro.component").then((modulo)=>modulo.RegistroComponent),
        canActivate: [authGuard]
    },
    {
        "path":"chat",
        component:ChatComponent,
        canActivate: [authGuard]
    },
    {
        "path": "bienvenida",
        component:BienvenidaComponent,
        
    },
    {
        "path":"sobre-mi",
        component:SobreMiComponent
    },
    {
        "path":"ahorcado",
        component:AhorcadoComponent,
        canActivate: [juegosGuard]

    },
    {
        "path":"preguntados",
        component:PreguntadosComponent,
        canActivate: [juegosGuard]

    },
    {
        "path":"mayor-menor",
        component:MayorMenorComponent,
        canActivate: [juegosGuard]

    },
    {
        "path":"error",
        component:ErrorComponent,
    },
    {

        "path": "",
        redirectTo: "bienvenida",
        pathMatch:"full"
    },
    {
        "path":"**",
        redirectTo:"error",
        pathMatch:"full"
    }
];
