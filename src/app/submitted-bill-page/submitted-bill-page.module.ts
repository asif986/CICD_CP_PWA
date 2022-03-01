import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubmittedBillPagePage } from './submitted-bill-page.page';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: SubmittedBillPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubmittedBillPagePage]
})
export class SubmittedBillPagePageModule {}
