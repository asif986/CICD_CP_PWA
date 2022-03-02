// import {StatusBar} from '@ionic-native/status-bar/ngx';
import {
  ActionSheetController,
  AlertController,
  Events,
  LoadingController,
  MenuController,
  NavController,
  Platform,
  ToastController,
} from "@ionic/angular";
import { BehaviorSubject, timer } from "rxjs";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { APIClient } from "../services/APIClient";
import { APIService } from "../services/APIService";
import { Helper } from "../services/Helper";
import { HttpClient } from "@angular/common/http";
import { Login } from "../models/Login";
import { Network } from "@ionic-native/network/ngx";
import { PostLoginResponce } from "../models/PostLoginResponce";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { WebServer } from "../services/WebServer";

// import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loader: any;
  successvalue: any;
  loginifo: Login;
  promptEvent: any;
  postloginresponce: PostLoginResponce;
  isLogin = true;
  authenticationState = new BehaviorSubject(false);
  credentialsForm: FormGroup;
  // tslint:disable-next-line:ban-types
  isActiveToggleTextPassword: Boolean = true;
  Regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  async;
  subscribe: any;
  verifyStatusId: any = 0;
  // tslint:disable-next-line:max-line-length
  constructor(
    public alertController: AlertController,
    public events: Events,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public helper: Helper,
    public apiClient: APIClient,
    public webServer: WebServer,
    public platform: Platform,
    public toastController: ToastController,
    private router: Router,
    public actionSheetController: ActionSheetController,
    private network: Network,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private apiservice: APIService,
    private http: HttpClient,
    private storage: Storage,
    private menuctrl: MenuController
  ) {
    window.addEventListener("beforeinstallprompt", (event) => {
      // alert(event);
      this.promptEvent = event;
    });
    console.log("promptEvent",this.promptEvent)
    console.log("promptEvent")
    if (this.promptEvent) {
      this.presentAlert(
        "Install application",
        "Do you wants to install applicaion ?"
      );
    }
    this.loginifo = new Login();
    this.postloginresponce = new PostLoginResponce();
    this.credentialsForm = this.formBuilder.group({
      mobile: [
        "",
        Validators.compose([
          Validators.pattern(this.Regex),
          Validators.required,
        ]),
      ],
      pwd: ["", Validators.compose([Validators.required])],
    });
    this.menuctrl.enable(false);

    /* this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
        if (this.constructor.name == 'LoginPage') {
            if (window.confirm('Do you want to exit from app?')) {
                navigator.app.exitApp();
            }
        }
    });*/
    this.platform.backButton.subscribeWithPriority(1, () => {
      (navigator as any).app.exitApp();
    });
    this.storage.get("cpLoginData").then((val) => {
      console.log("YourData", val);
      if (val) {
        // this.storage.get('verification_status_id').then((val) => {
        if (val.verification_status_id == 1) {
          this.verifyStatusId = val.verification_status_id;
          // alert(val)
          console.log("Your verification_status_id", val);
          this.storage.set("perform_id", 5);
          this.navCtrl.navigateRoot("/home");
        } else if (val.verification_status_id == 2) {
          this.verifyStatusId = val.verification_status_id;
          console.log("Your verification_status_id", val);
          this.navCtrl.navigateRoot("/verificationpending");
        }
        // });
      } else {
        // alert('4');
        this.navCtrl.navigateRoot("/login");
      }
    });
  }

  ngOnInit() {}
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Install application",
      message: "Do you wants to install applicaion ?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
          },
        },
        {
          text: "Yes",
          handler: () => {
            this.installPwa();
          },
        },
      ],
    });

    await alert.present();
  }

  /*Login*/
  login(value: any) {
    if (!value.mobile) {
      this.presentToast("Please Enter Mobile Number!");
    } else if (!this.loginifo.password) {
      this.presentToast("Please Enter Password!");
      // tslint:disable-next-line:triple-equals
    } else if (
      !(this.network.type !== "none" && this.network.type !== "unknown")
    ) {
      this.presentToast("Please on Internet Connection!");
    } else {
      this.loginifo.username = "91" + value.mobile;
      this.loginifo.password = value.pwd;
      this.loginifo.login_provider_id = 1;
      this.loginifo.provider_id = 1;
      this.loginifo.api_token = this.webServer.API_TOKEN_EXTERNAL;

      /*Call API For Login*/
      /*this.helper.showLoader('Processing');*/
      this.presentLoading().then(() => {
        this.apiservice.postCpLogin(this.loginifo).subscribe(
          (response) => {
            console.log("responseBody", response.body);
            // this.successvalue = JSON.stringify(response.body);
            this.successvalue = response.body;
            if (this.successvalue.success === 1) {
              /*this.helper.showLoader('Login Successfully');*/
              this.storage.set("login", 1);
              this.storage.set("cpLoginData", this.successvalue.data);
              this.storeData(this.successvalue.data);
              /* this.storage.set('apiToken',  this.postloginresponce.api_token);*/
              this.events.publish("user:update_fcm");
              this.events.publish("user:logout");
              this.helper.presentToastHomePage("Login Successful!");
              this.dismissLoading();
              console.log("IDV", this.postloginresponce.verification_status_id);
              if (this.postloginresponce.verification_status_id == 1) {
                this.verifyStatusId =
                  this.postloginresponce.verification_status_id;
                this.storage.set("perform_id", 5);
                this.navCtrl.navigateRoot(["/home/"]);
                this.storage.set("IDFromPerformance", 2);
                /* this.helper.hideLoader();*/
              } else if (this.postloginresponce.verification_status_id == 2) {
                this.verifyStatusId =
                  this.postloginresponce.verification_status_id;
                this.navCtrl.navigateRoot(["/verificationpending/"]);
                /*this.helper.hideLoader();*/
              }
            } else {
              this.dismissLoading();
              this.helper.presentToastError("Your account does not exists!");
            }
            return response;
          },
          (error) => {
            this.dismissLoading();
            this.helper.presentToastError("Something went wrong!");
          }
        );
      });
    }
  }

  /*Register Now*/
  register() {
    if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
      this.presentToast("Please on Internet Connection");
    } else {
      this.router.navigate(["/new-registration/"]);
    }
  }

  /*Toast*/
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: "my-custom-class",
    });
    toast.present();
  }

  /*ForgotPassword*/
  forgotPassword() {
    if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
      this.presentToast("Please on Internet Connection");
    } else {
      this.router.navigate(["/enter-mobile-screen/"]);
    }
  }

  /*TogglePassword*/
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = this.isActiveToggleTextPassword !== true;
  }

  public getType() {
    return this.isActiveToggleTextPassword ? "password" : "text";
  }

  /* Use Data From Response Object*/
  storeData(loginData) {
    const me = this;
    console.log("inside storeData");

    me.postloginresponce = new PostLoginResponce();
    const userDetails = loginData.user_details;

    me.postloginresponce.first_name = userDetails.first_name;
    me.postloginresponce.last_name = userDetails.last_name;
    me.postloginresponce.api_token = userDetails.api_token;
    me.postloginresponce.full_name = userDetails.full_name;

    // const data =  this.successvalue.data;
    me.postloginresponce.cp_executive_id = loginData.cp_executive_id;
    me.postloginresponce.verification_status_id =
      loginData.verification_status_id;
    me.postloginresponce.cp_id = loginData.cp_id;
    me.postloginresponce.is_team_lead = loginData.is_team_lead;
    me.postloginresponce.is_admin = loginData.is_admin;
    me.postloginresponce.name = loginData.name;
    console.log(me.postloginresponce.cp_executive_id);
    console.log(me.postloginresponce.cp_id);

    /*For apiToken and cpExecutiveId*/
    me.storage.set("cp_id", me.postloginresponce.cp_id);
    me.storage.set("cp_executive_id", me.postloginresponce.cp_executive_id);
    me.storage.set("is_team_lead", me.postloginresponce.is_team_lead);
    me.storage.set("is_admin", me.postloginresponce.is_admin);
    console.log("is_team_lead =>>", me.postloginresponce.is_team_lead);
    console.log("is_admin =>>", me.postloginresponce.is_admin);
    me.storage.set("channelname", loginData.name);
    me.postloginresponce.user_id = userDetails.user_id;
    me.storage.set("user_id", me.postloginresponce.user_id);
    console.log("1", loginData.name);
    me.storage.get("cp_executive_id").then((val) => {
      console.log("1", val);
      console.log("cp_executive_id1 =>>", me.postloginresponce.cp_executive_id);
    });
    me.storage.set("apiToken", me.postloginresponce.api_token);
    console.log("apiToken =>>", me.postloginresponce.api_token);

    /*For Verification status id*/
    me.storage.set(
      "verification_status_id",
      me.postloginresponce.verification_status_id
    );
    console.log(
      "verification_status_id =>>",
      me.postloginresponce.verification_status_id
    );
    /*FullName*/
    me.storage.set("fullname", me.postloginresponce.full_name);

    console.log("fullname =>>", me.postloginresponce.full_name);

    /*Console Log*/
    console.log("data =>", me.successvalue.data);
    console.log("user first name =>>", userDetails.first_name);
    console.log("user first name =>>", me.postloginresponce.first_name);
  }

  async presentLoading() {
    this.loader = await this.loadingController.create({
      translucent: true,
    });
    await this.loader.present();
  }

  async dismissLoading() {
    await this.loader.dismiss();
  }
  public installPwa(): void {
    this.promptEvent.prompt();
  }
  public close() {
    // this.bottomSheetRef.dismiss();
  }
}

/* const urlSearchParams = new URLSearchParams();
            urlSearchParams.append('username', this.loginifo.username);
            urlSearchParams.append('password', this.loginifo.password);
            urlSearchParams.append('api_token',  this.loginifo.api_token);
            urlSearchParams.append('login_provider_id', String(this.loginifo.login_provider_id));
            urlSearchParams.append('provider_id',  String(this.loginifo.provider_id));*/
