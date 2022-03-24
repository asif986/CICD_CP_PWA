import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AopApprovalBenefitPage } from "./aop-approval-benefit.page";
import { MaterialModule } from "../material.module";
import { SharedComponentModule } from "../shared/shared-component/shared-component.module";

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
    SharedComponentModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AopApprovalBenefitPage],
})
export class AopApprovalBenefitPageModule {}
