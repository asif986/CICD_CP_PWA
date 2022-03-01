import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgreementListPage } from './agreement-list.page';
import { MatExpansionModule, MatButtonModule, MatToolbarModule, MatDividerModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: AgreementListPage
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
  ],
  declarations: [AgreementListPage]
})
export class AgreementListPageModule {}
