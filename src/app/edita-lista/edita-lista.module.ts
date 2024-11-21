import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaListaPageRoutingModule } from './edita-lista-routing.module';

import { EditaListaPage } from './edita-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaListaPageRoutingModule
  ],
  declarations: [EditaListaPage]
})
export class EditaListaPageModule {}
