import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddFosListPage } from './add-fos-list.page';
import {MatButtonModule, MatDividerModule, MatIconModule, MatInputModule, MatSelectModule} from '@angular/material';
import {MaterialModule} from '../material.module';
const routes: Routes = [
  {
    path: '',
    component: AddFosListPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MatDividerModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MaterialModule,
    ],
  declarations: [AddFosListPage]
})
export class AddFosListPageModule {}
