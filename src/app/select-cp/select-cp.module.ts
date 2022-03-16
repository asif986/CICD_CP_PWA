import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { SelectCPPage } from './select-cp.page';
import { SharedComponentModule } from './../shared/shared-component/shared-component.module';

const routes: Routes = [
  {
    path: '',
    component: SelectCPPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MaterialModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelectCPPage]
})
export class SelectCPPageModule {}
