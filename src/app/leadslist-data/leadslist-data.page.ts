import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, Platform, PopoverController} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';

import {Storage} from '@ionic/storage';
import {TeamList} from "../models/TeamList";
import {Helper} from "../services/Helper";
import {MatIconRegistry} from "@angular/material";
import {APIService} from "../services/APIService";
import {WebServer} from "../services/WebServer";
import {Network} from "@ionic-native/network/ngx";
import { LeadListData } from '../models/LeadListData';
import {MatDialog, DateAdapter} from '@angular/material';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-leadslist-data',
  templateUrl: './leadslist-data.page.html',
  styleUrls: ['./leadslist-data.page.scss'],
})
export class LeadslistDataPage implements OnInit {



  leadlist: any = [];
  sitevisit:any=[];
  ghp:any=[];
  count : number;
  storageData = [];
  visible: Boolean;
  isSpinner: any = true;
  successvalue: any;
  loader: any;
  cancelSuccessValue: any;
  LeadListData = new LeadListData();
  type:any;
  token_type_id :any;
  goBack:any;
  full_name:any;
  project_name:any;
  FromDate:any;
  ToDate:any;
  FilterCount:any;

  // After Pagination Add
  page: number;
  lastPageIs: number = 0;
  searchVal: any = '';

  constructor(private dateAdapter: DateAdapter<Date>,private storage: Storage, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private cd: ChangeDetectorRef, private platform: Platform, private router: Router, private matIconRegistry: MatIconRegistry,
    public navCtrl: NavController,private datePipe: DatePipe, public modalController: ModalController) {
      dateAdapter.setLocale('en-In');
  
      this.platform.backButton.subscribeWithPriority(1, () => {
      this.storage.set('IDFromPerformance',2);
      if(this.goBack==1){
        this.storage.set('FromLeadList',1);
        this.storage.set('FromLeadListprojectid', this.LeadListData.project_id)
        this.router.navigate(['/team-lead-stat/']);
      }else if(this.goBack==2){
        this.storage.set('FromLeadList',2);
        this.storage.set('FromLeadListprojectid', this.LeadListData.project_id);
        this.router.navigate(['/team-stats/']);
      }
    });

      if (this.leadlist.length === 0) {
      this.visible = true;
      } else {
      this.visible = false;
      }
   }


    ngOnInit() {
    }




