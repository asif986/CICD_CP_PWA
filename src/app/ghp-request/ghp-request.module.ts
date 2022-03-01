import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GhpRequestPage } from './ghp-request.page';
import {MatButtonModule, MatDividerModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: GhpRequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatDividerModule,
    MatButtonModule
  ],
  declarations: [GhpRequestPage]
})
export class GhpRequestPageModule {}
