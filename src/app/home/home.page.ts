import {
  ActionSheetController,
  AlertController,
  Events,
  IonSlides,
  LoadingController,
  ModalController,
  NavController,
  Platform,
} from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

import { APIService } from "../services/APIService";
import { BottomNavPage } from "../bottom-nav/bottom-nav.page";
import { CPFeed } from "../models/CPFeed";
import { DataService } from "../services/data.service";
import { Helper } from "../services/Helper";
import { HttpClient } from "@angular/common/http";
import { Network } from "@ionic-native/network/ngx";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { TeamLeaderOrNot } from "../models/TeamLeaderOrNot";
import { UniqueDeviceID } from "@ionic-native/unique-device-id/ngx";
import { responsefromlogin } from "../models/Login";
import { CommonHelperService } from "../services/common-helper.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  // Only Used Variables
  cpfeedData: CPFeed = new CPFeed();
  searchVal: any = "";
  apiToken = "";
  userId = 0;
  cp_entity_id;
  login_type;
  USERNEWID = 1;
  uuid = 0;
  fcmToken: any;
  newExecutiveId = 0;
  newLoginApi: any;
  leadlist: any = [];
  // societyEventBanners: any = [];
  storageData = [];
  successvalue: any;
  successValueDetails: any;
  is_team_lead: any;
  is_admin: any;
  IDFromPerformance: any;
  last_lead_updated_at: any;
  isSpinner: any = true;
  lead_status_id: any;
  token_type_id: any;
  teamLeaderornot: TeamLeaderOrNot = new TeamLeaderOrNot();
  accordionExapanded = false;
  icon = "arrow-dropdown";
  panelOpenState = true;
  loader: any;
  expanded = true;
  // Use This For FilterFeed
  SelectProjectID: any;
  lead_status_id_FromFilter: any;
  SelectCategoryID_FromFilter: number;
  token_type_id_FromFilter: any;

  fos_id;
  societyEventBanners = [
    { media_type_id: "1", media_path: "assets/new_icons/banner_img/1.png" },
  ];

  fabIconList = [
    {
      name: "New Lead",
      iconName: "person-add",
      url: "/addnewlead",
      login_type: 2,
    },
    {
      name: "Approve FOS",
      iconName: "person-add",
      url: "/approve-fosrequest",
      login_type: 1,
    },
    { name: "Fos List", iconName: "list", url: "/foslist", login_type: 1 },
  ];

  // tslint:disable-next-line:max-line-length
  constructor(
    private storage: Storage,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public commonHelperService: CommonHelperService,
    public helper: Helper,
    public apiservice: APIService,
    private network: Network,
    private platform: Platform,
    private router: Router,
    private alertCtrl: AlertController,
    // tslint:disable-next-line:max-line-length
    private http: HttpClient,
    private uniqueDeviceID: UniqueDeviceID,
    public navCtrl: NavController,
    private dataService: DataService,

    public events: Events
  ) {
    this.helper.redirectionOfUser();

    //  Unique Device ID
    this.uniqueDeviceID
      .get()
      .then((uuid: any) => {
        this.uuid = uuid;
      })
      .catch((error: any) => {});

    // Back Exit App
    this.platform.backButton.subscribeWithPriority(1, () => {
      if (this.IDFromPerformance == 1) {
        console.log("from performancs -  perform_id", this.IDFromPerformance);
        this.isSpinner = true;
        this.getFeedData();
        this.router.navigate(["/myperformance/"]);
      } else {
        console.log("from login - perform_id", this.IDFromPerformance);
        this.storage.ready().then(() => {
          this.storage.remove("lead_status_id");
          this.storage.remove("token_type_id");
          this.storage.remove("IDFromPerformance");
        });
        this.exitapp();
      }
    });
  }

  ngOnInit() {}

  getFabIconsList(login_type) {
    // console.log(login_type);

    this.fabIconList = this.fabIconList.filter((r) => {
      if (r.login_type === login_type) {
        // console.log(r);
        // console.log(r);
        return true;
      }
      // return true;
    });
  }

  ionViewDidEnter() {
    // Used it For Team Lead Event Call
    this.events.subscribe("forAddFOS", () => {
      this.isSpinner = true;
      this.storage.get("is_team_lead").then((val3) => {
        this.is_team_lead = val3;
        console.log(this.is_team_lead);
      });
    });
    this.helper.getUserInfo().then((val: responsefromlogin) => {
      this.cp_entity_id = val.data.cp_entity_id;
      this.apiToken = val.data.api_token;
      this.fos_id = val.data.fos_id;
      this.login_type = val.login_type;
      this.getFabIconsList(this.login_type);

      this.getFeedData();
    });
    // From Call API

    // this.storage.get("IDFromPerformance").then((IDFromPerformancea) => {
    //   this.storage.get("cp_executive_id").then((cp_executive_id) => {
    //     this.storage.get("apiToken").then((apiToken) => {
    //       this.storage.get("is_team_lead").then((is_team_lead) => {
    //         this.storage.get("is_admin").then((is_admin) => {
    //           this.storage.get("SelectCategoryID").then((SelectCategoryID) => {
    //             this.storage.get("lead_status_id").then((lead_status_id) => {
    //               this.storage.get("token_type_id").then((token_type_id) => {
    //                 this.IDFromPerformance = IDFromPerformancea;
    //                 console.log(this.IDFromPerformance);
    //                 this.newExecutiveId = cp_executive_id;
    //                 // this.newLoginApi = apiToken;
    //                 this.is_team_lead = is_team_lead;
    //                 this.is_admin = is_admin;
    //                 this.SelectCategoryID_FromFilter = SelectCategoryID;
    //                 this.lead_status_id_FromFilter = lead_status_id;
    //                 this.token_type_id_FromFilter = token_type_id;
    //                 console.log(this.SelectCategoryID_FromFilter);
    //                 console.log(this.lead_status_id_FromFilter);
    //                 console.log(this.token_type_id_FromFilter);
    //                 if (
    //                   !(
    //                     this.network.type !== "none" &&
    //                     this.network.type !== "unknown"
    //                   )
    //                 ) {
    //                   this.helper.presentToast("Please on Internet Connection");
    //                   this.isSpinner = false;
    //                 } else {
    //                   this.isSpinner = true;
    //                   // if (IDFromPerformancea == 2) {
    //                   //   this.getFeedData();
    //                   //   // this.getBannerData();
    //                   //   this.updateToken();
    //                   // } else if (IDFromPerformancea == 1) {
    //                   //   this.Filter();
    //                   // }
    //                 }
    //               });
    //             });
    //           });
    //         });
    //       });
    //     });
    //   });
    // });

    this.platform.backButton.subscribeWithPriority(1, () => {
      if (this.IDFromPerformance == 1) {
        console.log("from performancs -  perform_id", this.IDFromPerformance);
        this.isSpinner = true;
        this.getFeedData();
        this.router.navigate(["/myperformance/"]);
      } else {
        console.log("from login - perform_id", this.IDFromPerformance);
        this.storage.ready().then(() => {
          this.storage.remove("lead_status_id");
          this.storage.remove("token_type_id");
          this.storage.remove("IDFromPerformance");
        });
        this.exitapp();
      }
    });
  }

  // Following API Call (With Out Filter)
  // 1==>Banner API ,2==>Feed API , 3==>Search API , 4==>DoInfinte Api , 5==>Do Refresh ,6==>RemoveorAddTeamLeader
  // Call Banner API
  getBannerData() {
    if (this.network.type !== "none" && this.network.type !== "unknown") {
      this.apiservice.GetAllProjectBanners(this.newLoginApi).subscribe(
        (data) => {
          this.successValueDetails = JSON.stringify(data.body);
          const Value = JSON.parse(this.successValueDetails);
          if (Value.success === 1) {
            this.societyEventBanners = Value.data;
            console.log("this.societyEventBanners", this.societyEventBanners);
          } else {
            this.isSpinner = false;
            // this.helper.presentToast("Something Went Wrong");
          }
        },
        (err) => {
          this.isSpinner = false;
          // this.helper.presentToast("Something Went Wrong");
        }
      );
    }
  }

  /*Call Get Feed Api*/
  getFeedData() {
    this.cpfeedData.api_token = this.newLoginApi;
    this.cpfeedData.cp_executive_id = this.newExecutiveId;
    if (this.network.type !== "none" && this.network.type !== "unknown") {
      this.apiservice
        .getCPFeed(
          this.cp_entity_id,
          this.fos_id,
          this.login_type,
          this.apiToken,
          0,
          null
        )
        .subscribe(
          (data) => {
            this.successvalue = JSON.stringify(data.body);
            const Value = JSON.parse(this.successvalue);
            console.log("successvalue", Value.success);
            this.isSpinner = false;
            if (Value.success === 1) {
              // this.getTeamLeaderRemoveOrUpdate();
              this.leadlist = Value.data;
              this.last_lead_updated_at =
                this.leadlist[this.leadlist.length - 1].ids.updated_at;
              for (let i = 0; i < this.leadlist.length; i++) {
                if (this.leadlist[i]) {
                  this.lead_status_id = this.leadlist[i].ids.lead_status_id;
                  this.token_type_id = this.leadlist[i].ids.token_type_id;
                }
              }

              console.log(this.leadlist);
            }
          },
          (err) => {
            this.isSpinner = false;
            // this.helper.presentToast("Something Went Wrong");
          }
        );
    }
  }

  // Search Function Without Pagination
  search(event) {
    const title = event.target.value;
    const me = this;
    if (title.length >= 1) {
      me.isSpinner = true;
      me.leadlist = [];
      this.cpfeedData.api_token = this.newLoginApi;
      this.cpfeedData.cp_executive_id = this.newExecutiveId;
      if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
        this.helper.presentToast("Please on Internet Connection");
      } else {
        this.apiservice
          .getCPFeedSeach(
            this.cp_entity_id,
            this.fos_id,
            this.login_type,
            this.cpfeedData.api_token,
            title,
            0,
            null
          )
          .subscribe(
            (data) => {
              me.isSpinner = false;
              this.successvalue = JSON.stringify(data.body);
              const Value = JSON.parse(this.successvalue);
              if (Value.success === 1) {
                this.leadlist = Value.data;
                this.last_lead_updated_at =
                  this.leadlist[this.leadlist.length - 1].ids.updated_at;
                for (let i = 0; i < this.leadlist.length; i++) {
                  if (this.leadlist[i]) {
                    this.lead_status_id = this.leadlist[i].ids.lead_status_id;
                    // console.log("this.is_kyc_uploaded", this.lead_status_id);
                  }
                }
              } else {
                me.isSpinner = false;
                // this.helper.presentToast("Something Went Wrong");
              }
            },
            (err) => {
              me.isSpinner = false;
              // this.helper.presentToast("Something Went Wrong");
            }
          );
      }
    } else {
      this.getFeedData();
    }
  }

  // Infinite Scroll For Search and Regular
  doInfinite(count, infiniteScroll) {
    console.log(count);
    console.log(infiniteScroll);
    if (this.searchVal != "") {
      const title = this.searchVal;
      const me = this;
      if (title.length >= 1) {
        me.isSpinner = true;
        this.cpfeedData.api_token = this.newLoginApi;
        this.cpfeedData.cp_executive_id = this.newExecutiveId;
        this.apiservice
          .getCPFeedSeach(
            this.cp_entity_id,
            this.fos_id,
            this.login_type,
            this.cpfeedData.api_token,
            title,
            count,
            this.last_lead_updated_at
          )
          .subscribe(
            (data) => {
              this.successvalue = JSON.stringify(data.body);
              const Value = JSON.parse(this.successvalue);
              if (Value.success === 1) {
                if (Value.data.length != 0) {
                  this.last_lead_updated_at =
                    this.leadlist[this.leadlist.length - 1].ids.updated_at;
                  console.log("loop last", this.last_lead_updated_at);
                  if (this.leadlist.length == 0) {
                    this.leadlist = Value.data;
                  } else {
                    for (const val of Value.data) {
                      this.leadlist.push(val);
                    }

                    infiniteScroll.target.complete();
                  }
                } else {
                }
              }
              infiniteScroll.target.complete();
            },
            (err) => {
              infiniteScroll.target.complete();
            }
          );
      }
      infiniteScroll.target.complete();
    } else {
      if (this.leadlist.length > 2) {
        const me = this;
        this.apiservice
          .getCPFeed(
            this.cp_entity_id,
            this.fos_id,
            this.login_type,
            this.cpfeedData.api_token,
            count,
            this.last_lead_updated_at
          )
          .subscribe(
            (data) => {
              this.successvalue = JSON.stringify(data.body);
              const Value = JSON.parse(this.successvalue);
              if (Value.success === 1) {
                if (Value.data.length != 0) {
                  this.last_lead_updated_at =
                    this.leadlist[this.leadlist.length - 1].ids.updated_at;
                  // console.log("loop last", this.last_lead_updated_at);
                  for (const val of Value.data) {
                    this.leadlist.push(val);
                  }
                  this.last_lead_updated_at =
                    this.leadlist[this.leadlist.length - 1].ids.updated_at;
                  // console.log("last loop length ="+ (this.leadlist.length-1)+"loop date = "+this.last_lead_updated_at);
                  infiniteScroll.target.complete();
                }

                infiniteScroll.target.complete();
              }
            },
            (err) => {
              infiniteScroll.target.complete();
            }
          );
      } else {
        infiniteScroll.target.complete();
      }
    }
  }

  // Call Api With Filter
  Filter() {
    if (this.SelectCategoryID_FromFilter == 0) {
      if (this.token_type_id_FromFilter == 1) {
        var param = {
          project_id: 0,
          lead_status_id: this.lead_status_id_FromFilter,
          token_type_id: this.token_type_id_FromFilter,
        };
      } else if (this.token_type_id_FromFilter == 3) {
        var param = {
          project_id: 0,
          lead_status_id: this.lead_status_id_FromFilter,
          token_type_id: this.token_type_id_FromFilter,
        };
      } else {
        var param = {
          project_id: 0,
          lead_status_id: this.lead_status_id_FromFilter,
          token_type_id: null,
        };
      }
    } else if (this.SelectCategoryID_FromFilter !== 0) {
      if (this.token_type_id == 1) {
        var param = {
          project_id: this.SelectCategoryID_FromFilter,
          lead_status_id: this.lead_status_id_FromFilter,
          token_type_id: this.token_type_id_FromFilter,
        };
      } else if (this.token_type_id == 3) {
        var param = {
          project_id: this.SelectCategoryID_FromFilter,
          lead_status_id: this.lead_status_id_FromFilter,
          token_type_id: this.token_type_id_FromFilter,
        };
      } else {
        var param = {
          project_id: this.SelectCategoryID_FromFilter,
          lead_status_id: this.lead_status_id_FromFilter,
          token_type_id: null,
        };
      }
    }
    const me = this;
    me.isSpinner = true;
    me.leadlist = [];
    this.cpfeedData.api_token = this.newLoginApi;
    this.cpfeedData.cp_executive_id = this.newExecutiveId;
    if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
      this.helper.presentToast("Please on Internet Connection");
    } else {
      this.apiservice
        .getCPFeedFilter(
          this.cp_entity_id,
          this.fos_id,
          this.login_type,
          this.cpfeedData.api_token,
          JSON.stringify(param),
          0,
          null
        )
        .subscribe(
          (data) => {
            me.isSpinner = false;
            this.successvalue = JSON.stringify(data.body);
            const Value = JSON.parse(this.successvalue);
            console.log(Value.success);
            if (Value.success === 1) {
              this.leadlist = Value.data;
              this.last_lead_updated_at =
                this.leadlist[this.leadlist.length - 1].ids.updated_at;
              for (let i = 0; i < this.leadlist.length; i++) {
                if (this.leadlist[i]) {
                  this.lead_status_id = this.leadlist[i].ids.lead_status_id;
                  console.log(this.lead_status_id);
                }
              }
            }
          },
          (err) => {
            me.isSpinner = false;
            // this.helper.presentToast("Something Went Wrong");
          }
        );
    }
  }

  // DoInfiniteScrollViewForFilter
  doInfiniteFilter(count, infiniteScroll) {
    console.log(infiniteScroll);
    if (this.SelectCategoryID_FromFilter == 0) {
      if (this.token_type_id_FromFilter == 1) {
        var param = {
          project_id: 0,
          lead_status_id: this.lead_status_id_FromFilter,
          token_type_id: this.token_type_id_FromFilter,
        };
      } else if (this.token_type_id_FromFilter == 3) {
        var param = {
          project_id: 0,
          lead_status_id: this.lead_status_id_FromFilter,
          token_type_id: this.token_type_id_FromFilter,
        };
      } else {
        var param = {
          project_id: 0,
          lead_status_id: this.lead_status_id_FromFilter,
          token_type_id: null,
        };
      }
    } else if (this.SelectCategoryID_FromFilter !== 0) {
      if (this.token_type_id == 1) {
        var param = {
          project_id: this.SelectCategoryID_FromFilter,
          lead_status_id: this.lead_status_id_FromFilter,
          token_type_id: this.token_type_id_FromFilter,
        };
      } else if (this.token_type_id == 3) {
        var param = {
          project_id: this.SelectCategoryID_FromFilter,
          lead_status_id: this.lead_status_id_FromFilter,
          token_type_id: this.token_type_id_FromFilter,
        };
      } else {
        var param = {
          project_id: this.SelectCategoryID_FromFilter,
          lead_status_id: this.lead_status_id_FromFilter,
          token_type_id: null,
        };
      }
    }
    if (this.leadlist.length > 2) {
      const me = this;
      if (this.leadlist.length !== 0) {
        console.log(this.leadlist.length);
        this.apiservice
          .getCPFeedFilter(
            this.cp_entity_id,
            this.fos_id,
            this.login_type,
            this.cpfeedData.api_token,
            JSON.stringify(param),
            count,
            this.last_lead_updated_at
          )
          .subscribe(
            (data) => {
              this.successvalue = JSON.stringify(data.body);
              const Value = JSON.parse(this.successvalue);
              if (Value.success === 1) {
                if (Value.data.length != 0) {
                  this.last_lead_updated_at =
                    this.leadlist[this.leadlist.length - 1].ids.updated_at;
                  // console.log("loop last", this.last_lead_updated_at);
                  if (this.leadlist.length == 0) {
                    this.leadlist = Value.data;
                  } else {
                    for (const val of Value.data) {
                      this.leadlist.push(val);
                    }

                    infiniteScroll.target.complete();
                  }
                } else {
                }
              }
              infiniteScroll.target.complete();
            },
            (err) => {
              infiniteScroll.target.complete();
            }
          );
      } else {
        infiniteScroll.target.complete();
      }
    } else {
      infiniteScroll.target.complete();
    }
  }

  // Refresh Home Page
  doRefresh(event) {
    console.log(event);
    event.target.disabled = true;
    this.isSpinner = true;
    setTimeout(() => {
      this.leadlist = [];
      // this.societyEventBanners = [];
      if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
        this.isSpinner = false;
        this.helper.presentToastHomePage("Please on Internet Connection");
      } else {
        this.isSpinner = true;
        this.helper.showLoader("");
        this.getFeedData();
        // this.getBannerData();
        setTimeout(() => {
          event.target.disabled = false;
        }, 1500);
      }
      event.target.complete();
    }, 200);
  }

  // API Call After Remove or Update Team Leader
  getTeamLeaderRemoveOrUpdate() {
    this.teamLeaderornot.api_token = this.newLoginApi;
    this.teamLeaderornot.cp_executive_id = this.newExecutiveId;
    if (this.network.type !== "none" && this.network.type !== "unknown") {
      this.apiservice
        .getCpTeamLeaderorNot(
          this.teamLeaderornot.api_token,
          this.teamLeaderornot.cp_executive_id
        )
        .subscribe(
          (data) => {
            this.successvalue = JSON.stringify(data.body);
            const Value = JSON.parse(this.successvalue);
            console.log("successvalue", Value.success);
            this.isSpinner = false;
            if (Value.success === 1) {
              this.dismissLoading();
              this.events.publish("TeamLeaderOrNot");
            }
          },
          (err) => {
            this.dismissLoading();
            this.isSpinner = false;
            // this.helper.presentToast("Something Went Wrong");
          }
        );
    }
  }

  // Call Click Function Following Way

  // Bottom App Bar (SideMenu,GoReminder,GoNotifications)
  async sideNavMenu() {
    this.commonHelperService.sideMenu();
  }

  goReminder() {
    // this.router.navigate(["/reminder/"]);
    this.router.navigate(["/comingsoon/"]);
  }

  goNotification() {
    // this.router.navigate(["/notification/"]);
    this.router.navigate(["/comingsoon/"]);
  }

  // Fab Click Functions (Add New Lead,GO CUID,Add FOS)
  gotoNewLead() {
    this.storage.set("NewLead", 1);
    this.router.navigate(["/addnewlead/"]);
  }

  gotoGHP() {
    this.router.navigate(["/customer-unique-id/"]);
  }

  approvefos() {
    this.storage.set("ID", 1);
    this.storage.set("FromHome", 0);
    this.router.navigate(["/approve-fosrequest"]);
  }

  // Card Click Fuctions
  // Card Varun OverFlow Menu Madhun Click Functions
  addReminder(name) {
    this.storage.set("ReminderName", name);
    this.storage.set("Reminder", 1);
    this.storage.set("FromDrillDownList", 1);
    this.router.navigate(["/addreminder/"]);
  }
  // GHP WithOutSiteVisit
  GenerateGHP(
    name,
    ID,
    LeadID,
    is_kyc_uploaded,
    sales_person_id,
    mobile,
    email
  ) {
    this.WithOutSiteVisitRequest(
      name,
      ID,
      LeadID,
      is_kyc_uploaded,
      sales_person_id,
      mobile,
      email
    );
  }

  async WithOutSiteVisitRequest(
    name,
    ID,
    LeadID,
    is_kyc_uploaded,
    sales_person_id,
    mobile,
    email
  ) {
    const me = this;
    const alert = await this.alertCtrl.create({
      header: "Generate GHP/GHP+ Without Site Visit!",
      message:
        "You are generating GHP/GHP+ without Site visit for the customer" +
        " " +
        name +
        ".Would you like to continue?",
      buttons: [
        {
          text: "No",
          role: "no",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            this.storage.set("sales_person_id", sales_person_id);
            this.storage.set("CustomerName", name);
            this.storage.set("CustomerID", ID);
            this.storage.set("LeadID", LeadID);
            this.storage.set("mobile", mobile);
            this.storage.set("email", email);
            this.storage.set("is_kyc_uploaded", is_kyc_uploaded);
            this.storage.set("Value", 1);
            this.storage.set("FromDrillDownList", 1);
            this.router.navigate(["/generate-ghp/"]);
          },
        },
      ],
    });
    await alert.present();
  }

  // GHP Generate After SiteVisit
  GenerateGHPafterSiteVisit(
    name,
    ID,
    LeadID,
    is_kyc_uploaded,
    sales_person_id,
    mobile,
    email
  ) {
    this.storage.set("sales_person_id", sales_person_id);
    this.storage.set("CustomerName", name);
    this.storage.set("CustomerID", ID);
    this.storage.set("LeadID", LeadID);
    this.storage.set("mobile", mobile);
    this.storage.set("email", email);
    this.storage.set("is_kyc_uploaded", is_kyc_uploaded);
    this.storage.set("Value", 1);
    this.storage.set("FromDrillDownList", 1);
    this.router.navigate(["/generate-ghp/"]);
  }

  // View GHP Details
  ViewGHPDetails(
    token,
    name,
    mobile,
    email,
    projectname,
    eventtitle,
    unit_category,
    lead_uid,
    lead_status_id,
    token_media_path,
    actions,
    lead_id,
    event_id,
    token_type_id,
    token_id,
    ghp_date,
    ghp_amount,
    ghp_plus_date,
    ghp_plus_amount,
    remarks,
    sales_person_id
  ) {
    this.storage.set("token", token);
    this.storage.set("name", name);
    this.storage.set("mobile", mobile);
    this.storage.set("email", email);
    this.storage.set("projectname", projectname);
    this.storage.set("eventtitle", eventtitle);
    this.storage.set("unit_category", unit_category);
    this.storage.set("lead_uid", lead_uid);
    this.storage.set("lead_status_id", lead_status_id);
    this.storage.set("token_media_path", token_media_path);
    this.storage.set("actions", actions);
    this.storage.set("lead_id", lead_id);
    this.storage.set("event_id", event_id);
    this.storage.set("token_type_id", token_type_id);
    this.storage.set("token_id", token_id);
    this.storage.set("ghp_date", ghp_date);
    this.storage.set("ghp_amount", ghp_amount);
    this.storage.set("ghp_plus_date", ghp_plus_date);
    this.storage.set("ghp_plus_amount", ghp_plus_amount);
    this.storage.set("remarks", remarks);
    this.storage.set("sales_person_id", sales_person_id);
    this.storage.set("FromDrillDownList", 1);
    this.router.navigate(["/ghpdetails/"]);
  }

  // View GHP Request
  ViewGHPrequest(
    token,
    name,
    mobile,
    email,
    projectname,
    eventtitle,
    unit_category,
    lead_uid,
    lead_status_id,
    token_media_path,
    actions,
    lead_id,
    event_id,
    token_type_id,
    token_id,
    ghp_date,
    ghp_amount,
    ghp_plus_date,
    ghp_plus_amount,
    payment_link
  ) {
    this.storage.set("token", token);
    this.storage.set("name", name);
    this.storage.set("mobile", mobile);
    this.storage.set("email", email);
    this.storage.set("projectname", projectname);
    this.storage.set("eventtitle", eventtitle);
    this.storage.set("unit_category", unit_category);
    this.storage.set("lead_uid", lead_uid);
    this.storage.set("lead_status_id", lead_status_id);
    this.storage.set("token_media_path", token_media_path);
    this.storage.set("actions", actions);
    this.storage.set("lead_id", lead_id);
    this.storage.set("event_id", event_id);
    this.storage.set("token_type_id", token_type_id);
    this.storage.set("token_id", token_id);
    console.log("ghp_date", ghp_date);
    console.log("ghp_amount", ghp_amount);
    console.log("ghp_plus_date", ghp_plus_date);
    console.log("ghp_plus_amount", ghp_plus_amount);
    // if(ghp_plus_date && ghp_plus_amount)
    // {
    //   this.storage.set('ghp_plus_date',ghp_plus_date);
    //   this.storage.set('ghp_plus_amount',ghp_plus_amount);
    //   this.storage.set('checkGhp', 1);

    // }
    // if(ghp_date && ghp_amount)
    // {
    //   this.storage.set('ghp_date', ghp_date);
    //   this.storage.set('ghp_amount',ghp_amount);
    //   this.storage.set('checkGhp', 2);
    // }

    // if(ghp_date && ghp_amount && ghp_plus_date && ghp_plus_amount)
    // {
    //   this.storage.set('checkGhp', 3);

    // }
    if (ghp_plus_date || ghp_plus_amount) {
      this.storage.set("ghp_plus_date", ghp_plus_date);
      this.storage.set("ghp_plus_amount", ghp_plus_amount);
      this.storage.set("checkGhp", 1);
      console.log("ghp+ payment pending aahe");
    }
    if (ghp_date || ghp_amount) {
      this.storage.set("ghp_date", ghp_date);
      this.storage.set("ghp_amount", ghp_amount);
      this.storage.set("checkGhp", 2);
      console.log("ghp payment pending aahe");
    }

    if ((ghp_date || ghp_amount) && (ghp_plus_date || ghp_plus_amount)) {
      console.log("ghp payment zalay aani ghp+ payment pending aahe");
      this.storage.set("checkGhp", 3);
    }
    this.storage.set("payment_link", payment_link);
    this.storage.set("FromDrillDownList", 1);
    this.router.navigate(["/ghp-request/"]);
  }

  // Call Method
  callMethodNew(callNumber: any) {
    setTimeout(() => {
      const tel = "+" + callNumber;
      window.open(`tel:${tel}`, "_system");
    }, 100);
  }

  // Whatsapp Method
  Whatsapp(callNumber: any, Name: any, Link: any) {
    setTimeout(() => {
      const whatsapp = callNumber;
      const name = Name;
      const link = Link;
      var uri = `https://api.whatsapp.com/send?text="Hello+${name},+\n\nGreetings from Vilas Javdekar Developers.You have been successfully registered with us through one of our esteemed Channel Partners.\n\nWe will always be at your service to help you book your Dream Home with VJ. Looking forward to welcome you to our VJ Parivaar soon!\n\nOur Official Website is :${link}.\n\n-Team VJ. "&phone=${whatsapp}`;
      var res = encodeURI(uri);
      //window.open(`https://api.whatsapp.com/send?phone=${whatsapp}`, '_system',);
      window.open(res, "_system");
    }, 100);
  }

  //  Slides Of Banner AUTO-SLIDE
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  // Loders Hide and Show
  async presentLoading() {
    this.loader = await this.loadingController.create({
      translucent: true,
    });
    await this.loader.present();
  }

  async dismissLoading() {
    await this.loader.dismiss();
  }

  // Token Update
  updateToken() {
    const me = this;
    this.storage.get("user_id").then((val) => {
      if (val) {
        console.log("user_id", val);
        this.userId = val;
        this.storage.get("apiToken").then((data) => {
          this.apiToken = data;
          me.storage.get("fcmToken").then((fcm) => {
            if (fcm) {
              me.fcmToken = fcm;
              const param = {
                user_id: this.userId,
                device_id: this.uuid,
                device_type: "android",
                fcm_token: me.fcmToken,
                api_token: this.apiToken,
              };
              console.log(param);
              me.http
                .post(
                  "http://vjpartners.co.in/ongoing/v7_new/public/api/addAndUpdateFcmToken",
                  param
                )
                .subscribe((res) => {
                  console.log("token updated", res);
                });
            } else {
            }
          });
        });
      }
    });
  }

  goBack() {
    this.storage.ready().then(() => {
      this.storage.remove("lead_status_id");
      this.storage.remove("token_type_id");
      this.storage.remove("IDFromPerformance");
    });
    this.router.navigate(["/myperformance/"]);
  }
  //For Exit App
  async exitapp() {
    const me = this;
    const alert = await this.alertCtrl.create({
      header: "Exit App",
      message: "Are you sure you want to exit app?",
      buttons: [
        {
          text: "No",
          role: "no",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            (navigator as any).app.exitApp();
          },
        },
      ],
    });
    await alert.present();
  }

  async presentActionSheet() {}
}
