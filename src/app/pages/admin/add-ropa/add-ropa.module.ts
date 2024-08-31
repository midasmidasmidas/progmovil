import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRopaPageRoutingModule } from './add-ropa-routing.module';

import { AddRopaPage } from './add-ropa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRopaPageRoutingModule
  ],
  declarations: [AddRopaPage]
})
export class AddRopaPageModule {}
