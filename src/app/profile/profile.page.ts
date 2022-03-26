import {
  AlertController,
  Events,
  ModalController,
  NavController,
  Platform,
  ToastController,
} from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

import { Helper } from "../services/Helper";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { UniqueDeviceID } from "@ionic-native/unique-device-id/ngx";
import { responsefromlogin } from "./../models/Login";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  detailsArray = [
    // {
    //   info: "Sameer Kulkarni",
    //   iconnm: "person",
    // },
    // {
    //   info: "+91 9876543210",
    //   iconnm: "phone-portrait",
    // },
    // {
    //   info: "Sameer.kulkarni@gmail.com",
    //   iconnm: "mail",
    // },
    // {
    //   info: "SunOrbit",
    //   iconnm: "business",
    // },
  ];

  apiToken = "";
  userId = 0;
  uuid = 0;
  login_type;
  verification_status_id;
  is_cp_tagging_requested;

  constructor(
    public storage: Storage,
    public alertController: AlertController,
    public helper: Helper,
    public navCtrl: NavController,
    private http: HttpClient,
    public modalController: ModalController,
    private uniqueDeviceID: UniqueDeviceID
  ) {
    this.uniqueDeviceID
      .get()
      .then((uuid: any) => {
        this.uuid = uuid;
      })
      .catch((error: any) => {});
  }

  ngOnInit() {
    let getOnlyFields = [
      { control: "name", iconnm: "person" },
      { control: "mobile", iconnm: "phone-portrait" },
      { control: "email", iconnm: "mail" },
      { control: "billing_name", iconnm: "person" },
    ];
    this.helper.getUserInfo().then((val: responsefromlogin) => {
      this.login_type = val.login_type;
      this.verification_status_id = val.data.verification_status_id;
      this.is_cp_tagging_requested = val.is_cp_tagging_requested;
      this.detailsArray = getOnlyFields.map((item: any) => {
        // console.log(item.control);
        // console.log(val.data[item.control]);

        return { ...item, info: val.data[item.control] };
      });
    });
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
            this.updateToken();
            setTimeout(() => {
              this.storage.remove("data");
              this.storage.remove("user_info");
              this.storage.remove("cpLoginData");
              this.storage.remove("cp_executive_id");
              this.storage.remove("apiToken");
              this.storage.remove("cp_id");
              this.storage.remove("verification_status_id");
              this.storage.remove("fullname");
              this.storage.remove("channelname");
              this.helper.presentToastSuccess("Logout Successfully!");
              this.navCtrl.navigateRoot("login", { replaceUrl: true });

              this.alertController.dismiss();
              this.modalController.dismiss();
            }, 500);
          },
        },
      ],
    });

    await alert.present();
  }

  logout() {
    this.presentAlertConfirm();
  }

  updateToken() {
    // alert(1);
    const me = this;
    this.storage.get("user_id").then((val) => {
      /* alert('user_id' + val);*/
      if (val) {
        console.log("user_id", val);
        this.userId = val;
        this.storage.get("apiToken").then((data) => {
          /*   alert('apiToken' + data);*/
          this.apiToken = data;
          const param = {
            user_id: this.userId,
            device_id: this.uuid,
            device_type: "android",
            fcm_token: "",
            api_token: this.apiToken,
          };
          console.log(param);
          me.http
            .post(
              "http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/api/addAndUpdateFcmToken",
              param
            )
            .subscribe((res) => {
              // alert('Success');
              console.log("token updated", res);
            });
        });
      }
    });
  }

  goto(url) {
    this.navCtrl.navigateForward(url);
  }
}
