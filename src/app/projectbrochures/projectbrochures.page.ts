import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {APIService} from '../services/APIService';
import {AlertController, LoadingController, ModalController, NavController, Platform, PopoverController} from '@ionic/angular';
import {Helper} from '../services/Helper';
import {Network} from '@ionic-native/network/ngx';
import {WebServer} from '../services/WebServer';
import {MatIconRegistry} from '@angular/material';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {DocumentViewerOptions} from '@ionic-native/document-viewer';
import {File} from '@ionic-native/file/ngx';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Login } from '../models/Login';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-projectbrochures',
  templateUrl: './projectbrochures.page.html',
  styleUrls: ['./projectbrochures.page.scss'],
})


export class ProjectbrochuresPage implements OnInit {
  isSpinner: any = true;
  successvalue: any;
  LoginAPI:any;
  ProjectBrouchers =[];
  Brouches=[];
  loader: any;
  selectedCategoryId: any;
  selectedCategory: any;
  extension:any;
  title:any;
  public storageDirectory:any;

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
  
  constructor(private storage: Storage,private theInAppBrowser: InAppBrowser, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private cd: ChangeDetectorRef, private platform: Platform, private router: Router, private matIconRegistry: MatIconRegistry,
    public navCtrl: NavController, public modalController: ModalController, private fileChooser: FileChooser, private fileOpener: FileOpener, private filePath: FilePath,private transfer: FileTransfer, private file: File, public photoViewer: PhotoViewer,private document: DocumentViewer,private socialSharing: SocialSharing) {

this.platform.backButton.subscribeWithPriority(1, () => {
this.router.navigate(['/home/']);
this.storage.set('IDFromPerformance',2);
});


}


  ngOnInit() {
  }


