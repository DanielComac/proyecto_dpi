import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './view/lista-productos/lista-productos.component';
import { ListaUsuariosComponent } from './view/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {path: "", redirectTo: "/login", pathMatch: 'full'},
  {path: "login", component: LoginComponent, pathMatch: 'full'},
  {path: 'product', component: ListaProductosComponent},
  {path: 'user', component: ListaUsuariosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
