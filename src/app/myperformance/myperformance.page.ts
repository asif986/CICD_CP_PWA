import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  MenuController,
  NavController,
  Platform,
} from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { DatePipe } from "@angular/common";
import { Network } from "@ionic-native/network/ngx";
import { Storage } from "@ionic/storage";
import { APIService } from "../services/APIService";
import { WebServer } from "../services/WebServer";
import { Helper } from "../services/Helper";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { MatDialog, DateAdapter } from "@angular/material";
import { Options } from "@angular-slider/ngx-slider";
import { responsefromlogin } from "../models/Login";
@Component({
  selector: "app-myperformance",
  templateUrl: "./myperformance.page.html",
  styleUrls: ["./myperformance.page.scss"],
})
export class MyperformancePage implements OnInit {
  isSpinner: any = true;
  loader: any;
  successValue: any;
  cp_executive_id: any;
  api_token: any;
  selectedCategoryId: any;
  selectedCategory: any;
  leads_site_visits: any;
  leads: any;
  lead_tokens: any;
  lead_tokens_ghp_plus: any;
  booking_master: any;
  PerformanceList = [];
  minDate = new Date();
  fromdate: any;
  todate: any;
  to_date: any;
  from_date: any;
  Latestfromdate: any;
  latesttodate: any;

  cardInfo = [];

  /**
   * Options for sliders
   */
  approxArokerageInCr;
  isCollapsed = false;

  options = {};

  cp_entity_id;
  cp_fos_id;
  login_type;

