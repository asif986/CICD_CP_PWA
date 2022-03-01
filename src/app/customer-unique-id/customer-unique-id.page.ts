import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController, ModalController, NavController, Platform, PopoverController} from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Helper} from '../services/Helper';
import {DataService} from '../services/data.service';
import {APIService} from '../services/APIService';
import {Network} from '@ionic-native/network/ngx';
import {WebServer} from '../services/WebServer';
import {NavigationExtras, Router} from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import {CPUsers} from '../models/cpUsers';


@Component({
  selector: 'app-customer-unique-id',
  templateUrl: './customer-unique-id.page.html',
  styleUrls: ['./customer-unique-id.page.scss'],
})
export class CustomerUniqueIdPage implements OnInit {

  isSpinner: any = true;
  loader: any;
  currentPage = 1;
  lastPage: any;
    is_kyc_uploaded: any;
  customerList: any = [];
  cpUsers: CPUsers = new CPUsers();
  for: 2;
  successvalue: any;
  storageData = [];
  searchVal:any;


  constructor(private storage: Storage, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private cd: ChangeDetectorRef, private platform: Platform, private router: Router, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, public navCtrl: NavController, public modalController: ModalController, private dataService: DataService) {

      this.platform.backButton.subscribeWithPriority(1, () => {
          this.router.navigate(['/home/']);
      });

    }
      ngOnInit() {
  }


  ionViewDidEnter() {

      this.platform.backButton.subscribeWithPriority(1, () => {
          this.router.navigate(['/home/']);
      });

    this.storage.get('cp_executive_id').then((val) => {
      console.log('1', val);
      this.cpUsers.cp_executive_id = val;
      this.storage.get('apiToken').then((val1) => {
        this.cpUsers.api_token = val1;
        if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
          this.helper.presentToast('Please on Internet Connection');
          this.isSpinner = false;
        } else {
          this.isSpinner = true;
          this.getCUID();
        }
      });
    });
  }


  getCUID() {
    if (this.network.type !== 'none' && this.network.type !== 'unknown') {
      // tslint:disable-next-line:max-line-length
      this.presentLoading().then(() => {
        this.isSpinner = true;
        this.apiservice.getCUID(this.cpUsers.cp_executive_id, this.cpUsers.api_token, 2, 1).subscribe(data => {
            const data1 = data.body.data.data;
          const success = data.body.success;
          this.currentPage = data.body.data.current_page;
          console.log(this.currentPage);
          this.lastPage = data.body.data.last_page;
          console.log(this.lastPage);
          this.isSpinner = false;
        if (success === 1) {
            console.log(data1);
            //.dismissLoading();
            this.customerList = data1;
          /*  for (let i = 0; i < this.customerList.length; i++) {
                if (this.tokenTypes[i]) {
                    this.is_kyc_uploaded = this.customerList[i].is_kyc_uploaded;
                    console.log('this.is_kyc_uploaded',this.is_kyc_uploaded);
                }
            }*/
            this.helper.hideLoader();
            console.log('customerList',this.customerList);
          }
        }, err => {
          this.isSpinner = false;
          this.dismissLoading();
          this.helper.presentToast('Something Went Wrong');
        });
      });
    }
  }

  CustomerLead(index:any){
    this.storage.remove('StoreData');
    this.storageData = [];
    this.storageData.push(this.customerList[index].lead_uid);
    this.storageData.push(this.customerList[index].full_name);
    this.storageData.push(this.customerList[index].lead_id);
    this.storageData.push(this.customerList[index].is_kyc_uploaded);
    this.storageData.push(this.customerList[index].sales_person_id);
    this.storageData.push(this.customerList[index].mobile_number);
    this.storageData.push(this.customerList[index].email);

    this.storage.set('StoreData', this.storageData);
    this.storage.set('Value', 2);
    this.router.navigate(['/generate-ghp/']);
  }
  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.customerList = [];
      this.isSpinner = true;
      this.getCUID();
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);

  }
  goback() {
    this.router.navigate(['/home/']);
  }


  loadMore(infiniteScroll) {
    this.currentPage++;
    this.doInfinite(infiniteScroll);

    if (this.currentPage === this.lastPage) {
      infiniteScroll.enable(false);
    }
  }
  

  doInfinite(infiniteScroll) {
    if (this.currentPage > 1) {
      const me = this;
      me.isSpinner = true;

      this.apiservice.getCUID(this.cpUsers.cp_executive_id, this.cpUsers.api_token, 3, this.currentPage).subscribe(data => {
        const data1 = data.body.data.data;
        const success = data.body.success;
        this.currentPage = data.body.data.current_page;
        this.lastPage = data.body.data.last_page;
        this.isSpinner = false;
        if (success === 1) {
          console.log(data1);
        //  this.reminderList = data1;
          for (const val of data1) {
            console.log('1', this.customerList[(this.customerList.findIndex(d => d.reminder_id == val.reminder_id))], val.reminder_id);

           // if ((this.reminderList.findIndex(d => d.reminder_id == val.ireminder_id)) == -1) {
            this.customerList.push(val);
           // }
          }
          console.log(this.customerList);
        }
        me.isSpinner = false;
        infiniteScroll.target.complete();

      }, err => {
        me.isSpinner = false;
        infiniteScroll.target.complete();

      });

    } else {
      infiniteScroll.target.complete();
    }
  }


  async presentLoading() {
    this.loader = await this.loadingController.create({
      translucent: true
    });
    await this.loader.present();
  }

  async dismissLoading() {
    console.log('loader dismissed');
    await this.loader.dismiss();
  }


  search(event) {

    const title = event.target.value;
    const me = this;

    if (title.length >= 1) {
      me.isSpinner = true;
      me.customerList = [];
      console.log('Home api token==>>' + this.cpUsers.api_token);
      if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
        this.helper.presentToast('Please on Internet Connection');
      } else {
        this.apiservice.searchCUID(this.cpUsers.cp_executive_id, this.cpUsers.api_token, 2, this.currentPage,title).subscribe(data => {
          me.isSpinner = false;
          console.log("mm",data);
            this.successvalue = JSON.stringify(data.body);
            const Value = JSON.parse(this.successvalue);
            console.log("xd",Value.success);
            console.log("xd",Value.data.data);
            if (Value.success === 1) {
              this.dismissLoading();
              this.customerList = Value.data.data;
            
              this.helper.hideLoader();
            }
            // this.checked = 1;
          }, err => {
            me.isSpinner = false;
            this.dismissLoading();
            this.helper.hideLoader();
            this.helper.presentToast('Something Went Wrong');
          });
      }
    } else {
      this.dismissLoading();
      this.getCUID();
    }
  }




}
