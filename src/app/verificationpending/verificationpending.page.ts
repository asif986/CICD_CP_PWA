import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import {
  AlertController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { VerificationStatus } from "../models/VerificationStatus";
import { Network } from "@ionic-native/network/ngx";
import { Helper } from "../services/Helper";
import { APIService } from "../services/APIService";
import { PostLoginResponce } from "../models/PostLoginResponce";
import { BottomNavPage } from "../bottom-nav/bottom-nav.page";
import { responsefromlogin } from "../models/Login";

@Component({
  selector: "app-verificationpending",
  templateUrl: "./verificationpending.page.html",
  styleUrls: ["./verificationpending.page.scss"],
})
export class VerificationpendingPage implements OnInit {
  verifyStatus: VerificationStatus = new VerificationStatus();
  apiToken: any;
  cp_entity_id: any;
  cpExecutiveID: any;
  successvalue: any;
  postloginresponce: PostLoginResponce;
  // tslint:disable-next-line:max-line-length
  constructor(
    private storage: Storage,
    private apiservice: APIService,
    public helper: Helper,
    private network: Network,
    public alertController: AlertController,
    public navCtrl: NavController,
    public modalController: ModalController
  ) {
    this.postloginresponce = new PostLoginResponce();
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.helper.getUserInfo().then((val: responsefromlogin) => {
      this.cp_entity_id = val.data.cp_entity_id;
      this.VerficationStatus();
    });
  }

  /*Login*/
  VerficationStatus() {
    if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
      this.helper.presentToast("Please on Internet Connection!");
    } else {
      // this.verifyStatus.api_token = this.apiToken;
      // this.verifyStatus.cp_id = this.cp_entity_id;
      // this.verifyStatus.cp_executive_id = this.cpExecutiveID;
      /*Call API For Login*/
      this.helper.showLoader("Processing");
      this.apiservice.PostLoginVerification(this.cp_entity_id).subscribe(
        (response) => {
          console.log("responseBody", response.body);
          // this.successvalue = JSON.stringify(response.body);
          this.successvalue = response.body;

          if (this.successvalue === 1) {
            this.helper.showLoader("Verified Successfully");
            this.helper.presentToast("Verified Successful!");
            // this.storage.set("cpLoginData", this.successvalue.data);

            // this.storeData(this.successvalue.data);
            // this.navCtrl.navigateRoot(["/home/"]);
            this.helper.getUserInfo().then((val: responsefromlogin) => {
              // val.data.cp_entity_id = res.cp_entity_id;
              val.data.verification_status_id = 1;

              this.storage.set("user_info", JSON.stringify(val));
              this.helper.redirectionOfUser();
            });
            this.helper.hideLoader();
          } else {
            this.helper.presentToast("Your account does not verified yet!");
          }
          return response;
        },
        (error) => {
          this.helper.presentToast("Something went wrong!");
        }
      );
    }
  }

  doRefresh(event) {
    console.log("Begin async operation");
    setTimeout(() => {
      this.VerficationStatus();
      console.log("Async operation has ended");
      event.target.complete();
    }, 500);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: "Do you want to Logout?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: "Logout",
          handler: () => {
            this.storage.remove("data");
            this.storage.remove("cpLoginData");
            this.storage.remove("cp_executive_id");
            this.storage.remove("apiToken");
            this.storage.remove("cp_id");
            this.storage.remove("verification_status_id");
            this.storage.remove("fullname");
            this.helper.presentToast("Logout Successfully");
            this.navCtrl.navigateRoot("login");
            this.alertController.dismiss();
            this.modalController.dismiss();
          },
        },
      ],
    });

    await alert.present();
  }

  logout() {
    this.presentAlertConfirm();
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
    console.log(me.postloginresponce.cp_executive_id);
    console.log(me.postloginresponce.cp_id);

    /*For apiToken and cpExecutiveId*/
    me.storage.set("cp_id", me.postloginresponce.cp_id);
    me.storage.set("cp_executive_id", me.postloginresponce.cp_executive_id);
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

  async sideNavMenu() {
    const modal = await this.modalController.create({
      component: BottomNavPage,
      componentProps: { value: 123 },
      cssClass: "my-custom-modal-css",
    });
    return await modal.present();
  }
}
