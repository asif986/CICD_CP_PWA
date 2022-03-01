import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


import { EnterEmailScreenPage } from './enter-email-screen.page';
import { MaterialModule } from 'src/app/material.module';
const routes: Routes = [
  {
    path: '',
    component: EnterEmailScreenPage
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
  declarations: [EnterEmailScreenPage]
})
export class EnterEmailScreenPageModule {}
