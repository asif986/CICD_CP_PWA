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
import { DocumentViewer,DocumentViewerOptions  } from '@ionic-native/document-viewer/ngx';


@Component({
  selector: 'app-ghpdetails',
  templateUrl: './ghpdetails.page.html',
  styleUrls: ['./ghpdetails.page.scss'],
})
export class GHPDetailsPage implements OnInit {
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

  ghp_date:any;
  ghp_amount:any;
  ghp_plus_date:any;
  ghp_plus_amount:any;
  remarks:any;

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
  FromDrillDownList:any;
  constructor(private storage: Storage,private theInAppBrowser: InAppBrowser,private file: File,  private transfer: FileTransfer,  public actionSheetController: ActionSheetController, public loadingController: LoadingController, public alertController: AlertController, public helper: Helper, public apiservice: APIService, private network: Network, private cd: ChangeDetectorRef, private platform: Platform, private router: Router, private matIconRegistry: MatIconRegistry,
              // tslint:disable-next-line:max-line-length
              private http: HttpClient,private document: DocumentViewer,private uniqueDeviceID: UniqueDeviceID,private socialSharing: SocialSharing, private domSanitizer: DomSanitizer, public navCtrl: NavController, private dataService: DataService, private modalController: ModalController) {

      this.platform.backButton.subscribeWithPriority(1, () => {
        this.storage.set('IDFromPerformance',2);
        if(this.FromDrillDownList==0){
          this.router.navigate(['/leadslist-data/']);
        }else{
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
      this.platform.backButton.subscribeWithPriority(1, () => {
        this.storage.set('IDFromPerformance',2);
        if(this.FromDrillDownList==0){
          this.router.navigate(['/leadslist-data/']);
        }else{
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
                    this.storage.get('remarks').then((remarks) => {
                    this.remarks = remarks;
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
                    this.ghp_date = ghp_date;
                    this.ghp_amount = ghp_amount;
                    this.ghp_plus_date = ghp_plus_date;
                    this.ghp_plus_amount = ghp_plus_amount;
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

  Whatsapp(callNumber: any) {
    setTimeout(() => {
      const whatsapp = callNumber;
      window.open(`https://api.whatsapp.com/send?phone=${whatsapp}`, '_system');
    }, 100);
  }

  viewDoc(){
    // const options: DocumentViewerOptions = {
    //   title: 'My PDF'
    // };
    // this.document.viewDocument(this.token_media_path, 'application/pdf', options)
    // this.theInAppBrowser.create(this.token_media_path, '_system' , this.options);
    window.open(this.token_media_path,"_blank","location=yes,enableViewportScale=yes,hidden=no");

    this.helper.presentToastHomePage('Document View Successfully!');
  }

  // download()
  // {
  //     this.theInAppBrowser.create(this.token_media_path, '_system' , this.options);
  // }


  
  download() {
    this.helper.presentToastHomePage('Document Downloaded Successfully In Download Folder!');
    this.theInAppBrowser.create(this.token_media_path, '_blank' , this.options);
  }
  

  shareUsing(token,projectname,token_media_path) {
    console.log("inside shareUsing", token);

    this.socialSharing.share( 'Welcome to VJ family!\n\nThank you for Golden Hour Pass('+token+') of '+projectname+'\n\nDownload your GHP here'+'\n\n'+token_media_path);
  }

  shareUsingPlus(token,projectname,token_media_path) {
    console.log("inside shareUsing", token);

    this.socialSharing.share( 'Welcome to VJ family! Thank you for Golden Hour Pass+('+token+') of '+projectname+'\n\nDownload your GHP here'+'\n\n'+token_media_path);
  }
        /*  let path = '';
          const dir_name = 'Download';
          const fileTransfer: FileTransferObject = this.transfer.create();
          const result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
          result.then((resp) => {
              path = resp.toURL();
              fileTransfer.download(token_media_path, path).then((entry) => {
                  if (document != null) {
                      this.helper.presentToastHomePage('Document Download Successfully');
                      this.fileOpener
                          .open(entry.toURL(), contentType)
                          .then(() => console.log('File is opened'))
                          .catch(e => console.log('Error opening file', e));
                  } else {
                      this.helper.presentToastHomePage('Document Not Found');
                  }
              }, (error) => {
                  this.helper.presentToastHomePage('Document Not Found');
                  // handle error
              });
          });
      }*/





  generateGHP()
{
  this.storage.set('token',this.token);
  this.storage.set('name',this.name);
  this.storage.set('mobile',this.mobile);
  this.storage.set('projectname',this.projectname);
  this.storage.set('lead_uid',this.lead_uid);
  this.storage.set('eventtitle',this.eventtitle);
  this.storage.set('lead_id',this.lead_id);
  this.storage.set('event_id',this.event_id);
  this.storage.set('token_id',this.token_id);
  this.storage.set('FromDrillDownList',this.FromDrillDownList);
    this.router.navigate(['/upgrade-to-ghp/']);
}


  goback() {
    this.storage.set('IDFromPerformance',2);
    if(this.FromDrillDownList==0){
      this.router.navigate(['/leadslist-data/']);
    }else{
      this.router.navigate(['/home/']);
    }
  }


}
