import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { UpdateIsTeamFosPage } from "./update-is-team-fos.page";
import { SharedComponentModule } from "../shared/shared-component/shared-component.module";
import { MaterialModule } from "../material.module";

const routes: Routes = [
  {
    path: "",
    component: UpdateIsTeamFosPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedComponentModule,
  ],
  declarations: [UpdateIsTeamFosPage],
})
export class UpdateIsTeamFosPageModule {}
