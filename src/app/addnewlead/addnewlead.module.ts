import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule, NavParams } from "@ionic/angular";

import { AddnewleadPage } from "./addnewlead.page";
import { MaterialModule } from "../material.module";
import {
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
} from "@angular/material";
import { KycModalPageModule } from "./kyc-modal/kyc-modal.module";

const routes: Routes = [
  {
    path: "",
    component: AddnewleadPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatDatepickerModule,
    // KycModalPageModule,
  ],
  declarations: [AddnewleadPage],
})
export class AddnewleadPageModule {}
