import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, AlertController, Platform, NavController } from '@ionic/angular';
import { Helper } from '../services/Helper';
import { APIService } from '../services/APIService';
import { Network } from '@ionic-native/network/ngx';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CPFeed } from '../models/CPFeed';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-myperformancefilter',
  templateUrl: './myperformancefilter.page.html',
  styleUrls: ['./myperformancefilter.page.scss'],
})
export class MyperformancefilterPage implements OnInit {
  cpfeedData: CPFeed = new CPFeed();
  newExecutiveId = 0;
  newLoginApi: any;
  leadlist: any = [];
  storageData = [];
  successvalue: any;
  IDFromPerformance: any;
  last_lead_updated_at:any;
  isSpinner: any = true;
  lead_status_id: any;
  token_type_id: any;
  accordionExapanded = false;
  icon = 'arrow-dropdown';
  panelOpenState = true;
  loader: any;
  expanded = true;
  SelectProjectID: any;
  lead_status_id_FromFilter: any;
  SelectCategoryID_FromFilter: number;
  token_type_id_FromFilter: any;


  constructor(private storage: Storage, public actionSheetController: ActionSheetController, public loadingController: LoadingController, public alertController: AlertController, public helper: Helper, public apiservice: APIService, private network: Network,  private platform: Platform, private router: Router,private alertCtrl: AlertController,
    // tslint:disable-next-line:max-line-length
    private http: HttpClient, public navCtrl: NavController,) {
    this.platform.backButton.subscribeWithPriority(1, () => {
        this.navCtrl.navigateBack('/myperformance');
      });
}

  ngOnInit() {
  }

  ionViewDidEnter() {
    // From Call API 
    this.storage.get('SelectCategoryID').then((SelectCategoryID) => {
      this.storage.get('lead_status_id').then((lead_status_id) => {
      this.storage.get('token_type_id').then((token_type_id) => {
      this.storage.get('IDFromPerformance').then((IDFromPerformancea) => {
      this.storage.get('cp_executive_id').then((cp_executive_id) => {
      this.storage.get('apiToken').then((apiToken) => {
          this.SelectCategoryID_FromFilter = SelectCategoryID;
          this.lead_status_id_FromFilter = lead_status_id;
          this.token_type_id_FromFilter = token_type_id;
          console.log('this.SelectCategoryID', this.SelectCategoryID_FromFilter);
          console.log('this.lead_status_id', this.lead_status_id_FromFilter);
          console.log('this.token_type_id', this.token_type_id_FromFilter);
          this.IDFromPerformance=IDFromPerformancea;
          this.newExecutiveId = cp_executive_id;
          this.newLoginApi = apiToken;
          if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
            this.helper.presentToast('Please on Internet Connection');
            this.isSpinner = false;
          } else {
            this.isSpinner = true;
            this.Filter();
           }
        });
      });
    });
  });
});
});

    this.platform.backButton.subscribeWithPriority(1, () => {
      this.navCtrl.navigateBack('/myperformance');
    });
}
  