  ionViewDidEnter() {
    this.page = 1;
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.storage.set('IDFromPerformance',2);
    if(this.goBack==1){               //FromLeadList:1==For TeamLeaderStats,2==FotTeamStats;
                                      //FromLeadListprojectid:Selected Category project ID;
      this.storage.set('FromLeadList',1);
      this.storage.set('FromLeadListprojectid', this.LeadListData.project_id);
      this.storage.set('FromDateBack',this.LeadListData.fromDate);
      this.storage.set('ToDateBack',this.LeadListData.toDate);
      this.router.navigate(['/team-lead-stat/']);
    }else if(this.goBack==2){
      this.storage.set('FromLeadList',2);
      this.storage.set('FromLeadListprojectid', this.LeadListData.project_id);
      this.storage.set('FromDateBackNew',this.LeadListData.fromDate);
      this.storage.set('ToDateBackNew',this.LeadListData.toDate);
      this.router.navigate(['/team-stats/']);
    }
    });
    //this.storage.set('TOLEADS',1);

    this.storage.get('TOLEADS').then((TOLEADS) => {
        this.goBack=TOLEADS;  //TODO:TOLEADS:1==TEAM LEADER STATS,TOLEADS:2==TEAM STATS;                        
        console.log('GOBACK',this.goBack);
    });

        this.storage.get('type').then((type) => {
          this.storage.get('apiToken').then((api_token) => {
            this.storage.get('cp_id').then((cp_id) => {

          this.storage.get('project_id_lead').then((project_id) => {
            this.storage.get('fromDate').then((fromDate) => {
              this.storage.get('toDate').then((toDate) => {
                this.storage.get('sales_person_id').then((sales_person_id) => {
                  this.storage.get('cp_executive_id_lead').then((cp_executive_id) => {
                    this.storage.get('full_name').then((full_name) => {
                      this.storage.get('project_name_from_list').then((project_name_from_list) => {
                          this.LeadListData.api_token = api_token;
                          this.LeadListData.cp_id = cp_id;
                          this.type = type;
                          this.LeadListData.project_id= project_id;
                          this.LeadListData.fromDate= fromDate;
                          this.LeadListData.toDate= toDate;
                          this.storage.set('FromDateBackNew',this.LeadListData.fromDate);
                          this.storage.set('ToDateBackNew',this.LeadListData.toDate);
                          this.LeadListData.sales_person_id= sales_person_id;
                          this.LeadListData.cp_executive_id= cp_executive_id;
                          this.full_name=full_name;    
                          this.project_name=project_name_from_list; 
                          this.FromDate = this.datePipe.transform( this.LeadListData.fromDate, 'dd-MM-yyyy');
                          this.ToDate = this.datePipe.transform( this.LeadListData.toDate, 'dd-MM-yyyy'); 
                          console.log('full_name', full_name);
                          console.log('project_name', this.project_name);
                          console.log('api_token', this.LeadListData.api_token);
                          console.log('cp_id', this.LeadListData.cp_id);
                          console.log('project_id',this.LeadListData.project_id);
                          console.log('fromDate',this.LeadListData.fromDate);
                          console.log('toDate',this.LeadListData.toDate);
                          console.log('fromDate1',this.FromDate);
                          console.log('toDate1',this.ToDate);
                          console.log('sales_person_id',this.LeadListData.sales_person_id);
                          console.log('cp_executive_id',this.LeadListData.cp_executive_id);
                        if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
                          this.helper.presentToastError('Please on Internet Connection');
                          this.isSpinner = false;
                        } else {
                          this.isSpinner = true;
                          this.callApi(this.type);
                }
             });
           });
         });
       });
      });
    });
  });
});
});
});

}



  callApi(type)
  {
  // console.log("inside callAPi", this.type);
    if(type == 1)
    {
      console.log("getLeadDataDetails called");
      this.getLeadDataDetails();
    }
    else if(type == 2)
    {
      this.getSiteVisitsDetails();
    }
    else if(type == 3)
    {
      this.getLeadTokensDetails();
    }
    else if(type == 4)
    {
      this.getLeadTokensDetailsForGHPplus();
    }
    else if(type == 5)
    {
      this.getBookingDataDetails();
    }
    else{
      this.helper.presentToastError('no data available');
    }
  }

  /*Get Team  List*/
  getLeadDataDetails() {
    this.presentLoading().then(() => {
      this.apiservice.getLeadDataDetails(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,1).subscribe(data => {
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          this.leadlist = Value.data.data;
          this.lastPageIs = Value.data.last_page;
          console.log('this.lastPageIs',this.lastPageIs);
          this.dismissLoading();
        }
      }, error => {
        this.dismissLoading();
        this.helper.presentToastError('Something went wrong');
      });
    });
  }

  getSiteVisitsDetails() {
    // tslint:disable-next-line:max-line-length
    this.presentLoading().then(() => {
      this.apiservice.getSiteVisitsDetails(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,1).subscribe(data => {
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          this.leadlist = Value.data.data;
          this.lastPageIs = Value.data.last_page;
          console.log('this.lastPageIs',this.lastPageIs);
          this.dismissLoading();
        }
      }, error => {
        this.dismissLoading();
        this.helper.presentToastError('Something went wrong');
      });
    });
  }

  getLeadTokensDetails() {
    this.apiservice.getLeadTokensDetails(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,1,1).subscribe(data => {
      this.isSpinner = false;
      this.successvalue = JSON.stringify(data.body);
      const Value = JSON.parse(this.successvalue);

      console.log("my data",Value.success);
      if (Value.success === 1) {
        this.leadlist = Value.data.data;
        this.lastPageIs = Value.data.last_page;
        console.log('this.lastPageIs',this.lastPageIs);
        this.dismissLoading();
      }
    });
  }

  getLeadTokensDetailsForGHPplus() {
    this.apiservice.getLeadTokensDetails(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,3,1).subscribe(data => {
      this.isSpinner = false;
      this.successvalue = JSON.stringify(data.body);
      const Value = JSON.parse(this.successvalue);

      console.log("my data",Value.success);
      if (Value.success === 1) {
        this.leadlist = Value.data.data;
        this.lastPageIs = Value.data.last_page;
        console.log('this.lastPageIs',this.lastPageIs);
        this.dismissLoading();
      }
    });
  }

  getBookingDataDetails() {
    // tslint:disable-next-line:max-line-length
    this.presentLoading().then(() => {
      this.apiservice.getBookingDataDetails(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,1).subscribe(data => {
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          this.leadlist = Value.data.data;
          this.lastPageIs = Value.data.last_page;
          console.log('this.lastPageIs',this.lastPageIs);
          this.dismissLoading();
        }
      }, error => {
        this.dismissLoading();
        this.helper.presentToastError('Something went wrong');
      });
    });
  }

