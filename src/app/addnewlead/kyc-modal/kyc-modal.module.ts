import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule, NavParams } from "@ionic/angular";

import { KycModalPage } from "./kyc-modal.page";
import { MaterialModule } from "src/app/material.module";
import { AngularOtpLibModule } from "angular-otp-box";

const routes: Routes = [
  {
    path: "",
    component: KycModalPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    AngularOtpLibModule,
  ],
  declarations: [KycModalPage],
  // // exports: [KycModalPage],
  // entryComponents: [KycModalPage],
})
export class KycModalPageModule {}
