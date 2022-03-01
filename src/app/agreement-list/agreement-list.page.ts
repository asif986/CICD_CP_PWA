import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Events, LoadingController, AlertController, PopoverController, Platform, NavController, ModalController } from '@ionic/angular';
import { Helper } from '../services/Helper';
import { APIService } from '../services/APIService';
import { Network } from '@ionic-native/network/ngx';
import { WebServer } from '../services/WebServer';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-agreement-list',
  templateUrl: './agreement-list.page.html',
  styleUrls: ['./agreement-list.page.scss'],
})
export class AgreementListPage implements OnInit {
  agreementAfterAOPArrayList = [];
  loader: any;
  isSpinner: any = true;
  cpID:any;
  successvalue: any;
  lastPage: any;
  currentPage = 1;
  searchVal: any = '';
  page: number;
  lastPageIs: number = 0;
  storageData = [];
  aopBonusID:any;
  brokaragePercentage:any;
 constructor (private storage: Storage, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private cd: ChangeDetectorRef, private platform: Platform, private router: Router, private matIconRegistry: MatIconRegistry,
    public navCtrl: NavController, public modalController: ModalController) {
 
        this.platform.backButton.subscribeWithPriority(1, () => {
          this.storage.remove('aop_bonus_id');
          this.storage.remove('brokerage_percent');
          this.router.navigate(['/incentive-bills/']);
        this.storage.set('IDFromPerformance',2);
        });
    }
 
  ngOnInit() {
  }
 
 
 
 
 
  ionViewDidEnter() {
   console.log(1);
   this.page = 1;
   this.platform.backButton.subscribeWithPriority(1, () => {
       this.storage.set('IDFromPerformance',2);
       this.storage.remove('aop_bonus_id');
       this.storage.remove('brokerage_percent');
       this.router.navigate(['/incentive-bills/']);
   });
 
   this.storage.get('cp_executive_id').then((cp_executive_id) => {
     this.cpID=cp_executive_id;
       if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
         this.helper.presentToastError('Please on Internet Connection');
         this.isSpinner = false;
       } else {
         this.isSpinner = true;
         this.getAgreementAOPList();
       }
     });

