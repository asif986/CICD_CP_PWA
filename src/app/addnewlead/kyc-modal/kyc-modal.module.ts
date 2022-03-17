import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule, NavParams } from "@ionic/angular";

import { KycModalPage } from "./kyc-modal.page";

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
  ],
  declarations: [KycModalPage],
  // // exports: [KycModalPage],
  // entryComponents: [KycModalPage],
})
export class KycModalPageModule {}
