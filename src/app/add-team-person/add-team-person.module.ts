import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddTeamPersonPage } from './add-team-person.page';
import { MatButtonModule, MatDividerModule } from '@angular/material';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: AddTeamPersonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDividerModule,
    MatButtonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddTeamPersonPage]
})
export class AddTeamPersonPageModule {}
