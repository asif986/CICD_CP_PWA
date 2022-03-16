import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { Helper } from "../services/Helper";
import { AlertController, NavController, Platform } from "@ionic/angular";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.page.html",
  styleUrls: ["./notification.page.scss"],
})
export class NotificationPage implements OnInit {
  notificationList: any = [];

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public platform: Platform,
    private router: Router,
    private helper: Helper
  ) {
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.storage.set("IDFromPerformance", 2);

      this.router.navigate(["/home/"]);
    });
  }

  ngOnInit() {
    /*  const me = this;
      me.storage.get('notification').then((val) => {
        if (val != null) {
          me.notificationList = val;
          me.storage.set('notification', me.notificationList);
        }


      });*/
  }

  /*Call First when it comes this page*/

  ionViewDidEnter() {
    this.storage.get("notification").then((val) => {
      if (val != null) {
        this.notificationList = val;
        /*  alert('notify'+JSON.stringify(val));*/
        this.storage.set("notification", this.notificationList);
      } else {
        this.notificationList = [];
        /* alert('empty');*/
        // this.storage.set('notification', this.notificationList);
      }
    });
  }

  /*  clearData() {
    this.notificationList = [];
    this.storage.remove('notification');
    this.refresh();
  }*/

  async deleteNotificationConfirm() {
    var me = this;
    const alert = await this.alertCtrl.create({
      header: "Notifications",
      message: "Are you sure you want to delete Notifications?",
      buttons: [
        {
          text: "No",
          role: "no",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            me.notificationList = [];
            me.storage.remove("notification");
            me.helper.presentToast("Notifications Deleted successfully!");
            me.helper.showLoader("Getting Notifications");
          },
        },
      ],
    });
    await alert.present();
  }

  doRefresh(event) {
    this.storage.get("notification").then((val) => {
      if (val != null) {
        this.notificationList = [];
        this.notificationList = val;
        /*  alert('notify'+JSON.stringify(val));*/
        this.storage.set("notification", this.notificationList);
      } else {
        this.notificationList = [];
        /* alert('empty');*/
        // this.storage.set('notification', this.notificationList);
      }
      event.target.complete();
    });
    // }, 500);
  }

  goBack() {
    this.storage.get("cpLoginData").then((val) => {
      if (val) {
        this.storage.set("IDFromPerformance", 2);
        this.router.navigate(["/home/"]);
      } else {
        this.router.navigate(["/login/"]);
      }
    });
  }
}
