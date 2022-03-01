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
import { TeamLeadStat } from '../models/TeamLeadStat';
import {MatDialog, DateAdapter} from '@angular/material';
@Component({
  selector: 'app-team-lead-stat',
  templateUrl: './team-lead-stat.page.html',
  styleUrls: ['./team-lead-stat.page.scss'],
})
export class TeamLeadStatPage implements OnInit {
  FromLeadList:any;
  isSpinner: any = true;
  loader: any;
  successValue: any;
  PerformanceList = [ ];
  StatsList = [ ];
  teamStats = [];
  username: any;
  cp_executive_id: any;
  api_token: any;
  selectedCategoryId: any;
  selectedCategory: any;
  leads: any;
  leads_site_visits: any;
  lead_tokens_ghp: any;
  lead_tokens_ghp_stats: any;
  lead_tokens_ghp_plus: any;
  booking_master: any;

  total_leads: any;
  total_leads_site_visits: any;
  total_lead_tokens_ghp: any;
  total_lead_tokens_ghp_plus: any;
  total_booking_master: any;

  TeamLeadStat :TeamLeadStat = new TeamLeadStat();
  fromdate: any;
  todate: any;
  to_date:any;
  from_date:any;
  minDate = new Date();
  Latestfromdate:any;
  latesttodate:any;

  fullName:any;
  constructor(private dateAdapter: DateAdapter<Date>,private router: Router, public navCtrl: NavController, private route: ActivatedRoute,
    private menuctrl: MenuController, private statusBar: StatusBar,
    // tslint:disable-next-line:max-line-length
    private loadingCtrl: LoadingController,  private camera: Camera, private actionSheetController: ActionSheetController, private datePipe: DatePipe, private plt: Platform, private network: Network, private alertCtrl: AlertController, private storage: Storage, private apiservice: APIService, public webServer: WebServer, private helper: Helper, public platform: Platform) {
      dateAdapter.setLocale('en-In');
      this.platform.backButton.subscribeWithPriority(1, () => {
  this.storage.set('IDFromPerformance',2);
this.router.navigate(['/home/']);//c
});
this.Latestfromdate = new Date().toISOString();
this.latesttodate = new Date().toISOString();
console.log(this.fromdate);
console.log(this.todate);

}

  ngOnInit() {
  }




