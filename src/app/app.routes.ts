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

export const routes: Routes = [
    
    {
        "path": "login",
        //component:LoginComponent,nos trae el login de forma perezosa
        loadComponent: ()=> import("./pages/login/login.component").then((modulo)=>modulo.LoginComponent),
    
    },
    {
        "path": "registro",
        //component:RegistroComponent
        loadComponent: () => import("./pages/registro/registro.component").then((modulo)=>modulo.RegistroComponent)
    },
    {
        "path":"chat",
        component:ChatComponent
    },
    {
        "path": "bienvenida",
        component:BienvenidaComponent
    },
    {
        "path":"sobre-mi",
        component:SobreMiComponent
    },
    {
        "path":"ahorcado",
        component:AhorcadoComponent

    },
    {
        "path":"preguntados",
        component:PreguntadosComponent

    },
    {
        "path":"mayor-menor",
        component:MayorMenorComponent

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
