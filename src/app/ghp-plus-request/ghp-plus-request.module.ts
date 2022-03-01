import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GhpPlusRequestPage } from './ghp-plus-request.page';
import {MatButtonModule, MatDividerModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: GhpPlusRequestPage
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
  declarations: [GhpPlusRequestPage]
})
export class GhpPlusRequestPageModule {}
