import { Component, OnInit } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Platform, ToastController } from "@ionic/angular";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ForgotPassword, Login } from "../../models/Login";
import { WebServer } from "../../services/WebServer";
import { Network } from "@ionic-native/network/ngx";
import { APIService } from "../../services/APIService";
import { Helper } from "../../services/Helper";
import { PostLoginResponce } from "../../models/PostLoginResponce";
import { Storage } from "@ionic/storage";
import { map } from "rxjs/operators";

function passwordMatchValidator(password: string): ValidatorFn {
  return (control: FormControl) => {
    // console.log(control);
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(password).value === control.value
      ? null
      : { mismatch: true };
  };
}

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.page.html",
  styleUrls: ["./change-password.page.scss"],
})
export class ChangePasswordPage implements OnInit {
  // tslint:disable-next-line:ban-types
  isActiveToggleTextPassword: Boolean = true;
  // tslint:disable-next-line:ban-types
  isActiveToggleTextPassword1: Boolean = true;
  forgotPasswordInfo: any = {};
  successValue: any;
  changedPasswordForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(
    public router: Router,
    private storage: Storage,
    public helper: Helper,
    public route: ActivatedRoute,
    private apiservice: APIService,
    public webServer: WebServer,
    private network: Network,
    public platform: Platform,
    private toastController: ToastController,
    private fb: FormBuilder
  ) {
    this.changedPasswordForm = this.fb.group({
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          // Validators.maxLength(8),
        ],
      ],
      confirmPassword: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          // Validators.maxLength(8),
          passwordMatchValidator("password"),
        ],
      ],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((otpData: any) => {
      // console.table(otpData);
      this.forgotPasswordInfo.user_id = otpData.user_id;
      this.forgotPasswordInfo.user_type_id = otpData.user_type_id;
    });
  }

  /*Change Passsword*/
  changePassword() {
    if (this.changedPasswordForm.invalid) {
      return;
    }

    let data = {
      password: this.changedPasswordForm.value.password,
      user_id: this.forgotPasswordInfo.user_id,
      user_type_id: this.forgotPasswordInfo.user_type_id,
      api_token: this.webServer.API_TOKEN_EXTERNAL,
    };
    this.helper.showLoader("");
    this.apiservice
      .updatePassword(data)
      .pipe(map((response) => response.body))
      .subscribe(
        (updatePassData) => {
          console.log(updatePassData);
          if (updatePassData.success == 1) {
            // this.helper.showLoader("Password change successfully");
            this.helper.hideLoader();

            this.helper.presentAlert(
              "",
              "Password Updated!",
              "OK",
              "cancel",
              () => {
                this.changedPasswordForm.reset();
                this.helper.redirectionOfUser();
              }
            );
          } else {
            this.helper.presentToast("Something went wrong!");
          }
        },
        (error) => {
          this.helper.presentToast("Something went wrong!");
        }
      );
  }

  /*TogglePassword*/
  public toggleTextPassword(event: any): void {
    event.preventDefault();
    this.isActiveToggleTextPassword =
      this.isActiveToggleTextPassword === true ? false : true;
  }

  /*TogglePassword*/
  public toggleTextPassword1(event: any): void {
    event.preventDefault();
    this.isActiveToggleTextPassword1 =
      this.isActiveToggleTextPassword1 === true ? false : true;
  }

  public getType() {
    return this.isActiveToggleTextPassword ? "password" : "text";
  }

  public getTypeNew() {
    return this.isActiveToggleTextPassword1 ? "password" : "text";
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.changedPasswordForm.controls[controlName].hasError(errorName);
  };
}
