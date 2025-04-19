import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { SobreMiComponent } from './pages/sobre-mi/sobre-mi.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';

export const routes: Routes = [
    
    {
        "path": "login",
        component:LoginComponent

    },
    {
        "path": "registro",
        component:RegistroComponent
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

        "path": "",
        redirectTo: "bienvenida",
        pathMatch:"full"
    },
];
