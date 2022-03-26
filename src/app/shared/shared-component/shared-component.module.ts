import { CommonModule } from "@angular/common";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";
import { CustomModelComponent } from "../../components/custom-model/custom-model.component";
import { HeaderComponent } from "src/app/components/header/header.component";
import { IonicModule } from "@ionic/angular";
import { JsonFormComponent } from "src/app/components/json-form/json-form.component";
import { MaterialModule } from "src/app/material.module";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgModule } from "@angular/core";
import { NgOtpInputModule } from "ng-otp-input";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    JsonFormComponent,
    HeaderComponent,
    CustomModelComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    Ng2SearchPipeModule,
    IonicModule,
    NgOtpInputModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    CustomModelComponent,
    HeaderComponent,
    ConfirmationDialogComponent,
  ],
  exports: [
    JsonFormComponent,
    Ng2SearchPipeModule,
    CustomModelComponent,
    HeaderComponent,
    ConfirmationDialogComponent,
  ],
})
export class SharedComponentModule {}
