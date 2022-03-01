import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ActionSheetController, AlertController, LoadingController, ModalController, NavController, Platform} from '@ionic/angular';
import {Helper} from '../services/Helper';
import {APIService} from '../services/APIService';
import {Network} from '@ionic-native/network/ngx';
import {Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {UniqueDeviceID} from '@ionic-native/unique-device-id/ngx';
import {DomSanitizer} from '@angular/platform-browser';
import {DataService} from '../services/data.service';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-ghp-request',
  templateUrl: './ghp-request.page.html',
  styleUrls: ['./ghp-request.page.scss'],
})
export class GhpRequestPage implements OnInit {
  token :any;
  name :any;
  mobile :any;
  email :any;
  projectname :any;
  eventtitle :any;
  unit_category :any;
  lead_uid :any;
  lead_id :any;
  lead_status_id :any;
  token_media_path :any;
    token_id :any;
    event_id :any;
    token_type_id :any;
  actions :any;
  storageData = [];
  options: InAppBrowserOptions = {
    location : 'yes', // Or 'no'
    hidden : 'no', // Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes', // Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', // Android only
    closebuttoncaption : 'Close', // iOS only
    disallowoverscroll : 'no', // iOS only
    toolbar : 'yes', // iOS only
    enableViewportScale : 'no', // iOS only
    allowInlineMediaPlayback : 'no', // iOS only
    presentationstyle : 'pagesheet', // iOS only
    fullscreen : 'yes', // Windows only
  };
  isSpinner: any = true;

  ghp_date:any;
  ghp_amount:any;
  ghp_plus_date:any;
  ghp_plus_amount:any;
  payment_link:any;
  ghpplus:any;
  ghpAndGhplus:any;
  checkGhp:any;

  FromDrillDownList:any;

  constructor(private storage: Storage,private theInAppBrowser: InAppBrowser,private file: File,  private transfer: FileTransfer,  public actionSheetController: ActionSheetController, public loadingController: LoadingController, public alertController: AlertController, public helper: Helper, public apiservice: APIService, private network: Network, private cd: ChangeDetectorRef, private platform: Platform, private router: Router, private matIconRegistry: MatIconRegistry,
    private http: HttpClient, private uniqueDeviceID: UniqueDeviceID, private domSanitizer: DomSanitizer, public navCtrl: NavController, private dataService: DataService, private modalController: ModalController,private socialSharing: SocialSharing) {

        this.platform.backButton.subscribeWithPriority(1, () => {
        this.storage.set('IDFromPerformance',2);
        if(this.FromDrillDownList==0){
          this.storage.remove('checkGhp');
          this.storage.remove('checkGhp');
          this.storage.remove('ghp_date');
          this.storage.remove('ghp_amount');
          this.storage.remove('ghp_plus_date');
          this.storage.remove('ghp_plus_amount');
        this.router.navigate(['/leadslist-data/']);
      }else if(this.FromDrillDownList==1){
        this.storage.remove('checkGhp');
        this.storage.remove('checkGhp');
        this.storage.remove('ghp_date');
        this.storage.remove('ghp_amount');
        this.storage.remove('ghp_plus_date');
        this.storage.remove('ghp_plus_amount');
        this.router.navigate(['/home/']);
      }
        });
}
  ngOnInit() {
  }


