import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './view/lista-productos/lista-productos.component';
import { ListaUsuariosComponent } from './view/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './login/login.component';
import { CarritoComponent } from './view/carrito/carrito.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  // {path: "", pathMatch: 'full', redirectTo: "/login"},
  // {path: "login", component: LoginComponent, pathMatch: 'full', canActivate: [authGuard]},
  {path: "login", component: LoginComponent, pathMatch: 'full'},
  {path: 'product', component: ListaProductosComponent, canActivate: [authGuard]},
  {path: 'user', component: ListaUsuariosComponent, canActivate: [authGuard]},
  {path: 'carrito', component: CarritoComponent, canActivate: [authGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
