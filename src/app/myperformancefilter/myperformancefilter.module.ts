import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyperformancefilterPage } from './myperformancefilter.page';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: MyperformancefilterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [MyperformancefilterPage]
})
export class MyperformancefilterPageModule {}
