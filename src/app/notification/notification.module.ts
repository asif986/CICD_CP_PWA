import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationPage } from './notification.page';
import {MatDividerModule, MatToolbarModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: NotificationPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MatToolbarModule,
        MatDividerModule
    ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