  sales_brokerage_range: any = [];
  total_sales_in_cr: number;
  cr_val;

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private router: Router,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private menuctrl: MenuController,
    private statusBar: StatusBar,
    private loadingCtrl: LoadingController,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private datePipe: DatePipe,
    private plt: Platform,
    private network: Network,
    private alertCtrl: AlertController,
    private storage: Storage,
    private apiservice: APIService,
    public webServer: WebServer,
    private helper: Helper,
    public platform: Platform
  ) {
    dateAdapter.setLocale("en-In");
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.storage.set("perform_id", 5);
      this.storage.set("stat_check", 1);
      this.storage.set("IDFromPerformance", 2);
      this.navCtrl.navigateBack("/home"); //c
    });

    this.Latestfromdate = new Date().toISOString();
    this.latesttodate = new Date().toISOString();
    console.log(this.fromdate);
    console.log(this.todate);
  }

  dynamicSlider(val, flag) {
    if (flag == 1) {
      // for first intial value in slider
      return this.sales_brokerage_range[0].amount;
    } else if (flag == 2) {
      // for last value in slider
      // if (val < 20) {
      //   return 150;
      // } else if (val >= 20 && val <= 100) {
      //   return 100;
      // } else {
      //   return 200;
      // }
      return this.sales_brokerage_range[this.sales_brokerage_range.length - 1]
        .amount;
    } else if (flag == 3) {
      // slider down range

      // if (val < 20) {
      //   return [0, 5, 10, 15, 20, 25];
      // } else if (val >= 20 && val <= 100) {
      //   return [25, 50, 75, 100, 125];
      // } else {
      //   return [75, 100, 125, 150, 175, 200];
      // }
      return this.sales_brokerage_range.map((res) => {
        return res.amount;
      });
    } else {
      // diiferent range
      // if (val < 20) {
      //   return 25;
      // } else if (val >= 20 && val <= 100) {
      //   return 25;
      // } else {
      //   return 25;
      // }

      console.log(this.diff(this.sales_brokerage_range));
      return this.diff(this.sales_brokerage_range);
    }
  }

  diff(ary) {
    var newA = [];
    for (var i = 1; i < ary.length; i++) newA.push(ary[i] - ary[i - 1]);
    return newA;
  }
  createSlider() {
    // value: this.total_sales_in_cr,
    this.options = {
      floor: this.dynamicSlider(this.total_sales_in_cr, 1),
      ceil: this.dynamicSlider(this.total_sales_in_cr, 2),
      ticksArray: this.dynamicSlider(this.total_sales_in_cr, 3),

      readOnly: true,
      showTicks: true,

      tickStep: this.dynamicSlider(this.total_sales_in_cr, 4),

      selectionBarGradient: {
        from: "white",
        to: "#FC0",
      },
      translate: (value: number): any => {
        // console.log(value);
        return `
      <div class='img-slider'>
      <img class='man-img' src='assets/new_icons/man.png'/>
      <b>You are here (${this.cr_val} CR)</b>
      </div>
      `;
      },
      showSelectionBar: true,
      getLegend: (value: number): any => {
        let modified;
        this.sales_brokerage_range.filter((res) => {
          if (res.amount == value) {
            modified = `<div class='d-flex flex-column'> <div>${res.amount}<b>CR</b></div>
            <div>${res.brokerage}</div>
            </div>
            `;
          }
        });
        return modified;
      },
    };
  }

  ngOnInit() {}

  ionViewDidEnter() {
    // this.platform.backButton.subscribeWithPriority(1, () => {
    //   this.storage.set("perform_id", 5);
    //   this.storage.set("stat_check", 1);
    //   this.storage.set("IDFromPerformance", 2);
    //   this.navCtrl.navigateBack("/home"); //c
    // });
    this.helper.getUserInfo().then((val2: responsefromlogin) => {
      this.api_token = val2.data.api_token;
      this.cp_entity_id = val2.data.cp_entity_id;
      this.cp_fos_id = val2.data.fos_id;
      this.login_type = val2.login_type;
      this.isSpinner = true;
      this.from_date = null;
      this.to_date = null;
      console.log(this.from_date);
      console.log(this.to_date);
      this.getAllprojects();
    });

    // this.storage.get("cp_executive_id").then((val1) => {
    //   this.cp_executive_id = val1;

    //   this.storage.get("apiToken").then((val2) => {

    //   });
    // });
  }

  Click() {
    if (this.todate == null) {
      // this.from_date = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
      // this.to_date = this.datePipe.transform(this.latesttodate, 'yyyy-MM-dd');
      // this.getPreformance();
      // console.log(this.from_date);
      // console.log( this.to_date);
    } else if (this.fromdate == null) {
    } else {
      this.from_date = this.datePipe.transform(this.fromdate, "yyyy-MM-dd");
      this.to_date = this.datePipe.transform(this.todate, "yyyy-MM-dd");
      this.storage.set("fromDate", this.from_date);
      this.storage.set("toDate", this.to_date);
      // if (this.selectedCategoryId !== 0) {
      //   this.getPreformance();
      // } else if (this.selectedCategoryId == 0) {
      //   this.getPreformance();
      // }
      this.getPreformance();
      console.log(this.from_date);
      console.log(this.to_date);
    }
  }

  getAllprojects() {
    this.apiservice
      .getAllProjects(this.api_token)
      .map((res) => res.body)
      .subscribe(
        (res) => {
          console.log(res);
          // this.dismissLoading();
          this.PerformanceList = res.data;
          this.selectedCategoryId = this.PerformanceList[0].project_id;
          this.selectedCategory = this.PerformanceList[0].project_name;
          this.getPreformance();
        },
        (e) => {
          // this.dismissLoading();
          this.isSpinner = false;
        }
      );
  }
  /*

  */
  /*My Performance*/
  getPreformance() {
    this.presentLoading().then(
      () => {
        if (this.network.type !== "none" && this.network.type !== "unknown") {
          this.apiservice
            .getMyPerformance(
              this.cp_entity_id,
              this.cp_fos_id,
              this.login_type,
              this.api_token,
              this.from_date,
              this.to_date,
              this.selectedCategoryId
            )
            .map((res) => res.body)
            .subscribe(
              (res) => {
                // this.successValue = JSON.stringify(data.body);
                // const Value = JSON.parse(this.successValue);
                this.isSpinner = false;
                if (res.success === 1) {
                  this.leads_site_visits = res.data.site_visits;
                  this.leads = res.data.leads;
                  this.lead_tokens = res.data.gt_count;
                  this.lead_tokens_ghp_plus = res.data.ps_count;
                  this.booking_master = res.data.allotments;
                  this.dismissLoading();
                  // console.log(this.PerformanceList);
                  // console.log(this.selectedCategory);
                  // console.log(this.leads_site_visits);
                  // console.log(this.leads);
                  // console.log(this.lead_tokens);
                  // console.log(this.booking_master);
                  this.total_sales_in_cr = res.data.total_sales_in_cr;
                  this.cr_val = this.total_sales_in_cr;

                  // console.log(this.total_sales_in_cr);
                  this.sales_brokerage_range = res.data.sales_brokerage_range;
                  this.approxArokerageInCr = res.data.approx_brokerage_in_cr;
                  if (this.login_type == 1) {
                    this.isCollapsed = true;
                    if (this.sales_brokerage_range.length != 0) {
                      this.createSlider();
                    }
                  }
                  this.cardInfo = [
                    {
                      name: "Leads",
                      count: this.leads,
                      bg_color: "bg1",
                    },
                    {
                      name: "Site Visit",
                      count: this.leads_site_visits,
                      bg_color: "bg2",
                    },
                    {
                      name: "Tokens",
                      count: this.lead_tokens,
                      bg_color: "bg3",
                    },
                    {
                      name: "Preselect",
                      count: this.lead_tokens_ghp_plus,
                      bg_color: "bg3",
                    },
                  ];
                  // console.log(this.cardInfo);
                } else {
                  this.dismissLoading();
                  this.isSpinner = false;
                  this.helper.presentToast("Something went wrong!");
                }
              },
              (error) => {
                this.dismissLoading();
                this.isSpinner = false;
                this.helper.presentToast("Something went wrong!");
              }
            );
        } else {
          this.dismissLoading();
          this.isSpinner = false;
          console.log("Network Type :" + this.network.type);
          this.helper.presentToast("Please on Internet Connection!");
        }
      },
      (error) => {
        this.dismissLoading();
        this.helper.presentToastError("Something went wrong!");
      }
    );
  }

  getPreformanceForClickForPerformance() {
    this.presentLoading().then(
      () => {
        if (this.network.type !== "none" && this.network.type !== "unknown") {
          this.apiservice
            .getMyPerformance(
              this.cp_entity_id,
              this.cp_fos_id,
              this.login_type,
              this.api_token,
              this.from_date,
              this.to_date,
              this.selectedCategoryId
            )
            .map((res) => res.body)
            .subscribe(
              (data) => {
                console.log(data);
                // this.successValue = JSON.stringify(data.body);
                // const Value = JSON.parse(this.successValue);
                this.isSpinner = false;
                if (data.success === 1) {
                  // this.PerformanceList = Value.data;
                  // this.selectedCategoryId =
                  //   this.PerformanceList[this.selectedCategoryId].project_id;
                  // this.selectedCategory =
                  //   this.PerformanceList[this.selectedCategoryId].project_name;
                  this.leads_site_visits = data.data.leads_site_visits;

                  this.leads =
                    this.PerformanceList[this.selectedCategoryId].leads;
                  this.lead_tokens = data.data.lead_tokens_ghp;
                  this.lead_tokens_ghp_plus = data.data.lead_tokens_ghp_plus;
                  this.booking_master = data.data.booking_master;
                  this.dismissLoading();
                  console.log(this.PerformanceList);
                  console.log(this.selectedCategory);
                  console.log(this.leads_site_visits);
                  console.log(this.leads);
                  console.log(this.lead_tokens);
                  console.log(this.booking_master);
                } else {
                  this.dismissLoading();
                  this.isSpinner = false;
                  this.helper.presentToast("Something went wrong!");
                }
              },
              (error) => {
                this.dismissLoading();
                this.isSpinner = false;
                this.helper.presentToast("Something went wrong!");
              }
            );
        } else {
          this.dismissLoading();
          this.isSpinner = false;
          console.log("Network Type :" + this.network.type);
          this.helper.presentToast("Please on Internet Connection!");
        }
      },
      (error) => {
        this.dismissLoading();
        this.helper.presentToastError("Something went wrong!");
      }
    );
  }

  /*Click Dropdown*/
  getmyPerformancevalue(index: any) {
    this.selectedCategoryId = this.PerformanceList[index].project_id;
    this.selectedCategory = this.PerformanceList[index].project_name;
    // this.getPreformanceForClickForPerformance();
    this.getPreformance();
    // this.leads_site_visits = this.PerformanceList[index].leads_site_visits;
    // this.leads = this.PerformanceList[index].leads;
    // this.lead_tokens = this.PerformanceList[index].lead_tokens_ghp;
    // this.lead_tokens_ghp_plus =
    //   this.PerformanceList[index].lead_tokens_ghp_plus;
    // this.booking_master = this.PerformanceList[index].booking_master;
    // console.log("this.selectedCategoryId", this.selectedCategoryId);
  }

  /*Do-Refresh*/
  doRefresh(event) {
    console.log("Begin async operation");
    setTimeout(() => {
      this.isSpinner = true;
      this.PerformanceList = [];
      /*Call  this.get Rent Assure List(); API*/
      if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
        this.isSpinner = false;
        this.helper.presentToast("Please on Internet Connection");
      } else {
        this.helper.showLoader("");
        this.isSpinner = true;
        this.getPreformance();
      }
      console.log("Async operation has ended");
      event.target.complete();
    }, 500);
  }

  // Loading API
  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      translucent: true,
    });
    await this.loader.present();
  }

  async dismissLoading() {
    await this.loader.dismiss();
  }

  goback() {
    this.storage.set("stat_check", 1);
    this.storage.set("IDFromPerformance", 2);
    this.navCtrl.navigateBack("/home"); //c
  }

  /*For All*/
  clicktoBackonFilterAll() {
    if (this.selectedCategoryId == 0) {
      this.storage.set("IDFromPerformance", 1);
      this.storage.set("SelectCategoryID", this.selectedCategoryId);
      this.storage.set("lead_status_id", 0);
      this.storage.set("ID", 0);
      this.navCtrl.navigateBack("/home");
    } else if (this.selectedCategoryId !== 0) {
      this.storage.set("IDFromPerformance", 1);
      this.storage.set("SelectCategoryID", this.selectedCategoryId);
      this.storage.set("ID", 1);
      this.navCtrl.navigateBack("/home");
    }
  }

  GoToFilter(id, token_type_id) {
    this.storage.set("IDFromPerformance", 1);
    this.storage.set("SelectCategoryID", this.selectedCategoryId);
    this.storage.set("lead_status_id", id);
    this.storage.set("token_type_id", token_type_id);
    this.storage.set("ID", 2);
    // this.storage.set('perform_id',10);
    this.navCtrl.navigateBack("/home");
  }
}

