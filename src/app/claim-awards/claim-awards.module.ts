import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { ClaimAwardsPage } from './claim-awards.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimAwardsPage
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
  declarations: [ClaimAwardsPage]
})
export class ClaimAwardsPageModule {}
