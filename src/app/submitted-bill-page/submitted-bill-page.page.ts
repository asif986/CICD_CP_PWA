import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingController, AlertController, PopoverController, Platform, NavController, ModalController } from '@ionic/angular';
import { Helper } from '../services/Helper';
import { APIService } from '../services/APIService';
import { Network } from '@ionic-native/network/ngx';
import { WebServer } from '../services/WebServer';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { PopUpRaiseBillPage } from '../pop-up-raise-bill/pop-up-raise-bill.page';
import {Storage} from '@ionic/storage';
import { ShowLogsPage } from '../show-logs/show-logs.page';
@Component({
  selector: 'app-submitted-bill-page',
  templateUrl: './submitted-bill-page.page.html',
  styleUrls: ['./submitted-bill-page.page.scss'],
})
export class SubmittedBillPagePage implements OnInit {
 submittedBills =[];
 
 storageData = [];
 loader: any;
 isSpinner: any = true;
 cpID:any;
 successvalue: any;
 lastPage: any;
 currentPage = 1;
 searchVal: any = '';
 page: number;
 lastPageIs: number = 0;
//  submittedBills = [{agreement_id: 5,
//  agreement_date: "22 Jul 2020",
//  agreement_no: "AGT0001",
//  agreement_value: "2200000.00",
//  bsp: "2000000.00",
//  flat_level_type_id: null,
//  commercial_type_id: null,
//  commercial_type: null,
//  commercial_buyer_type: "NRI",
//  commercial_buyer_type_id: "3",
//  agreement_unit_type_id: 2,
//  unit_type: "Commercial",
//  booking_id: 5,
//  name: "Mr. Ambuj Sharma ",
//  mobile: "8551899099",
//  unit_id: 1677,totalBrokerage: "3.5%",projectName:"YashOne Hinjewadi",blockName:"A",unitNumber:"201",lead_uid: "VJ200616-0008",amount:"50000",billing_number:"1010101010",billing_date:"23-07-2020",billing_amount:100000,bill_stage_name:"In-Progress"}];
constructor (private storage: Storage, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private cd: ChangeDetectorRef, private platform: Platform, private router: Router, private matIconRegistry: MatIconRegistry,
   public navCtrl: NavController, public modalController: ModalController) {

       this.platform.backButton.subscribeWithPriority(1, () => {
       this.router.navigate(['/home/']);
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
      this.router.navigate(['/home/']);
  });

  this.storage.get('cp_id').then((cp_id) => {
    this.cpID=cp_id;
      if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
        this.helper.presentToastError('Please on Internet Connection');
        this.isSpinner = false;
      } else {
        this.isSpinner = true;
        this.getAgreementSubmittedList();
      }
    });
 }

 getAgreementSubmittedList() {
  this.presentLoading().then(() => {
    if (this.network.type !== 'none' && this.network.type !== 'unknown') {
      this.apiservice.getCPAgreementSubmittedList(this.cpID,this.page).subscribe(data => {
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        this.isSpinner = false;
        if (Value.success === 1) {
          this.submittedBills = Value.data.data;
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
     this.apiservice.getCPAgreementSubmittedListSearch(this.cpID,this.page,title).subscribe(data => {
        me.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          this.submittedBills = Value.data.data;
          this.dismissLoading();
        }
          // this.checked = 1;
        }, err => {
          me.isSpinner = false;
          this.helper.presentToast('Something Went Wrong');
        });
     
  }else {
    this.dismissLoading();
    this.getAgreementSubmittedList();
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
      this.apiservice.getCPAgreementSubmittedListSearch(this.cpID, this.page,title).subscribe(data => {
        this.isSpinner = false;
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);
        console.log("my data",Value.success);
        if (Value.success === 1) {
          if(Value.data.data.length!=0){    

                //  this.reminderList = data1;
                  for (const val of Value.data.data) {
                      this.submittedBills.push(val);
                  }
                  console.log(this.submittedBills);
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
              this.apiservice.getCPAgreementSubmittedList(this.cpID, this.page).subscribe(data => {
              const data1 = data.body.data.data;
              this.successvalue = JSON.stringify(data.body);
              const Value = JSON.parse(this.successvalue);
              console.log("my data",Value.success);
              if (Value.success === 1) {
                if(Value.data.data.length!=0){   
              //  this.reminderList = data1;
                for (const val of data1) {
                  this.submittedBills.push(val);
                 // }
                }
                console.log(this.submittedBills);
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






// For Search As well As WithoutSeach sathi InfiniteLoop
// doInfinite(infiniteScroll) {
//   console.log('infiniteScroll', infiniteScroll);
//   this.page = this.page + 1;
//   console.log('this.page', this.page);
//   console.log('this.lastPageIs', this.lastPageIs);
//   if (this.page <= this.lastPageIs) {
//   console.log('Inside Do Finite');
//   var me=this;
//     me.isSpinner = true;
//     // Search Name Asatana
//     if (this.searchVal != '') {
//       const title = this.searchVal;
//       const me = this;
//       this.apiservice.getCPAgreementSubmittedListSearch(this.cpID, this.currentPage,title).subscribe(data => {
//         const data1 = data.body.data.data;
//         const success = data.body.success;
//         this.currentPage = data.body.data.current_page;
//         this.lastPage = data.body.data.last_page;
//         this.isSpinner = false;
//         if (success === 1) {
//           console.log(data1);
//         //  this.reminderList = data1;
//           for (const val of data1) {
//               this.submittedBills.push(val);
//           }
//           console.log(this.submittedBills);
//         }
//         me.isSpinner = false;
//         infiniteScroll.target.complete();
  
//       }, err => {
//         me.isSpinner = false;
//         infiniteScroll.target.complete();
//       });
//     }
//     else
//     // Search name nasatana
//     {
//       this.apiservice.getCPAgreementSubmittedList(this.cpID, this.currentPage).subscribe(data => {
//       const data1 = data.body.data.data;
//       const success = data.body.success;
//       this.currentPage = data.body.data.current_page;
//       this.lastPage = data.body.data.last_page;
//       this.isSpinner = false;
//       if (success === 1) {
//         console.log(data1);
//       //  this.reminderList = data1;
//         for (const val of data1) {
//           this.submittedBills.push(val);
//          // }
//         }
//         console.log(this.submittedBills);
//       }
//       me.isSpinner = false;
//       infiniteScroll.target.complete();

//     }, err => {
//       me.isSpinner = false;
//       infiniteScroll.target.complete();

//     });

//   }
//  } else {
//     infiniteScroll.target.complete();
//   }
// }

// Load Data Karanyasathi
// loadMore(infiniteScroll) {
//   this.currentPage++;
//   this.doInfinite(infiniteScroll);

//   if (this.currentPage === this.lastPage) {
//     infiniteScroll.enable(false);
//   }
// }

// Refresh Karatana
doRefresh(event) {
   this.page=1;
  console.log('Begin async operation');
  setTimeout(() => {
    this.submittedBills = [];
    this.isSpinner = true;
    this.getAgreementSubmittedList();
    console.log('Async operation has ended');
    event.target.complete();
  }, 500);

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
   this.router.navigate(['/home/']);
   this.storage.set('IDFromPerformance',2);
   console.log('Click on backpress');
 }


gotoShowLogs(bill:any,fullname,blockname,unit,bsp){
  console.log(bill.logs);
  this.storage.remove('StoreData');
  this.storage.remove('fullname_logs');
  this.storage.remove('blockname_logs');
  this.storage.remove('unit_logs');
  this.storage.remove('bsp_logs');
  this.storageData = [];
  this.storageData.push(bill.logs);
  this.storage.set('StoreData', this.storageData);
  this.storage.set('fullname_logs', fullname);
  this.storage.set('blockname_logs',blockname);
  this.storage.set('unit_logs', unit);
  this.storage.set('bsp_logs', bsp);
  this.getPopUpBillForm();
}

   async getPopUpBillForm() {
    const modal = await this.modalController.create({
      component: ShowLogsPage,
      componentProps: { value: 123 },
      cssClass: 'my-custom-modal-css-showLogs'
    });
    return await modal.present();
  }
}
