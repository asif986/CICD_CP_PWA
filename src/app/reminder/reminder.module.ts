import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReminderPage } from './reminder.page';
import {MatButtonModule, MatDividerModule, MatExpansionModule, MatToolbarModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: ReminderPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MatExpansionModule,
        MatButtonModule,
        MatToolbarModule,
        MatDividerModule,
        MatToolbarModule,
        MatDividerModule
    ],
  declarations: [ReminderPage]
})
export class ReminderPageModule {}
