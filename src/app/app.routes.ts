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
import { MusicaComponent } from './components/musica/musica.component';
import { InfoJuegosComponent } from './pages/info-juegos/info-juegos.component';

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
        canActivate: [juegosGuard]
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
        canActivate: [juegosGuard],
        loadComponent: () => import("./components/ahorcado/ahorcado.component").then((modulo)=>modulo.AhorcadoComponent)

    },
    {
        "path":"preguntados",
        canActivate: [juegosGuard],
        loadComponent: ()=> import("./components/preguntados/preguntados.component").then((modulo)=>modulo.PreguntadosComponent)

    },
    {
        "path":"mayor-menor",
        canActivate: [juegosGuard],
        loadComponent: () => import("./components/mayor-menor/mayor-menor.component").then((modulo)=>modulo.MayorMenorComponent)

    },
    {
        "path":"musica",
        component:MusicaComponent
    },
    {
        "path":"info-juegos",
        component:InfoJuegosComponent

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
