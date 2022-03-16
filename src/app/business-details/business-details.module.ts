import { RouterModule, Routes } from '@angular/router';

import { BusinessDetailsPage } from './business-details.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SharedComponentModule } from '../shared/shared-component/shared-component.module';

const routes: Routes = [
  {
    path: '',
    component: BusinessDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BusinessDetailsPage]
})
export class BusinessDetailsPageModule {}
