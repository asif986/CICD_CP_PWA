import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { APIService } from "../services/APIService";
import { Reminder } from "../models/Reminder";
import { FosList } from "../models/FosList";
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  Platform,
  PopoverController,
} from "@ionic/angular";
import { Helper } from "../services/Helper";
import { Network } from "@ionic-native/network/ngx";
import { WebServer } from "../services/WebServer";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { DataService } from "../services/data.service";
import { DeleteFos } from "../models/DeleteFos";
import { UpdateFOS } from "../models/UpdateFOS";
import { responsefromlogin } from "../models/Login";
import { CustomModelComponent } from "../components/custom-model/custom-model.component";

@Component({
  selector: "app-foslist",
  templateUrl: "./foslist.page.html",
  styleUrls: ["./foslist.page.scss"],
})
export class FOSListPage implements OnInit {
  // tslint:disable-next-line:ban-types
  visible: Boolean;
  newlead = 0;
  is_team_lead = 0;
  is_admin = 0;
  // xd = [];
  fosList = [];
  storageData = [];
  fosListModel: FosList = new FosList();
  isSpinner: any = true;
  successvalue: any;

  deleteFos: DeleteFos = new DeleteFos();
  updateFOS: UpdateFOS = new UpdateFOS();
  loader: any;
  cancelSuccessValue: any;
  is_team_lead_New: any;
  FOS: any;
  cp_entity_id;
  // tslint:disable-next-line:max-line-length
  constructor(
    private storage: Storage,
    public loadingController: LoadingController,
    private alertCtrl: AlertController,
    public alertController: AlertController,
    public popoverController: PopoverController,
    public helper: Helper,
    public apiservice: APIService,
    private network: Network,
    public webServer: WebServer,
    private cd: ChangeDetectorRef,
    private platform: Platform,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    // tslint:disable-next-line:max-line-length
    private domSanitizer: DomSanitizer,
    public navCtrl: NavController,
    public modalController: ModalController,
    private dataService: DataService
  ) {
    this.platform.backButton.subscribeWithPriority(1, () => {
      if (this.FOS == 1) {
        this.router.navigate(["/teamlist/"]);
        this.storage.set("IDFromPerformance", 2);
        console.log("Click on backpress");
      } else {
        this.router.navigate(["/home/"]);
        this.storage.set("IDFromPerformance", 2);
        console.log("Click on backpress");
      }
    });

    if (this.fosList.length === 0) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  ngOnInit() {
    this.helper.getUserInfo().then((val: responsefromlogin) => {
      console.log(val);

      this.cp_entity_id = val.data.cp_entity_id;
      console.log(this.cp_entity_id);

      if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
        this.helper.presentToastError("Please on Internet Connection");
        this.isSpinner = false;
      } else {
        this.isSpinner = true;
        this.getCPFOSList();
      }
    });
    /* // tslint:disable-next-line:max-line-length
    this.apiservice.CpFosList(1, 'igMcioBncsDfj2yU2BcYxiff0k3HM5RYEV9KoTuqAvn1aDRuivgTsp1HMTzL').subscribe(data => {

      const data1 = data.body.data.data;
      const success = data.body.success;
      if (success === 1) {
        console.log(data1);
        this.xd = data1;
      }
    });
*/
  }

  ionViewDidEnter() {
    // this.platform.backButton.subscribeWithPriority(1, () => {
    //   if(this.FOS==1){
    //     this.router.navigate(['/teamlist/']);
    //     this.storage.set('IDFromPerformance',2);
    //     console.log('Click on backpress');
    //   } else {
    //     this.router.navigate(['/home/']);
    //     this.storage.set('IDFromPerformance',2);
    //     console.log('Click on backpress');
    //   }
    // });
    //   this.storage.get('is_team_lead').then((is_team_lead) => {
    //       this.is_team_lead = is_team_lead;
    //   });
    //   this.storage.get('is_admin').then((val4) => {
    //       this.is_admin = val4;
    //       console.log(this.is_admin);
    //   });
    //   this.storage.get('FOS').then((FOS) => {
    //     this.FOS = FOS;
    //     console.log('FOS',this.FOS);
    // });
    //     this.storage.get("cp_id").then((val) => {
    //       this.storage.get("cp_executive_id").then((val1) => {
    //         console.log("1", val);
    //         this.fosListModel.cp_id = val;
    //         this.fosListModel.cp_executive_id = val1;
    //         /*this.markasDone.api_token = val1;
    //         this.deleterminder.api_token = val1;
    // */
    //         this.storage.get("apiToken").then((val1) => {
    //           this.fosListModel.api_token = val1;
    //           this.deleteFos.api_token = val1;
    //         });
    //       });
    //     });
  }

