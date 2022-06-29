import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  Platform,
  PopoverController,
} from "@ionic/angular";
import { NavigationExtras, Router } from "@angular/router";

import { Storage } from "@ionic/storage";
import { TeamList } from "../models/TeamList";
import { Helper } from "../services/Helper";
import { MatIconRegistry } from "@angular/material";
import { APIService } from "../services/APIService";
import { WebServer } from "../services/WebServer";
import { Network } from "@ionic-native/network/ngx";
import { responsefromlogin } from "../models/Login";

@Component({
  selector: "app-team-list",
  templateUrl: "./team-list.page.html",
  styleUrls: ["./team-list.page.scss"],
})
export class TeamListPage implements OnInit {
  teamList = [];
  count: number;
  storageData = [];
  visible: Boolean;
  isSpinner: any = true;
  successvalue: any;
  loader: any;
  cancelSuccessValue: any;
  teamListModel = new TeamList();

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
    public navCtrl: NavController,
    public modalController: ModalController
  ) {
    if (this.teamList.length === 0) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }
  ngOnInit() {
    this.helper.getUserInfo().then((val: responsefromlogin) => {
      // console.log(val);
      this.teamListModel.cp_entity_id = val.data.cp_entity_id;
      this.teamListModel.api_token = val.data.api_token;

      if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
        this.helper.presentToastError("Please on Internet Connection");
        this.isSpinner = false;
      } else {
        this.isSpinner = true;
        // this.getCPFOSList();
        this.getCPteamList();
      }
    });
  }

  /*
  ionViewDidEnter() {
    this.storage.get("cp_id").then((val) => {
      console.log("1", val);
      this.teamListModel.cp_id = 1;

      this.storage.get("apiToken").then((val1) => {
        this.teamListModel.api_token = val1;

        if (
          !(this.network.type !== "none" && this.network.type !== "unknown")
        ) {
          this.helper.presentToastError("Please on Internet Connection");
          this.isSpinner = false;
        } else {
          this.isSpinner = true;
          this.getCPteamList();
        }
      });
    });
  }
  */

  /*Get Team  List*/
  getCPteamList() {
    // tslint:disable-next-line:max-line-length
    this.presentLoading().then(() => {
      this.apiservice.getCpTeamLeads(this.teamListModel.cp_entity_id).subscribe(
        (data) => {
          console.log(data);
          this.isSpinner = false;
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);
          console.log("my data", Value.success);
          if (Value.success === 1) {
            this.teamList = Value.data.team_members;
            this.count = Value.data.count;
            this.dismissLoading();
          } else {
            this.dismissLoading();
            this.helper.presentToastError("Something went wrong");
          }
        },
        (error) => {
          this.dismissLoading();
          this.helper.presentToastError("Something went wrong");
        }
      );
    });
  }

  addTeamPerson() {
    this.router.navigate(["/home/"]);
  }

  doRefresh(event) {
    console.log("Begin async operation");
    setTimeout(() => {
      this.teamList = [];
      this.isSpinner = true;
      this.getCPteamList();
      console.log("Async operation has ended");
      event.target.complete();
    }, 500);
  }

  updateTeamLead(index, cp_id) {
    // this.storage.remove("StoreData");
    // this.storageData = [];
    // this.storageData.push(this.teamList[index].full_name);
    // this.storageData.push(this.teamList[index].mobile);
    // this.storageData.push(this.teamList[index].email);
    // this.storage.set("StoreDataNew", this.storageData);
    // this.storage.set("StoreData", cp_id);
    this.router.navigate(["/teamperson/"], {
      queryParams: {
        full_name: this.teamList[index].full_name,
        mobile: this.teamList[index].mobile,
        email: this.teamList[index].email,
      },
    });
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

  LeaderTOFOS() {
    this.storage.set("Leader", 1);
    this.storage.set("ID", 3);
    this.storage.set("FromHome", 2);
    this.router.navigate(["/add-fos-list/"]);
  }

  gotoFOS() {
    this.storage.set("FOS", 1);
    this.storage.set("GOTOFOS", 0);
    this.router.navigate(["/foslist/"]);
  }
  // LeaderTOFOS(){  //Add in WFH 19/03/2020
  //   this.storage.set('Leader', 1);
  //   this.storage.set('ID', 2);
  //   this.router.navigate(['/add-fos-list/']);
  // }
}
