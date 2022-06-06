import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { responsefromlogin } from "../models/Login";
import { APIService } from "../services/APIService";
import { Helper } from "../services/Helper";

@Component({
  selector: "app-update-is-team-fos",
  templateUrl: "./update-is-team-fos.page.html",
  styleUrls: ["./update-is-team-fos.page.scss"],
})
export class UpdateIsTeamFosPage implements OnInit {
  fosInfo: any;
  isTeamLead = 0;
  cpFosId;

  constructor(
    public activateRoute: ActivatedRoute,
    public helper: Helper,
    public apiService: APIService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((res: any) => {
      console.log(res);
      this.fosInfo = res;
      this.isTeamLead = +this.fosInfo.is_team_lead;
    });
  }
  teamLeadCheck(val: boolean) {
    val === true ? (this.isTeamLead = 1) : (this.isTeamLead = 0);
  }

  updateFos() {
    this.helper.presentAlert(
      "FOS",
      "Are you sure to update this FOS?",
      "Yes",
      () => {
        this.apiService
          .setFosTeamLead({
            cp_fos_id: this.fosInfo.fos_id,
            is_team_lead: this.isTeamLead,
          })
          .subscribe(
            (res) => {
              // console.log(res);
              res.body !== null &&
                this.helper.presentToastSuccess("FOS Updated Successfully.");
              // this.navCtrl.back();
              // this.benefitsData = res.data.aop_data;
              // console.log(this.benefitsData);
            },
            (e) => {
              console.log(e);
              this.helper.presentAlertError("Something went to Wrong");
            }
          );
      }
    );
  }
}
