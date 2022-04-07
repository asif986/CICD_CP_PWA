import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { APIService } from "../services/APIService";
import { CommonHelperService } from "./../services/common-helper.service";
import { Helper } from "src/app/services/Helper";
import { HttpResponse } from "@angular/common/http";
import { responsefromlogin } from "../models/Login";

@Component({
  selector: "app-approve-fosrequest",
  templateUrl: "./approve-fosrequest.page.html",
  styleUrls: ["./approve-fosrequest.page.scss"],
})
export class ApproveFOSRequestPage implements OnInit {
  public myForm: FormGroup = this.fb.group({});
  public allRequests: any = [];
  constructor(
    public helper: Helper,
    public fb: FormBuilder,
    public apiService: APIService,
    public commonHelper: CommonHelperService
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      searchbox: [""],
    });
    this.getAllFosRequest();
  }
  getAllFosRequest() {
    this.commonHelper.presentLoading().then(() => {
      this.helper.getUserInfo().then(
        (res: responsefromlogin) => {
          try {
            let body = "?cp_entity_id=" + res.data.cp_entity_id;
            // let body = "?cp_entity_id=" +res.data.cp_entity_id;
            //  res.data.cp_entity_id;
            this.apiService.allFosRequests(body).subscribe(
              (data: HttpResponse<any>) => {
                console.log(data.body);
                this.allRequests = data.body;
                this.commonHelper.dismissLoading();
                // let body = "?cp_entity_id=" + 1;
              },
              (error) => {
                this.commonHelper.dismissLoading();
              }
            );
          } catch (error) {
            this.commonHelper.dismissLoading();
            this.commonHelper.presentToast("Something goes wrong");
          }
        },
        (error) => {
          this.commonHelper.dismissLoading();
        }
      );
    });
  }
  accepctFos(tagging_id) {
    this.commonHelper.presentLoading().then(
      () => {
        let body = { tagging_id };
        this.apiService
          .acceptFosRequest(body)
          .subscribe((data: HttpResponse<any>) => {
            console.log(data.body);
            this.commonHelper.presentToast("Request accepeted successfully");
            this.getAllFosRequest();
            this.commonHelper.dismissLoading();
          });
      },
      (error) => {
        this.commonHelper.presentToast("something goes wrong");
        this.commonHelper.dismissLoading();
      }
    );
  }
  rejectFos(tagging_id) {
    this.commonHelper.presentLoading().then(
      () => {
        let body = { tagging_id };
        this.apiService
          .rejectFosRequest(body)
          .subscribe((data: HttpResponse<any>) => {
            console.log(data.body);
            this.commonHelper.presentToast("Request deleted successfully");
            this.getAllFosRequest();
            this.commonHelper.dismissLoading();
          });
      },
      (error) => {
        this.commonHelper.presentToast("something goes wrong");
        this.commonHelper.dismissLoading();
      }
    );
  }
  onSearchChange($event: CustomEvent) {
    // let inputfrom = $event.detail.value.toLowerCase();
    // if (inputfrom == "") {
    //   this.getAllFosRequest();
    //   return;
    // }
    // // let inputfrom = (($event.detail.value)).toLowerCase();
    // let allrequest = this.allRequests.filter(
    //   (item) => item.cp_fos_name.toLowerCase() == inputfrom
    // );
    // this.allRequests = allrequest;
    console.log($event.detail.value);
  }
  doRefresh($event) {
    console.log({ $event });
    setTimeout(() => {
      // this.VerficationStatus();
      this.getAllFosRequest();
      console.log("Async operation has ended");
      $event.target.complete();
    }, 500);
  }
}
