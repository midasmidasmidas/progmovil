import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRopaPage } from './add-ropa.page';

const routes: Routes = [
  {
    path: '',
    component: AddRopaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRopaPageRoutingModule {}
