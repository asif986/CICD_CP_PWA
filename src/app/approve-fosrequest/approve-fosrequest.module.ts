import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { ApproveFOSRequestPage } from "./approve-fosrequest.page";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { MaterialModule } from "../material.module";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgModule } from "@angular/core";
import { SharedComponentModule } from "../shared/shared-component/shared-component.module";

const routes: Routes = [
  {
    path: "",
    component: ApproveFOSRequestPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ApproveFOSRequestPage],
})
export class ApproveFOSRequestPageModule {}