//For Search
searchEvent(event) {
  const title = event.target.value;
  const me = this;
  me.page = 0;
  
  // if the value is an empty string don't filter the items
  if(this.type==1){
    if (title.length>=1) {
      this.apiservice.getLeadDataDetailsSearch(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,1,title).subscribe(data => {
        console.log(this.type);
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          this.leadlist = Value.data.data;
              this.lastPageIs = Value.data.last_page;
              console.log('this.lastPageIs',this.lastPageIs);
              this.dismissLoading();
        }
      }, error => {
        this.helper.presentToastError('Something went wrong');
      });
    } else if (title.length<1)  {
      this.dismissLoading();
      console.log(title.length);
      this.getLeadDataDetails();
     }
  }
  
  else if(this.type==2){
    if (title.length>=1) {
      this.apiservice.getSiteVisitsDetailsSearch(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,1,title).subscribe(data => {
        console.log(this.type);
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          this.leadlist = Value.data.data;
              this.lastPageIs = Value.data.last_page;
              console.log('this.lastPageIs',this.lastPageIs);
              this.dismissLoading();
        }
      }, error => {
        this.helper.presentToastError('Something went wrong');
      });
    } else if (title.length<1)  {
      this.dismissLoading();
      console.log(title.length);
      this.getSiteVisitsDetails();
     }
  }
  
  
  else if(this.type==3){
    if (title.length>=1) {
      this.apiservice.getLeadTokensDetailsSearch(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,1,1,title).subscribe(data => {
        console.log(this.type);
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          this.leadlist = Value.data.data;
              this.lastPageIs = Value.data.last_page;
              console.log('this.lastPageIs',this.lastPageIs);
              this.dismissLoading();
        }
      }, error => {
        this.helper.presentToastError('Something went wrong');
      });
    } else if (title.length<1)  {
      this.dismissLoading();
      console.log(title.length);
      this.getLeadTokensDetails();
     }
  }
  
  
  else if(this.type==4){
    if (title.length>=1) {
      this.apiservice.getLeadTokensDetailsSearch(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,3,1,title).subscribe(data => {
        console.log(this.type);
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          this.leadlist = Value.data.data;
              this.lastPageIs = Value.data.last_page;
              console.log('this.lastPageIs',this.lastPageIs);
              this.dismissLoading();
        }
      }, error => {
        this.helper.presentToastError('Something went wrong');
      });
    } else if (title.length<1)  {
      this.dismissLoading();
      console.log(title.length);
      this.getLeadTokensDetailsForGHPplus();
     }
  }
  
  
  else if(this.type==5){
    if (title.length>=1) {
      this.apiservice.getBookingDataDetailsSearch(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,1,title).subscribe(data => {
        console.log(this.type);
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          this.leadlist = Value.data.data;
              this.lastPageIs = Value.data.last_page;
              console.log('this.lastPageIs',this.lastPageIs);
              this.dismissLoading();
        }
      }, error => {
        this.helper.presentToastError('Something went wrong');
      });
    } else if (title.length<1)  {
      this.dismissLoading();
      console.log(title.length);
      this.getBookingDataDetails();
     }
  }


}