// API 1==>Filter,2==>DoInfinteFilter, 3==>DoRefresh
    //  Filter From MyPerformance
    Filter() {

      if(this.SelectCategoryID_FromFilter==0){
          if(this.token_type_id_FromFilter==1){
              var param = {
                  project_id: 0,
                  lead_status_id: this.lead_status_id_FromFilter,
                  token_type_id: this.token_type_id_FromFilter,
              };
          }else if(this.token_type_id_FromFilter==3){
              var param = {
                  project_id: 0,
                  lead_status_id: this.lead_status_id_FromFilter,
                  token_type_id: this.token_type_id_FromFilter,
              };
          }else{
              var param = {
                  project_id: 0,
                  lead_status_id: this.lead_status_id_FromFilter,
                  token_type_id: null,
              };
          }
      }else if(this.SelectCategoryID_FromFilter!==0){
          if(this.token_type_id==1){
              var param = {
                  project_id: this.SelectCategoryID_FromFilter,
                  lead_status_id: this.lead_status_id_FromFilter,
                  token_type_id: this.token_type_id_FromFilter,
              };
          }else if(this.token_type_id==3){
              var param = {
                  project_id: this.SelectCategoryID_FromFilter,
                  lead_status_id: this.lead_status_id_FromFilter,
                  token_type_id: this.token_type_id_FromFilter,
              };
          }else{
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
        if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
            this.helper.presentToast('Please on Internet Connection');
        } else {
            this.apiservice.getCPFeedFilter(this.cpfeedData.cp_executive_id, this.cpfeedData.api_token, JSON.stringify(param), 0,null).subscribe(data => {
                me.isSpinner = false;
                this.successvalue = JSON.stringify(data.body);
                const Value = JSON.parse(this.successvalue);
                console.log(Value.success);
                if (Value.success === 1) {
                    this.leadlist = Value.data;
                    this.last_lead_updated_at = this.leadlist[this.leadlist.length-1].ids.updated_at;
                    for (let i = 0; i < this.leadlist.length; i++) {
                      
                        if (this.leadlist[i]) {
                            this.lead_status_id = this.leadlist[i].ids.lead_status_id;
                            console.log(this.lead_status_id)
                        }
                    }
                }
              
            }, err => {
                me.isSpinner = false;
                this.helper.presentToast('Something Went Wrong');
            });
        }
    }
    // DoInfiniteScrollViewForFilter
    doInfinite(count, infiniteScroll) {
      if(this.SelectCategoryID_FromFilter==0){
        if(this.token_type_id_FromFilter==1){
            var param = {
                project_id: 0,
                lead_status_id: this.lead_status_id_FromFilter,
                token_type_id: this.token_type_id_FromFilter,
            };
        }else if(this.token_type_id_FromFilter==3){
            var param = {
                project_id: 0,
                lead_status_id: this.lead_status_id_FromFilter,
                token_type_id: this.token_type_id_FromFilter,
            };
        }else{
            var param = {
                project_id: 0,
                lead_status_id: this.lead_status_id_FromFilter,
                token_type_id: null,
            };
        }
    }else if(this.SelectCategoryID_FromFilter!==0){
        if(this.token_type_id==1){
            var param = {
                project_id: this.SelectCategoryID_FromFilter,
                lead_status_id: this.lead_status_id_FromFilter,
                token_type_id: this.token_type_id_FromFilter,
            };
        }else if(this.token_type_id==3){
            var param = {
                project_id: this.SelectCategoryID_FromFilter,
                lead_status_id: this.lead_status_id_FromFilter,
                token_type_id: this.token_type_id_FromFilter,
            };
        }else{
            var param = {
                project_id: this.SelectCategoryID_FromFilter,
                lead_status_id: this.lead_status_id_FromFilter,
                token_type_id: null,
            };
        }
      }
          if (this.leadlist.length > 2) {
              const me = this;
              if(this.leadlist.length!==0){
                console.log(this.leadlist.length);
                this.apiservice.getCPFeedFilter(this.cpfeedData.cp_executive_id, this.cpfeedData.api_token, JSON.stringify(param),count,this.last_lead_updated_at).subscribe(data => {
                  this.successvalue = JSON.stringify(data.body);
                  const Value = JSON.parse(this.successvalue);
                  if (Value.success === 1) {
                      if (Value.data.length != 0) {
                        this.last_lead_updated_at =  this.leadlist[this.leadlist.length-1].ids.updated_at;
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
          }, err => {
                
                  infiniteScroll.target.complete();
    
              });
            } else {
                infiniteScroll.target.complete();
              }
             
    
          } else {
           
              infiniteScroll.target.complete();
          }
   }
  
    // Refresh Home Page
    doRefresh(event) {
    event.target.disabled = true;
    this.isSpinner = true;
    setTimeout(() => {
      this.leadlist = [];
      if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
        this.isSpinner = false;
        this.helper.presentToastHomePage('Please on Internet Connection');
      } else {
        this.isSpinner = true;
        this.helper.showLoader('');
       this.Filter();
        setTimeout(() => {
          event.target.disabled = false;
        }, 1500);
      }
      event.target.complete();
    }, 200);
  
  }
 

  // Card Click Fuction
  addReminder(name) {
    this.storage.set('ReminderName', name);
    this.storage.set('Reminder', 1);
    this.storage.set('FromMyPerformanceFilter',1);
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
         this.storage.set('FromMyPerformanceFilter',1);
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
    this.storage.set('FromMyPerformanceFilter',1);
    this.router.navigate(['/generate-ghp/']);
  }
  
// View GHP Details 
  ViewGHPDetails(token,name,mobile,email,projectname,eventtitle,unit_category,lead_uid,lead_status_id,token_media_path,actions,lead_id,event_id,token_type_id,token_id,ghp_date,ghp_amount,ghp_plus_date,ghp_plus_amount,remarks,sales_person_id){
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
    this.storage.set('actions', actions);
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
    this.storage.set('FromMyPerformanceFilter',1);
    this.router.navigate(['/ghpdetails/']);
  }

// View GHP Request
  ViewGHPrequest(token,name,mobile,email,projectname,eventtitle,unit_category,lead_uid,lead_status_id,token_media_path,actions,lead_id,event_id,token_type_id,token_id,ghp_date,ghp_amount,ghp_plus_date,ghp_plus_amount,payment_link){
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
    this.storage.set('actions', actions);
    this.storage.set('lead_id', lead_id);
    this.storage.set('event_id', event_id);
    this.storage.set('token_type_id', token_type_id);
    this.storage.set('token_id', token_id);
    console.log('ghp_date', ghp_date);
    console.log('ghp_amount',ghp_amount);
    console.log('ghp_plus_date',ghp_plus_date);
    console.log('ghp_plus_amount', ghp_plus_amount);
    if(ghp_plus_date && ghp_plus_amount)
    {
      this.storage.set('ghp_plus_date',ghp_plus_date);
      this.storage.set('ghp_plus_amount',ghp_plus_amount);
      this.storage.set('checkGhp', 1);

    }
    if(ghp_date && ghp_amount)
    {                 
      this.storage.set('ghp_date', ghp_date);
      this.storage.set('ghp_amount',ghp_amount);
      this.storage.set('checkGhp', 2);
    }

    if(ghp_date && ghp_amount && ghp_plus_date && ghp_plus_amount)
    {
      this.storage.set('checkGhp', 3);

    }
    this.storage.set('payment_link', payment_link);
    this.storage.set('FromMyPerformanceFilter',1);
    this.router.navigate(['/ghp-request/']);
  }

  // Call Method 
  callMethodNew(callNumber: any) {
    setTimeout(() => {
        const tel = '+' + callNumber;
        window.open(`tel:${tel}`, '_system');
    }, 100);
}

  // Whatsapp Method
  Whatsapp(callNumber: any,Name:any,Link:any) {
      setTimeout(() => {
          const whatsapp = callNumber;
          const name=Name;
          const link=Link
          var uri = `https://api.whatsapp.com/send?text="Hello+${name},+\n\nGreetings from Vilas Javdekar Developers.You have been successfully registered with us through one of our esteemed Channel Partners.\n\nWe will always be at your service to help you book your Dream Home with VJ. Looking forward to welcome you to our VJ Parivaar soon!\n\nOur Official Website is :${link}.\n\n-Team VJ. "&phone=${whatsapp}`;
          var res = encodeURI(uri);
          //window.open(`https://api.whatsapp.com/send?phone=${whatsapp}`, '_system',);
          window.open(res, '_system',);
      }, 100);

  }

 // Loders Hide and Show
 async presentLoading() {
  this.loader = await this.loadingController.create({
    translucent: true
  });
  await this.loader.present();
}

async dismissLoading() {
  await this.loader.dismiss();
}

goback(){
  this.navCtrl.navigateBack('/myperformance');
}


}
