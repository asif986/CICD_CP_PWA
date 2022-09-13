import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { SettingsPage } from "./settings.page";
import { SharedComponentModule } from "../shared/shared-component/shared-component.module";
import { MaterialModule } from "../material.module";

const routes: Routes = [
  {
    path: "",
    component: SettingsPage,
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
  declarations: [SettingsPage],
})
export class SettingsPageModule {}
