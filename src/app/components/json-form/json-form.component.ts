import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JsonFormControls, JsonFormData } from "src/app/Model/JsonToform";

import { APIService } from "src/app/services/APIService";
import { AlertController } from "@ionic/angular";
import { CommonHelperService } from "./../../services/common-helper.service";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { DataService } from "./../../services/data.service";
import { HttpResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material";
import { StateService } from "./../../services/state.service";
import { responsefromSalesPerson } from "src/app/models/business-details";

@Component({
  selector: "app-json-form",
  templateUrl: "./json-form.component.html",
  styleUrls: ["./json-form.component.scss"],
})
export class JsonFormComponent implements OnChanges, AfterContentChecked {
  @Input() jsonFormData: any;
  @Input() isRadioAvailable: any;
  @Output() returnformdata = new EventEmitter<FormGroup>();
  @Output() returnchangeorg = new EventEmitter<any>();
  @Output() returnvaliadation = new EventEmitter<any>();

  defGstApplicable = "Yes";
  salePersonList: any = [];
  foods: any[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" },
  ];
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any;
  otp: string;
  showOtpComponent = true;
  config: any = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "50px",
      height: "50px",
    },
  };
  public myForm: FormGroup = this.fb.group({});
  isChecked: Boolean = false;

  constructor(
    private fb: FormBuilder,
    public alertctrl: AlertController,
    public dialog: MatDialog,
    private cdref: ChangeDetectorRef,
    public CommonHelper: CommonHelperService,
    private state: StateService,
    public dataSer: DataService,
    private apiService: APIService
  ) {}
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.isRadioAvailable == 1) {
      this.state.formArray.subscribe((data) => {
        console.log({ data });
        if (data != null) {
          this.jsonFormData.header = [...data];
          let controls = this.myForm.controls;
          Object.keys(controls).forEach((formcontrols) => {
            if (formcontrols != "registration_type_id") {
              this.myForm.removeControl(formcontrols);
            }
          });
          this.jsonFormData.header.forEach((element: any) => {
            console.log("controls", element.controls);

            this.createForm(element.controls);
          });
        } else {
          console.log(this.jsonFormData);
          this.jsonFormData.header.forEach((element: any) => {
            console.log("controls", element.controls);
            this.createForm(element.controls);
          });
        }
      });
    } else {
      this.jsonFormData.header.forEach((element: any) => {
        console.log("controls 64", element.controls);
        this.createForm(element.controls);
      });
    }
    // console.log("controls", "element.controls");
  }
  // console.log("changes");

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
      this.myForm.addControl(
        control.name,
        this.fb.control(
          { value: control.value, disabled: control.disabled },
          validatorsToAdd
        )
      );
      // console.log("name", control.name);
      // this.myForm.controls[control.name].setErrors(null);
      // this.myForm.controls[control.value].updateValueAndValidity();
    }
  }

  ngOnInit() {
    let event: any = {};
    event.value = 1;
    this.changeOrgz(event);
    // console.log("Im'm calling 164");

    this.apiService.getAllSalesPerson().subscribe((data: HttpResponse<any>) => {
      let allSalesPerson: responsefromSalesPerson = data.body;
      if (allSalesPerson.success == 1) {
        this.salePersonList = allSalesPerson.data;
        console.log(this.salePersonList);
      }
    });

    // console.log("Compentned called")
    // event.value =1;
    // console.log("data",this.jsonFormData)
    //  this.changeOrgz(1)
  }

  changeGstApplicable(event: any) {
    console.log(event);
    if (event == "No") {
      this.openDialog(
        "Terms and Conditions",
        "We have not applicable for GST, Will Share No GST Deceleration with you.",
        2
      );
      this.defGstApplicable = "No";
      this.myForm.controls["gst_no"].setValidators(null);
      this.myForm.controls["gst_no"].updateValueAndValidity();
      console.log(this.myForm);
    } else {
      this.myForm.controls["gst_no"].setValidators([Validators.required]);
      this.myForm.controls["gst_no"].updateValueAndValidity();
      console.log(this.myForm);
    }
  }
  onSubmit() {
    console.log("Form valid: ", this.myForm.valid);
    console.log("Form values: ", this.myForm.value);
  }
  openDialog(header, message = "Terms and Conditions", dialogType) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      data: {
        header: header,
        message: message,
        buttonText: {
          ok: "Agree",
          cancel: "Disgree",
        },
        dialogType: dialogType,
      },
    });
    // const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      if (data.dialogType == 2) {
        if (data.close) {
          this.myForm.addControl("gst_msg", this.fb.control(message, []));
        } else {
          this.myForm.controls["gst_no"].setValidators([Validators.required]);
          this.myForm.controls["gst_no"].updateValueAndValidity();
          this.defGstApplicable = "Yes";
        }
      } else {
        if (data.close) {
          // snack.dismiss();
          console.log("Confirmed");
          this.myForm.controls["checkbx1"].setValue(true);
          const a = document.createElement("a");
          a.click();
          a.remove();
          // snack.dismiss();
          // this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
          //   duration: 2000,
          // });
        } else {
          this.myForm.controls["checkbx1"].setValue(false);
        }
      }
    });
  }

  submitBankDetails(index: any) {
    console.log(index);

    if (index >= 2) {
      return;
    }
    if (this.myForm.controls["org"].value == 3) {
      console.log("submit");
      return;
    }

    let bankDetailsErros = [
      {
        formnm: "org",
        requiredError: "Please enter a valid org!.",
        patternError: "Please proper org!.",
      },
      {
        formnm: "name",
        requiredError: "Please enter a valid channel partner name!.",
        patternError: "Please proper channel partner name!.",
      },
      {
        formnm: "billing_name",
        requiredError: "Please enter a valid Billing name!.",
        patternError: "Please proper Billing name!.",
      },
      {
        formnm: "rera_no",
        requiredError: "Please enter a valid RERA number!.",
        patternError: "Please proper RERA number!.",
      },
      {
        formnm: "pan_no",
        requiredError: "Please enter a valid PAN NO!.",
        patternError: "Please proper PAN NO!.",
      },
      {
        formnm: "gst_no",
        requiredError: "Please enter a valid GST number!.",
        patternError: "Please proper GST number!.",
      },
    ];
  }
  changeOrgz(event: any) {
    console.log("s", event.value);
    let value = 1;
    if (value != undefined) {
      value = event.value;
    }
    this.returnchangeorg.emit(value);
  }

  submitData() {
    console.log(this.myForm);
    this.returnformdata.emit(this.myForm);
  }

  async otpVerification() {
    console.log("called");
  }
  onOtpChange(otp) {
    this.otp = otp;
  }
  setVal(val) {
    this.ngOtpInput.setValue(val);
  }
  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
  toggleBtn(ctrlnm: string, defaultval: any) {
    const modifiedata = this.jsonFormData.header.map((element: any) => {
      const subElement = element.controls.map((item) => {
        if (item.name == ctrlnm) {
          item.defaultval = !item.defaultval;
        }
        return item;
      });
      return { headernm: element.headernm, controls: subElement };
    });
    console.log("modifiedata", modifiedata);
  }
  validate2() {}
  validateCards(doc_type) {
    this.CommonHelper.presentLoading().then(() => {
      if (
        this.myForm.controls[doc_type].hasError("required") ||
        this.myForm.controls[doc_type].hasError("pattern")
      ) {
        this.jsonFormData.header.forEach((element: any) => {
          let single_controls = element.controls.find(
            (item) => item.name == doc_type
          );
          if (this.myForm.controls[doc_type].hasError("required")) {
            this.CommonHelper.presentToast(single_controls.requiredError);
          } else if (this.myForm.controls[doc_type].hasError("pattern")) {
            this.CommonHelper.presentToast(single_controls.patternError);
          }
        });
        this.CommonHelper.dismissLoading();
        return;
      } else {
        try {
          let values = this.myForm.controls[doc_type].value;
          let isRegistrationKeyPresent = false;
          Object.keys(this.myForm.controls).forEach((item) => {
            if (item == "registration_type_id") {
              isRegistrationKeyPresent = true;
            }
          });
          // let registration_type_id = this.myForm.get('registration_type_id').value;
          // return;
          if (isRegistrationKeyPresent) {
            let body =
              "?doc_type=" +
              doc_type +
              "&doc_no=" +
              values +
              "&for=" +
              (this.myForm.controls["registration_type_id"].value == 1
                ? "cp"
                : "fos");
            let single_controls: any = {};
            let checkOnlyinDb = [];
            let checkWithCPnameArray = [];
            let checkWithPersonNameArray = [];
            let checkOnlyinvalidateApi = [];
            let stricktcheck = [];

            this.jsonFormData.header.forEach((element: any) => {
              single_controls = {
                ...element.controls.find((item) => item.name == doc_type),
              };
              checkOnlyinDb = element.controls.filter((item2) => {
                return item2.isValidatedtoDBError == 1;
              });
              checkOnlyinDb = checkOnlyinDb.map((item3) => item3.name);
              checkOnlyinvalidateApi = element.controls.filter((item2) => {
                return item2.isValidatedError == 1;
              });
              checkOnlyinvalidateApi = checkOnlyinvalidateApi.map(
                (item3) => item3.name
              );
              stricktcheck = element.controls.filter((item2) => {
                return item2.isStrictCheck == 1;
              });
              checkWithCPnameArray = element.controls.filter((item2) => {
                return item2.ischeckWithCPName == 1;
              });
              // filter origin object then get only name of that control
              checkWithCPnameArray =
                JsonFormComponent.convertTONameFromArrayOfaobject(
                  checkWithCPnameArray
                );
              checkWithPersonNameArray = element.controls.filter((item2) => {
                return item2.ischeckWithPersonName == 1;
              });
              console.log({ checkWithCPnameArray });
              checkWithPersonNameArray =
                JsonFormComponent.convertTONameFromArrayOfaobject(
                  checkWithPersonNameArray
                );
              // filter origin object then get only name of that control
              stricktcheck = stricktcheck.map((item3) => item3.name);
            });
            console.log("header", single_controls);
            console.log("checkOnlyinDb", checkOnlyinDb);
            console.log("checkWithPersonNameArray", checkWithPersonNameArray);
            console.log("checkWithCPnameArray", checkWithCPnameArray);
            console.log("checkOnlyinvalidateApi", checkOnlyinvalidateApi);
            console.log("stricktcheck", stricktcheck);

            if (checkOnlyinDb.includes(doc_type)) {
              this.apiService
                .getCardValidation(body)
                .subscribe((data: HttpResponse<any>) => {
                  console.log(data.body);
                  this.CommonHelper.dismissLoading();
                  // let single_controls_focheckin:any={}
                  let personDetails = this.dataSer.persondetailsForm();
                  let busisnessDetails = this.dataSer.businessDetailsForms();
                  // console.log(single_controls_focheckin)
                  // return;
                  let single_controls_focheckin: any = {};
                  // if (true) {
                  if (data.body == 0) {
                    if (checkOnlyinvalidateApi.includes(doc_type)) {
                      if (checkWithPersonNameArray.includes(doc_type)) {
                        this.apiService
                          .kycVerifications_registration(
                            single_controls.isValidatedid,
                            values
                          )
                          .subscribe(
                            //DURAISAMY MANIKANDAN
                            //BNZPM2501F
                            //MONIKA MAHADEV SHINDE
                            //EJAPS0276M
                            //532859830339
                            (data: any) => {
                              try {
                                console.log("validated", data);
                                let alreadyData = this.state.formValue.value;
                                personDetails.header.forEach((element: any) => {
                                  single_controls_focheckin = {
                                    ...element.controls.find(
                                      (item) => item.ischekble == 1
                                    ),
                                  };
                                });

                                if (stricktcheck.includes(doc_type)) {
                                  let personDetailsform =
                                    this.state.persondetails.value;
                                  console.log(personDetailsform);
                                  let newPerson: any = {};
                                  newPerson.header =
                                    personDetailsform.header.map((item) => {
                                      const modifiedItem = item.controls.map(
                                        (item2) => {
                                          if (
                                            item2.name ==
                                            single_controls_focheckin.name
                                          ) {
                                            return {
                                              ...item2,
                                              value: data.data.full_name,
                                              disabled: true,
                                            };
                                          } else {
                                            return item2;
                                          }
                                        }
                                      );

                                      return {
                                        headernm: item.headernm,
                                        index: item.index,
                                        controls: modifiedItem,
                                      };
                                    });
                                  console.log(newPerson);
                                  this.state.persondetails.next(null);
                                  this.state.persondetails.next(newPerson);

                                  this.CommonHelper.presentToast(
                                    single_controls_focheckin.validationSucess
                                  );
                                  this.myForm.controls[doc_type].disable();
                                  // if (
                                  //   alreadyData[
                                  //     single_controls_focheckin.name
                                  //   ].toLowerCase() ==
                                  //   data.data.full_name.toLowerCase()
                                  // ) {
                                  //   this.myForm.controls[doc_type].disable();
                                  //   this.CommonHelper.presentToast(
                                  //     single_controls.verificationmsg
                                  //   );
                                  // } else {
                                  //   this.CommonHelper.presentToast(
                                  //     single_controls.stricklyfailedmsg
                                  //   );
                                  //   // return;
                                  // }
                                  this.CommonHelper.dismissLoading();
                                } else {
                                  this.myForm.controls[doc_type].disable();
                                  this.CommonHelper.presentToast(
                                    single_controls.verificationmsg
                                  );
                                }
                                this.CommonHelper.dismissLoading();
                                return;
                              } catch (error) {
                                console.log(error);
                                this.CommonHelper.presentToast(
                                  "something goes wrong"
                                );

                                this.CommonHelper.dismissLoading();
                              }
                            },
                            (error) => {
                              this.CommonHelper.presentToast(
                                error.error.message
                              );
                              this.CommonHelper.dismissLoading();
                              return;
                            }
                          );
                      } else {
                        this.apiService
                          .kycVerifications_registration(
                            single_controls.isValidatedid,
                            values
                          )
                          .subscribe(
                            //DURAISAMY MANIKANDAN
                            //BNZPM2501F
                            //MONIKA MAHADEV SHINDE
                            //EJAPS0276M
                            //532859830339
                            (data: any) => {
                              try {
                                console.log("validated", data);
                                let alreadyData = this.state.formValue.value;
                                personDetails.header.forEach((element: any) => {
                                  single_controls_focheckin = {
                                    ...element.controls.find(
                                      (item) => item.ischekble == 1
                                    ),
                                  };
                                });

                                if (stricktcheck.includes(doc_type)) {
                                  // if (
                                  //   alreadyData[
                                  //     single_controls_focheckin.name
                                  //   ].toLowerCase() ==
                                  //   data.data.full_name.toLowerCase()
                                  // ) {
                                  //   this.myForm.controls[doc_type].disable();
                                  //   this.CommonHelper.presentToast(
                                  //     single_controls.verificationmsg
                                  //   );
                                  // } else {
                                  //   this.CommonHelper.presentToast(
                                  //     single_controls.stricklyfailedmsg
                                  //   );
                                  //   // return;
                                  // }
                                  this.CommonHelper.dismissLoading();
                                } else {
                                  this.myForm.controls[doc_type].disable();
                                  this.CommonHelper.presentToast(
                                    single_controls.verificationmsg
                                  );
                                }
                                this.CommonHelper.dismissLoading();
                                return;
                              } catch (error) {
                                console.log(error);
                                this.CommonHelper.presentToast(
                                  "something goes wrong"
                                );

                                this.CommonHelper.dismissLoading();
                              }
                            },
                            (error) => {
                              this.CommonHelper.presentToast(
                                error.error.message
                              );
                              this.CommonHelper.dismissLoading();
                              return;
                            }
                          );
                      }
                      if (checkWithCPnameArray.includes(doc_type)) {
                        this.apiService
                          .kycVerifications_registration(
                            single_controls.isValidatedid,
                            values
                          )
                          .subscribe(
                            //DURAISAMY MANIKANDAN
                            //BNZPM2501F
                            //MONIKA MAHADEV SHINDE
                            //EJAPS0276M
                            //532859830339
                            (data: any) => {
                              try {
                                console.log("validated", data);
                                personDetails.header.forEach((element: any) => {
                                  single_controls_focheckin = {
                                    ...element.controls.find(
                                      (item) => item.ischekble == 1
                                    ),
                                  };
                                });

                                //get current page values
                                let alreadyDataforcp = this.myForm.value;
                                busisnessDetails.header.forEach(
                                  (element: any) => {
                                    single_controls_focheckin = {
                                      ...element.controls.find((item) => {
                                        console.log(item);
                                        return item.ischekbleforcp == 1;
                                      }),
                                    };
                                    console.log(single_controls_focheckin);
                                  }
                                );
                                console.log({ alreadyDataforcp });
                                console.log({ single_controls_focheckin });
                                if (stricktcheck.includes(doc_type)) {
                                  let perfrm: any = this.myForm.value;
                                  console.log({ perfrm });
                                  for (let singlecontrol in perfrm) {
                                    if (
                                      singlecontrol ==
                                      single_controls_focheckin.name
                                    ) {
                                      this.myForm.controls[
                                        singlecontrol
                                      ].setValue(data.data.full_name);
                                      this.myForm.controls[
                                        singlecontrol
                                      ].disable();
                                      this.myForm.controls[doc_type].disable();
                                      this.CommonHelper.presentToast(
                                        single_controls_focheckin.validationSucess
                                      );
                                    }
                                  }

                                  this.CommonHelper.dismissLoading();
                                } else {
                                  this.myForm.controls[doc_type].disable();
                                  this.CommonHelper.presentToast(
                                    single_controls.verificationmsg
                                  );
                                }
                                this.CommonHelper.dismissLoading();
                                return;
                              } catch (error) {
                                console.log(error);
                                this.CommonHelper.presentToast(
                                  "something goes wrong"
                                );

                                this.CommonHelper.dismissLoading();
                              }
                            },
                            (error) => {
                              this.CommonHelper.presentToast(
                                error.error.message
                              );
                              this.CommonHelper.dismissLoading();
                              return;
                            }
                          );
                      }
                    } else {
                      this.myForm.controls[doc_type].disable();
                      this.CommonHelper.presentToast(
                        single_controls.verificationmsg
                      );
                    }
                  } else {
                    this.CommonHelper.dismissLoading();
                    this.CommonHelper.presentToast("Already Exists");
                    return;
                  }
                });
            }
            this.returnvaliadation.emit(body);
          } else {
            let body =
              "?doc_type=" + doc_type + "&doc_no=" + values + "&for=" + "cp";
            let single_controls: any = {};
            let checkOnlyinDb = [];
            let checkWithCPnameArray = [];
            let checkWithPersonNameArray = [];
            let checkOnlyinvalidateApi = [];
            let bankFieldCheckArray = [];
            let bankSupportFieldCheckArray = [];
            let stricktcheck = [];

            this.jsonFormData.header.forEach((element: any) => {
              single_controls = {
                ...element.controls.find((item) => item.name == doc_type),
              };
              checkOnlyinDb = element.controls.filter((item2) => {
                return item2.isValidatedtoDBError == 1;
              });
              checkOnlyinDb = checkOnlyinDb.map((item3) => item3.name);
              checkOnlyinvalidateApi = element.controls.filter((item2) => {
                return item2.isValidatedError == 1;
              });
              bankFieldCheckArray = element.controls.filter((item2) => {
                return item2.isBank == 1;
              });
              bankFieldCheckArray =
                JsonFormComponent.convertTONameFromArrayOfaobject(
                  bankFieldCheckArray
                );
              bankSupportFieldCheckArray = element.controls.filter((item2) => {
                return item2.isBankSupportKey == 1;
              });
              // bankSupportFieldCheckArray =
              //   JsonFormComponent.convertTONameFromArrayOfaobject(
              //     bankSupportFieldCheckArray
              //   );
              checkOnlyinvalidateApi = element.controls.filter((item2) => {
                return item2.isValidatedError == 1;
              });
              checkOnlyinvalidateApi =
                JsonFormComponent.convertTONameFromArrayOfaobject(
                  checkOnlyinvalidateApi
                );
              stricktcheck = element.controls.filter((item2) => {
                return item2.isStrictCheck == 1;
              });
              checkWithCPnameArray = element.controls.filter((item2) => {
                return item2.ischeckWithCPName == 1;
              });
              // filter origin object then get only name of that control
              checkWithCPnameArray =
                JsonFormComponent.convertTONameFromArrayOfaobject(
                  checkWithCPnameArray
                );
              checkWithPersonNameArray = element.controls.filter((item2) => {
                return item2.ischeckWithPersonName == 1;
              });
              console.log({ checkWithCPnameArray });
              checkWithPersonNameArray =
                JsonFormComponent.convertTONameFromArrayOfaobject(
                  checkWithPersonNameArray
                );
              // filter origin object then get only name of that control
              stricktcheck = stricktcheck.map((item3) => item3.name);
            });
            //bankSupportFieldCheckArray

            if (bankFieldCheckArray.includes(doc_type)) {
              let id_number = this.myForm.controls[doc_type].value;
              let subFormcheck = false;
              bankSupportFieldCheckArray.forEach((element: any) => {
                console.log({ element });
                let checkRequired =
                  this.myForm.controls[element.name].hasError("required");
                let checkpattern =
                  this.myForm.controls[element.name].hasError("pattern");
                // let supportBankfiled = element.name;

                let kyc = this.myForm.controls[element.name];
                if (checkRequired || checkpattern) {
                  subFormcheck = true;
                  if (checkRequired) {
                    this.CommonHelper.presentToast(element.requiredError);
                  }
                  if (checkpattern) {
                    this.CommonHelper.presentToast(element.patternError);
                  }
                }
                if (subFormcheck) {
                  this.CommonHelper.dismissLoading();
                } else {
                  // kycVerifications_registrationforBankOnly( id_number,ifsc) {
                  this.apiService
                    .kycVerifications_registrationforBankOnly(
                      id_number,
                      kyc.value
                    )
                    .subscribe(
                      (data: any) => {
                        // console.log(data.account_exists)
                        // console.log(data.data.account_exists)
                        if (data.data.account_exists == true) {
                          this.myForm.controls[doc_type].disable();
                          kyc.disable();
                          // console.log({supportBankfiled})
                          // this.myForm.controls[supportBankfiled].disable()
                          this.CommonHelper.presentToast(
                            "Bank account verified"
                          );
                        }
                        // console.log({data})
                      },
                      (error) => {
                        console.log(error.error.data.remarks);
                        // console.log(error.data.remarks)
                        // console.log(error.remarks)
                        this.CommonHelper.presentToast(
                          error.error.data.remarks
                        );
                      }
                    );
                  console.log("Call my api");
                }
              });
              // console.log({ bankFieldCheckArray });
              // console.log({ bankSupportFieldCheckArray });
            }
            if (checkOnlyinDb.includes(doc_type)) {
              this.apiService
                .getCardValidation(body)
                .subscribe((data: HttpResponse<any>) => {
                  console.log(data.body);
                  this.CommonHelper.dismissLoading();
                  // let single_controls_focheckin:any={}
                  let personDetails = this.dataSer.persondetailsForm();
                  let busisnessDetails = this.dataSer.businessDetailsForms();
                  // console.log(single_controls_focheckin)
                  // return;
                  let single_controls_focheckin: any = {};
                  // if (true) {
                  if (data.body == 0) {
                    if (checkOnlyinvalidateApi.includes(doc_type)) {
                      if (checkWithPersonNameArray.includes(doc_type)) {
                        this.apiService
                          .kycVerifications_registration(
                            single_controls.isValidatedid,
                            values
                          )
                          .subscribe(
                            //DURAISAMY MANIKANDAN
                            //BNZPM2501F
                            //MONIKA MAHADEV SHINDE
                            //EJAPS0276M
                            //532859830339
                            (data: any) => {
                              try {
                                console.log("validated", data);
                                let alreadyData = this.state.formValue.value;
                                personDetails.header.forEach((element: any) => {
                                  single_controls_focheckin = {
                                    ...element.controls.find(
                                      (item) => item.ischekble == 1
                                    ),
                                  };
                                });

                                if (stricktcheck.includes(doc_type)) {
                                  let personDetailsform =
                                    this.state.persondetails.value;
                                  console.log(personDetailsform);
                                  let newPerson: any = {};
                                  newPerson.header =
                                    personDetailsform.header.map((item) => {
                                      const modifiedItem = item.controls.map(
                                        (item2) => {
                                          if (
                                            item2.name ==
                                            single_controls_focheckin.name
                                          ) {
                                            return {
                                              ...item2,
                                              value: data.data.full_name,
                                              disabled: true,
                                            };
                                          } else {
                                            return item2;
                                          }
                                        }
                                      );

                                      return {
                                        headernm: item.headernm,
                                        index: item.index,
                                        controls: modifiedItem,
                                      };
                                    });
                                  console.log(newPerson);
                                  this.state.persondetails.next(null);
                                  this.state.persondetails.next(newPerson);

                                  this.CommonHelper.presentToast(
                                    single_controls_focheckin.validationSucess
                                  );
                                  this.myForm.controls[doc_type].disable();
                                  // if (
                                  //   alreadyData[
                                  //     single_controls_focheckin.name
                                  //   ].toLowerCase() ==
                                  //   data.data.full_name.toLowerCase()
                                  // ) {
                                  //   this.myForm.controls[doc_type].disable();
                                  //   this.CommonHelper.presentToast(
                                  //     single_controls.verificationmsg
                                  //   );
                                  // } else {
                                  //   this.CommonHelper.presentToast(
                                  //     single_controls.stricklyfailedmsg
                                  //   );
                                  //   // return;
                                  // }
                                  this.CommonHelper.dismissLoading();
                                } else {
                                  this.myForm.controls[doc_type].disable();
                                  this.CommonHelper.presentToast(
                                    single_controls.verificationmsg
                                  );
                                }
                                this.CommonHelper.dismissLoading();
                                return;
                              } catch (error) {
                                console.log(error);
                                this.CommonHelper.presentToast(
                                  "something goes wrong"
                                );

                                this.CommonHelper.dismissLoading();
                              }
                            },
                            (error) => {
                              this.CommonHelper.presentToast(
                                error.error.message
                              );
                              this.CommonHelper.dismissLoading();
                              return;
                            }
                          );
                      } else {
                        this.apiService
                          .kycVerifications_registration(
                            single_controls.isValidatedid,
                            values
                          )
                          .subscribe(
                            //DURAISAMY MANIKANDAN
                            //BNZPM2501F
                            //MONIKA MAHADEV SHINDE
                            //EJAPS0276M
                            //532859830339
                            (data: any) => {
                              try {
                                console.log("validated", data);
                                let alreadyData = this.state.formValue.value;
                                personDetails.header.forEach((element: any) => {
                                  single_controls_focheckin = {
                                    ...element.controls.find(
                                      (item) => item.ischekble == 1
                                    ),
                                  };
                                });

                                if (stricktcheck.includes(doc_type)) {
                                  // if (
                                  //   alreadyData[
                                  //     single_controls_focheckin.name
                                  //   ].toLowerCase() ==
                                  //   data.data.full_name.toLowerCase()
                                  // ) {
                                  //   this.myForm.controls[doc_type].disable();
                                  //   this.CommonHelper.presentToast(
                                  //     single_controls.verificationmsg
                                  //   );
                                  // } else {
                                  //   this.CommonHelper.presentToast(
                                  //     single_controls.stricklyfailedmsg
                                  //   );
                                  //   // return;
                                  // }
                                  this.CommonHelper.dismissLoading();
                                } else {
                                  this.myForm.controls[doc_type].disable();
                                  this.CommonHelper.presentToast(
                                    single_controls.verificationmsg
                                  );
                                }
                                this.CommonHelper.dismissLoading();
                                return;
                              } catch (error) {
                                console.log(error);
                                this.CommonHelper.presentToast(
                                  "something goes wrong"
                                );

                                this.CommonHelper.dismissLoading();
                              }
                            },
                            (error) => {
                              this.CommonHelper.presentToast(
                                error.error.message
                              );
                              this.CommonHelper.dismissLoading();
                              return;
                            }
                          );
                      }
                      if (checkWithCPnameArray.includes(doc_type)) {
                        this.apiService
                          .kycVerifications_registration(
                            single_controls.isValidatedid,
                            values
                          )
                          .subscribe(
                            //DURAISAMY MANIKANDAN
                            //BNZPM2501F
                            //MONIKA MAHADEV SHINDE
                            //EJAPS0276M
                            //532859830339
                            (data: any) => {
                              try {
                                console.log("validated", data);
                                personDetails.header.forEach((element: any) => {
                                  single_controls_focheckin = {
                                    ...element.controls.find(
                                      (item) => item.ischekble == 1
                                    ),
                                  };
                                });

                                //get current page values
                                let alreadyDataforcp = this.myForm.value;
                                busisnessDetails.header.forEach(
                                  (element: any) => {
                                    single_controls_focheckin = {
                                      ...element.controls.find((item) => {
                                        console.log(item);
                                        return item.ischekbleforcp == 1;
                                      }),
                                    };
                                    console.log(single_controls_focheckin);
                                  }
                                );
                                console.log({ alreadyDataforcp });
                                console.log({ single_controls_focheckin });
                                if (stricktcheck.includes(doc_type)) {
                                  let perfrm: any = this.myForm.value;
                                  console.log({ perfrm });
                                  for (let singlecontrol in perfrm) {
                                    if (
                                      singlecontrol ==
                                      single_controls_focheckin.name
                                    ) {
                                      this.myForm.controls[
                                        singlecontrol
                                      ].setValue(data.data.full_name);
                                      this.myForm.controls[
                                        singlecontrol
                                      ].disable();
                                      this.myForm.controls[doc_type].disable();
                                      this.CommonHelper.presentToast(
                                        single_controls_focheckin.validationSucess
                                      );
                                    }
                                  }

                                  this.CommonHelper.dismissLoading();
                                } else {
                                  this.myForm.controls[doc_type].disable();
                                  this.CommonHelper.presentToast(
                                    single_controls.verificationmsg
                                  );
                                }
                                this.CommonHelper.dismissLoading();
                                return;
                              } catch (error) {
                                console.log(error);
                                this.CommonHelper.presentToast(
                                  "something goes wrong"
                                );

                                this.CommonHelper.dismissLoading();
                              }
                            },
                            (error) => {
                              this.CommonHelper.presentToast(
                                error.error.message
                              );
                              this.CommonHelper.dismissLoading();
                              return;
                            }
                          );
                      }
                    } else {
                      this.myForm.controls[doc_type].disable();
                      this.CommonHelper.presentToast(
                        single_controls.verificationmsg
                      );
                    }
                  } else {
                    this.CommonHelper.dismissLoading();
                    this.CommonHelper.presentToast("Already Exists");
                    return;
                  }
                });
            }
          }
          console.log("not present registration");
          this.CommonHelper.dismissLoading();
        } catch (error) {
          console.log(error);
          this.CommonHelper.dismissLoading();
        }
      }
    });
  }
  public static convertTONameFromArrayOfaobject(Array: Array<any>): Array<any> {
    const convertedArray = Array.map((item) => item.name);
    return convertedArray;
  }
  public static convertTOArrayFromArrayOfaobjectFilter(
    Array: Array<any>,
    key: string
  ): Array<any> {
    const convertedArray = Array.map((item) => item[key]);
    return convertedArray;
  }
}
