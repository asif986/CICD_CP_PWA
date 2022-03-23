import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { APIService } from "../services/APIService";
import { Helper } from "../services/Helper";

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

  isArrowHide = false;
  benefitsData: any = [];
  constructor(
    public router: Router,
    public apiService: APIService,
    public helper: Helper,
    public route: ActivatedRoute
  ) {
    // console.log(this.isArrowHide);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      if (Object.keys(params).length != 0) {
        params["pending"] == true || params.pending == true
          ? (this.isArrowHide = true)
          : (this.isArrowHide = false);
      } else {
        this.isArrowHide = false;
      }
    });

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
