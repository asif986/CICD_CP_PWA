import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IncentiveBillsPage } from './incentive-bills.page';

const routes: Routes = [
  {
    path: '',
    component: IncentiveBillsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IncentiveBillsPage]
})
export class IncentiveBillsPageModule {}
