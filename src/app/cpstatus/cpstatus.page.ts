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
  constructor(
    public apiService: APIService,
    public helper: Helper,
    public navCtrl: NavController
  ) {}

  getStatusOfTagging(fos_id, cp_entity_id) {
    this.apiService
      .cpEntityTaggingRequestList(fos_id, cp_entity_id)
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
      console.log(this.cpEntityId);
      this.getStatusOfTagging(this.fosId, this.cpEntityId);
    });
  }
  ngOnInit() {
    this.getUserInfo();
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
