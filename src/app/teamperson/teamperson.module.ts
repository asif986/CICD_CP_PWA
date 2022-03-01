import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeampersonPage } from './teamperson.page';
import {MatButtonModule, MatDividerModule,MatChipsModule,MatIconModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: TeampersonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDividerModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeampersonPage]
})
export class TeampersonPageModule {}
