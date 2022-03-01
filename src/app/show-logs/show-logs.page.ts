import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingController, AlertController, PopoverController, Platform, NavController, ModalController } from '@ionic/angular';
import { Helper } from '../services/Helper';
import { APIService } from '../services/APIService';
import { Network } from '@ionic-native/network/ngx';
import { WebServer } from '../services/WebServer';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-show-logs',
  templateUrl: './show-logs.page.html',
  styleUrls: ['./show-logs.page.scss'],
})
export class ShowLogsPage implements OnInit {
  showLogs = [];
  logs = [];
  full_name:any;
  block_name:any;
  unit:any;
  bsp:any;
  bill_stage_id:any;
  bill_stage:any;
  log_date:any;
  remarks:any;
  isSpinner: any = true;
  constructor (private storage: Storage, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private cd: ChangeDetectorRef, private platform: Platform, private router: Router, private matIconRegistry: MatIconRegistry,
    public navCtrl: NavController, public modalController: ModalController) {
    } 

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('StoreData').then((val) => {
      this.storage.get('fullname_logs').then((fullname) => {
        this.storage.get('blockname_logs').then((blockname) => {
          this.storage.get('unit_logs').then((unit) => {
            this.storage.get('bsp_logs').then((bsp) => {
              console.log('StoreData', val);
              console.log('StoreData', fullname);
              console.log('StoreData', blockname);
              console.log('StoreData', unit);
              console.log('StoreData', bsp);
              this.showLogs = val;
              this.full_name = fullname;
              this.block_name = blockname;
              this.unit = unit;
              this.bsp = bsp;
              this.logs = this.showLogs[0];
              console.log('this.bill_stage_id', this.bill_stage_id);
              this.bill_stage_id =  this.showLogs[0].bill_stage_id;
              console.log('this.bill_stage_id', this.showLogs[0]);
              console.log('StoreDataArray',  this.showLogs);
              for (let i = 0; i < this.logs.length; i++) {
                if (this.logs[i]) {
                    this.bill_stage_id =  this.logs[i].bill_stage_id;
                    this.bill_stage =  this.logs[i].bill_stage;
                    this.log_date =  this.logs[i].log_date;
                    this.remarks =  this.logs[i].remarks;
                    this.isSpinner = false;
                    console.log('this.bill_stage_id', this.bill_stage_id);
                    console.log('this.bill_stage', this.bill_stage);
                    console.log('this.log_date', this.log_date);
                    console.log('this.remarks', this.remarks);
                }
            }
              // console.log('StoreData1', val[0]);
              // console.log('StoreData2', val[1]);
              // console.log('StoreData3', val[2]);
              // console.log('StoreData4', val[3]);
                      });
            }); 
         });
       });  
    });
  }

  goback() {
    this.storage.remove('fullname_logs');
    this.storage.remove('blockname_logs');
    this.storage.remove('unit_logs');
    this.storage.remove('bsp_logs');
    this.storage.remove('StoreData');
    this.router.navigate(['/submitted-bill-page/']);
    this.modalController.dismiss();
    console.log('Click on backpress');
  }
}
