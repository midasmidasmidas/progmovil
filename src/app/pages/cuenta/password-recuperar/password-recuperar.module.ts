import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordRecuperarPageRoutingModule } from './password-recuperar-routing.module';

import { PasswordRecuperarPage } from './password-recuperar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordRecuperarPageRoutingModule
  ],
  declarations: [PasswordRecuperarPage]
})
export class PasswordRecuperarPageModule {}
