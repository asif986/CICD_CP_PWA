import { LoadingController, ToastController } from '@ionic/angular';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonHelperService {
  loader: any;
  constructor(private loadingController:LoadingController,public toastController:ToastController) { }
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
}
