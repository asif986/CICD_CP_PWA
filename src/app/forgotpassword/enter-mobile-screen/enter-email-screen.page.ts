import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  ActionSheetController,
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
import { Router, RouterModule } from "@angular/router";
import { Network } from "@ionic-native/network/ngx";
import { Storage } from "@ionic/storage";
import { Login } from "../../models/Login";
import { WebServer } from "../../services/WebServer";
import { APIService } from "../../services/APIService";
import { Helper } from "../../services/Helper";

@Component({
  selector: "app-enter-email-screen",
  templateUrl: "./enter-email-screen.page.html",
  styleUrls: ["./enter-email-screen.page.scss"],
})
export class EnterEmailScreenPage implements OnInit, OnDestroy {
  successValue: any;
  credentialsForm: FormGroup;
  Regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
  counter: string;
  // loginifo: Login = new Login();

  users = [
    { id: 1, userName: "CP" },
    { id: 2, userName: "FOS" },
  ];
  userTypeId: any;
  // tslint:disable-next-line:max-line-length
  constructor(
    public router: Router,
    public helper: Helper,
    private apiservice: APIService,
    public webServer: WebServer,
    public platform: Platform,
    public toastController: ToastController,
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private network: Network,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController
  ) {
    this.credentialsForm = this.formBuilder.group({
      mobile: [
        "",
        Validators.compose([
          Validators.pattern(this.Regex),
          Validators.required,
        ]),
      ],
    });
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(["/login/"]);
    });
  }

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
  }

  /*SendOTP*/
  sendOTP(value: any) {
    // this.router.navigate(["/verify-otp-screen/" + "123456"]);
    // return;
    if (this.userTypeId == null) {
      this.helper.presentToast("Please Select the CP OR FOS!");
    } else if (value.mobile.toString().length < 10) {
      this.helper.presentToast("Please Enter valid Mobile Number!");
    } else if (
      !(this.network.type !== "none" && this.network.type !== "unknown")
    ) {
      this.helper.presentToast("Please on Internet Connection!");
    } else {
      let mobile_no = value.mobile;
      const data = {
        api_token: this.webServer.API_TOKEN_EXTERNAL,
        mobile: mobile_no,
        user_type_id: this.userTypeId,
      };

      this.apiservice
        .forgotPasswordSendOTP(data)
        .map((httpResponse) => httpResponse.body)
        .subscribe(
          (response) => {
            // console.log(response);
            this.helper.showLoader("");
            if (response.success === 1) {
              const otpData = response.data;
              this.helper.hideLoader();
              this.router.navigate(["/verify-otp-screen/"], {
                queryParams: {
                  ...otpData,
                  user_type_id: this.userTypeId,
                  mobile_no,
                },
                // replaceUrl: true
              });
            } else {
              this.helper.presentToast("Your account does not exists!");
            }
            // return response;
          },
          (error) => {
            this.helper.presentToast("Something went wrong!");
          }
        );
    }
  }

  changeUser(userTypeId: any) {
    // console.log(userTypeId.value);
    this.userTypeId = userTypeId.value;
  }
  ngOnDestroy() {}
  ionViewDidLeave() {
    // console.log("component destoryed");
    this.userTypeId = null;
    this.credentialsForm.get("mobile").patchValue("");
    this.credentialsForm.reset();
  }
}
