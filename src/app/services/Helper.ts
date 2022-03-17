import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { Network } from "@ionic-native/network/ngx";
import Swal from "sweetalert2";

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
  // tslint:disable-next-line:max-line-length
  constructor(
    private network: Network,
    private alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private http: HttpClient
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
    callback?: any,
    enableBackdropDismiss = false
  ) {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        cssClass: "my-custom-class1",

        header: header,

        backdropDismiss: enableBackdropDismiss,
        // subHeader: 'Subtitle',
        message: msg,
        buttons: [
          {
            text: text,
            role: "ok",
            cssClass: "secondary",
            handler: (cancel) => {
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
    });
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
}
