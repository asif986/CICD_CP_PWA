import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionSheetController, AlertController, LoadingController, MenuController, NavController, Platform} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {DatePipe} from '@angular/common';
import {Network} from '@ionic-native/network/ngx';
import {Storage} from '@ionic/storage';
import {APIService} from '../services/APIService';
import {WebServer} from '../services/WebServer';
import {Helper} from '../services/Helper';
import {MatDialog, DateAdapter} from '@angular/material';
@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.page.html',
  styleUrls: ['./team-stats.page.scss'],
})
export class TeamStatsPage implements OnInit {
  FromLeadList:any;
  isSpinner: any = true;
  loader: any;
  successValue: any;
  cp_executive_id: any;
  api_token: any;
  is_team_lead: any;
  selectedCategoryId: any;
  selectedCategory: any;
  leads_site_visits: any;
  leads: any;
    lead_tokens_ghp: any;
    lead_tokens_ghp_stats: any;
    lead_tokens_ghp_plus: any;
  booking_master: any;
  full_name: any;
    username: any;
  totalStats: any;
  PerformanceList = [ ];
  StatsList = [ ];
  fromdate: any;
  todate: any;
  to_date:any;
  from_date:any;
  minDate = new Date();
  Latestfromdate:any;
  latesttodate:any;
  constructor(private dateAdapter: DateAdapter<Date>,private router: Router, public navCtrl: NavController, private route: ActivatedRoute,
              private menuctrl: MenuController, private statusBar: StatusBar,
              // tslint:disable-next-line:max-line-length
              private loadingCtrl: LoadingController,  private camera: Camera, private actionSheetController: ActionSheetController, private datePipe: DatePipe, private plt: Platform, private network: Network, private alertCtrl: AlertController, private storage: Storage, private apiservice: APIService, public webServer: WebServer, private helper: Helper, public platform: Platform) {
     
                dateAdapter.setLocale('en-In');
                this.platform.backButton.subscribeWithPriority(1, () => {
        this.storage.set('IDFromPerformance',2);

          this.router.navigate(['/home/']);
      });

    
      this.Latestfromdate = new Date().toISOString();
    this.latesttodate = new Date().toISOString();
    console.log(this.fromdate);
    console.log(this.todate);
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.cp_executive_id ='';
   
    this.selectedCategoryId = 0;
      this.storage.get('fullname').then((val) => {
          this.username = val;
          console.log(this.username);
      });

      this.platform.backButton.subscribeWithPriority(1, () => {
        this.storage.set('IDFromPerformance',2);

          this.router.navigate(['/home/']);
      });

    this.storage.get('cp_executive_id').then((val1) => {
      this.storage.get('FromLeadList').then((FromLeadList) => {
      console.log(FromLeadList);
      this.FromLeadList==FromLeadList;
      this.cp_executive_id = val1;
      this.storage.get('apiToken').then((val2) => {
        this.api_token = val2;
        
        this.from_date = null;
        this.to_date = null;  
        this.storage.set('fromDate',this.from_date);
        this.storage.set('toDate',this.to_date);     
         console.log(this.from_date);
        console.log( this.to_date);
      this.storage.set('',1);
    
      if(FromLeadList==0){
        this.fromdate=null;
        this.todate=null;
        console.log(this.selectedCategoryId);
        this.getPreformance();
      }else if(FromLeadList==2){
        this.storage.get('FromLeadListprojectid').then((FromLeadListprojectid) => {
          this.storage.get('FromDateBackNew').then((FromDateBack) => {
        this.storage.get('ToDateBackNew').then((ToDateBack) => {
            this.from_date=FromDateBack;
            this.to_date=ToDateBack;
          this.selectedCategoryId=FromLeadListprojectid;
           this.storage.set('fromDate',this.from_date);
           this.storage.set('toDate',this.to_date);
          console.log(this.selectedCategoryId);
          console.log(FromDateBack);
          console.log(ToDateBack);
        });
      });
    });
       }
      });
    });

  });
   
  }

