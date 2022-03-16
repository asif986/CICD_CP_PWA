import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BankDetailsPage } from './bank-details.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SharedComponentModule } from '../shared/shared-component/shared-component.module';

const routes: Routes = [
  {
    path: '',
    component: BankDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BankDetailsPage]
})
export class BankDetailsPageModule {}
