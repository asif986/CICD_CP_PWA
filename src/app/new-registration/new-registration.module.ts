import {DialogContentExampleDialog, NewRegistrationPage,} from './new-registration.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule, MatExpansionModule, MatRadioModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {MaterialModule} from '../material.module';
import { NgModule } from '@angular/core';
import { SharedComponentModule } from './../shared/shared-component/shared-component.module';

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
        SharedComponentModule,
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
