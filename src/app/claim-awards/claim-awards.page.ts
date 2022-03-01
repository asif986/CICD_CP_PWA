import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {APIService} from '../services/APIService';
import {AlertController, LoadingController, ModalController, NavController, Platform, PopoverController} from '@ionic/angular';
import {Helper} from '../services/Helper';
import {Network} from '@ionic-native/network/ngx';
import {WebServer} from '../services/WebServer';


@Component({
  selector: 'app-claim-awards',
  templateUrl: './claim-awards.page.html',
  styleUrls: ['./claim-awards.page.scss'],
})
export class ClaimAwardsPage implements OnInit {
  cpAwardsList = [];
  cpAwardsListScroll = [];
  successvalue:any;
  cp_id:number = 0;
  cp_executive_id:number = 0;
  api_token:any;
  isSpinner:Boolean = true;
  loader:any;
  count:number = 0;

  constructor(private storage: Storage, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private platform: Platform, private router: Router,
  public navCtrl: NavController, public modalController: ModalController) {
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
          this.apiservice.GetCpClaimAwards(this.cp_id,this.cp_executive_id,this.count).subscribe(data => {
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
        this.apiservice.GetCpClaimAwards(this.cp_id,this.cp_executive_id,this.count).subscribe(data => {
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

}