  ionViewDidEnter() {
    // this.fromdate=null;
    // this.todate=null;

    this.selectedCategoryId = 0;
    this.storage.get('fullname').then((val) => {
        this.username = val;
        console.log(this.username);
    });

  this.storage.get('cp_id').then((val1) => {
    this.storage.get('FromLeadList').then((FromLeadList) => {
    this.TeamLeadStat.cp_id = val1;
    this.FromLeadList==FromLeadList;
    console.log(FromLeadList);
    this.storage.get('apiToken').then((val2) => {
      this.TeamLeadStat.api_token = val2;

      console.log("cp_id",this.TeamLeadStat.cp_id);
      console.log("apiToken",this.TeamLeadStat.api_token);

      this.from_date = null;
      this.to_date = null;
      this.storage.set('fromDate',this.from_date);
      this.storage.set('toDate',this.to_date);
      console.log(this.from_date);
      console.log( this.to_date);
      if(FromLeadList==0){
        this.fromdate=null;
        this.todate=null;
        console.log(this.selectedCategoryId);
        this.getPreformance();
      }else if(FromLeadList==1){
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


  this.platform.backButton.subscribeWithPriority(1, () => {
    this.storage.set('IDFromPerformance',2);
    this.router.navigate(['/home/']);//c
});

}

// Click(){
//   if(this.todate==null ){
//     // this.from_date = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
//     // this.to_date = this.datePipe.transform(this.latesttodate, 'yyyy-MM-dd');
//     // this.getPreformance();
//     // console.log(this.from_date);
//     // console.log( this.to_date);
   
//   }else if(this.fromdate==null){
   
//   }else{
//     this.from_date = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
//     this.to_date = this.datePipe.transform(this.todate, 'yyyy-MM-dd');
//     this.storage.set('fromDate',this.from_date);
//     this.storage.set('toDate',this.to_date);
//     this.getPreformance();
//     console.log(this.from_date);
//     console.log( this.to_date);
//   }
// }

// Click(){
//   if(this.todate==null ){
//     // this.from_date = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
//     // this.to_date = this.datePipe.transform(this.latesttodate, 'yyyy-MM-dd');
//     // this.getPreformance();
//     // console.log(this.from_date);
//     // console.log( this.to_date);
//   }else if(this.fromdate==null){
   
//   }else{
//     this.from_date = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
//     this.to_date = this.datePipe.transform(this.todate, 'yyyy-MM-dd');
//     this.storage.set('fromDate',this.from_date);
//     this.storage.set('toDate',this.to_date);
//     if(this.selectedCategoryId!==0){
//       this.getPreformanceForClick();
//     }else if(this.selectedCategoryId==0){
//       this.getPreformance();
//     }
//     console.log(this.from_date);
//     console.log( this.to_date);
//   }
// }
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

getPreformance() {
  this.presentLoading().then(() => {
    if (this.network.type !== 'none' && this.network.type !== 'unknown') {
      this.apiservice.getCpTeamAllStats(this.TeamLeadStat.api_token, this.TeamLeadStat.cp_id,this.from_date,this.to_date).subscribe(data => {
        console.log(data);

        this.successValue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successValue);
        if (Value.success === 1) {
          this.PerformanceList = Value.data;
          console.log(this.PerformanceList);
          this.selectedCategory = this.PerformanceList[0].project_name;
          console.log("selectedCategory",this.selectedCategory);
          this.teamStats = this.PerformanceList[0].teamStats;
          console.log("teamStats",this.teamStats);
          this.storage.set('project_id_lead',this.selectedCategoryId);
          this.storage.set('project_name_from_list',this.selectedCategory);
          this.dismissLoading();
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
    this.teamStats = [];
    this.teamStats = this.PerformanceList[index].teamStats;
    this.selectedCategory ="";
    this.selectedCategory = this.PerformanceList[index].project_name;
    this.selectedCategoryId = this.PerformanceList[index].project_id;
    for (let i = 0; i < this.PerformanceList[this.selectedCategoryId].teamStats.length; i++) {
      if (this.PerformanceList[this.selectedCategoryId].teamStats[i]) {
        console.log(this.PerformanceList[this.selectedCategoryId].teamStats[i]);
        for (let j = 0; j < this.PerformanceList[this.selectedCategoryId].teamStats[i].stats.length; i++) {
          if (this.PerformanceList[this.selectedCategoryId].teamStats[i].stats[j]) {
            console.log(this.PerformanceList[this.selectedCategoryId].teamStats[i].stats[j]);
            console.log(this.PerformanceList[this.selectedCategoryId].teamStats[i].stats[j].full_name);         
            this.fullName=this.PerformanceList[this.selectedCategoryId].teamStats[i].stats[j].full_name;
            console.log(this.fullName);
          }
        }
      }
    }
    this.storage.set('project_id_lead',this.selectedCategoryId);
    this.storage.set('project_name_from_list',this.selectedCategory);
    console.log("this.selectedCategoryId",this.selectedCategoryId );
  }

  getPreformanceForClick() {
    this.presentLoading().then(() => {
      if (this.network.type !== 'none' && this.network.type !== 'unknown') {
        this.apiservice.getCpTeamAllStats(this.TeamLeadStat.api_token, this.TeamLeadStat.cp_id,this.from_date,this.to_date).subscribe(data => {
          console.log(data);
          this.successValue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successValue);
          if (Value.success === 1) {
            this.PerformanceList = Value.data;
            console.log(this.PerformanceList);
            this.selectedCategory = this.PerformanceList[this.selectedCategoryId].project_name;
            console.log("selectedCategory",this.selectedCategory);
            this.teamStats = this.PerformanceList[this.selectedCategoryId].teamStats;
            for (let i = 0; i < this.PerformanceList[this.selectedCategoryId].teamStats.length; i++) {
              if (this.PerformanceList[this.selectedCategoryId].teamStats[i]) {
                console.log(this.PerformanceList[this.selectedCategoryId].teamStats[i])
              }
            }
            console.log("teamStats",this.teamStats);
            this.dismissLoading();
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
  this.navCtrl.navigateBack('/home');//c
}


// From Shubham For TeamLeaderStats List open(22/04/2020)
leadListData(type, cp_executive_id,full_name)
{
  console.log("type",type);
  this.storage.set('cp_executive_id_lead',cp_executive_id);
  this.storage.set('type',type);
  this.storage.set('full_name',full_name);
  console.log('full_name', full_name);
  this.storage.set('TOLEADS',1);
  this.router.navigate(['\leadslist-data']);
}


}
