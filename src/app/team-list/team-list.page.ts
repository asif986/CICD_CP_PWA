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


@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.page.html',
  styleUrls: ['./team-list.page.scss'],
})
export class TeamListPage implements OnInit {

  teamList = [];
  count : number;
  storageData = [];
  visible: Boolean;
  isSpinner: any = true;
  successvalue: any;
  loader: any;
  cancelSuccessValue: any;
  teamListModel = new TeamList();

  constructor(private storage: Storage, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private cd: ChangeDetectorRef, private platform: Platform, private router: Router, private matIconRegistry: MatIconRegistry,
    public navCtrl: NavController, public modalController: ModalController) {

    this.platform.backButton.subscribeWithPriority(1, () => {
      this.storage.set('IDFromPerformance',2);
    this.router.navigate(['/home/']);
    });

      if (this.teamList.length === 0) {
      this.visible = true;
      } else {
      this.visible = false;
      }
      }
  ngOnInit() {
  }

  ionViewDidEnter() {

    this.platform.backButton.subscribeWithPriority(1, () => {
      this.storage.set('IDFromPerformance',2);
        this.router.navigate(['/home/']);
    });

    // this.storage.get('is_team_lead').then((is_team_lead) => {
    //     this.is_team_lead = is_team_lead;
    // });

  this.storage.get('cp_id').then((val) => {
    console.log('1', val);
    this.teamListModel.cp_id = val;

    this.storage.get('apiToken').then((val1) => {
        this.teamListModel.api_token = val1;

        if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
          this.helper.presentToastError('Please on Internet Connection');
          this.isSpinner = false;
        } else {
          this.isSpinner = true;
          this.getCPteamList();
        }
      });
  });
}


  /*Get Team  List*/
  getCPteamList() {
    // tslint:disable-next-line:max-line-length
    this.presentLoading().then(() => {
    this.apiservice.getCpTeamLeads(this.teamListModel.api_token, this.teamListModel.cp_id).subscribe(data => {
      this.isSpinner = false;
      this.successvalue = JSON.stringify(data.body);
      const Value = JSON.parse(this.successvalue);

      console.log("my data",Value.success);
      if (Value.success === 1) {
        this.teamList = Value.data.team_members;
        this.count = Value.data.count;
        this.dismissLoading();
      } else{
        this.dismissLoading();
         this.helper.presentToastError('Something went wrong');
      }
    }, error => {
      this.dismissLoading();
      this.helper.presentToastError('Something went wrong');
    });
  });
  }

    addTeamPerson(){
        this.router.navigate(['/home/']);
    }

  goback() {
    this.storage.set('IDFromPerformance',2);
    this.router.navigate(['/home/']);
    console.log('Click on backpress');
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.teamList = [];
      this.isSpinner = true;
      this.getCPteamList();
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);

  }


    updateTeamLead(index,cp_id) {
        this.storage.remove('StoreData');
        this.storageData = [];
        this.storageData.push(this.teamList[index].full_name);
        this.storageData.push(this.teamList[index].mobile_number);
        this.storageData.push(this.teamList[index].email);
        this.storage.set('StoreDataNew', this.storageData);
        this.storage.set('StoreData', cp_id);
        this.router.navigate(['/teamperson/']);
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

  LeaderTOFOS(){
    this.storage.set('Leader', 1);
    this.storage.set('ID', 3);
    this.storage.set('FromHome',2);
    this.router.navigate(['/add-fos-list/']);
  }

  gotoFOS(){
    this.storage.set('FOS', 1);
    this.storage.set('GOTOFOS',0);
    this.router.navigate(['/foslist/']);
  }
  // LeaderTOFOS(){  //Add in WFH 19/03/2020
  //   this.storage.set('Leader', 1);
  //   this.storage.set('ID', 2);
  //   this.router.navigate(['/add-fos-list/']);
  // }
}
