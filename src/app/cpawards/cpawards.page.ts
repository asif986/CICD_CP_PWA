import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {APIService} from '../services/APIService';
import {AlertController, LoadingController, ModalController, NavController, Platform, PopoverController} from '@ionic/angular';
import {Helper} from '../services/Helper';
import {Network} from '@ionic-native/network/ngx';
import {WebServer} from '../services/WebServer';
import { ClaimAward } from '../models/ClaimAward';


@Component({
  selector: 'app-cpawards',
  templateUrl: './cpawards.page.html',
  styleUrls: ['./cpawards.page.scss'],
})
export class CpawardsPage implements OnInit {
  cpAwardsList = [];
  cpAwardsListScroll = [];
  successvalue:any;
  cp_id:number = 0;
  cp_executive_id:number = 0;
  api_token:any;
  isSpinner:Boolean = true;
  loader:any;
  claimAwd : ClaimAward;
  cancelSuccessValue: any;
  count:number = 0;

  constructor(private storage: Storage, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private platform: Platform, private router: Router,
  public navCtrl: NavController, public modalController: ModalController) {
   this.claimAwd = new ClaimAward();
   this.platform.backButton.subscribeWithPriority(1, () => {
   this.router.navigate(['/home/']);
   });
  }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(['/home/']);
      });
  }


  ionViewDidEnter() {
    this.storage.get('cp_id').then((cp_id) => {
      this.storage.get('cp_executive_id').then((cp_executive_id) => {
        this.cp_id = cp_id;
        this.cp_executive_id = cp_executive_id;
        this.storage.get('apiToken').then((apiToken) => {
            this.api_token = apiToken;
           if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
              this.helper.presentToastError('Please on Internet Connection');
              this.isSpinner = false;
            } else {
              this.isSpinner = true;
              this.cpAwardsList = [];
              this.cpAwardsListScroll = [];
              this.count = 0;
              this.getCPAwardsList();
            }
          });
      });
      });



    this.platform.backButton.subscribeWithPriority(1, () => {
        this.router.navigate(['/home/']);
    });
  }


   getCPAwardsList() {
      this.presentLoading().then(() => {
        if (this.network.type !== 'none' && this.network.type !== 'unknown') {
          this.apiservice.GetCpAwards(this.api_token,this.count,this.cp_id,this.cp_executive_id).subscribe(data => {
            this.successvalue = JSON.stringify(data.body);
            const Value = JSON.parse(this.successvalue);
            this.isSpinner = false;
            if (Value.success === 1) {
              this.cpAwardsList = [];
              this.cpAwardsListScroll = [];
              this.cpAwardsList = Value.data;
              this.cpAwardsListScroll = Value.data;
              this.isSpinner = false;
              this.dismissLoading();
              console.log(this.cpAwardsList);
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

   goback() {
      this.router.navigate(['/home/']);
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

   doRefresh(event) {
      console.log('Begin async operation');
      setTimeout(() => {
        this.cpAwardsList = [];
        this.isSpinner = true;
        this.count = 0;
        this.cpAwardsListScroll = [];
        this.getCPAwardsList();
        console.log('Async operation has ended');
        event.target.complete();
      }, 500);
  
   }

   async claimAwardConfirm(awardId,claimedId:number) {
    if(claimedId == 1) {
      this.helper.presentToastHomePage('You have already claimed this Award!');
    } else {
      let me = this;
      let resetTimer = false;
      this.claimAwd.cp_award_id = awardId;
      this.claimAwd.cp_id = this.cp_id;
      this.claimAwd.cp_executive_id = this.cp_executive_id;
      const alert = await this.alertCtrl.create({
        header: 'Claim Award',
        message: 'Do you want to claim the award?',
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
              resetTimer = true;
            }
          }
        ]
      });
      alert.onDidDismiss().then(() => {
        if (resetTimer) {
          me.claimAward();
        }
      });
      await alert.present();
    }
 }
  
   claimAward() {
     console.log('this.claimedAward', this.claimAwd);
      this.apiservice.claimAward(this.claimAwd).subscribe(
          response => {
            this.cancelSuccessValue = JSON.stringify(response.body);
            const Value = JSON.parse(this.cancelSuccessValue);
            if (Value.success === 1) {
              console.log('Value.success' + Value.success);
              this.helper.presentToastHomePage('Award Claimed Successfuly!');
              /*Call Project Update API*/
              if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
                this.helper.presentToastHomePage('Please on Internet Connection');
              } else {
                this.cpAwardsList = [];
                this.isSpinner = true;
                this.count = 0;
                this.cpAwardsListScroll = [];
                this.getCPAwardsList();
              }
            }
          }, error => {
            this.helper.presentToastHomePage('Something went wrong');
          });
   }

   getTitleLength(titleLength) {
     console.log('TitleLength',titleLength.length);
     if(titleLength.length>22) {
      return 0;
     } else {
      return 1;
     }
     
   }
  
   // Get Infinite Scroll
   doInfinite(event) {
    console.log('this.cpAwardsList.length', this.cpAwardsList.length);
    console.log('this.cpAwardsListScroll.length', this.cpAwardsListScroll.length); 
     setTimeout(() => {
      console.log('Done');
      this.count = this.count + 8;
      if(this.cpAwardsListScroll.length!=0){
        this.apiservice.GetCpAwards(this.api_token,this.count,this.cp_id,this.cp_executive_id).subscribe(data => {
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);
          this.isSpinner = false;
          if (Value.success === 1) {
            if(Value.data.length!=0){
              this.cpAwardsListScroll = [];
              for (let dealD of Value.data) {
    
                if ((this.cpAwardsList.findIndex(d => d.cp_award_id === dealD.cp_award_id)) == -1) {
                  this.cpAwardsList.push(dealD);
                  this.cpAwardsListScroll.push(dealD);
          
                }
              }
              console.log('this.cpAwardsList', this.cpAwardsList);
          
            }
          }
        }, error => {
          this.isSpinner = false;
          this.dismissLoading();
          this.helper.presentToast('Something went wrong!');
        });
     event.target.complete();
    }
      event.target.complete();
    }, 1500);
  }

  gotoClaimedAwards(claimedId:number){
    if(claimedId == 1){
      this.router.navigate(['/claim-awards/']);
    }else{

    }
  }
}
