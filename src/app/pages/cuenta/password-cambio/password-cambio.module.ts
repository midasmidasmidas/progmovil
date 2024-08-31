import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordCambioPageRoutingModule } from './password-cambio-routing.module';

import { PasswordCambioPage } from './password-cambio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordCambioPageRoutingModule
  ],
  declarations: [PasswordCambioPage]
})
export class PasswordCambioPageModule {}
