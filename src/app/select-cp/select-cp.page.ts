import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  LoadingController,
  ModalController,
  NavController,
  PopoverController,
} from "@ionic/angular";
import { Storage } from "@ionic/storage";

import { CommonHelperService } from "./../services/common-helper.service";
import { CustomModelComponent } from "../components/custom-model/custom-model.component";
import { DataService } from "../services/data.service";
import { APIService } from "../services/APIService";
import { Helper } from "../services/Helper";
import { responsefromlogin } from "../models/Login";

@Component({
  selector: "app-select-cp",
  templateUrl: "./select-cp.page.html",
  styleUrls: ["./select-cp.page.scss"],
})
export class SelectCPPage implements OnInit {
  public myForm: FormGroup = this.fb.group({});
  public firms = [];
  private static readonly searchbox = "searchbox";
  private static readonly firm = "firm";
  searchbox_nm;
  loader;
  fosId;

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
    });
  }
  ngOnInit() {
    // this.firms = [...this.data.firms()];
    // this.getCPList();
    this.getUserInfo();
    // this.navctrl.navigateForward("cpstatus");

    this.myForm = this.fb.group({
      [SelectCPPage.searchbox]: [""],
      [SelectCPPage.firm]: [""],
    });
  }
  changeOrgz($event: any) {
    // console.log($event);
  }
  async confirmBox() {
    const cp_id = this.myForm.controls[SelectCPPage.firm].value;
    let name = this.firms.find((item) => item.cp_entity_id == cp_id).name;
    console.log(typeof cp_id);
    console.log(cp_id);
    if (!cp_id) {
      this.commonser.presentToast("Please select any one of Firm");
      return;
    }
    const model = await this.modalController.create({
      component: CustomModelComponent,
      // translucent: true,
      cssClass: "cp-confirm-modal",
      componentProps: { cp_id, name },
    });

    model.present();

    model.onDidDismiss().then((res) => {
      // console.log(res);
      // return res;
      if (res.data != null) {
        console.log(res.data);
        let cp_entity_id = res.data.cp_entity_id;
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
                  () => {
                    this.helper.getUserInfo().then((val: responsefromlogin) => {
                      // val.data.cp_entity_id = res.cp_entity_id;
                      val.is_cp_tagging_requested = 1;

                      this.storage.set("user_info", JSON.stringify(val));
                      this.navctrl.navigateRoot("cpstatus");
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
    console.log(events.target.value);
    // const inputtype =
    //   this.myForm.controls[SelectCPPage.searchbox].value.toLowerCase();
    let inputtype = events.target.value;
    // console.log(inputtype);
    if (inputtype.length == "" || inputtype.length <= 3) {
      // this.firms = [...this.data.firms()];
      // this.searchbox_nm = null;
      return;
    }
    this.getCPList(inputtype);
    // this.firms = this.firms.filter((item) =>
    //   item.name.toLowerCase().includes(inputtype)
    // );
    // console.log(events.data)
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
