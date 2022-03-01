import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CountrycodelistPage } from './countrycodelist.page';
import {MaterialModule} from '../material.module';


const routes: Routes = [
  {
    path: '',
    component: CountrycodelistPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MaterialModule,
        
    ],
  declarations: [CountrycodelistPage]
})
export class CountrycodelistPageModule {}
