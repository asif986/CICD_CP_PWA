import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {DialogContentExampleDialog, NewRegistrationPage,} from './new-registration.page';
import {MatDividerModule, MatExpansionModule, MatRadioModule} from '@angular/material';
import {MaterialModule} from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: NewRegistrationPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MatExpansionModule,
        MaterialModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatDividerModule
    ],
  declarations: [NewRegistrationPage, DialogContentExampleDialog],
    entryComponents: [DialogContentExampleDialog],
})
export class NewRegistrationPageModule {}
