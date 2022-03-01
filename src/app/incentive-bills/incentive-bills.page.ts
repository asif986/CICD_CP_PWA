import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, Events, LoadingController, AlertController, PopoverController, Platform, ModalController } from '@ionic/angular';
import { Helper } from '../services/Helper';
import { APIService } from '../services/APIService';
import { Network } from '@ionic-native/network/ngx';
import { WebServer } from '../services/WebServer';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-incentive-bills',
  templateUrl: './incentive-bills.page.html',
  styleUrls: ['./incentive-bills.page.scss'],
})
export class IncentiveBillsPage implements OnInit {
  incentiveBills =[];
  loader: any;
  isSpinner: any = true;
  successvalue: any;
  cpExecutiveID:any;
  storageData = [];
  // incentiveBills = [{
  //   name: "Title",
  //   totalBrokerage: "3.5%",
  //   min_range:"1,00,00,000",
  //   max_range:"4,00,00,000",
  //   is_active:1}];

  constructor (private storage: Storage,public events: Events, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private cd: ChangeDetectorRef, private platform: Platform, private router: Router, private matIconRegistry: MatIconRegistry,
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
    this.platform.backButton.subscribeWithPriority(1, () => {
        this.storage.set('IDFromPerformance',2);
        this.router.navigate(['/home/']);
    });

    this.storage.get('cp_id').then((cp_id) => {
      this.cpExecutiveID=cp_id;
        if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
          this.helper.presentToastError('Please on Internet Connection');
          this.isSpinner = false;
        } else {
          this.isSpinner = true;
          this.getIncentiveist();
        }
      });
   }

   getIncentiveist() {
    this.presentLoading().then(() => {
      if (this.network.type !== 'none' && this.network.type !== 'unknown') {
        this.apiservice.getAOPBills(this.cpExecutiveID).subscribe(data => {
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);
          this.isSpinner = false;
          if (Value.success === 1) {
            this.incentiveBills = Value.data;
            console.log(this.incentiveBills);
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

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.incentiveBills = [];
      this.isSpinner = true;
      this.getIncentiveist();
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

  searchEvent(event) {
    const val1 = event.target.value;
    console.log(val1);
    // if the value is an empty string don't filter the items
    if (val1) {
        this.incentiveBills = this.incentiveBills.filter((item) => {
            return ((item.title != null ? item.title.toLowerCase().indexOf(val1.toLowerCase()) > -1 : '') ||
                (item.min_value_of_sale != null ? item.min_value_of_sale .toLowerCase().indexOf(val1.toLowerCase()) > -1: '') ||
                (item.max_value_of_sale != null ? item.max_value_of_sale .toLowerCase().indexOf(val1.toLowerCase()) > -1: ''))             
        });

    }
    else
    {
     this.isSpinner = false;
     this.dismissLoading();
     this.getIncentiveist();
    }
  }

  // searchEvent(event) {
  // const title = event.target.value;
  //   const me = this;
  //   if (title.length >= 1) {
  //       if (this.network.type !== 'none' && this.network.type !== 'unknown') {
  //         this.apiservice.getAOPBillsSearch(this.cpExecutiveID,title).subscribe(data => {
  //           this.successvalue = JSON.stringify(data.body);
  //           const Value = JSON.parse(this.successvalue);
  //           this.isSpinner = false;
  //           if (Value.success === 1) {
  //             this.incentiveBills = Value.data;
  //             console.log(this.incentiveBills);
  //             this.dismissLoading();
  //           } else {
  //             this.isSpinner = false;
  //             this.dismissLoading();
  //             this.helper.presentToast('Something went wrong!');
  //           }
  //         }, error => {
  //           this.isSpinner = false;
  //           this.dismissLoading();
  //           this.helper.presentToast('Something went wrong!');
  //         });
  //       } else {
  //         this.isSpinner = false;
  //         this.dismissLoading();
  //         console.log('Network Type :' + this.network.type);
  //         this.helper.presentToast('Please on Internet Connection!');
  //       }
  //     } else {
  //       this.dismissLoading();
  //       this.getIncentiveist();
  //     }
    
  // }


  goTOAgreementList(index){
    //  this.storageData = [];
    //  this.storageData.push(this.incentiveBills[index].aop_bonus_id);
    //  this.storageData.push(this.incentiveBills[index].brokerage_percent);
     this.storage.set('aop_bonus_id', this.incentiveBills[index].aop_bonus_id);
     this.storage.set('brokerage_percent', this.incentiveBills[index].brokerage_percent);
    this.router.navigate(['/agreement-list/']);
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
}
