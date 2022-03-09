import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { SalesPerformancePage } from './sales-performance.page';

const routes: Routes = [
  {
    path: '',
    component: SalesPerformancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SalesPerformancePage]
})
export class SalesPerformancePageModule {}