  ionViewDidEnter(){
    this.storage.get('FromDrillDownList').then((FromDrillDownList) => {
      this.FromDrillDownList=FromDrillDownList;
      console.log(this.FromDrillDownList);
    });

    console.log(this.checkGhp);
    this.ghpplus=0;
    this.ghpAndGhplus = 0;

    this.ghp_date = "";
    this.ghp_amount = "";
    this.ghp_plus_date ="";
    this.ghp_plus_amount = "";

    this.platform.backButton.subscribeWithPriority(1, () => {
      this.storage.set('IDFromPerformance',2);
      if(this.FromDrillDownList==0){
        this.storage.remove('checkGhp');
        this.storage.remove('checkGhp');
        this.storage.remove('ghp_date');
        this.storage.remove('ghp_amount');
        this.storage.remove('ghp_plus_date');
        this.storage.remove('ghp_plus_amount');
        this.router.navigate(['/leadslist-data/']);
      }else if(this.FromDrillDownList==1){
        this.storage.remove('checkGhp');
        this.storage.remove('checkGhp');
        this.storage.remove('ghp_date');
        this.storage.remove('ghp_amount');
        this.storage.remove('ghp_plus_date');
        this.storage.remove('ghp_plus_amount');
        this.router.navigate(['/home/']);
      }
    });

  this.isSpinner = true;
  this.storage.get('token').then((token) => {
    this.storage.get('name').then((name) => {
      this.storage.get('mobile').then((mobile) => {
        this.storage.get('email').then((email) => {
          this.storage.get('projectname').then((projectname) => {
            this.storage.get('eventtitle').then((eventtitle) => {
            this.storage.get('unit_category').then((unit_category) => {
            this.storage.get('lead_uid').then((lead_uid) => {
            this.storage.get('lead_status_id').then((lead_status_id) => {
            this.storage.get('token_media_path').then((token_media_path) => {
              this.storage.get('lead_id').then((lead_id) => {
              this.storage.get('event_id').then((event_id) => {
            this.storage.get('actions').then((actions) => {
            this.storage.get('token_type_id').then((token_type_id) => {
            this.storage.get('token_id').then((token_id) => {



              this.storage.get('ghp_date').then((ghp_date) => {
              this.storage.get('ghp_amount').then((ghp_amount) => {
              this.storage.get('ghp_plus_date').then((ghp_plus_date) => {
              this.storage.get('ghp_plus_amount').then((ghp_plus_amount) => {
              this.storage.get('payment_link').then((payment_link) => {
                this.storage.get('checkGhp').then((checkGhp) => {


              this.token = token;
              this.name = name;
              this.mobile = mobile;
              this.email = email;
              this.projectname = projectname;
              this.eventtitle = eventtitle;
              this.unit_category = unit_category;
              this.lead_uid = lead_uid;
              this.lead_status_id = lead_status_id;
              this.token_media_path = token_media_path;
              this.actions = actions;
              this.lead_id = lead_id;
              this.event_id = event_id;
              this.token_type_id = token_type_id;
              this.token_id = token_id;
              this.isSpinner=false;

              this.checkGhp=checkGhp;

              
              this.ghp_date = ghp_date;
              this.ghp_amount = ghp_amount;
              this.ghp_plus_date = ghp_plus_date;
              this.ghp_plus_amount = ghp_plus_amount;
              this.payment_link = payment_link;

 console.log(this.ghp_date);
 console.log(this.ghp_amount);
 console.log(this.ghp_plus_date);
 console.log(this.ghp_plus_amount);
 console.log(this.checkGhp);
//  if(ghp_plus_date == 'xd' && ghp_plus_amount == 'xd')
//  {
//    console.log("xd detected");
//    this.ghpplus = 1;
//  }

//  if(checkGhp  && ghp_plus_amount && ghp_date  && ghp_amount)
//  {
//    console.log("ghp as well as ghp plus detected");
//    this.ghpAndGhplus = 1;
//  }


// console.log("sdsd",this.name);

            });
          });
            });
            });
          });
            });
            });
            });
            });
            });
          });
        });
      });
    });
  });
  });
});
});
});
});
});
}


goback() {
  this.storage.set('IDFromPerformance',2);
  if(this.FromDrillDownList==0){
    this.storage.remove('checkGhp');
    this.storage.remove('ghp_date');
    this.storage.remove('ghp_amount');
    this.storage.remove('ghp_plus_date');
    this.storage.remove('ghp_plus_amount');
    this.router.navigate(['/leadslist-data/']);
  }else if(this.FromDrillDownList==1){
    this.storage.remove('checkGhp');
    this.storage.remove('ghp_date');
    this.storage.remove('ghp_amount');
    this.storage.remove('ghp_plus_date');
    this.storage.remove('ghp_plus_amount');
    this.router.navigate(['/home/']);
  }
}

UpgradetoGHP(){
  this.router.navigate(['/upgrade-to-ghp/']);
}

// Whatsapp(callNumber: any) {
//   setTimeout(() => {
//     const whatsapp = callNumber;
//     window.open(`https://api.whatsapp.com/send?phone=${whatsapp}`, '_system');
//   }, 100);
// }

Whatsapp(Plus) {
  setTimeout(() => {
    const plus='+';
      var uri = `https://api.whatsapp.com/send?text="'Hello'+${this.name}+' ,\n\nGreetings from Vilas Javdekar Developers. Thank you for showing your interest in upgrading your ‘Golden Hour Pass’ to Golden Hour Pass+'+'+ of the project '+${this.projectname}+'.\n\nYou are now just 2 steps away from becoming a member of the VJ Parivaar!\n\nKindly click on the below link and pay balnce amount to upgrade to Golden Hour Pass+${name}+(GHP+${name}+). Once done, you will be confimed as the GHP+ holder for the '+${this.eventtitle}+'.\n'+${this.payment_link}+'\n\nThank You,\nTeam VJ.'"&phone=${this.mobile}`;
      var res = encodeURI(uri);
      //window.open(`https://api.whatsapp.com/send?phone=${whatsapp}`, '_system',);
      window.open(res, '_system',);
  }, 100);

}



shareUsing() {
  console.log("inside shareUsing");
  // tslint:disable-next-line:max-line-length
  this.socialSharing.share( 'Hello '+this.name+' ,\n\nGreetings from Vilas Javdekar Developers. Thank you for showing your interest in the ‘Golden Hour Pass’ of the project'+this.projectname+'.\n\nYou are now just 2 steps away from becoming a member of the VJ Parivaar!\n\nKindly click on the below link and and pay for your Golden Hour Pass (GHP). Once done, you will be confimed as the GHP holder for the '+this.eventtitle+'.\n'+this.payment_link+'\n\nThank You,\nTeam VJ.');
}



gmail()
{
  console.log("inside gmail");

  this.socialSharing.shareViaEmail('Hello '+this.name+' ,\n\nGreetings from Vilas Javdekar Developers.Thank you for showing your interest in the ‘Golden Hour Pass’ to Golden Hour Pass + of the project'+this.projectname+'.\n\nYou are now just 2 steps away from becoming a member of the VJ Parivaar!\n\nKindly click on the below link and and pay for your Golden Hour Pass (GHP). Once done, you will be confimed as the GHP holder for the '+this.eventtitle+'.\n'+this.payment_link+'\n\n Thank You,\nTeam VJ.','GHP Plus Upgrade +', [this.email]).then(() => {
  }).catch(() => {
    // Error!
  });
}



shareUsingplus() {
  console.log("inside shareUsing");
  // tslint:disable-next-line:max-line-length
  this.socialSharing.share( 'Hello '+this.name+' ,\n\nGreetings from Vilas Javdekar Developers. Thank you for showing your interest in upgrading your ‘Golden Hour Pass’ to Golden Hour Pass + of the project '+this.projectname+'.\n\nYou are now just 2 steps away from becoming a member of the VJ Parivaar!\n\nKindly click on the below link and pay balnce amount to upgrade to Golden Hour Pass+ (GHP+). Once done, you will be confimed as the GHP+ holder for the '+this.eventtitle+'.\n'+this.payment_link+'\n\nThank You,\nTeam VJ.');
}



gmailplus()
{
  console.log("inside gmail");

  this.socialSharing.shareViaEmail('Hello '+this.name+' ,\n\nGreetings from Vilas Javdekar Developers.Thank you for showing your interest in upgrading your ‘Golden Hour Pass’ to Golden Hour Pass + of the project ' +this.projectname+'.\n\nYou are now just 2 steps away from becoming a member of the VJ Parivaar!\n\nKindly click on the below link and pay balnce amount to upgrade to Golden Hour Pass+ (GHP+). Once done, you will be confimed as the GHP+ holder for the '+this.eventtitle+'.\n'+this.payment_link+'\n\nThank You,\nTeam VJ.','GHP Plus Upgrade +', [this.email]).then(() => {
  }).catch(() => {
    // Error!
  });
}
}