     this.storage.get('aop_bonus_id').then((aop_bonus_id) => {
       this.aopBonusID = aop_bonus_id;
       console.log('aopBonusID', this.aopBonusID);
     });
     this.storage.get('brokerage_percent').then((brokerage_percent) => {
      this.brokaragePercentage = brokerage_percent;
      console.log('brokaragePercentage',  this.brokaragePercentage );
    });
  }

  getAgreementAOPList() {
    this.presentLoading().then(() => {
      if (this.network.type !== 'none' && this.network.type !== 'unknown') {
        this.apiservice.getAgreementAferAOP(this.cpID,1).subscribe(data => {
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);
          console.log("my data",Value.success);
          this.isSpinner = false;
          if (Value.success === 1) {
            this.agreementAfterAOPArrayList = Value.data.data;
            this.lastPageIs = Value.data.last_page;
            console.log('this.lastPageIs',this.lastPageIs);
            this.dismissLoading();
          } else {
            this.isSpinner = false;
            this.dismissLoading();
            this.helper.presentToast('Something went wrong!');
          }
        }, error => {
          this.isSpinner = false;
          this.dismissLoading();
          this.helper.presentToast('Something went wrong!');
        });
      } else {
        this.isSpinner = false;
        this.dismissLoading();
        console.log('Network Type :' + this.network.type);
        this.helper.presentToast('Please on Internet Connection!');
      }
    }, error => {
      this.isSpinner = false;
      this.dismissLoading();
      this.helper.presentToastError('Something went wrong!');
    });
  }
  
  searchEvent(event) {
  
    const title = event.target.value;
    const me = this;
    me.page = 1;
    if (title.length >= 1) {
       this.apiservice.getAgreementAferAOPSearch(this.cpID,1,title).subscribe(data => {
          me.isSpinner = false;
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);
          console.log("my data",Value.success);
          if (Value.success === 1) {
            this.agreementAfterAOPArrayList = Value.data.data;
            this.dismissLoading();
          }
            // this.checked = 1;
          }, err => {
            me.isSpinner = false;
            this.helper.presentToast('Something Went Wrong');
          });
       
    }else {
      this.dismissLoading();
      this.getAgreementAOPList();
    }
  }
  
  
  doInfinite(infiniteScroll){
    console.log('infiniteScroll', infiniteScroll);
    this.page = this.page + 1;
    console.log('this.page', this.page);
    console.log('this.lastPageIs', this.lastPageIs);
    if (this.page <= this.lastPageIs) {
    console.log('Inside Do Finite');
    var me=this;
    if (this.searchVal != '') {
      const title = this.searchVal;
      if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
        this.helper.presentToast('Please on Internet Connection');
      } else {
        this.apiservice.getAgreementAferAOPSearch(this.cpID, this.page,title).subscribe(data => {
          this.isSpinner = false;
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);
          console.log("my data",Value.success);
          if (Value.success === 1) {
            if(Value.data.data.length!=0){    
  
                  //  this.reminderList = data1;
                    for (const val of Value.data.data) {
                        this.agreementAfterAOPArrayList.push(val);
                    }
                    console.log(this.agreementAfterAOPArrayList);
                  }else {
                    infiniteScroll.target.complete();
                  }
                 infiniteScroll.target.complete();
                }
                  me.isSpinner = false;
                  infiniteScroll.target.complete();
            
                }, err => {
                  me.isSpinner = false;
                  infiniteScroll.target.complete();
                });
              }
            }
             else
              // Search name nasatana
              {
                this.apiservice.getAgreementAferAOP(this.cpID, this.page).subscribe(data => {
                const data1 = data.body.data.data;
                this.successvalue = JSON.stringify(data.body);
                const Value = JSON.parse(this.successvalue);
                console.log("my data",Value.success);
                if (Value.success === 1) {
                  if(Value.data.data.length!=0){   
                //  this.reminderList = data1;
                  for (const val of data1) {
                    this.agreementAfterAOPArrayList.push(val);
                   // }
                  }
                  console.log(this.agreementAfterAOPArrayList);
                }else {
                  infiniteScroll.target.complete();
                }
               infiniteScroll.target.complete();
              }
                me.isSpinner = false;
                infiniteScroll.target.complete();
          
              }, err => {
                me.isSpinner = false;
                infiniteScroll.target.complete();
          
              });
       }
     }else {
       this.page=this.lastPageIs;
       console.log('OutSide Do Finite');
       infiniteScroll.target.complete();
   }
  }
  
  

 
 // Refresh Karatana
 doRefresh(event) {
  this.page=1;
   console.log('Begin async operation');
   setTimeout(() => {
     this.agreementAfterAOPArrayList = [];
     this.isSpinner = true;
     this.getAgreementAOPList();
     console.log('Async operation has ended');
     event.target.complete();
   }, 500);
 
 }
 
 
 popupRaiseBillToIncentive(index){
  this.storageData = [];
  this.storageData.push(this.agreementAfterAOPArrayList[index].full_name);
  this.storageData.push(this.agreementAfterAOPArrayList[index].block_name);
  this.storageData.push(this.agreementAfterAOPArrayList[index].blockName);
  this.storageData.push(this.agreementAfterAOPArrayList[index].unit_name);
  this.storageData.push(this.agreementAfterAOPArrayList[index].totalBrokerage);
  this.storageData.push(this.agreementAfterAOPArrayList[index].totalBrokerageAmount);
  this.storageData.push(this.agreementAfterAOPArrayList[index].bsp);
  this.storageData.push(this.agreementAfterAOPArrayList[index].agreement_id);
  this.storageData.push(this.agreementAfterAOPArrayList[index].agreement_no);
  this.storageData.push(this.agreementAfterAOPArrayList[index].booking_id);
  this.storageData.push(this.agreementAfterAOPArrayList[index].lead_id);
  this.storage.set('storeRaiseBill', this.storageData);
  this.storage.set('a_o_p', this.aopBonusID);
  this.storage.set('br_p', this.brokaragePercentage);
  this.router.navigate(['/popup-incentive-raise-bill/']);
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
    this.storage.remove('aop_bonus_id');
    this.storage.remove('brokerage_percent');
    this.router.navigate(['/incentive-bills/']);
    this.storage.set('IDFromPerformance',2);
    console.log('Click on backpress');
  }
} 