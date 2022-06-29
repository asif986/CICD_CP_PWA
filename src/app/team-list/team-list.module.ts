import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { TeamListPage } from "./team-list.page";
import { MatButtonModule, MatDividerModule } from "@angular/material";
import { SharedComponentModule } from "../shared/shared-component/shared-component.module";

const routes: Routes = [
  {
    path: "",
    component: TeamListPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDividerModule,
    MatButtonModule,
    IonicModule,
    SharedComponentModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TeamListPage],
})
export class TeamListPageModule {}
