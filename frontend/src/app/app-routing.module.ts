import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { TareasComponent } from './components/tareas/tareas.component'
import { LoginComponent } from './components/login/login.component'
import { RegistroComponent } from './components/registro/registro.component'
import { AuthGuard} from './auth.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'tareas',
    component: TareasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'perfil',
    component: RegistroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'material',
    component: RegistroComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
