import { Component, OnInit } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import {
  LoadingController,
  NavController,
  Platform,
  ToastController,
} from "@ionic/angular";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ForgotPassword, Login } from "../../models/Login";
import { WebServer } from "../../services/WebServer";
import { Network } from "@ionic-native/network/ngx";
import { APIService } from "../../services/APIService";
import { Storage } from "@ionic/storage";
import { Helper } from "../../services/Helper";
import { PostRegistrationResponce } from "../../models/PostRegistrationResponce";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-verify-otp-screen",
  templateUrl: "./verify-otp-screen.page.html",
  styleUrls: ["./verify-otp-screen.page.scss"],
})
export class VerifyOtpScreenPage implements OnInit {
  verifyOTPForm: FormGroup;
  otpReceive: any;
  successvalue: any;
  mobile: any;
  baseUrl: any;
  public disabled = true;
  forgotPasswordInfo: ForgotPassword;
  credentialsForm: FormGroup;
  isResendOtp = true;
  confirmOtp: any;

  counter: any;

  // tslint:disable-next-line:max-line-length
  constructor(
    public router: Router,
    public helper: Helper,
    private storage: Storage,
    private apiservice: APIService,
    private route: ActivatedRoute,
    public webServer: WebServer,
    private network: Network,
    public nav: NavController,
    public http: HttpClient,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    public platform: Platform,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((otpData: ForgotPassword) => {
      this.forgotPasswordInfo = otpData;
      console.log(this.forgotPasswordInfo);
    });
    this.otpTimeStart(0);
  }

  timer(minute) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.counter = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
        this.isResendOtp = false;
      }
    }, 1000);
  }

  goToChangePassword() {
    // this.router.navigate(["/change-password/"]);
    // return;
    console.log("confirmotp", this.confirmOtp);
    console.log("confirmotp", this.forgotPasswordInfo.otp);
    if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
      this.helper.presentToast("Please on Internet Connection!");
    } else if (this.confirmOtp != this.forgotPasswordInfo.otp) {
      // Remember
      this.helper.presentToast("OTP does not match!");
    } else {
      this.helper.showLoader("");
      this.router.navigate(["/change-password/"], {
        queryParams: {
          user_id: this.forgotPasswordInfo.user_id,
          user_type_id: this.forgotPasswordInfo.user_type_id,
        },
      });
      this.helper.hideLoader();
    }
  }

  /**
   * Otps time start
   * @param num  0 means first time loaded page / 1  , means resend otp
   */
  otpTimeStart(num: number) {
    this.isResendOtp = true;
    this.timer(1);
    if (num === 1) {
      this.resendOtp();
    }
  }

  /*Click For Resend API Call*/
  resendOtp() {
    if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
      this.helper.presentToast("Please on Internet Connection");
    } else {
      // Call API
      const data = {
        api_token: this.webServer.API_TOKEN_EXTERNAL,
        mobile: this.forgotPasswordInfo.mobile_no,
        user_type_id: this.forgotPasswordInfo.user_type_id,
      };
      this.apiservice
        .forgotPasswordSendOTP(data)
        .map((httpResponse) => httpResponse.body)
        .subscribe(
          (otpInfo) => {
            if (otpInfo.success === 1) {
              const otpData = otpInfo.data;
              this.forgotPasswordInfo.otp = otpData.otp;
              console.log(otpData);
            } else {
              this.helper.presentToast("Something went wrong!");
            }
          },
          (error) => {
            this.helper.presentToast("Something went wrong!");
          }
        );
    }
  }
  ionViewDidLeave() {
    this.confirmOtp = null;
  }
}
