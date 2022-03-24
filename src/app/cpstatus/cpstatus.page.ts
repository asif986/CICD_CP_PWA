import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { responsefromlogin } from "../models/Login";
import { APIService } from "../services/APIService";
import { Helper } from "../services/Helper";

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
  constructor(
    public apiService: APIService,
    public helper: Helper,
    public navCtrl: NavController
  ) {}

  getStatusOfTagging(fos_id, cp_entity_id, login_type) {
    this.apiService
      .cpEntityTaggingRequestList(fos_id, cp_entity_id, login_type)
      .map((r) => r.body)
      .subscribe(
        (res) => {
          console.log(res);
          if (res.length != 0) {
            this.cpName = res.cp_entity_name;
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

          if (res == 2) {
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
      this.navCtrl.navigateRoot("/select-cp", {
        queryParams: { pending: true },
      });
      return;
      this.apiService.cpEntityTaggingCancel("", "").subscribe(
        () => {},
        (e) => {
          this.helper.presentAlertError("Something went to wrong");
        }
      );
    });
  }
}
