import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  LoadingController,
  ModalController,
  NavController,
  PopoverController,
} from "@ionic/angular";

import { APIService } from "../services/APIService";
import { BehaviorSubject } from "rxjs";
import { CommonHelperService } from "./../services/common-helper.service";
import { CustomModelComponent } from "../components/custom-model/custom-model.component";
import { DataService } from "../services/data.service";
import { Helper } from "../services/Helper";
import { Storage } from "@ionic/storage";
import { responsefromlogin } from "../models/Login";

@Component({
  selector: "app-select-cp",
  templateUrl: "./select-cp.page.html",
  styleUrls: ["./select-cp.page.scss"],
})
export class SelectCPPage implements OnInit {
  public myForm: FormGroup = this.fb.group({});
  public firms = [];
  public allCps = new BehaviorSubject<any>(null);
  private static readonly searchbox = "searchbox";
  private static readonly firm = "firm";
  searchbox_nm;
  loader;
  fosId;
  is_cp_tagging_requested;

  constructor(
    public fb: FormBuilder,
    public data: DataService,
    public commonser: CommonHelperService,
    public popoverController: PopoverController,
    public modalController: ModalController,
    public apiService: APIService,
    public helper: Helper,
    public loadingController: LoadingController,
    public navctrl: NavController,
    public storage: Storage
  ) {}

  getUserInfo() {
    this.helper.getUserInfo().then((val: responsefromlogin) => {
      this.fosId = val.data.fos_id;
      this.is_cp_tagging_requested = val.is_cp_tagging_requested;
    });
  }
  ngOnInit() {
    // this.firms = [...this.data.firms()];
    // this.getCPList();
    this.getUserInfo();
    // this.navctrl.navigateForward("cpstatus");
    this.getCplistTemp("");
    this.myForm = this.fb.group({
      [SelectCPPage.searchbox]: [""],
      [SelectCPPage.firm]: [""],
    });
  }
  changeOrgz($event: any) {
    // console.log($event);
  }
  async confirmBox() {
    //id means cp_id
    const id = this.myForm.controls[SelectCPPage.firm].value;
    let name;
    // console.log(typeof id);
    // console.log(id);
    if (!id) {
      this.commonser.presentToast("Please select any one of Firm");
      return;
    } else {
      name = this.firms.find((item) => item.cp_entity_id == id).billing_name;
    }
    const model = await this.modalController.create({
      component: CustomModelComponent,
      // translucent: true,
      cssClass: "fos-delete-modal",
      componentProps: {
        header: "Confirmation for CP",
        message: "Are you sure you want to continue with",
        data: { id, name },
      },
    });

    model.present();

    model.onDidDismiss().then((res) => {
      // console.log(res);
      // return res;
      if (res.data != null) {
        console.log(res.data);
        let cp_entity_id = res.data.data.id;
        console.log(cp_entity_id);
        this.apiService
          .cpEntityTaggingRequest({
            cp_entity_id,
            cp_fos_id: this.fosId,
          })
          .map((r) => r.body)
          .subscribe(
            (res) => {
              console.log(res);
              if (res != null) {
                this.helper.presentAlert(
                  "Success",
                  "CP tagging successfully!",
                  "OK",
                  "",
                  () => {
                    this.helper.getUserInfo().then((val: responsefromlogin) => {
                      // val.data.cp_entity_id = res.cp_entity_id;
                      val.is_cp_tagging_requested = 1;

                      this.storage
                        .set("user_info", JSON.stringify(val))
                        .then(() => {
                          this.navctrl.navigateRoot("cpstatus", {
                            replaceUrl: true,
                            queryParams: { pending: true },
                          });
                        });
                    });
                  }
                );
              }

              // this.myForm.reset();
            },
            (e) => {
              this.helper.presentToastError("something went wrong");
            }
          );
      }
    });
  }

  public search(events: any) {
    // console.log(events.target.value);
    // const inputtype =
    //   this.myForm.controls[SelectCPPage.searchbox].value.toLowerCase();
    let inputtype = events.target.value;
    // console.log(inputtype);
    if (inputtype == "") {
      // this.firms = [...this.data.firms()];
      this.firms = [];
      this.getCplistTemp("");
      // this.searchbox_nm = null;
      return;
    }
    const cpFirms: Array<any> = this.allCps.value;
    // this.getCPList(inputtype);
    this.firms = cpFirms.filter((item) =>
      item.billing_name.toLowerCase().startsWith(inputtype.toLowerCase())
    );
    // console.log(events.data)
  }
  getCplistTemp(name: any) {
    this.helper.showLoader("Plese wait");
    this.apiService
      .getcpEntitySearch(name)
      .map((r) => r.body)
      .subscribe(
        (res: Array<any>) => {
          // this.firms = res;
          // res = res.map((item) => {
          //   return { billing_name: item.billing_name };
          // });
          console.log(res);
          this.allCps.next(null);
          this.allCps.next(res);
          this.helper.hideLoader();
        },
        (e) => {
          this.helper.hideLoader();
          this.helper.presentToastError("something went wrong");
        }
      );
  }
  getCPList(name) {
    this.helper.showLoader("Plese wait");
    this.apiService
      .getcpEntitySearch(name)
      .map((r) => r.body)
      .subscribe(
        (res) => {
          console.log(res);
          this.firms = res;
          this.helper.hideLoader();
        },
        (e) => {
          this.helper.hideLoader();
          this.helper.presentToastError("something went wrong");
        }
      );
  }
  clear() {
    this.firms = [];
    this.searchbox_nm = "";
    // getCPList();
  }
}
