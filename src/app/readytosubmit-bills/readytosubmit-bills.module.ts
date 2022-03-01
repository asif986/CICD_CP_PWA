import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReadytosubmitBillsPage } from './readytosubmit-bills.page';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: ReadytosubmitBillsPage
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
  declarations: [ReadytosubmitBillsPage]
})
export class ReadytosubmitBillsPageModule {}
