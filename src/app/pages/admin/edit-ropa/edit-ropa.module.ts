import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRopaPageRoutingModule } from './edit-ropa-routing.module';

import { EditRopaPage } from './edit-ropa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRopaPageRoutingModule
  ],
  declarations: [EditRopaPage]
})
export class EditRopaPageModule {}
