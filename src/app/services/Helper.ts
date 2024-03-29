import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  ToastController,
} from "@ionic/angular";

import { BottomNavPage } from "../bottom-nav/bottom-nav.page";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network/ngx";
import { Storage } from "@ionic/storage";
import Swal from "sweetalert2";
import { responsefromlogin } from "../models/Login";
import { APIService } from "./APIService";

export enum ConnectionStatusEnum {
  Online,
  Offline,
}
@Injectable({
  providedIn: "root",
})
export class Helper {
  loaderToShow: any;
  previousStatus;
  // tslint:disable-next-line:ban-types
  isConnected: Boolean = false;
  static forcefullyLogout: any;
  // tslint:disable-next-line:max-line-length
  constructor(
    private network: Network,
    private alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public navCtrl: NavController,
    private http: HttpClient,
    public storage: Storage,
    public apiService: APIService
  ) {
    this.previousStatus = ConnectionStatusEnum.Online;
  }
  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: "bottom",
      cssClass: "my-custom-class",
    });
    toast.present();
  }
  async presentToastHomePage(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: "bottom",
      cssClass: "my-custom-toast-homeSuccess",
    });
    toast.present();
  }

  /* async presentToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: 'bottom',
      cssClass: 'my-custom-toast',
    });
    toast.present();
  }*/

  async presentToastSuccess(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: "bottom",
      cssClass: "my-custom-toastSuceess",
    });
    toast.present();
  }
  async presentToastError(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: "bottom",
      cssClass: "my-custom-toastError",
    });
    toast.present();
  }

  showLoader(msg: any) {
    this.loaderToShow = this.loadingController
      .create({
        message: msg,
        duration: 2000,
      })
      .then((res) => {
        res.present();
        res.onDidDismiss().then((dis) => {});
      });
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 100);
  }
  showLoaderKYC(msg: any) {
    this.loaderToShow = this.loadingController
      .create({
        message: msg,
        duration: 3000,
        cssClass: "alert",
      })
      .then((res) => {
        res.present();

        res.onDidDismiss().then((dis) => {
          console.log("Loading dismissed!");
        });
      });
  }
  /* isOnline() {
    this.network.onDisconnect().subscribe(() => {
      this.isConnected = false;

    });
    this.network.onConnect().subscribe(() => {
      this.isConnected = true;
    });
    return this.isConnected;
  }*/
  public initializeNetworkEvents(): void {
    console.log("1");
    this.network.onDisconnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Online) {
        console.log("1");
      }
      this.previousStatus = ConnectionStatusEnum.Offline;
    });
    this.network.onConnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Offline) {
        console.log("2");
      }
      this.previousStatus = ConnectionStatusEnum.Online;
    });
  }

  alert() {
    setTimeout(() => {
      this.presentAlertError("Register Successfully.");
    }, 1000);
  }
  async presentAlertError(msg: any) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ["Ok"],
      cssClass: "alertDanger",
    });
    await alert.present();
  }

  async presentAlert(
    header?: any,
    msg?: any,
    text = "OK",
    text1 = "Cancel",
    callback?: any,
    enableBackdropDismiss = false
  ) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class1",

      header: header,

      backdropDismiss: enableBackdropDismiss,
      // subHeader: 'Subtitle',
      message: msg,
      buttons: [
        {
          text: text1,
          role: "cancel",
          cssClass: "secondary",
          handler: (cancel) => {},
        },
        {
          text: text,
          role: "ok",
          cssClass: "secondary",
          handler: (res) => {
            console.log(res);
            //              resolve('ok');
            if (callback) {
              callback();
              // return false;
            }
          },
        },
      ],
    });
    await alert.present();
  }
  swAlert(type, title) {
    Swal.fire({
      type: type,
      title: title,
      showConfirmButton: false,
      timer: 1500,
      position: "center",
    });
  }

  getUserInfo() {
    return new Promise((reslove, reject) => {
      this.storage
        .get("user_info")
        .then((res) => JSON.parse(res))
        .then((val) => {
          reslove(val);
        });
    });
  }

  redirectionOfUser() {
    // this.navCtrl.navigateRoot(["/settings"], {
    //   replaceUrl: true,
    //    queryParams: { user_id: 28, user_type_id: 1 },
    // });
    // this.navCtrl.navigateRoot("/enter-mobile-screen", {
    //   replaceUrl: true,
    // });
    // return;
    this.getUserInfo()
      .then((val: responsefromlogin) => {
        if (val) {
          console.log(val);
          // //FOR CP
          // this.navCtrl.navigateRoot("/business-details", {
          //   replaceUrl: true,
          // });
          // return;
          //For CP Login
          if (val.login_type == 1) {
            if (val.data.verification_status_id == 1) {
              // 1 for success.

              this.navCtrl.navigateRoot("/home", { replaceUrl: true });

              // Future code
              // if (val.data.aop_qop_accepted == 1) {
              //   this.navCtrl.navigateRoot("/home", { replaceUrl: true });
              // } else {
              //   this.navCtrl.navigateRoot("/aop-approval-benefit", {
              //     replaceUrl: true,
              //     queryParams: { pending: true },
              //   });
              // }
            } else if (val.data.verification_status_id == 2) {
              // 2 for pending
              this.navCtrl.navigateRoot("/verificationpending", {
                replaceUrl: true,
              });
            }
          }
          // FOR FOS
          else {
            console.log("FOS Login INFO", val);

            // check Everytime the CP - FOS relation is maintain or not. (Delete)
            this.apiService
              .cpFosCheckEntity(val.data.fos_id)
              .map((r) => r.body)
              .subscribe((res: any) => {
                // console.log(res);
                console.log("FOS Entity Deleted...");
                if (
                  val.is_cp_tagging_requested == 0 ||
                  res.cp_entity_tagging == "Deleted"
                ) {
                  // this.navCtrl.navigateRoot("/home");
                  this.navCtrl.navigateRoot("/select-cp", {
                    replaceUrl: true,
                    queryParams: { pending: true },
                  });
                } else if (val.is_cp_tagging_requested == 1) {
                  // for 1 is for pending tagging
                  this.navCtrl.navigateRoot("/cpstatus", {
                    replaceUrl: true,
                    queryParams: { pending: true },
                  });
                  // this.navCtrl.navigateRoot("/home");
                  // this.navCtrl.navigateRoot("/cpstatus", {
                  //   queryParams: { pending: true },
                  // });
                } else {
                  this.navCtrl.navigateRoot("/home", {
                    replaceUrl: true,
                  });
                }
              });
          }
        } else {
          // alert('4');
          this.navCtrl.navigateRoot("/login", { replaceUrl: true });
        }
        // this.navCtrl.navigateRoot("bank-details");
      })
      .catch(() => {
        this.navCtrl.navigateRoot("/login", { replaceUrl: true });
      });
  }

  /**
   * Forcefullys logout
   */
  forcefullyLogout() {
    this.storage
      .clear()
      .then(() => {
        this.navCtrl.navigateRoot("/login", { replaceUrl: true });
        // this.router.navigate(["/login"], { replaceUrl: true });
        this.presentToastSuccess("App update successfully!");
        // this.alertController.dismiss();
        // this.modalController.dismiss();
      })
      .catch(() => {});
  }
}
