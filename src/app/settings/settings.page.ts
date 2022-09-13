import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { responsefromlogin } from "../models/Login";
import { Helper } from "../services/Helper";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  settingsList = [
    { name: "Change Password", iconnm: "person" },
    { name: "Clear cache ", iconnm: "refresh-circle" },
  ];
  userInfo: any = {};

  constructor(public helper: Helper, public router: Router) {}

  ngOnInit() {
    this.helper.getUserInfo().then((val: responsefromlogin) => {
      // console.log(val);
      this.userInfo.user_type_id = val.login_type;
      this.userInfo.user_id = 38;
    });
  }

  settingsClick(index: number) {
    console.log(index);
    if (index === 1) {
      this.cacheClear();
    } else {
      this.router.navigate(["/change-password"], {
        queryParams: this.userInfo,
      });
    }
  }

  cacheClear() {
    window.location.reload();
    this.helper.presentToast("Cache Cleared!");
  }
}
