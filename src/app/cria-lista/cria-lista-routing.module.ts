import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriaListaPage } from './cria-lista.page';

const routes: Routes = [
  {
    path: '',
    component: CriaListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriaListaPageRoutingModule {}
