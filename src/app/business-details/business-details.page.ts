import { Component, OnInit } from "@angular/core";

import { APIService } from "../services/APIService";
import { CommonHelperService } from "../services/common-helper.service";
import { DataService } from "../services/data.service";
import { FormGroup } from "@angular/forms";
import { HttpResponse } from "@angular/common/http";
import { NavController } from "@ionic/angular";
import { StateService } from "./../services/state.service";
import { responsefromSalesPerson } from "../models/business-details";

@Component({
  selector: "app-business-details",
  templateUrl: "./business-details.page.html",
  styleUrls: ["./business-details.page.scss"],
})
export class BusinessDetailsPage implements OnInit {
  getAllSalesPerson = [];
  temp: any = {
  };
  form: any = {};

  constructor(
    private CommonHelper: CommonHelperService,
    private state: StateService,
    private apiSer: APIService,
    public dataService:DataService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.temp ={...this.dataService.businessDetailsForms()};
    this.form.header = [
      ...this.temp.header.map((item) => {
        const filtered = item.controls.filter((item2) => item2.is_cp == 1);
        let getPerson_name = item.controls.find(
          (item2) => item2.issalesperson_available == 1
        );
        getPerson_name = getPerson_name.name;
        const attacthedsales = filtered.map((item) => {
          return item;
        });
        console.log({ attacthedsales });
        return {
          headernm: item.headernm,
          index: item.index,
          controls: attacthedsales,
        };
      }),
    ];
    // this.form  = { ...this.temp };
    console.log("form", this.form);
  }
  businessFormValidation($event: FormGroup) {
    this.CommonHelper.presentLoading().then(() => {
      try {
        let controls = $event.controls;
        console.log({ controls });
        let invalid = false;

        let form_fields = [];
        let form_fields_for_DB = [];
        this.form.header.forEach((element: any) => {
          element.controls.map((item) => {
            if (item.isValidatedError == 1) {
              form_fields.push(item.name);
            }
            if (item.isValidatedtoDBError == 1) {
              form_fields_for_DB.push(item.name);
            }
            return item;
          });
        });
        // return;
        console.log({ form_fields_for_DB });
        let newcontrols = Object.keys(controls).sort((a: any, b: any) => {
          return a - b;
        });
        newcontrols = newcontrols.reverse();
        newcontrols.forEach((key) => {
          // console.log({ key });
          if (
            controls[key].hasError("required") ||
            controls[key].hasError("pattern")
          ) {
            if (controls[key].hasError("required")) {
              this.form.header.forEach((element: any) => {
                let errormsg = element.controls.find(
                  (item) => item.name == key
                );
                this.CommonHelper.presentToast(errormsg.requiredError);
              });
              invalid = true;
            } else if (controls[key].hasError("pattern")) {
              this.form.header.forEach((element: any) => {
                let errormsg = element.controls.find(
                  (item) => item.name == key
                );
                this.CommonHelper.presentToast(errormsg.patternError);
              });
              invalid = true;
            }
          } else {
            if (
              (form_fields.includes(key) || form_fields_for_DB.includes(key)) &&
              controls[key].enabled
            ) {
              console.log("Invalid");
              this.form.header.forEach((element: any) => {
                let errormsg = element.controls.find(
                  (item) => item.name == key
                );
                this.CommonHelper.presentToast(errormsg.validateError);
              });
              invalid = true;
            }
          }
        });
        if (invalid) {
          this.CommonHelper.dismissLoading();
          return;
        }
        // if (
        //   this.personaldetailsForm.valid &&
        //   !this.personaldetailsForm.controls["mobile"].disabled
        // ) {
        //   this.dismissLoading();

        //   this.presentToast("Please verify your mobile number");
        //   return;
        // }
        console.log("validated", $event.getRawValue());
        this.CommonHelper.dismissLoading();
        // return;
        let formdata = this.state.formValue.value;
        this.navCtrl.navigateForward("bank-details");
        let aftersubmit = $event.getRawValue();
        this.state.formValue.next({ ...formdata, ...aftersubmit });
      } catch (error) {
        this.CommonHelper.dismissLoading();

        console.log(error);
      }
      // console.log("form",controls);
      //  console.log("loading started")
      setTimeout(() => {
        this.CommonHelper.dismissLoading();
      }, 2000);
    });
    console.log($event);
  }
  changeOrg($event) {
    console.log({ $event });
    let filteredcontrols = [];
    if ($event == 1) {
      filteredcontrols = this.temp.header.map((items) => {
        const subfiltered = items.controls.filter((filtered) => {
          return filtered.is_cp == 1;
        });
        return {
          headernm: items.headernm,
          index: items.index,
          controls: subfiltered,
        };
      });
      this.state.formArray.next(filteredcontrols);
      console.log({ filteredcontrols });
    } else if ($event == 2) {
      filteredcontrols = this.temp.header.map((items) => {
        const subfiltered = items.controls.filter((filtered) => {
          return filtered.is_fos == 1;
        });
        return {
          headernm: items.headernm,
          index: items.index,
          controls: subfiltered,
        };
      });
      console.log({ filteredcontrols });
      this.state.formArray.next(filteredcontrols);
      // this.form.header = []
      // this.form.header = [...filteredcontrols]
    }
  }
  validationApi(event: any) {
    console.log(event);
  }
}
