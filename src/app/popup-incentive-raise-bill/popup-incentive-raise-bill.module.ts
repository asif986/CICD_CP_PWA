import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PopupIncentiveRaiseBillPage } from './popup-incentive-raise-bill.page';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: PopupIncentiveRaiseBillPage
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
  declarations: [PopupIncentiveRaiseBillPage]
})
export class PopupIncentiveRaiseBillPageModule {}
