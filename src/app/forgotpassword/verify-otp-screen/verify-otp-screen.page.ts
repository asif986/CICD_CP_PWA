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
import { Login } from "../../models/Login";
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
  OTP = "";
  public disabled = true;
  loginifo: Login = new Login();
  credentialsForm: FormGroup;
  isResendOtp = true;
  postregistrationresponce: PostRegistrationResponce;

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
  ) {
    this.postregistrationresponce = new PostRegistrationResponce();
    this.platform.resume.subscribe(() => {});

    this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(["/enter-mobile-screen/"]);
    });
  }

  ngOnInit() {
    this.timer(1);
    this.loginifo.otp = this.route.snapshot.paramMap.get("otp");
    /* this.presentToast(this.loginifo.otp);*/
    console.log(this.loginifo.otp);
    const me = this;
    me.storage.get("apiData").then((val) => {
      me.baseUrl = val.external_token;
      me.mobile = val.username;
      console.log(this.baseUrl);
      console.log(this.mobile);
    });
    this.ResendOtp();
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
    this.router.navigate(["/change-password/"]);
    return;
    console.log("confirmotp", this.loginifo.confirmotp);
    console.log("confirmotp", this.loginifo.otp);
    if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
      this.presentToast("Please on Internet Connection!");
    } else if (this.loginifo.confirmotp != this.loginifo.otp) {
      // Remember
      this.presentToast("OTP does not match!");
    } else {
      this.helper.showLoader("");
      this.router.navigate(["/change-password/"]);
      this.helper.hideLoader();
    }
  }

  /*Toast Message*/
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: "my-custom-class",
    });
    toast.present();
  }

  /*Loading*/
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Please wait...",
      duration: 1500,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  /*Resend OTP*/
  ResendOtp() {
    this.isResendOtp = true;
    this.timer(1);
  }
  /*Click For Resend API Call*/
  
  click() {
    const me = this;
    me.storage.get("apiData").then((val) => {
      me.baseUrl = val.external_token;
      me.mobile = val.username;
      this.loginifo.username = me.mobile;
      this.loginifo.api_token = me.baseUrl;
      if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
        this.presentToast("Please on Internet Connection");
      } else {
        // Call API
        this.apiservice.forgotPasswordSendOTP(this.loginifo).subscribe(
          (response) => {
            console.log("responseBody**" + JSON.stringify(response.body));
            this.successvalue = JSON.stringify(response.body);
            const Value = JSON.parse(this.successvalue);
            if (Value.success === 1) {
              const otpData = Value.data;
              console.log("responseBody 1" + otpData);
              this.loginifo.otp = otpData.otp;
              console.log(otpData.user_id);
              /*this.presentToast(this.loginifo.otp);*/
              console.log("otp" + this.loginifo.otp);
            } else {
              this.presentToast("Something went wrong!");
            }
            return response;
          },
          (error) => {
            this.presentToast("Something went wrong!");
          }
        );
      }
    });
  }
}