  ionViewDidEnter() {

    this.platform.backButton.subscribeWithPriority(1, () => {
        this.storage.set('IDFromPerformance',2);
        this.router.navigate(['/home/']);
    });

   this.storage.get('apiToken').then((val1) => {
     this.LoginAPI=val1;
     console.log(this.LoginAPI);
        if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
          this.helper.presentToastError('Please on Internet Connection');
          this.isSpinner = false;
        } else {
          this.isSpinner = true;
          this.getPreformance();
        }
      });
    }


    getPreformance() {
      this.presentLoading().then(() => {
        if (this.network.type !== 'none' && this.network.type !== 'unknown') {
          this.apiservice.GetAllProjectBrouchersNew(this.LoginAPI).subscribe(data => {
            this.successvalue = JSON.stringify(data.body);
            const Value = JSON.parse(this.successvalue);
            this.isSpinner = false;
            if (Value.success === 1) {
              this.ProjectBrouchers = Value.data;
              console.log(this.ProjectBrouchers);
              this.Brouches = [];
              this.selectedCategoryId = this.ProjectBrouchers[0].project_id;
              this.selectedCategory = this.ProjectBrouchers[0].project_name;
              this.Brouches = this.ProjectBrouchers[0].brochures;
              this.dismissLoading();
              console.log(this.Brouches);
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
  
    /*Click Dropdown*/
    getmyPerformancevalue(index: any) {
      console.log(index);
      this.Brouches = [];
      this.selectedCategoryId = this.ProjectBrouchers[index].project_id;
      this.selectedCategory = this.ProjectBrouchers[index].project_name;
      this.Brouches = this.ProjectBrouchers[index].brochures;
      console.log(this.Brouches);
         console.log(  this.title);
     /* console.log('this.StatsList :' + JSON.stringify(this.StatsList));*/
      // this.getTokenvalue( this.selectedCategoryId);
    }
  
    /*Do-Refresh*/
    doRefresh(event) {
      console.log('Begin async operation');
      setTimeout(() => {
        this.isSpinner = true;
        this.ProjectBrouchers = [];
        /*Call  this.get Rent Assure List(); API*/
        if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
          this.isSpinner = false;
          this.helper.presentToast('Please on Internet Connection');
        } else {
          this.helper.showLoader('');
          this.isSpinner = true;
          this.getPreformance();
        }
        console.log('Async operation has ended');
        event.target.complete();
      }, 500);
  
    }

  getMIMEtype(extn) {
    const ext = extn.toLowerCase();
    const MIMETypes = {
      txt : 'text/plain',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      doc : 'application/msword',
      pdf : 'application/pdf',
      jpg : 'image/jpeg',
      bmp : 'image/bmp',
      png : 'image/png',
      xls : 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      rtf : 'application/rtf',
      ppt : 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    };
    return MIMETypes[ext];
  }

  viewDocumentDownload(document,extension) {
    if (document) {
      const parts = document.split('/');
      // tslint:disable-next-line:prefer-const
      let lastSegment = parts.pop() || parts.pop();
      // this.extension = lastSegment.substr(lastSegment.lastIndexOf('.') + 1);
      const options: DocumentViewerOptions = {
        title: 'My PDF'
      };
      console.log('document' + document);
      if (extension === 'pdf' ) {
        console.log(1)
        this.theInAppBrowser.create(document, '_system' , this.options);
        this.document.viewDocument(lastSegment, 'application/pdf', options)
        this.helper.presentToastSuccess('Document View Successfully!');
      } else if (extension === 'doc') {
        console.log(2)
        // this.helper.presentToast('Document Download Successfully');
        this.theInAppBrowser.create(document, '_system' , this.options);
        this.document.viewDocument(lastSegment, 'application/msword', options)
        this.helper.presentToastSuccess('Document View Successfully!');
      } else {
        console.log(3)
        console.log(extension)
        /* alert(12);
         alert(document.media_path);*/
        //  console.log(lastSegment);
        this.photoViewer.show(document);
        this.helper.presentToastHomePage('Document View Successfully');
      }
    } else {
      this.helper.presentToastHomePage('Document Not Found');
    }
  }
  // viewAndDownloadNew(contentType, document) {
  //   let path = '';
  //   const dir_name = 'Download';
  //   const parts = document.split('/');
  //   // tslint:disable-next-line:prefer-const
  //   let lastSegment = parts.pop() || parts.pop();
  //   // this.extension = lastSegment.substr(lastSegment.lastIndexOf('.') + 1);
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   const result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
  //   result.then((resp) => {
  //     path = resp.toURL();
  //     fileTransfer.download(document, path + lastSegment).then((entry) => {
  //       if (document != null) {
  //         this.helper.presentToastHomePage('Document Download Successfully');
  //         this.fileOpener
  //             .open(entry.toURL(), contentType)
  //             .then(() => console.log('File is opened'))
  //             .catch(e => console.log('Error opening file', e));
  //       } else {
  //         this.helper.presentToastHomePage('Document Not Found');
  //       }
  //     }, (error) => {
  //       this.helper.presentToastHomePage('Document Not Found');
  //       // handle error
  //     });
  //   });
  // }

  downloadme(document) {
    this.helper.presentToastHomePage('Document Downloaded Successfully In Download Folder!');
    this.theInAppBrowser.create(document, '_system' , this.options);
    // const fileTransfer: FileTransferObject = this.transfer.create();
    //   this.storageDirectory = this.file.externalRootDirectory + 'Download/';

    //   const url = document;
    //   const parts = document.split('/');
    //   let lastSegment = parts.pop() || parts.pop();
    //   fileTransfer.download(url,this.storageDirectory + lastSegment, true).then(
    //       (entry) => {
    //         this.theInAppBrowser.create(document, '_system' , this.options);
    //         this.helper.presentToastHomePage('Document Download Successfully');
    //       }, (error) => {
    //         this.helper.presentToastHomePage('Document Not Found');
    //       });

  }
downloadDocument(document) {
  this.helper.presentToastHomePage('Document Downloaded Successfully In Download Folder!');
  this.theInAppBrowser.create(document, '_system' , this.options);
}

shareUsing(documentlink,titleName) {
  console.log("inside shareUsing");
  // tslint:disable-next-line:max-line-length
  this.socialSharing.share(titleName + '\n' + 'Link :' + documentlink);
 
}

  
  goback() {
      this.router.navigate(['/home/']);
      this.storage.set('IDFromPerformance',2);
      console.log('Click on backpress');
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
}