/*  /!*For Site Visit*!/
 clicktoBackonFilterSiteVisit(){
    this.storage.set('IDFromPerformance',1);
    this.storage.set('SelectCategoryID',this.selectedCategoryId);
    this.storage.set('lead_status_id',5);
     this.storage.set('ID',2);
    this.navCtrl.navigateBack('/home');
}

  /!*For GHP*!/
  clicktoBackonFilterGHP(){
      this.storage.set('IDFromPerformance',1);
      this.storage.set('SelectCategoryID',this.selectedCategoryId);
      this.storage.set('lead_status_id',6);
      this.storage.set('token_type_id',1);
      this.storage.set('ID',2);
      this.navCtrl.navigateBack('/home');
  }

  /!*For GHP-Plus*!/
  clicktoBackonFilterGHPPlus(){
      this.storage.set('IDFromPerformance',1);
      this.storage.set('SelectCategoryID',this.selectedCategoryId);
      this.storage.set('lead_status_id',6);
      this.storage.set('token_type_id',3);
      this.storage.set('ID',2);
      this.navCtrl.navigateBack('/home');
  }


  /!*For Allotment*!/
  clicktoBackonFilterAllotment(){
      this.storage.set('IDFromPerformance',1);
      this.storage.set('SelectCategoryID',this.selectedCategoryId);
      this.storage.set('lead_status_id',9);
      this.storage.set('ID',2);
      this.navCtrl.navigateBack('/home');
  }*/
