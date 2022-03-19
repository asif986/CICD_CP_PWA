import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { CustomModelComponent } from '../../components/custom-model/custom-model.component';
import { IonicModule } from '@ionic/angular';
import { JsonFormComponent } from 'src/app/components/json-form/json-form.component';
import { MaterialModule } from 'src/app/material.module';
import { NgModule } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [JsonFormComponent,CustomModelComponent,ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    IonicModule,
    NgOtpInputModule,
    ReactiveFormsModule
  ],
  entryComponents:[CustomModelComponent,ConfirmationDialogComponent],
  exports:[JsonFormComponent,CustomModelComponent,ConfirmationDialogComponent]
})
export class SharedComponentModule { }
