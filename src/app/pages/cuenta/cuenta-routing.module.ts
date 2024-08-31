import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaPage } from './cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: CuentaPage
  },
  {
    path: 'editar',
    loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then( m => m.WishlistPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaPageRoutingModule {}
