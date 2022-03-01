import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

import { IonicModule } from '@ionic/angular';

import { VerifyOtpScreenPage } from './verify-otp-screen.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyOtpScreenPage
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
  declarations: [VerifyOtpScreenPage]
})
export class VerifyOtpScreenPageModule {}
