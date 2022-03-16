import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { APIService } from "../services/APIService";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-aop-approval-benefit",
  templateUrl: "./aop-approval-benefit.page.html",
  styleUrls: ["./aop-approval-benefit.page.scss"],
})
export class AopApprovalBenefitPage implements OnInit {
  isChecked: boolean = false;
  api_token;

  benefitsData: any = [];
  constructor(
    public router: Router,
    public apiService: APIService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get("apiToken").then((val2) => {
      this.api_token = val2;

      this.getBenefits(this.api_token);
    });
  }

  getBenefits(api_token) {
    this.apiService
      .getBenefits(api_token)
      .map((res) => res.body)
      .subscribe(
        (res) => {
          this.benefitsData = res.data.aop_data;
          console.log(this.benefitsData);
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
  }
  goBack() {
    this.router.navigate(["/profile"]);
  }
}
