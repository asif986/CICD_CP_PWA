import {
  AlertController,
  Events,
  ModalController,
  NavController,
  Platform,
} from "@ionic/angular";
import {
  ApplicationRef,
  Component,
  NgZone,
  OnInit,
  enableProdMode,
} from "@angular/core";
import { Push, PushObject, PushOptions } from "@ionic-native/push/ngx";

import { APIService } from "./services/APIService";
import { Helper } from "./services/Helper";
import { HttpClient } from "@angular/common/http";
import { MobileAccessibility } from "@ionic-native/mobile-accessibility/ngx";
import { PopupalertPage } from "./popupalert/popupalert.page";
import { PostAppUpdate } from "./models/PostAppUpdate";
import { Router } from "@angular/router";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Storage } from "@ionic/storage";
import { SwUpdate } from "@angular/service-worker";
import { UniqueDeviceID } from "@ionic-native/unique-device-id/ngx";
import { interval } from "rxjs";
import { responsefromlogin } from "./models/Login";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  public appPages = [];
  profile: any;
  fullname: any;
  mobilenumber: any;
  customerid: any;
  isLoggedIn: boolean;
  user: any;
  notificationData: any = [];
  apiToken = "";
  userId = 0;
  uuid = 0;
  fcmToken: any;
  pushObjectV: any;
  versionNumber: any;
  postUpdate: PostAppUpdate;
  successValue: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private mobileAccessibility: MobileAccessibility,
    private storage: Storage,
    private modalController: ModalController,
    public navCtrl: NavController,
    public router: Router,
    public push: Push,
    private zone: NgZone,
    public events: Events,
    public http: HttpClient,
    private uniqueDeviceID: UniqueDeviceID,
    private alertCtrl: AlertController,
    public apiservice: APIService,
    public helper: Helper,
    private update: SwUpdate,
    private appRef: ApplicationRef
  ) {
    this.initializeApp();

    // events.subscribe("user:update_fcm", () => {
    //   // user and time are the same arguments passed in events.publish(user, time)
    //   console.log("Welcome");
    //   this.updateToken();
    // });
    // events.subscribe("user:remove_token", () => {
    //   // user and time are the same arguments passed in events.publish(user, time)

    //   this.notificationUnregistered();
    // });
    // events.subscribe('user:logout', () => {
    //
    //   this.checkTokenValidity();
    // });
  }
  async updateClient() {
    // if (!this.update.isEnabled) {
    //   console.log("Not Enabled");
    //   return;
    // }

    try {
      // Check if Service Worker is supported by the Browser
      if (this.update.isEnabled) {
        console.log(this.update.isEnabled);
        const isNewVersion: any = await this.update.checkForUpdate();
        console.log(isNewVersion);
        // Check if the new version is available
        if (isNewVersion) {
          const isNewVersionActivated: any = await this.update.activateUpdate();
          // Check if the new version is activated and reload the app if it is
          if (isNewVersionActivated) {
            console.log("App update popup");
            this.helper.presentAlert(
              "Update",
              "Update available for the app please confirm",
              "OK",
              () => {
                this.update.activateUpdate().then(() => {
                  window.location.reload();
                  this.helper.forcefullyLogout();
                });
              }
            );

            //  resolve(true);
          }
        }
        //  resolve(true);
      } else {
        console.log("please enable the service worker");
        // console.log("app update is available");
      }
    } catch (error) {
      console.log(error);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("platform ready");
      this.updateClient();
      // this.checkUpdate();

      this.mobileAccessibility.usePreferredTextZoom(false);

      if (this.platform.is("cordova")) {
        // Initialize push notification feature
        // tslint:disable-next-line:no-unused-expression

        // this.platform.is('android') ?
        this.setPushNotifications();
        // : '';
        var me = this;

        if (this.platform.is("android")) {
          // me.appVersion.getVersionNumber().then(function (version) {
          //   console.log(version);
          //   me.http.get('http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/api/appUpdate?platform=android&appVersion='+version)
          //       .subscribe(res => {
          //         if (res['success'] == 1) {
          //           me.updateAlert();
          //         }
          //       });
          // });
        }
        // if(this.platform.is('ios')) {
        //   me.appVersion.getVersionNumber().then(function (version) {
        //     me.http.get('http://vjpartners.co.in/ongoing/v7/vj-sales-modules/public/api/appUpdate?platform=ios&appVersion='+version)
        //         .subscribe(res => {
        //           if (res['success'] == 1) {
        //             me.updateAlert();
        //           }
        //         });
        //   });

        // }
      } else {
        console.log(
          "Push notifications are not enabled since this is not a real device"
        );
      }

      // this.uniqueDeviceID
      //   .get()
      //   .then((uuid: any) => {
      //     this.uuid = uuid;
      //   })
      //   .catch((error: any) => {});

      // this.storage.get('login').then((val) => {
      //   console.log('Your login', val);
      //   if (val) {

      //For checking App Update is available or not?
      // this.checkAppUpdate();

      this.helper.redirectionOfUser();
      // this.statusBar.backgroundColorByHexString("#2ac9a9");
    });
  }

  notificationUnregistered() {
    this.pushObjectV.unregister();
  }

  //Use for set notifications
  setPushNotifications() {
    // tslint:disable-next-line:prefer-const
    let me = this;
    this.push.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        console.log("We have permission to send push notifications");
      } else {
        console.log("We do not have permission to send push notifications");
      }
    });

    const options: PushOptions = {
      android: {
        forceShow: true,
        vibrate: true,
        sound: true,
      },
      ios: {
        alert: "true",
        badge: "true",
        sound: "true",
      },
      windows: {},
      browser: {
        pushServiceURL: "http://push.api.phonegap.com/v1/push",
      },
    };

    const pushObject: PushObject = this.push.init(options);

    //To Display Notifications//
    pushObject.on("notification").subscribe((notification: any) => {
      let me = this;
      console.log(notification);
      // if(notification.additionalData.extra_data.length!=0){
      //   notification.additionalData.extra_data = JSON.parse(JSON.stringify(notification.additionalData.extra_data));
      // }
      me.storage.remove("notificationData");
      me.storage.set("notificationData", notification);
      if (
        notification.additionalData.foreground == false &&
        (notification.additionalData.dismissed != undefined ||
          notification.additionalData.coldstart == true)
      ) {
        me.zone.run(async () => {
          if (notification.additionalData.page === "home") {
            this.getNotificationPopUps();
          } else {
          }
        });
      } else {
        me.zone.run(async () => {
          if (notification.additionalData.page === "home") {
            this.getNotificationPopUps();
          } else {
          }
        });
      }

      me.storage.get("notification").then((val) => {
        if (val != null) {
          me.notificationData = val;
          if (
            me.notificationData.findIndex(
              (d) =>
                d.additionalData.notification_id ==
                notification.additionalData.notification_id
            ) == -1
          ) {
            me.notificationData.push(notification);
            me.storage.set("notification", me.notificationData);
            console.log("Storage Data1: ", me.notificationData);
          }
        } else {
          me.notificationData = [];
          me.notificationData.push(notification);
          me.storage.set("notification", me.notificationData);
          console.log("Storage Data2: ", me.notificationData);
        }
      });
    });

    //FCM Token//
    pushObject.on("registration").subscribe((registration: any) => {
      // alert("dd");
      console.log("Device registered", registration.registrationId);
      this.storage.set("fcmToken", registration.registrationId);
      this.updateTokenOnRefresh(registration.registrationId);
    });
    pushObject
      .on("error")
      .subscribe((error) => console.error("Error with Push plugin", error));
  }

  updateToken() {
    // alert(1);
    const me = this;
    this.storage.get("user_id").then((val) => {
      if (val) {
        console.log("user_id", val);
        this.userId = val;
        this.storage.get("apiToken").then((data) => {
          // alert('apiToken' + data);
          this.apiToken = data;

          me.storage.get("fcmToken").then((fcm) => {
            if (fcm) {
              // alert('Inside FCM');
              me.fcmToken = fcm;
              const param = {
                user_id: this.userId,
                device_id: this.uuid,
                device_type: "android",
                fcm_token: me.fcmToken,
                api_token: this.apiToken,
              };
              console.log(param);
              me.http
                .post(
                  "http://vjpartners.co.in/ongoing/v7_new/public/api/addAndUpdateFcmToken",
                  param
                )
                .subscribe((res) => {
                  console.log("token updated", res);
                });
            } else {
            }
          });
        });
      }
    });
  }

  //   if (val) {
  //         .subscribe(res => {
  //           var data = res;
  //           if (data['success'] == 0) {
  //             this.storage.remove('data');
  //             this.storage.remove('cpLoginData');
  //             this.storage.remove('cp_executive_id');
  //             this.storage.remove('apiToken');
  //             this.storage.remove('cp_id');
  //             this.storage.remove('verification_status_id');
  //             this.storage.remove('fullname');
  //             this.storage.remove('channelname');
  //             this.storage.remove('fcmToken');
  //             this.storage.remove('notification');
  //             this.navCtrl.navigateRoot('login');
  //           }

  //         });

  //   }
  // });

  updateTokenOnRefresh(fcmToken) {
    //alert(2);
    const me = this;
    this.storage.get("user_id").then((val) => {
      if (val) {
        console.log("user_id", val);
        this.userId = val;
        this.storage.get("apiToken").then((data) => {
          // alert('apiToken' + data);
          this.apiToken = data;
          // me.storage.get('fcmToken').then((fcm) => {
          //   if (fcm) {
          //   alert('Inside FCM');
          me.fcmToken = fcmToken;
          const param = {
            user_id: this.userId,
            device_id: this.uuid,
            device_type: "android",
            fcm_token: me.fcmToken,
            api_token: this.apiToken,
          };
          console.log(param);
          me.http
            .post(
              "http://vjpartners.co.in/ongoing/v7_new/public/api/addAndUpdateFcmToken",
              param
            )
            .subscribe((res) => {
              console.log("token updated", res);
            });
          // } else {
          // }
          // });
        });
      }
    });
  }

  checkAppUpdate() {
    this.versionNumber = 0.1;
    this.updateApp(this.versionNumber);
  }

  updateApp(versionNumber) {
    this.postUpdate = new PostAppUpdate();
    this.postUpdate.platform = "android";
    this.postUpdate.appVersion = versionNumber;
    console.log("UrlAppUpdate", this.postUpdate);
    this.apiservice
      .appUpdateAvailable(this.postUpdate.platform, this.postUpdate.appVersion)
      .subscribe(
        (data) => {
          this.successValue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successValue);
          console.log("successValue", Value.success);
          if (Value.success === 1) {
            console.log("UrlAppUpdate", Value.url);
            this.appUpdateAlert(
              "https://play.google.com/store/apps/details?id=com.vjd.cpNew"
            );
          }
        },
        (err) => {}
      );
  }

  async appUpdateAlert(link: any) {
    const alert = await this.alertCtrl.create({
      header: "Update Available",
      backdropDismiss: false,
      message: "Please update your app now!",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.storage.clear();
            window.open(link, "_system", "location=yes");
            return false;
          },
        },
      ],
    });
    await alert.present();
  }

  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
    }
  }

  async updateAlert() {
    const alert1 = await this.alertCtrl.create({
      header: "Update Available",
      message: "App update is available?",
      buttons: [
        {
          text: "Cancel",
          role: "no",
          handler: () => {},
        },
        {
          text: "Update",
          role: "yes",
          handler: () => {},
        },
      ],
    });
    await alert1.present();
  }

  async getNotificationPopUps() {
    const modal = await this.modalController.create({
      component: PopupalertPage,
      componentProps: { value: 123 },
      cssClass: "my-custom-modal-css2",
    });
    return await modal.present();
  }
}
