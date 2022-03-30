import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { responsefromlogin } from "../models/Login";
import { APIService } from "../services/APIService";
import { Helper } from "../services/Helper";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-cpstatus",
  templateUrl: "./cpstatus.page.html",
  styleUrls: ["./cpstatus.page.scss"],
})
export class CpstatusPage implements OnInit {
  sucess: boolean = true;
  fosId;
  cpEntityId;
  cpName;
  login_type;
  tagging_id;
  constructor(
    public apiService: APIService,
    public helper: Helper,
    public navCtrl: NavController,
    public storage: Storage
  ) {}

  getStatusOfTagging(fos_id, cp_entity_id, login_type) {
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

          if (res == 3) {
            this.sucess = false;
          }
          this.getStatusOfTagging(this.fosId, this.cpEntityId, this.login_type);
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
