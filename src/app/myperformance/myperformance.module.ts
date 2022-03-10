import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MyperformancePage } from "./myperformance.page";
import { MaterialModule } from "../material.module";
import {
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
} from "@angular/material";
import { NgxSliderModule } from "@angular-slider/ngx-slider";
const routes: Routes = [
  {
    path: "",
    component: MyperformancePage,
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
    NgxSliderModule,
  ],
  declarations: [MyperformancePage],
})
export class MyperformancePageModule {}
