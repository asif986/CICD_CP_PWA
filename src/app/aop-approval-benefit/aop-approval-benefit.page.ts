import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { APIService } from "../services/APIService";
import { Storage } from "@ionic/storage";
import { Helper } from "../services/Helper";

@Component({
  selector: "app-aop-approval-benefit",
  templateUrl: "./aop-approval-benefit.page.html",
  styleUrls: ["./aop-approval-benefit.page.scss"],
})
export class AopApprovalBenefitPage implements OnInit {
  isChecked: boolean = false;
  api_token = "hQhcmZ4Ka0oBkkHxwdi81Zn8ma7hL2SYL1DQkNIemAIZVGDQmoR3MPUkhh7y";
  cp_entity_id = 7;
  cpBenefitId;
  isAccepted = 0;
  benefitsData: any = [];
  constructor(
    public router: Router,
    public apiService: APIService,
    private storage: Storage,
    public helper: Helper
  ) {}

  ngOnInit() {
    this.storage.get("user_info").then((val) => {
      this.api_token = val.api_token;
      this.cp_entity_id = val.cp_entity_id;
    });
    this.getBenefits(this.api_token, this.cp_entity_id);
  }

  getBenefits(api_token, cp_entity_id) {
    this.apiService
      .getBenefits(api_token, cp_entity_id)
      .map((res) => res.body)
      .subscribe(
        (res) => {
          this.benefitsData = res.data;
          this.cpBenefitId = res.data[0].cp_benefit_id;
          if (res.accepted == 1) {
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