SearchCancel(){
  this.dismissLoading();
  if(this.type==1){
    console.log('All Lead After Clear Search Cancel Button Use');
   this.getLeadDataDetails();
  }else  if(this.type==2){
    console.log('All Lead After Clear Search Cancel Button Use');
   this.getSiteVisitsDetails();
  }else  if(this.type==3){
    console.log('All Lead After Clear Search Cancel Button Use');
   this.getLeadTokensDetails();
  }else  if(this.type==4){
    console.log('All Lead After Clear Search Cancel Button Use');
   this.getLeadTokensDetailsForGHPplus();
  }else  if(this.type==5){
    console.log('All Lead After Clear Search Cancel Button Use');
   this.getBookingDataDetails();
  }
}


// Infinite Loop Main Method
  doInfinite(infiniteScroll,type){
    console.log('me search value zalyavar call zaloy');
    this.page = 1;
    this.page = this.page + 1;
    console.log(this.page);
    if (this.page <= this.lastPageIs) {
    var me=this;
    // Search Infinite Loop
    console.log(this.searchVal);
    if (this.searchVal != '') {
      const title = this.searchVal;
      if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
        this.helper.presentToast('Please on Internet Connection');
      }else {
        if(type==1){
          console.log(this.type);
          this.ForDoInfiniteSearch(infiniteScroll,type,title)
      }else if(type==2){
        console.log(this.type);
        this.ForDoInfiniteSearch(infiniteScroll,type,title)
    }else if(type==3){
      console.log(this.type);
      this.ForDoInfiniteSearch(infiniteScroll,type,title)
  } else if(type==4){
    console.log(this.type);
    this.ForDoInfiniteSearch(infiniteScroll,type,title)
  }else if(type==5){
  console.log(this.type);
  this.ForDoInfiniteSearch(infiniteScroll,type,title)
}
    }
  }
    //  Regular Infinite Loop
    //  else {
    //   if(type==1){
    //    this.ForDoinFiniteCallAPI(infiniteScroll,type);
    //   }else if(type==2){
    //     this.ForDoinFiniteCallAPI(infiniteScroll,type);
    //   }else if(type==3){
    //     this.ForDoinFiniteCallAPI(infiniteScroll,type);
    //   }else if(type==4){
    //     this.ForDoinFiniteCallAPI(infiniteScroll,type);
    //   }else if(type==5){
    //     this.ForDoinFiniteCallAPI(infiniteScroll,type);
    //   }
    // }
  }
  // Outside Of InfiniteScroll
  else {
       this.page=this.lastPageIs;
       console.log('OutSide Do Finite',this.page);
       console.log('OutSide Do Finite',this.lastPageIs);
       console.log('OutSide Do Finite');
       infiniteScroll.target.complete();
   }
  }


  doInfiniteWithOutSearch(infiniteScroll,type){
    console.log('me search value nasatana call zaloy');
    this.page = this.page + 1;
    console.log(this.page);
    if (this.page <= this.lastPageIs) {
    var me=this;
    // Search Infinite Loop
    console.log(this.searchVal);
      if(type==1){
       this.ForDoinFiniteCallAPI(infiniteScroll,type);
      }else if(type==2){
        this.ForDoinFiniteCallAPI(infiniteScroll,type);
      }else if(type==3){
        this.ForDoinFiniteCallAPI(infiniteScroll,type);
      }else if(type==4){
        this.ForDoinFiniteCallAPI(infiniteScroll,type);
      }else if(type==5){
        this.ForDoinFiniteCallAPI(infiniteScroll,type);
      }
    }
  
  // Outside Of InfiniteScroll
  else {
       this.page=this.lastPageIs;
       console.log('OutSide Do Finite',this.page);
       console.log('OutSide Do Finite',this.lastPageIs);
       console.log('OutSide Do Finite');
       infiniteScroll.target.complete();
   }
  }




  
  // For Search Infintite
  ForDoInfiniteSearch(infiniteScroll,type,title){
    if(type==1){
      this.apiservice.getLeadDataDetailsSearch(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,this.page,title).subscribe(data => {
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          if(Value.data.data.length!=0){    
              console.log('All Leads With Search');
              for (let LeadID of Value.data.data) {
               
                  this.leadlist.push(LeadID); 
                
              }  
            } else {
              infiniteScroll.target.complete();
            }
           infiniteScroll.target.complete();
          }
         infiniteScroll.target.complete();
         }, error => {
        infiniteScroll.target.complete();
        this.dismissLoading();
        this.helper.presentToastError('Something went wrong');
      });
    }else if(type==2){
      this.apiservice.getSiteVisitsDetailsSearch(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,this.page,title).subscribe(data => {
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          if(Value.data.data.length!=0){    
              console.log('All Leads With Search');
              for (let LeadID of Value.data.data) {
                if ((this.leadlist.findIndex(d => d.lead_id === LeadID.lead_id)) == -1) {
                  console.log('d.lead_id',LeadID.lead_id);
                  this.leadlist.push(LeadID); 
                }
              }  
            } else {
              infiniteScroll.target.complete();
            }
           infiniteScroll.target.complete();
          }
         infiniteScroll.target.complete();
         }, error => {
        infiniteScroll.target.complete();
        this.dismissLoading();
        this.helper.presentToastError('Something went wrong');
      });
    }else if(type==3){
      this.apiservice.getLeadTokensDetailsSearch(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,1,this.page,title).subscribe(data => {
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          if(Value.data.data.length!=0){    
              console.log('All Leads With Search');
              for (let LeadID of Value.data.data) {
                if ((this.leadlist.findIndex(d => d.lead_id === LeadID.lead_id)) == -1) {
                  console.log('d.lead_id',LeadID.lead_id);
                  this.leadlist.push(LeadID); 
                }
              }  
            } else {
              infiniteScroll.target.complete();
            }
           infiniteScroll.target.complete();
          }
         infiniteScroll.target.complete();
         }, error => {
        infiniteScroll.target.complete();
        this.dismissLoading();
        this.helper.presentToastError('Something went wrong');
      });
    }else if(type==4){
      this.apiservice.getLeadTokensDetailsSearch(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,3,this.page,title).subscribe(data => {
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          if(Value.data.data.length!=0){    
              console.log('All Leads With Search');
              for (let LeadID of Value.data.data) {
                if ((this.leadlist.findIndex(d => d.lead_id === LeadID.lead_id)) == -1) {
                  console.log('d.lead_id',LeadID.lead_id);
                  this.leadlist.push(LeadID); 
                }
              }  
            } else {
              infiniteScroll.target.complete();
            }
           infiniteScroll.target.complete();
          }
         infiniteScroll.target.complete();
         }, error => {
        infiniteScroll.target.complete();
        this.dismissLoading();
        this.helper.presentToastError('Something went wrong');
      });
    }else if(type==5){
      this.apiservice.getBookingDataDetailsSearch(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,this.page,title).subscribe(data => {
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          if(Value.data.data.length!=0){    
              console.log('All Leads With Search');
              for (let LeadID of Value.data.data) {
                if ((this.leadlist.findIndex(d => d.lead_id === LeadID.lead_id)) == -1) {
                  console.log('d.lead_id',LeadID.lead_id);
                  this.leadlist.push(LeadID); 
                }
              }  
            } else {
              infiniteScroll.target.complete();
            }
           infiniteScroll.target.complete();
          }
         infiniteScroll.target.complete();
         }, error => {
        infiniteScroll.target.complete();
        this.dismissLoading();
        this.helper.presentToastError('Something went wrong');
      });
    }
  }
  
    //  For Regular Infinite Scroll
  ForDoinFiniteCallAPI(infiniteScroll,type){
      if(type==1){
        this.apiservice.getLeadDataDetails(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,this.page).subscribe(data => {
          this.isSpinner = false;
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);
          console.log("my data",Value.success);
          if (Value.success === 1) {
            if(Value.data.data.length!=0){    
                console.log('All Leads ');
                for (let LeadID of Value.data.data) {
                  console.log('d.lead_id',Value.data.data);
                  console.log('d.lead_id',LeadID.lead_id);
                  if ((this.leadlist.findIndex(d => d.lead_id === LeadID.lead_id)) == -1) {
                    console.log('d.lead_id',LeadID.lead_id);
                    this.leadlist.push(LeadID); 
                  }
                }
              } else {
                infiniteScroll.target.complete();
              }
            infiniteScroll.target.complete();
            }
          infiniteScroll.target.complete();
          }, error => {
          infiniteScroll.target.complete();
          this.dismissLoading();
          this.helper.presentToastError('Something went wrong');
        });
      }
      else if(type==2){
        this.apiservice.getSiteVisitsDetails(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,this.page).subscribe(data => {
          this.isSpinner = false;
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);
          console.log("my data",Value.success);
          if (Value.success === 1) {
            if(Value.data.data.length!=0){    
              console.log('All Site Visits');
                for (let cpExecutive of Value.data.data) {
                this.leadlist.push(cpExecutive);   
                }       
              } else {
                infiniteScroll.target.complete();
              }
            infiniteScroll.target.complete();
            }
          infiniteScroll.target.complete();
          }, error => {
          infiniteScroll.target.complete();
          this.dismissLoading();
          this.helper.presentToastError('Something went wrong');
        });
      }
      else if(type==3){
        this.apiservice.getLeadTokensDetails(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,1,this.page).subscribe(data => {
          this.isSpinner = false;
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);
          console.log("my data",Value.success);
          if (Value.success === 1) {
            if(Value.data.data.length!=0){    
              console.log('All GHP');
                for (let cpExecutive of Value.data.data) {
                  this.leadlist.push(cpExecutive);  
                }
              } else {
                infiniteScroll.target.complete();
              }
            infiniteScroll.target.complete();
            }
          infiniteScroll.target.complete();
          }, error => {
          infiniteScroll.target.complete();
          this.dismissLoading();
          this.helper.presentToastError('Something went wrong');
        });
      }
      else if(type==4){
        this.apiservice.getLeadTokensDetails(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,3,this.page).subscribe(data => {
          this.isSpinner = false;
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);
          console.log("my data",Value.success);
          if (Value.success === 1) {
            if(Value.data.data.length!=0){    
              console.log('All GHP+');
                for (let cpExecutive of Value.data.data) {
                this.leadlist.push(cpExecutive);   
                }      
              } else {
                infiniteScroll.target.complete();
              }
            infiniteScroll.target.complete();
            }
          infiniteScroll.target.complete();
          }, error => {
          infiniteScroll.target.complete();
          this.dismissLoading();
          this.helper.presentToastError('Something went wrong');
        });
      }
      else if(type==5){
        this.apiservice.getBookingDataDetails(this.LeadListData.api_token, this.LeadListData.project_id,this.LeadListData.fromDate, this.LeadListData.toDate, this.LeadListData.cp_executive_id,this.LeadListData.cp_id,this.page).subscribe(data => {
          this.isSpinner = false;
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);
          console.log("my data",Value.success);
          if (Value.success === 1) {
            if(Value.data.data.length!=0){    
              console.log('All Allotments');
                for (let cpExecutive of Value.data.data) {
                  this.leadlist.push(cpExecutive);
                }     
              } else {
                infiniteScroll.target.complete();
              }
            infiniteScroll.target.complete();
            }
          infiniteScroll.target.complete();
          }, error => {
          infiniteScroll.target.complete();
          this.dismissLoading();
          this.helper.presentToastError('Something went wrong');
        });
      }
    }

    // DoRefresh
  doRefresh(event) {
        console.log('Begin async operation');
        setTimeout(() => {
          this.leadlist = [];
          this.isSpinner = true;
          if(this.type == 1)
            {
              console.log("getLeadDataDetails called");
              this.getLeadDataDetails();
            }
            else if(this.type == 2)
            {
              this.getSiteVisitsDetails();
            }
            else if(this.type == 3)
            {
              this.getLeadTokensDetails();
            }
            else if(this.type == 4)
            {
              this.getLeadTokensDetailsForGHPplus();
            }
            else if(this.type == 5)
            {
              this.getBookingDataDetails();
            }
          console.log('Async operation has ended');
          event.target.complete();
        }, 500);

      }




  // Card Click Fuctions 
  // Card Varun OverFlow Menu Madhun Click Functions
    addReminder(name) {
      this.storage.set('ReminderName', name);
      this.storage.set('Reminder', 1);
      this.storage.set('FromDrillDownList',0);
      this.router.navigate(['/addreminder/']);
    }
    // GHP WithOutSiteVisit
    GenerateGHP(name,ID,LeadID,is_kyc_uploaded,sales_person_id,mobile,email) {
      this.WithOutSiteVisitRequest(name,ID,LeadID,is_kyc_uploaded,sales_person_id,mobile,email)
    }

    async WithOutSiteVisitRequest(name,ID,LeadID,is_kyc_uploaded,sales_person_id,mobile,email) {
      const me = this;
      const alert = await this.alertCtrl.create({
        header: 'Generate GHP/GHP+ Without Site Visit!',
        message: 'You are generating GHP/GHP+ without Site visit for the customer'+' '+name+'.Would you like to continue?',
        buttons: [
          {
            text: 'No',
            role: 'no',
            handler: () => {
            }
          },
          {
            text: 'Yes',
            handler: () => {
          this.storage.set('sales_person_id', sales_person_id);            
          this.storage.set('CustomerName', name);
          this.storage.set('CustomerID', ID);
          this.storage.set('LeadID', LeadID);
          this.storage.set('mobile', mobile);
          this.storage.set('email', email);
          this.storage.set('is_kyc_uploaded', is_kyc_uploaded);
          this.storage.set('Value', 1);
          this.storage.set('FromDrillDownList',0);
          this.router.navigate(['/generate-ghp/']);
            }
          }
        ]
      });
      await alert.present();
    }

    // GHP Generate After SiteVisit
    GenerateGHPafterSiteVisit(name,ID,LeadID,is_kyc_uploaded,sales_person_id,mobile,email) {
      this.storage.set('sales_person_id', sales_person_id);            
      this.storage.set('CustomerName', name);
      this.storage.set('CustomerID', ID);
      this.storage.set('LeadID', LeadID);
      this.storage.set('mobile', mobile);
      this.storage.set('email', email);
      this.storage.set('is_kyc_uploaded', is_kyc_uploaded);
      this.storage.set('Value', 1);
      this.storage.set('FromDrillDownList',0);
      this.router.navigate(['/generate-ghp/']);
    }

    // View GHP Details 
    ViewGHPDetails(token,name,mobile,email,projectname,eventtitle,unit_category,lead_uid,lead_status_id,token_media_path,lead_id,event_id,token_type_id,token_id,ghp_date,ghp_amount,ghp_plus_date,ghp_plus_amount,remarks,sales_person_id){
      this.storage.set('token', token);
      this.storage.set('name', name);
      this.storage.set('mobile', mobile);
      this.storage.set('email', email);
      this.storage.set('projectname', projectname);
      this.storage.set('eventtitle', eventtitle);
      this.storage.set('unit_category', unit_category);
      this.storage.set('lead_uid', lead_uid);
      this.storage.set('lead_status_id', lead_status_id);
      this.storage.set('token_media_path', token_media_path);
      this.storage.set('lead_id', lead_id);
      this.storage.set('event_id', event_id);
      this.storage.set('token_type_id', token_type_id);
      this.storage.set('token_id', token_id);
      this.storage.set('ghp_date', ghp_date);
      this.storage.set('ghp_amount',ghp_amount);
      this.storage.set('ghp_plus_date',ghp_plus_date);
      this.storage.set('ghp_plus_amount', ghp_plus_amount);   
      this.storage.set('remarks', remarks);   
      this.storage.set('sales_person_id', sales_person_id);   
      this.storage.set('FromDrillDownList',0);
      this.router.navigate(['/ghpdetails/']);
    }

    // View GHP Request
    ViewGHPrequest(token,name,mobile,email,projectname,eventtitle,unit_category,lead_uid,lead_status_id,token_media_path,lead_id,event_id,token_type_id,token_id,ghp_date,ghp_amount,ghp_plus_date,ghp_plus_amount,payment_link){
      this.storage.set('token', token);
      this.storage.set('name', name);
      this.storage.set('mobile', mobile);
      this.storage.set('email', email);
      this.storage.set('projectname', projectname);
      this.storage.set('eventtitle', eventtitle);
      this.storage.set('unit_category', unit_category);
      this.storage.set('lead_uid', lead_uid);
      this.storage.set('lead_status_id', lead_status_id);
      this.storage.set('token_media_path', token_media_path);
      this.storage.set('lead_id', lead_id);
      this.storage.set('event_id', event_id);
      this.storage.set('token_type_id', token_type_id);
      this.storage.set('token_id', token_id);
      console.log('ghp_date', ghp_date);
      console.log('ghp_amount',ghp_amount);
      console.log('ghp_plus_date',ghp_plus_date);
      console.log('ghp_plus_amount', ghp_plus_amount);
      if(ghp_plus_date || ghp_plus_amount)
      {
        this.storage.set('ghp_plus_date',ghp_plus_date);
        this.storage.set('ghp_plus_amount',ghp_plus_amount);
        this.storage.set('checkGhp', 1);
        console.log('ghp+ payment pending aahe');
      }
      if(ghp_date || ghp_amount)
      {                 
        this.storage.set('ghp_date', ghp_date);
        this.storage.set('ghp_amount',ghp_amount);
        this.storage.set('checkGhp', 2);
        console.log('ghp payment pending aahe');
      }

      if((ghp_date || ghp_amount) && (ghp_plus_date || ghp_plus_amount))
      {
        console.log('ghp payment zalay aani ghp+ payment pending aahe');
        this.storage.set('checkGhp', 3);

      }
      this.storage.set('payment_link', payment_link);
      this.storage.set('FromDrillDownList',0);
      this.router.navigate(['/ghp-request/']);
    }

    // Call Method 
    callMethodNew(countrycode:any,callNumber: any) {
      setTimeout(() => {
          const tel = '+' + countrycode + callNumber;
          window.open(`tel:${tel}`, '_system');
      }, 100);
    }

    // Whatsapp Method
    Whatsapp(countrycode:any,callNumber: any,Name:any,Link:any) {
        setTimeout(() => {
            const whatsapp = countrycode + callNumber;
            const name=Name;
            const link=Link
            var uri = `https://api.whatsapp.com/send?text="Hello+${name},+\n\nGreetings from Vilas Javdekar Developers.You have been successfully registered with us through one of our esteemed Channel Partners.\n\nWe will always be at your service to help you book your Dream Home with VJ. Looking forward to welcome you to our VJ Parivaar soon!\n\nOur Official Website is :${link}.\n\n-Team VJ. "&phone=${whatsapp}`;
            var res = encodeURI(uri);
            //window.open(`https://api.whatsapp.com/send?phone=${whatsapp}`, '_system',);
            window.open(res, '_system',);
        }, 100);

    }




  async presentLoading() {
    this.loader = await this.loadingController.create({
      translucent: true
    });
    await this.loader.present();
  }

  async dismissLoading() {
    await this.loader.dismiss();
  }

  

  goback() {
    this.storage.set('IDFromPerformance',2);
    if(this.goBack==1){
      this.storage.set('FromLeadList',1);
      this.storage.set('FromLeadListprojectid', this.LeadListData.project_id)
      this.router.navigate(['/team-lead-stat/']);
    }else if(this.goBack==2){
      this.storage.set('FromLeadList',2);
      this.storage.set('FromLeadListprojectid', this.LeadListData.project_id);
      this.router.navigate(['/team-stats/']);
    }
    
    console.log('Click on backpress');
  }
}
