import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingController, AlertController, PopoverController, Platform, NavController, ModalController, Events } from '@ionic/angular';
import { Helper } from '../services/Helper';
import { APIService } from '../services/APIService';
import { Network } from '@ionic-native/network/ngx';
import { WebServer } from '../services/WebServer';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import {Storage} from '@ionic/storage';
import { PopUpRaiseBillPage } from '../pop-up-raise-bill/pop-up-raise-bill.page';


@Component({
  selector: 'app-readytosubmit-bills',
  templateUrl: './readytosubmit-bills.page.html',
  styleUrls: ['./readytosubmit-bills.page.scss'],
})
export class ReadytosubmitBillsPage implements OnInit {
  readyToSubmitBillsArrayList =[];
  loader: any;
  isSpinner: any = true;
  successvalue: any;
  cpExecutiveID:any;
  // readyToSubmitBillsArrayList = [{agreement_id: 5,
  // agreement_date: "22 Jul 2020",
  // agreement_no: "AGT0001",
  // agreement_value: "2200000.00",
  // bsp: "2000000.00",
  // flat_level_type_id: null,
  // commercial_type_id: null,
  // commercial_type: null,
  // commercial_buyer_type: "NRI",
  // commercial_buyer_type_id: "3",
  // agreement_unit_type_id: 2,
  // unit_type: "Commercial",
  // booking_id: 5,
  // name: "Mr. Ambuj Sharma ",
  // mobile: "8551899099",
  // unit_id: 1677,totalBrokerage: "3.5%",projectName:"YashOne Hinjewadi",blockName:"A",unitNumber:"201",lead_uid: "VJ200616-0008",amount:"50000"}];
  storageData = [];
 constructor (private storage: Storage,public events: Events, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private cd: ChangeDetectorRef, private platform: Platform, private router: Router, private matIconRegistry: MatIconRegistry,
    public navCtrl: NavController, public modalController: ModalController) {

        this.platform.backButton.subscribeWithPriority(1, () => {
        this.router.navigate(['/home/']);
        this.storage.set('IDFromPerformance',2);
        });
    }

  ngOnInit() {
    // this.events.subscribe('goToReadyToSubmit', () => {
    //   console.log('goToReadyToSubmit');
    //   console.log(1);
    //   this.storage.get('cp_executive_id_lead').then((cp_executive_id) => {
    //     if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
    //       this.helper.presentToastError('Please on Internet Connection');
    //       this.isSpinner = false;
    //     } else {
    //       this.isSpinner = true;
    //       this.dismissLoading();
    //       this.getAgreementList();
    //     }
    //   });
    // });
  }





  ionViewDidEnter() {
    console.log(1);
    this.platform.backButton.subscribeWithPriority(1, () => {
        this.storage.set('IDFromPerformance',2);
        this.router.navigate(['/home/']);
    });

    this.storage.get('cp_executive_id').then((cp_executive_id) => {
      this.cpExecutiveID=cp_executive_id;
        if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
          this.helper.presentToastError('Please on Internet Connection');
          this.isSpinner = false;
        } else {
          this.isSpinner = true;
          this.getAgreementList();
        }
      });
   }



  getAgreementList() {
    this.presentLoading().then(() => {
      if (this.network.type !== 'none' && this.network.type !== 'unknown') {
        this.apiservice.getCPAgreementList(this.cpExecutiveID).subscribe(data => {
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);
          this.isSpinner = false;
          if (Value.sucess === 1) {
            this.readyToSubmitBillsArrayList = Value.data;
            console.log(this.readyToSubmitBillsArrayList);
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
      this.readyToSubmitBillsArrayList = [];
      this.isSpinner = true;
      this.getAgreementList();
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);

  }

  searchEvent(event) {
    const val1 = event.target.value;
    console.log(val1);
    // if the value is an empty string don't filter the items
    if (val1) {
        this.readyToSubmitBillsArrayList = this.readyToSubmitBillsArrayList.filter((item) => {
            return ((item.name != null ? item.name.toLowerCase().indexOf(val1.toLowerCase()) > -1 : '') ||
                (item.bsp != null ? item.bsp .toLowerCase().indexOf(val1.toLowerCase()) > -1: '') ||
                (item.block_name != null ? item.block_name .toLowerCase().indexOf(val1.toLowerCase()) > -1: '') ||
                (item.totalBrokerage != null ? item.totalBrokerage .toLowerCase().indexOf(val1.toLowerCase()) > -1: '') ||
                (item.lead_uid != null ? item.lead_uid .toLowerCase().indexOf(val1.toLowerCase()) > -1: '')   )             
        });

    }
    else
    {
     this.getAgreementList();
    }
  }

  popupRaiseBill(index){
    this.storageData = [];
    this.storageData.push(this.readyToSubmitBillsArrayList[index].name);
    this.storageData.push(this.readyToSubmitBillsArrayList[index].block_name);
    this.storageData.push(this.readyToSubmitBillsArrayList[index].blockName);
    this.storageData.push(this.readyToSubmitBillsArrayList[index].unit_name);
    this.storageData.push(this.readyToSubmitBillsArrayList[index].totalBrokerage);
    this.storageData.push(this.readyToSubmitBillsArrayList[index].totalBrokerageAmount);
    this.storageData.push(this.readyToSubmitBillsArrayList[index].bsp);
    this.storageData.push(this.readyToSubmitBillsArrayList[index].agreement_id);
    this.storageData.push(this.readyToSubmitBillsArrayList[index].agreement_no);
    this.storageData.push(this.readyToSubmitBillsArrayList[index].booking_id);
    this.storageData.push(this.readyToSubmitBillsArrayList[index].lead_id);
    this.storage.set('storeRaiseBill', this.storageData);
    this.router.navigate(['/pop-up-raise-bill/']);
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

  // async getPopUpBillForm() {
  //   const modal = await this.modalController.create({
  //     component: PopUpRaiseBillPage,
  //     componentProps: { value: 123 },
  //     cssClass: 'my-custom-modal-css-popUpRaiseBill'
  //   });
  //   return await modal.present();
  // }
}
