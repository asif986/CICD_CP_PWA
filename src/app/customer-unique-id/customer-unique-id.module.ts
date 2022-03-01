import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomerUniqueIdPage } from './customer-unique-id.page';
import { MatExpansionModule, MatButtonModule, MatToolbarModule, MatDividerModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: CustomerUniqueIdPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
  ],
  declarations: [CustomerUniqueIdPage]
})
export class CustomerUniqueIdPageModule {}
