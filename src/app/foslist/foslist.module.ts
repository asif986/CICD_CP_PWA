import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FOSListPage } from './foslist.page';
import {MatButtonModule, MatDividerModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: FOSListPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatDividerModule,
        IonicModule,
        RouterModule.forChild(routes),
        MatButtonModule
    ],
  declarations: [FOSListPage]
})
export class FOSListPageModule {}