  /*Get CP FOS List*/
  getCPFOSList() {
    // tslint:disable-next-line:max-line-length
    this.presentLoading().then(() => {
      this.apiservice
        .CpFosList(this.cp_entity_id)
        .map((r) => r.body)
        .subscribe(
          (data) => {
            console.log(data);
            this.isSpinner = false;
            this.dismissLoading();

            if (data.length !== 0) {
              this.fosList = data;
              // for (let i = 0; i < this.fosList.length; i++) {
              //   if (this.fosList[i]) {
              //     this.is_team_lead_New = this.fosList[i].is_team_lead;
              //     console.log("this.is_team_lead", this.is_team_lead_New);
              //   }
              // }
            }
          },
          (error) => {
            this.dismissLoading();
            this.helper.presentToastError("Something went wrong");
          }
        );
    });
  }

  goback() {
    if (this.FOS == 1) {
      this.router.navigate(["/teamlist/"]);
      this.storage.set("IDFromPerformance", 2);
      console.log("Click on backpress");
    } else {
      this.router.navigate(["/home/"]);
      this.storage.set("IDFromPerformance", 2);
      console.log("Click on backpress");
    }
  }

  // addFOS() {
  //   this.storage.set("ID", 1);
  //   this.storage.set("Leader", 2);
  //   this.storage.set("FromHome", 1);
  //   this.router.navigate(["/add-fos-list/"]);
  //   console.log("Click on backpress");
  // }

  async deleteFosData(fos_info: any) {
    // this.deleteFos.cp_executive_id = cp_id;

    const model = await this.modalController.create({
      component: CustomModelComponent,
      // translucent: true,
      cssClass: "fos-delete-modal",
      componentProps: {
        header: "Remove FOS",
        message: "Are you sure you want to remove fos?",
        data: { name: fos_info.name, id: fos_info.fos_id },
      },
    });

    model.present();

    model.onDidDismiss().then((res) => {
      console.log(res);
      // return;
      if (res.data != null) {
        this.presentLoading().then(() => {
          this.apiservice.DeleteFos({ cp_fos_id: fos_info.fos_id }).subscribe(
            (response) => {
              // this.cancelSuccessValue = JSON.stringify(response.body);
              // const Value = JSON.parse(this.cancelSuccessValue);
              // if (Value.success === 1) {
              // console.log("Value.success" + Value.success);
              this.helper.presentToastSuccess("Delete Successfully!");
              this.dismissLoading();
              /*Call Project Update API*/
              if (
                !(
                  this.network.type !== "none" &&
                  this.network.type !== "unknown"
                )
              ) {
                this.helper.presentToastError("Please on Internet Connection");
              } else {
                this.getCPFOSList();
              }
              // } else {
              //   this.dismissLoading();
              //   this.helper.presentToastError("Something went wrong");
              // }
              // return response;
            },
            (error) => {
              this.dismissLoading();
              this.helper.presentToastError("Something went wrong");
            }
          );
        });
      }
    });
  }

  /**
   * Updates fos
   * @param fosData
   */
  updateFos(fosData) {
    console.log(fosData);
    this.router.navigate(["/update-is-team-fos"]);
  }
  /* console.log(val);
    const navigationExtras: NavigationExtras = {
      state: {
        Fos: val
      }
    };
    console.log(navigationExtras);
    this.router.navigate(['/add-fos-list/'], navigationExtras);*/

  updateFosData(index, cp_id) {
    this.updateFOS.cp_executive_id = cp_id;
    this.storage.remove("StoreData");
    this.storageData = [];
    this.storageData.push(this.fosList[index].first_name);
    this.storageData.push(this.fosList[index].middle_name);
    this.storageData.push(this.fosList[index].last_name);
    this.storageData.push(this.fosList[index].mobile_number);
    this.storageData.push(this.fosList[index].email);
    this.storageData.push(this.fosList[index].is_team_lead);
    this.storage.set("StoreData", this.storageData);
    this.storage.set("ID", 2);
    this.storage.set("Leader", 2);
    this.storage.set("FromHome", 3);
    this.storage.set("cp_Ex_id", this.updateFOS.cp_executive_id);
    if (this.FOS == 1) {
      this.storage.set("Leader", 3);
      this.storage.set("AddNEW", 1);
      this.router.navigate(["/add-fos-list/"]);
    } else if (this.FOS == 2) {
      this.storage.set("AddNEW", 2);
      this.router.navigate(["/add-fos-list/"]);
    }
  }

  async presentLoading() {
    this.loader = await this.loadingController.create({
      translucent: true,
    });
    await this.loader.present();
  }

  async dismissLoading() {
    await this.loader.dismiss();
  }

  doRefresh(event) {
    console.log("Begin async operation");
    setTimeout(() => {
      this.fosList = [];
      this.isSpinner = true;
      this.getCPFOSList();
      console.log("Async operation has ended");
      event.target.complete();
    }, 500);
  }
}
