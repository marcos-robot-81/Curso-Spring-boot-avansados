import { Routes } from '@angular/router';
import { Cadastro } from './pages/cadastro/cadastro';
import { Login } from './pages/login/login';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  
  { path: 'cadastro', component: Cadastro },
  { path: 'loga', component: Login },
  
];