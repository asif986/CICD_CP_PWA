import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddreminderPage } from './addreminder.page';
import {
    MAT_DATE_FORMATS,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule
} from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: AddreminderPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelectModule,
        MatToolbarModule,
        MatDividerModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        
    ],
  declarations: [AddreminderPage],

})
export class AddreminderPageModule {}
