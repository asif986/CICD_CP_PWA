import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GenerateGHPPage } from './generate-ghp.page';
import {MaterialModule} from '../material.module';
import {MatDatepickerModule, MatDividerModule, MatExpansionModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: GenerateGHPPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatDatepickerModule
  ],
  declarations: [GenerateGHPPage]
})
export class GenerateGHPPageModule {}
