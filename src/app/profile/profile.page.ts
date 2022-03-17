import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import {
  AlertController,
  Events,
  ModalController,
  NavController,
  Platform,
  ToastController,
} from "@ionic/angular";
import { Helper } from "../services/Helper";
import { HttpClient } from "@angular/common/http";
import { UniqueDeviceID } from "@ionic-native/unique-device-id/ngx";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  detailsArray = [
    {
      info: "Sameer Kulkarni",
      iconnm: "person",
    },
    {
      info: "+91 9876543210",
      iconnm: "phone-portrait",
    },
    {
      info: "Sameer.kulkarni@gmail.com",
      iconnm: "mail",
    },
    {
      info: "SunOrbit",
      iconnm: "business",
    },
  ];

  apiToken = "";
  userId = 0;
  uuid = 0;

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

  ngOnInit() {}

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
              this.storage.remove("cpLoginData");
              this.storage.remove("cp_executive_id");
              this.storage.remove("apiToken");
              this.storage.remove("cp_id");
              this.storage.remove("verification_status_id");
              this.storage.remove("fullname");
              this.storage.remove("channelname");
              this.helper.presentToastSuccess("Logout Successfully!");
              this.navCtrl.navigateRoot("login");
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

  goto() {
    this.navCtrl.navigateForward("aop-approval-benefit");
  }
}
