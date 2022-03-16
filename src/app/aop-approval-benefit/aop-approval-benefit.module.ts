import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AopApprovalBenefitPage } from "./aop-approval-benefit.page";
import { MaterialModule } from "../material.module";

const routes: Routes = [
  {
    path: "",
    component: AopApprovalBenefitPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AopApprovalBenefitPage],
})
export class AopApprovalBenefitPageModule {}
