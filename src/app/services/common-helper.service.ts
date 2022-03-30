import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonHelperService {
  loader: any;
  constructor(private loadingController:LoadingController,public navCtrl:NavController,public toastController:ToastController,public alertCtrl:AlertController) { }
  async presentLoading() {
    this.loader = await this.loadingController.create({
      translucent: true,
    });
    await this.loader.present();
  }
  async dismissLoading() {
    await this.loader.dismiss();
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
  async abortRequest() {
    const alert = await this.alertCtrl.create({
      header: "Abort Registration",
      message: "Are you sure you want to abort registration?",
      buttons: [
        {
          text: "No",
          role: "no",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            this.navCtrl.navigateRoot("login");
            // this.router.navigate(['/login/']);
          },
        },
      ],
    });
    await alert.present();
  }
}
