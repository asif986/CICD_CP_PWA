import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GHPDetailsPage } from './ghpdetails.page';
import {MatButtonModule, MatDividerModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: GHPDetailsPage
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
  declarations: [GHPDetailsPage]
})
export class GHPDetailsPageModule {}
