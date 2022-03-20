import {
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

import { AlertController } from "@ionic/angular";
import { CommonHelperService } from "./../../services/common-helper.service";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material";
import { StateService } from "./../../services/state.service";

@Component({
  selector: "app-json-form",
  templateUrl: "./json-form.component.html",
  styleUrls: ["./json-form.component.scss"],
})
export class JsonFormComponent implements OnChanges {
  @Input() jsonFormData: any;
  @Input() isRadioAvailable: any;
  @Output() returnformdata = new EventEmitter<FormGroup>();
  @Output() returnchangeorg = new EventEmitter<any>();

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
    public CommonHelper: CommonHelperService,
    private state: StateService
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    console.log("controls", "element.controls");
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
        this.fb.control(control.value, validatorsToAdd)
      );
      console.log("name", control.name);
      // this.myForm.controls[control.name].setErrors(null);
      // this.myForm.controls[control.value].updateValueAndValidity();
    }
  }
  ngOnInit() {
    // console.log("Compentned called")
    // event.value =1;
    // console.log("data",this.jsonFormData)
    //  this.changeOrgz(1)
  }
  onSubmit() {
    console.log("Form valid: ", this.myForm.valid);
    console.log("Form values: ", this.myForm.value);
  }
  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        header: "Terms and Conditions",
        message: "Terms and Conditions",
        buttonText: {
          ok: "Agree",
          cancel: "Disgree",
        },
      },
    });
    // const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
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
          item.defaultval = !item.defaultval
        }
        return item
      });
      return { headernm: element.headernm, controls: subElement };
    });
    console.log("modifiedata", modifiedata);
  }
  validate2() {}
}
