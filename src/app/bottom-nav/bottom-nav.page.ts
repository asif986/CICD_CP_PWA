import { ActivatedRoute, Router } from "@angular/router";
import {
  AlertController,
  Events,
  ModalController,
  NavController,
  Platform,
  ToastController,
} from "@ionic/angular";
import { Component, Input, OnInit } from "@angular/core";

import { Helper } from "../services/Helper";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { UniqueDeviceID } from "@ionic-native/unique-device-id/ngx";

@Component({
  selector: "app-bottom-nav",
  templateUrl: "./bottom-nav.page.html",
  styleUrls: ["./bottom-nav.page.scss"],
})
export class BottomNavPage implements OnInit {
  isLogin: any = 0;
  isVerfied: any = 0;
  is_team_lead: any = 0;
  is_admin: any = 0;
  CPLoginData: any = "";
  login_type;
  username = "";
  name = "";
  apiToken = "";
  userId = 0;
  uuid = 0;
  fcmToken: any;

  menusList: any;
  @Input() value: number;

  // tslint:disable-next-line:max-line-length
  constructor(
    public helper: Helper,
    private uniqueDeviceID: UniqueDeviceID,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private storage: Storage,
    platform: Platform,
    public alertController: AlertController,
    public router: Router,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    public modalController: ModalController,
    public events: Events
  ) {
    /* alert('b');*/
    this.uniqueDeviceID
      .get()
      .then((uuid: any) => {
        this.uuid = uuid;
      })
      .catch((error: any) => {});

    events.subscribe("TeamLeaderOrNot", () => {
      console.log("isnotResolved", "TeamLeaderOrNot");
      this.storage.get("is_team_lead").then((val3) => {
        this.is_team_lead = val3;
        console.log("Team lead" + this.is_team_lead);
      });
      this.storage.get("is_admin").then((val4) => {
        this.is_admin = val4;
        console.log("is_admin" + this.is_admin);
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

  ngOnInit() {
    const me = this;

    // this.storage.get("verification_status_id").then((val2) => {
    //   this.storage.get("cpLoginData").then((val1) => {
    //     this.storage.get("login").then((val) => {
    //       me.CPLoginData = val1;
    //       me.isLogin = val;
    //       me.isVerfied = val2;
    //     });
    //   });
    // });
    this.storage.get("fullname").then((val) => {
      this.username = val;
      console.log(this.username);
    });
    this.storage.get("channelname").then((val) => {
      this.name = val;
      console.log(this.name);
    });

    this.helper
      .getUserInfo()
      .then((val: any) => {
        console.log(val);
        this.login_type = val.login_type;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  ionViewDidEnter() {
    let menus: any = [];
    this.http.get("assets/json/menus.json").subscribe((res) => {
      console.log(res);
      menus = res;

      if (this.login_type == 1) {
        this.menusList = menus.menu_list_cp;
      } else {
        this.menusList = menus.menu_list_fos;
      }
    });
    /*const me = this;
    this.storage.get('verification_status_id').then((val2) => {
      this.storage.get('cpLoginData').then((val1) => {
        this.storage.get('login').then((val) => {
          me.CPLoginData = val1;
          me.isLogin = val;
          me.isVerfied = val2;
        });
      });
    });
    this.storage.get('fullname').then((val) => {
      this.username = val;
      console.log(this.username);
    });
    this.storage.get('channelname').then((val) => {
      this.name = val;
      console.log(this.name);
    });*/
  }

  // || val=='readytosubmit-bills'|| val=='submitted-bill-page'
  navigateMenu(url) {
    this.modalController.dismiss();

    this.navCtrl.navigateForward(url);
  }

  goback() {
    console.log("dismissied");
    this.modalController.dismiss();
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
  gotoProfile() {
    console.log("clicked");
    this.navCtrl.navigateForward("profile");
    this.goback();
  }
}
