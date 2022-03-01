import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PopUpRaiseBillPage } from './pop-up-raise-bill.page';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: PopUpRaiseBillPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PopUpRaiseBillPage]
})
export class PopUpRaiseBillPageModule {}
