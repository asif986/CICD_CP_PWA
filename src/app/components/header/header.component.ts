import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { NavController } from "@ionic/angular";
import { responsefromlogin } from "src/app/models/Login";
import { Helper } from "src/app/services/Helper";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() headernam: string = "";
  @Input() url: string = "";
  isArrowHide;

  verification_status_id;
  is_cp_tagging_requested;

  constructor(
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public helper: Helper
  ) {}

  ngOnInit() {
    // console.log(this.url);
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length != 0) {
        console.log(params);
        if (params["pending"] == true || params.pending == "true") {
          console.log("hi");
          this.isArrowHide = false;
        } else {
          this.isArrowHide = true;
        }
      } else {
        this.isArrowHide = true;
      }
    });

    this.helper.getUserInfo().then((val: responsefromlogin) => {
      this.verification_status_id = val.data.verification_status_id;
      this.is_cp_tagging_requested = val.is_cp_tagging_requested;
      // this.userInfo.login_type = val.login_type;
    });
  }

  goBack() {
    // this.navCtrl.navigateBack(this.url);
    // console.log(this.navCtrl.pop());
    this.navCtrl.back();
  }
}
