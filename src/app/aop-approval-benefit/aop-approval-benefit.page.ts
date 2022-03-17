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
  api_token;
  cp_id;
  cpBenefitId;

  benefitsData: any = [];
  constructor(
    public router: Router,
    public apiService: APIService,
    private storage: Storage,
    public helper: Helper
  ) {}

  ngOnInit() {
    this.storage.get("apiToken").then((val2) => {
      this.storage.get("cp_id").then((cp_id) => {
        this.api_token = val2;
        this.cp_id = cp_id;

        this.getBenefits(this.api_token, this.cp_id);
      });
    });
  }

  getBenefits(api_token, cp_id) {
    this.apiService
      .getBenefits(api_token, cp_id)
      .map((res) => res.body)
      .subscribe(
        (res) => {
          this.benefitsData = res.data;
          this.cpBenefitId = res.data[0].cp_benefit_id;
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
      .addBenefits(this.api_token, this.cp_id, this.cpBenefitId)
      .map((res) => res.body)
      .subscribe(
        (res) => {
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
