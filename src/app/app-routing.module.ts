import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './view/lista-productos/lista-productos.component';
import { ListaUsuariosComponent } from './view/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  {path: 'product', component: ListaProductosComponent},
  {path: 'user', component: ListaUsuariosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
