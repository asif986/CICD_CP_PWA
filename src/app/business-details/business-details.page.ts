import { Component, OnInit } from "@angular/core";

import { CommonHelperService } from "../services/common-helper.service";
import { FormGroup } from "@angular/forms";
import { NavController } from "@ionic/angular";
import { StateService } from "./../services/state.service";

@Component({
  selector: "app-business-details",
  templateUrl: "./business-details.page.html",
  styleUrls: ["./business-details.page.scss"],
})
export class BusinessDetailsPage implements OnInit {
  temp: any = {
    header: [
      {
        headernm: "Business Details",
        index: 1,
        controls: [
          {
            inputtype: 4,
            placeholder: "CP Name",
            name: "registration_type_id",
            cssClass: "col",
            label: "Name:",
            value: 1,
            is_fos: 1,
            is_cp: 1,
            is_cp_indivial: 1,
            inital: 0,
            type: "text",
            sub_menus: [
              { index: 1, value: "CP Entitiy" },
              { index: 2, value: "FOS" },
            ],
            requiredError: "Please enter a valid full name!.",
            patternError: "Please proper full name!.",
            validators: {
              required: true,
            },
          },
          {
            inputtype: 2,
            is_fos: 0,
            is_cp: 1,
            is_cp_indivial: 1,
            placeholder: "CP Name",
            name: "fos_name",
            icon: "person",
            cssClass: "col",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid CP full name!.",
            patternError: "Please proper CP full name!.",
            validators: {
              required: true,
              pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
            },
          },
          {
            is_fos: 0,
            is_cp: 1,
            is_cp_indivial: 1,
            inputtype: 2,
            placeholder: "Billing Name",
            name: "billing_name",
            cssClass: "col",
            label: "Name:",
            value: "",
            icon: "business",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid Billing Name!.",
            patternError: "Please proper Billing Name!.",
            validators: {
              required: true,
              pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
            },
          },
          {
            is_fos: 0,
            is_cp: 1,
            is_cp_indivial: 1,
            inputtype: 8,
            placeholder: "Rera Number",
            name: "rera_no",
            icon: "aperture",
            cssClass: "col",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid Rera Number!.",
            patternError: "Please proper Rera Number!.",
            validators: {
              required: true,
              // pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
            },
          },
          {
            is_fos: 1,
            is_cp: 1,
            is_cp_indivial: 1,
            inputtype: 9,
            placeholder: "PAN Number",
            name: "pan_no",
            cssClass: "col",
            icon: "card",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid PAN!.",
            patternError: "Please proper PAN!.",
            validators: {
              required: true,
              pattern: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
            },
          },
          {
            is_fos: 0,
            is_cp: 1,
            is_cp_indivial: 1,
            inputtype: 2,
            placeholder: "GST Number",
            name: "gst_no",
            icon: "card",
            cssClass: "col",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid GST number!.",
            patternError: "Please proper GST number!.",
            validators: {
              required: true,
              pattern:
                "^[0-9]{2}[A-Z]{5}[0-9]{4}" +
                "[A-Z]{1}[1-9A-Z]{1}" +
                "Z[0-9A-Z]{1}$",
            },
          },
          {
            is_fos: 1,
            is_cp: 0,
            is_cp_indivial: 0,
            inputtype: 9,
            placeholder: "AADHAR Number",
            name: "adhar_no",
            icon: "card",
            cssClass: "col",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid ADHAR number!.",
            patternError: "Please proper ADHAR number!.",
            validators: {
              required: true,
              pattern: "^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$",
            },
          },
          {
            is_fos: 1,
            is_cp: 1,
            is_cp_indivial: 1,
            inputtype: 3,
            placeholder: "btn2",
            name: "btn2",
            cssClass: "col",
            label: "Proceed to Bank Details",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid full name!.",
            patternError: "Please proper full name!.",
            validators: {},
          },
        ],
      },
    ],
  };
  form: any = { ...this.temp };

  constructor(
    private CommonHelper: CommonHelperService,
    private state: StateService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}
  businessFormValidation($event: FormGroup) {
    this.CommonHelper.presentLoading().then(() => {
      try {
        let controls = $event.controls;
        console.warn({ controls });
        let invalid = false;
        let newcontrols = Object.keys(controls).sort((a: any, b: any) => {
          return a - b;
        });
        newcontrols = newcontrols.reverse();
        newcontrols.forEach((key) => {
          console.log({ key });
          if (controls[key].hasError("required")) {
            this.form.header.forEach((element: any) => {
              let errormsg = element.controls.find((item) => item.name == key);
              this.CommonHelper.presentToast(errormsg.requiredError);
            });
            invalid = true;
          } else if (controls[key].hasError("pattern")) {
            this.form.header.forEach((element: any) => {
              let errormsg = element.controls.find((item) => item.name == key);
              this.CommonHelper.presentToast(errormsg.patternError);
              console.log("line", errormsg);
            });
            invalid = true;
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
        this.navCtrl.navigateForward("bank-details");
        let formdata = this.state.formValue.value;
        let aftersubmit = $event.value;
        this.state.formValue.next({ ...formdata, ...aftersubmit });

        console.log("validated", $event.value);
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
