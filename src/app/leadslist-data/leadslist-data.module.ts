import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeadslistDataPage } from './leadslist-data.page';
import {MatButtonModule,MatExpansionModule, MatDividerModule,MatDatepickerModule} from '@angular/material';
import {MaterialModule} from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: LeadslistDataPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatDividerModule,
    MatExpansionModule,
    MatButtonModule,
    MatDatepickerModule,
    MaterialModule,
  ],
  declarations: [LeadslistDataPage]
})
export class LeadslistDataPageModule {}
