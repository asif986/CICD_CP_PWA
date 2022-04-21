import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JsonFormControls, JsonFormData } from "../Model/JsonToform";

import { APIService } from "./../services/APIService";
import { CommonHelperService } from "./../services/common-helper.service";
import { HttpResponse } from "@angular/common/http";
import { NavController } from "@ionic/angular";
import { StateService } from "./../services/state.service";
import { Storage } from "@ionic/storage";
import { responsefromserver } from "../models/Registration";
import { Helper } from "../services/Helper";

@Component({
  selector: "app-bank-details",
  templateUrl: "./bank-details.page.html",
  styleUrls: ["./bank-details.page.scss"],
})
export class BankDetailsPage implements OnInit {
  public myForm: FormGroup = this.formBuilder.group({});
  public formData: JsonFormData;

  temp: any = {
    header: [
      {
        headernm: "Bank Details",
        index: 2,
        controls: [
          {
            inputtype: 2,
            placeholder: "Bank Name",
            name: "bank_name",
            cssClass: "col",
            icon: "business",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid Bank Name!.",
            patternError: "Please proper Bank Name!.",
            validators: {
              required: true,
              pattern: "[a-zA-Z0-9][a-zA-Z0-9 ]+[a-zA-Z0-9]$",
            },
          },
          {
            inputtype: 2,
            placeholder: "Branch Name",
            name: "branch_name",
            icon: "business",
            cssClass: "col",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid Branch Name!.",
            patternError: "Please proper Branch Name!.",
            validators: {
              required: true,
              pattern: "[a-zA-Z0-9][a-zA-Z0-9 ]+[a-zA-Z0-9]$",
            },
          },
          {
            inputtype: 2,
            placeholder: "Account Name",
            name: "account_name",
            cssClass: "col",
            icon: "person",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid Account Name!.",
            patternError: "Please proper Account Name!.",
            validators: {
              required: true,
              pattern: "[a-zA-Z0-9][a-zA-Z0-9 ]+[a-zA-Z0-9]$",
            },
          },
          {
            inputtype: 2,
            placeholder: "IFSC Number",
            name: "ifsc_code",
            icon: "card",
            // validateError: "Please validated account number!.",
            // isValidatedError: 1,
            // isBankSupportKey:1,
            cssClass: "col",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid IFSC Number!.",
            patternError: "Please proper IFSC Number!.",
            validators: {
              required: true,
              pattern: "^[A-Z]{4}0[A-Z0-9]{6}$",
            },
          },
          {
            inputtype: 2,
            placeholder: "Account Number",
            name: "account_number",
            cssClass: "col",
            label: "Name:",
            value: "",
            icon: "keypad",
            // isBank:1,
            inital: 0,
            // validateError: "Please validated account number",
            // isValidatedError: 1,
            type: "number",
            requiredError: "Please enter a valid Account Number!.",
            patternError: "Please proper Account Number!.",
            validators: {
              required: true,
              pattern: "[0-9]{9,18}",
            },
          },
          {
            inputtype: 6,
            placeholder: "checkbx",
            name: "checkbx1",
            cssClass: "col",
            label: "I accept terms & condition",
            header: "Terms and Condition",
            message: "",
            dialogType: 1,
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please accept agreement!.",
            patternError: "Please proper full name!.",
            validators: {
              required: true,
              // pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
            },
          },
          {
            inputtype: 3,
            placeholder: "IFSC Number",
            name: "btn1",
            cssClass: "pt-5",
            label: "Register",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid full name!.",
            patternError: "Please proper full name!.",
            validators: {
              // required: true,
              // pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
            },
          },
        ],
      },
    ],
  };
  form: any = this.temp;
  constructor(
    private formBuilder: FormBuilder,
    public apiservice: APIService,
    private navctrl: NavController,
    private storage: Storage,
    public state: StateService,
    private CommonHelper: CommonHelperService,
    public helper: Helper
  ) {}
  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case "min":
            validatorsToAdd.push(Validators.min(value));
            break;
          case "max":
            validatorsToAdd.push(Validators.max(value));
            break;
          case "required":
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case "requiredTrue":
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case "email":
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case "minLength":
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case "maxLength":
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case "pattern":
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case "nullValidator":
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }
      console.log("name", control.name);
      console.log(control.value);
      this.myForm.addControl(
        control.name,
        this.formBuilder.control(control.value, validatorsToAdd)
      );
    }
  }
  ngOnInit() {}
  changeOrgz(event: any) {
    let arr: any = {
      header: [
        {
          headernm: "Personal Details",
          index: 0,
          controls: [
            {
              inputtype: 2,
              placeholder: "Full Name",
              name: "fullName",
              cssClass: "col",
              label: "Name:",
              value: "",
              inital: 0,
              type: "text",
              requiredError: "Please enter a valid full name!.",
              patternError: "Please proper full name!.",
              validators: {
                required: true,
                pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
              },
            },
            {
              inputtype: 2,
              placeholder: "Official Mobile",
              name: "mobile",
              cssClass: "col",
              label: "Name:",
              value: "",
              inital: 0,
              type: "text",
              requiredError: "Please enter a valid full name!.",
              patternError: "Please proper full name!.",
              validators: {
                required: true,
                pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
              },
            },
            {
              inputtype: 2,
              placeholder: "Official Email",
              name: "email",
              cssClass: "col",
              label: "Name:",
              value: "",
              inital: 0,
              type: "text",
              requiredError: "Please enter a valid full name!.",
              patternError: "Please proper full name!.",
              validators: {
                required: true,
                pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
              },
            },
            {
              inputtype: 2,
              placeholder: "Password",
              name: "password",
              cssClass: "col",
              label: "Name:",
              value: "",
              inital: 0,
              type: "text",
              requiredError: "Please enter a valid full name!.",
              patternError: "Please proper full name!.",
              validators: {
                required: true,
                pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
              },
            },
            {
              inputtype: 3,
              placeholder: "Password",
              name: "password",
              cssClass: "col",
              label: "Proceed to Business Detailsy",
              value: "",
              inital: 0,
              type: "text",
              requiredError: "Please enter a valid full name!.",
              patternError: "Please proper full name!.",
              validators: {
                required: true,
                pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
              },
            },
          ],
        },
        {
          headernm: "Business Details",
          index: 1,
          controls: [
            {
              inputtype: 4,
              placeholder: "CP Name",
              name: "org",
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
                { index: 2, value: "CP indivisual" },
                { index: 3, value: "FOS" },
              ],
              requiredError: "Please enter a valid full name!.",
              patternError: "Please proper full name!.",
              validators: {
                required: true,
                pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
              },
            },
            {
              inputtype: 2,
              is_fos: 0,
              is_cp: 1,
              is_cp_indivial: 1,
              placeholder: "CP Name",
              name: "cp_nm",
              cssClass: "col",
              label: "Name:",
              value: "",
              inital: 0,
              type: "text",
              requiredError: "Please enter a valid full name!.",
              patternError: "Please proper full name!.",
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
              name: "billing_nm",
              cssClass: "col",
              label: "Name:",
              value: "",
              inital: 0,
              type: "text",
              requiredError: "Please enter a valid full name!.",
              patternError: "Please proper full name!.",
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
              placeholder: "Rera Number",
              name: "rera",
              cssClass: "col",
              label: "Name:",
              value: "",
              inital: 0,
              type: "text",
              requiredError: "Please enter a valid full name!.",
              patternError: "Please proper full name!.",
              validators: {
                required: true,
                pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
              },
            },
            {
              is_fos: 1,
              is_cp: 1,
              is_cp_indivial: 1,
              inputtype: 2,
              placeholder: "PAN Number",
              name: "pan_no",
              cssClass: "col",
              label: "Name:",
              value: "",
              inital: 0,
              type: "text",
              requiredError: "Please enter a valid full name!.",
              patternError: "Please proper full name!.",
              validators: {
                required: true,
                pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
              },
            },
            {
              is_fos: 1,
              is_cp: 1,
              is_cp_indivial: 1,
              inputtype: 2,
              placeholder: "GST Number",
              name: "gst_no",
              cssClass: "col",
              label: "Name:",
              value: "",
              inital: 0,
              type: "text",
              requiredError: "Please enter a valid full name!.",
              patternError: "Please proper full name!.",
              validators: {
                required: true,
                pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
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
    // let putarr = [];
    console.log(arr);
    if (event.value == 1) {
      let temp_arr = [];
      arr.header.filter((item: any) => {
        if (item.index == 1) {
          temp_arr = item.controls.filter((it) => it.is_cp);
          return temp_arr;
        }
      });
      this.form.header[0].controls = [];
      this.form.header[0].controls = temp_arr;
    } else if (event.value == 2) {
      let temp_arr = [];
      arr.header.filter((item: any) => {
        if (item.index == 1) {
          temp_arr = item.controls.filter((it) => it.is_cp_indivial);
          return temp_arr;
        }
      });
      this.form.header[0].controls = temp_arr;
    } else if (event.value == 3) {
      // console.log(event.value,"vvvvv")
      let temp_arr = [];
      arr.header.filter((item: any) => {
        if (item.index == 1) {
          temp_arr = item.controls.filter((it) => it.is_fos);
          temp_arr.map((item) => {
            console.log("item", item);
            if (item.name == "btn2") {
              item.label = "Register";
              return item;
            } else {
              return item;
            }
            // ...item,lable
            return item;
          });
          return temp_arr;
        }
      });
      this.form.header[0].controls = temp_arr;
    }
    // console.log(putarr)
    // console.log(event.value)
  }
  bankFormValidation($event: FormGroup) {
    this.CommonHelper.presentLoading().then(() => {
      try {
        let controls = $event.controls;
        let invalid = false;

        let form_fields = [];
        let form_fields_for_DB = [];
        this.form.header.forEach((element: any) => {
          element.controls.map((item) => {
            if (item.isValidatedError == 1) {
              form_fields.push(item.name);
            }
            // if (item.isValidatedtoDBError == 1) {
            //   form_fields_for_DB.push(item.name);
            // }
            return item;
          });
        });
        let newcontrols = Object.keys(controls).sort((a: any, b: any) => {
          return a - b;
        });
        newcontrols = newcontrols.reverse();
        newcontrols.forEach((key) => {
          console.log({ key });

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
          if (key == "checkbx1") {
            console.log("checkbox");
            this.form.header.forEach((element: any) => {
              let errormsg = element.controls.find((item) => item.name == key);
              if (controls[key].value == false) {
                this.CommonHelper.presentToast(errormsg.requiredError);
                invalid = true;
                return;
              }
            });
            console.log(controls[key].value);
            // break;
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
        let formdata = this.state.formValue.value;
        let aftersubmit = $event.value;
        this.state.formValue.next({ ...formdata, ...aftersubmit });
        // "registration_type_id",'name', 'billing_name', 'rera_no', 'pan_no', 'gst_no', 'bank_name', 'branch_name', 'account_number', 'ifsc_code',
        // 'fos_name', 'mobile', 'email', 'fos_aadhar', 'fos_pan_card',
        // 'password'
        let body = this.state.formValue.value;
        delete body.btn;
        delete body.btn1;
        delete body.btn2;
        delete body.checkbx1;
        console.log({ body });
        // return;
        this.apiservice.cpRegistration(body).subscribe(
          (data: HttpResponse<any>) => {
            console.log(data);

            this.apiservice
              .cpReraDocUpload({
                cp_entity_id: data.body.data.cp_entity_id,
                file_uri: body.file_uri,
              })
              .subscribe(
                (res) => {
                  console.log(res);
                  if (res.success == 1) {
                    this.CommonHelper.presentToast("Registration Successful.");
                    let info: responsefromserver = data.body;
                    for (let key in info.data) {
                      console.log("Object", key);
                      if (key != "api_token") {
                        this.storage.set(key, info.data[key]);
                      } else {
                        this.storage.set("apiToken", info.data[key]);
                        this.storage.set("api_token", info.data[key]);
                      }
                      // console.log("value", info.data[key]);
                    }

                    this.storage.set("userinfo", JSON.stringify(info.data));
                    this.navctrl.navigateRoot("login", {
                      replaceUrl: true,
                    });
                  } else {
                    this.helper.presentAlertError("Something went to Wrong.");
                  }
                },
                (e) => {
                  this.helper.presentAlertError("Something went to Wrong");
                }
              );
          },

          (error) => {
            console.log(error);
            this.helper.presentAlertError("Something went to Wrong");
          }
        );
        // console.log("body", body);
        // console.log("validated1", this.state.formValue.value);
        // console.log("validated", $event.value);
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
}
