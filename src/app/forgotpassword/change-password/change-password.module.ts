import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/material.module";

import { IonicModule } from "@ionic/angular";

import { ChangePasswordPage } from "./change-password.page";
import { SharedComponentModule } from "src/app/shared/shared-component/shared-component.module";

const routes: Routes = [
  {
    path: "",
    component: ChangePasswordPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ChangePasswordPage],
})
export class ChangePasswordPageModule {}