  Click(){
    if(this.todate==null ){
      // this.from_date = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
      // this.to_date = this.datePipe.transform(this.latesttodate, 'yyyy-MM-dd');
      // this.getPreformance();
      // console.log(this.from_date);
      // console.log( this.to_date);
    }else if(this.fromdate==null){
     
    }else{
      this.from_date = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
      this.to_date = this.datePipe.transform(this.todate, 'yyyy-MM-dd');
      this.storage.set('fromDate',this.from_date);
      this.storage.set('toDate',this.to_date);
      if(this.selectedCategoryId!==0){
        console.log(1);
        console.log(this.selectedCategoryId);
        this.getPreformanceForClick();
      }else if(this.selectedCategoryId==0){
        console.log(2);
        console.log(this.selectedCategoryId);
        this.getPreformance();
      }
      console.log(this.from_date);
      console.log( this.to_date);
    }
  }
  /*My Performance*/
  getPreformance() {
    this.presentLoading().then(() => {
      if (this.network.type !== 'none' && this.network.type !== 'unknown') {
        this.apiservice.getCpTeamStats(this.cp_executive_id, this.api_token,this.from_date,this.to_date).subscribe(data => {
          this.successValue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successValue);
          this.isSpinner = false;
          if (Value.success === 1) {
            this.PerformanceList = Value.data;
            this.selectedCategory = this.PerformanceList[0].project_name;
            this.leads_site_visits = this.PerformanceList[0].leads_site_visits;
            this.leads = this.PerformanceList[0].leads;
              this.lead_tokens_ghp = this.PerformanceList[0].lead_tokens_ghp;
              this.lead_tokens_ghp_plus = this.PerformanceList[0].lead_tokens_ghp_plus;
            this.booking_master = this.PerformanceList[0].booking_master;
            this.StatsList = [];
            this.selectedCategoryId = this.PerformanceList[0].project_id;
            this.selectedCategory = this.PerformanceList[0].project_name;
            this.StatsList = this.PerformanceList[0].stats;
            this.leads = this.PerformanceList[0].totalstats.leads;
            this.leads_site_visits = this.PerformanceList[0].totalstats.leads_site_visits;
            this.lead_tokens_ghp_stats = this.PerformanceList[0].totalstats.lead_tokens_ghp;
            this.lead_tokens_ghp_plus = this.PerformanceList[0].totalstats.lead_tokens_ghp_plus;
            this.booking_master = this.PerformanceList[0].totalstats.booking_master;
            this.dismissLoading();
            console.log(this.PerformanceList);
            console.log(this.selectedCategory);
            console.log(this.leads_site_visits);
            console.log(this.leads);
            console.log(this.lead_tokens_ghp_stats);
            console.log(this.booking_master);
            this.storage.set('project_id_lead',this.selectedCategoryId);
            this.storage.set('project_name_from_list',this.selectedCategory);
          } else {
            this.dismissLoading();
            this.helper.presentToast('Something went wrong!');
          }
        }, error => {
          this.dismissLoading();
          this.helper.presentToast('Something went wrong!');
        });
      } else {
        this.dismissLoading();
        console.log('Network Type :' + this.network.type);
        this.helper.presentToast('Please on Internet Connection!');
      }
    }, error => {
      this.dismissLoading();
      this.helper.presentToastError('Something went wrong!');
    });
  }


  getPreformanceForClick() {
    this.presentLoading().then(() => {
      if (this.network.type !== 'none' && this.network.type !== 'unknown') {
        this.apiservice.getCpTeamStats(this.cp_executive_id, this.api_token,this.from_date,this.to_date).subscribe(data => {
          this.successValue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successValue);
          this.isSpinner = false;
          if (Value.success === 1) {
            this.PerformanceList = Value.data;
            this.selectedCategoryId = this.PerformanceList[this.selectedCategoryId].project_id;
            this.selectedCategory = this.PerformanceList[this.selectedCategoryId].project_name;
            this.leads = this.PerformanceList[this.selectedCategoryId].totalstats.leads;
            this.leads_site_visits = this.PerformanceList[this.selectedCategoryId].totalstats.leads_site_visits;
              this.lead_tokens_ghp_stats = this.PerformanceList[this.selectedCategoryId].totalstats.lead_tokens_ghp;
              this.lead_tokens_ghp_plus = this.PerformanceList[this.selectedCategoryId].totalstats.lead_tokens_ghp_plus;
            this.booking_master = this.PerformanceList[this.selectedCategoryId].totalstats.booking_master;
            this.StatsList = this.PerformanceList[this.selectedCategoryId].stats;
            this.dismissLoading();
            console.log(this.PerformanceList);
            console.log(this.selectedCategory);
            console.log(this.leads_site_visits);
            console.log(this.leads);
            console.log(this.lead_tokens_ghp_stats);
            console.log(this.booking_master);
            this.storage.set('project_id_lead',this.selectedCategoryId);
            this.storage.set('project_name_from_list',this.selectedCategory);
          } else {
            this.dismissLoading();
            this.helper.presentToast('Something went wrong!');
          }
        }, error => {
          this.dismissLoading();
          this.helper.presentToast('Something went wrong!');
        });
      } else {
        this.dismissLoading();
        console.log('Network Type :' + this.network.type);
        this.helper.presentToast('Please on Internet Connection!');
      }
    }, error => {
      this.dismissLoading();
      this.helper.presentToastError('Something went wrong!');
    });
  }
  /*Click Dropdown*/
  getmyPerformancevalue(index: any) {
    console.log(index);
    this.StatsList = [];
    this.selectedCategoryId = this.PerformanceList[index].project_id;
    this.selectedCategory = this.PerformanceList[index].project_name;
    this.leads = this.PerformanceList[index].totalstats.leads;
    this.leads_site_visits = this.PerformanceList[index].totalstats.leads_site_visits;
      this.lead_tokens_ghp_stats = this.PerformanceList[index].totalstats.lead_tokens_ghp;
      this.lead_tokens_ghp_plus = this.PerformanceList[index].totalstats.lead_tokens_ghp_plus;
    this.booking_master = this.PerformanceList[index].totalstats.booking_master;
    this.StatsList = this.PerformanceList[index].stats;
    this.storage.set('project_id_lead',this.selectedCategoryId);
    this.storage.set('project_name_from_list',this.selectedCategory);
    console.log(this.selectedCategoryId);
   /* console.log('this.StatsList :' + JSON.stringify(this.StatsList));*/
    // this.getTokenvalue( this.selectedCategoryId);
  }

  /*Do-Refresh*/
  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.isSpinner = true;
      this.PerformanceList = [];
      /*Call  this.get Rent Assure List(); API*/
      if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
        this.isSpinner = false;
        this.helper.presentToast('Please on Internet Connection');
      } else {
        this.helper.showLoader('');
        this.isSpinner = true;
        this.getPreformance();
      }
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);

  }

  // Loading API
  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      translucent: true
    });
    await this.loader.present();
  }

  async dismissLoading() {
    await this.loader.dismiss();
  }

  goback() {
    this.storage.set('IDFromPerformance',2);
    this.navCtrl.navigateBack('/home');
  }


  leadListData(type, cp_executive_id,full_name)
  {
    console.log("type",type);
    this.storage.set('cp_executive_id_lead',cp_executive_id);
    this.storage.set('full_name',full_name);
    console.log('full_name', full_name);
    this.storage.set('type',type);
    this.storage.set('TOLEADS',2);
    this.router.navigate(['\leadslist-data']);
  }
}
