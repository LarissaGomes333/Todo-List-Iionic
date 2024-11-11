import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriaListaPageRoutingModule } from './cria-lista-routing.module';

import { CriaListaPage } from './cria-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriaListaPageRoutingModule
  ],
  declarations: [CriaListaPage]
})
export class CriaListaPageModule {}
