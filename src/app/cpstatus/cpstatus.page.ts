import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { responsefromlogin } from "../models/Login";
import { APIService } from "../services/APIService";
import { Helper } from "../services/Helper";
import { Storage } from "@ionic/storage";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-cpstatus",
  templateUrl: "./cpstatus.page.html",
  styleUrls: ["./cpstatus.page.scss"],
})
export class CpstatusPage implements OnInit {
  sucess: boolean = false;
  fosId;
  cpEntityId;
  cpName;
  login_type;
  tagging_id;
  is_redirection = false;
  constructor(
    public apiService: APIService,
    public helper: Helper,
    public navCtrl: NavController,
    public storage: Storage,
    public route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length != 0) {
        if (params["pending"] == true || params.pending == "true") {
          // console.log("hi");
          this.is_redirection = true;
        }
      }
    });
  }

  getStatusOfTagging(fos_id, cp_entity_id, login_type, sucess) {
    this.apiService
      .cpEntityTaggingRequestList(fos_id, cp_entity_id, login_type)
      .map((r) => r.body)
      .subscribe(
        (res) => {
          console.log(res);
          if (res != null) {
            this.cpName = res.cp_entity_name;
            this.tagging_id = res.tagging_id;
          }
          if (this.is_redirection) {
            if (sucess == 3) {
              this.helper.getUserInfo().then((val: responsefromlogin) => {
                // val.data.cp_entity_id = res.cp_entity_id;
                val.is_cp_tagging_requested = 3;
                console.log(val);
                this.helper.presentToast("cp tagging successful!");
                this.storage.set("user_info", JSON.stringify(val)).then(() => {
                  this.helper.redirectionOfUser();
                });
              });
            } else {
              this.sucess = true;
            }
          } else {
          }
        },
        (e) => {
          this.helper.presentToastError("Something went to wrong");
        }
      );
  }
  getUserInfo() {
    this.helper.getUserInfo().then((val: responsefromlogin) => {
      this.fosId = val.data.fos_id;
      this.cpEntityId = val.data.cp_entity_id;
      this.login_type = val.login_type;
      console.log(this.cpEntityId);
      this.checkTagging();
    });
  }
  ngOnInit() {
    this.getUserInfo();
  }
  checkTagging() {
    this.apiService
      .checkTagging(this.fosId)
      .map((r) => r.body)
      .subscribe(
        (res) => {
          console.log(res);

          this.getStatusOfTagging(
            this.fosId,
            this.cpEntityId,
            this.login_type,
            res
          );
        },
        (e) => {
          this.helper.presentToastError("Something went to wrong");
        }
      );
  }

  cancelRequest() {
    this.helper.presentAlert("Cancel", "Cancel the Request?", "OK", () => {
      console.log("ok");

      // return;
      this.apiService
        .cpEntityTaggingCancel(this.tagging_id)
        .map((r) => r.body)
        .subscribe(
          (res) => {
            console.log(res);
            if (res != null || res == null) {
              this.helper.presentToast("Request Canceled.");
              this.helper.getUserInfo().then((val: responsefromlogin) => {
                // val.data.cp_entity_id = res.cp_entity_id;
                val.is_cp_tagging_requested = 0;

                this.storage.set("user_info", JSON.stringify(val)).then(() => {
                  this.navCtrl.navigateRoot("select-cp", {
                    replaceUrl: true,
                    queryParams: { pending: true },
                  });
                });
              });
            }
          },
          (e) => {
            this.helper.presentAlertError("Something went to wrong");
          }
        );
    });
  }
  doRefresh(event) {
    console.log("Begin async operation");
    setTimeout(() => {
      this.checkTagging();
      console.log("Async operation has ended");
      event.target.complete();
    }, 500);
  }
}
