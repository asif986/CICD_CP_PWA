import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { responsefromlogin } from "../models/Login";
import { APIService } from "../services/APIService";
import { Helper } from "../services/Helper";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-aop-approval-benefit",
  templateUrl: "./aop-approval-benefit.page.html",
  styleUrls: ["./aop-approval-benefit.page.scss"],
})
export class AopApprovalBenefitPage implements OnInit {
  isChecked: boolean = false;
  api_token = "";
  cp_entity_id;
  cpBenefitId;
  isAccepted = 0;
  has_cp_bouns = false;

  isArrowHide = true;
  benefitsData: any = [];
  constructor(
    public router: Router,
    public apiService: APIService,
    public helper: Helper,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public storage: Storage
  ) {
    // console.log(this.isArrowHide);
  }

  ngOnInit() {
    this.helper.getUserInfo().then((val: any) => {
      console.log(val);
      this.api_token = val.data.api_token;
      this.cp_entity_id = val.data.cp_entity_id;
      console.log(this.cp_entity_id);
      this.getBenefits(this.api_token, this.cp_entity_id);
    });
  }

  getBenefits(api_token, cp_entity_id) {
    this.apiService
      .getBenefits(api_token, cp_entity_id)
      .map((res) => res.body)
      .subscribe(
        (res) => {
          this.benefitsData = res.data.benefitsData;
          this.cpBenefitId = res.data.benefitsData[0].cp_benefit_id;
          this.has_cp_bouns = res.data.has_cp_bouns;
          if (res.data.is_accepted == 1) {
            this.isChecked = true;
            this.isAccepted = 1;
          }
          // console.log(this.benefitsData);
        },
        (e) => {
          console.log(e);
        }
      );
  }

  checked(val: boolean) {
    this.isChecked = val;
    console.log(this.isChecked);
  }

  accept() {
    console.log(this.isChecked);
    this.apiService
      .addBenefits(
        this.api_token,
        this.cp_entity_id,
        this.cpBenefitId,
        (this.isAccepted = 1)
      )
      .map((res) => res.body)
      .subscribe(
        (res) => {
          console.log(res);
          res.success == 1 &&
            this.helper.swAlert("success", "Approval Succesfully!");

          this.helper.getUserInfo().then((val: responsefromlogin) => {
            // val.data.cp_entity_id = res.cp_entity_id;
            val.data.aop_qop_accepted = 1;
            this.storage.set("user_info", JSON.stringify(val)).then(() => {
              this.navCtrl.navigateRoot("/home", {
                replaceUrl: true,
              });
            });
          });

          // this.benefitsData = res.data.aop_data;
          // console.log(this.benefitsData);
        },
        (e) => {
          console.log(e);
          this.helper.presentAlertError("Something went to Wrong");
        }
      );
  }
  goBack() {
    this.router.navigate(["/profile"]);
  }
}
