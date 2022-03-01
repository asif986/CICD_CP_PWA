import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingController, AlertController, PopoverController, Platform, NavController, ModalController, Events, ActionSheetController } from '@ionic/angular';
import { Helper } from '../services/Helper';
import { APIService } from '../services/APIService';
import { Network } from '@ionic-native/network/ngx';
import { WebServer } from '../services/WebServer';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import {Storage} from '@ionic/storage';
import { raiseBill } from '../models/raiseBill';
import Swal from 'sweetalert2';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-pop-up-raise-bill',
  templateUrl: './pop-up-raise-bill.page.html',
  styleUrls: ['./pop-up-raise-bill.page.scss'],
})
export class PopUpRaiseBillPage implements OnInit {
  loader: any;
  isSpinner: any = true;
  customerName:any;
  projectName:any;
  block:any;
  unit:any;
  totalbrokarage:any;
  amount:any;
  bsp:any;
  raiseBill: raiseBill;
  cpExecutiveID:any;
  cpID:any;
  billNo:any;
  successvalue:any;
  apiToken:any;
  remarks:any;
    fileUri: any;

  constructor (private transfer: FileTransfer,private storage: Storage,private fileChooser: FileChooser, private actionSheetController: ActionSheetController,private camera: Camera, public events: Events,public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private cd: ChangeDetectorRef, private platform: Platform, private router: Router, private matIconRegistry: MatIconRegistry,
    public navCtrl: NavController, public modalController: ModalController,private filePath:FilePath) {

        this.platform.backButton.subscribeWithPriority(1, () => {
        this.abortRequest();
        });

        this.raiseBill = new raiseBill();
    }

  ngOnInit() {
  }

 
  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.abortRequest();
      });

      this.storage.get('storeRaiseBill').then((val) => {
        console.log('storeRaiseBill', val);
        this.setBillData(val);
      });
      this.storage.get('apiToken').then((apiToken) => {
        this.storage.get('cp_executive_id').then((cp_executive_id) => {
          this.storage.get('cp_id').then((cp_id) => {
        this.cpExecutiveID=cp_executive_id;
        this.apiToken=apiToken;
        this.cpID=cp_id;
        console.log('cxD', this.cpExecutiveID);
        console.log('aP', this.apiToken);
        console.log('cD', this.cpID);
      });
    });
  });
  }
  setBillData(val){
    this.customerName=val[0];
    this.projectName = val[1];
    this.block = val[2];
    this.unit = val[3];
    this.totalbrokarage = val[4];
    this.amount = val[5];
    this.bsp=val[6];
    this.raiseBill.agreement_id=val[7];
    this.raiseBill.agreement_no=val[8];
    this.raiseBill.booking_id=val[9];
    this.raiseBill.lead_id=val[10];
  }


  raiseConfirmBill() {
    if (!this.billNo) {
      this.helper.presentToast('Enter your billing number');
    } else if (!this.raiseBill.file_uri) {
      this.helper.presentToast('Select your file');
    } else if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
      this.helper.presentToast('Please on Internet Connection');
    } else {
      console.log(this.billNo);
      console.log(this.raiseBill.file_uri);
      this.raiseBill.cp_executive_id = this.cpExecutiveID;
      this.raiseBill.cp_id=this.cpID;
      this.raiseBill.bill_amount = this.amount;
      this.raiseBill.bill_type_id = 1;
      this.raiseBill.partner_bill_no = this.billNo;
      this.raiseBill.api_token = this.apiToken;
      this.raiseBill.remarks = this.remarks;
      this.raiseBill.applicable_brokerage_percent = this.totalbrokarage;
      // alert(this.raiseBill.file_uri);
      this.submitRequest();
    }
  }

async uploadPhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Using',
      buttons: [{
        text: 'Camera',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: 'Gallery',
        handler: () => {
          this.openGallery();
        }
      },{
        text: 'Document',
        handler: () => {
          this.selectDocument();
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {}
      }]
    });
    await actionSheet.present();
  }

  takePhoto() {
    const optionsCamera: CameraOptions = {
      quality: 20,
      targetHeight:600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(optionsCamera).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // const resolvedFilePath = imageData;
      // console.log(resolvedFilePath);
      // this.raiseBill.file_uri = resolvedFilePath;
      this.fileUri = imageData;
      this.raiseBill.file_uri = imageData;
      // if(this.fileUri) {
      //   this.uploadCameraFile();
      // }
    }, (err) => {
      //alert('Error');
      // Handle error
    });
  }

  openGallery() {
    const optionsGallery: CameraOptions = {
        quality: 20,
        targetHeight:600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(optionsGallery).then((imageData) => {
      this.fileUri = imageData;
      this.raiseBill.file_uri = imageData;
      // if(this.fileUri) {
      //   this.uploadCameraFile();
      // }
    }, (err) => {
      //alert('Error');
      // Handle error
    });
  }

  uploadCameraFile(){
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let options: FileUploadOptions = {
      fileKey: 'file_uri',
      fileName: 'name.jpg',
      chunkedMode: false,
      params : {'api_token': this.apiToken, 'cp_executive_id': this.cpExecutiveID, 'cp_id': this.cpID
        , 'bill_type_id': 1, 'partner_bill_no': this.billNo
        , 'bill_amount': this.amount,'remarks':this.remarks,'agreement_id':this.raiseBill.agreement_id,'agreement_no':this.raiseBill.agreement_no,'applicable_brokerage_percent':this.totalbrokarage,
      'brokerage_desc':this.raiseBill.brokerage_desc,'lead_id':this.raiseBill.lead_id,'booking_id':this.raiseBill.booking_id},
      headers: {}
    };
    console.log('options',options);
    if (this.fileUri) {
      this.presentLoading().then(() => {
        fileTransfer.upload(this.fileUri,'https://vjpartners.co.in/ongoing/v7_new_clone/vj-sales-modules/public/api/cpbills/add', options)
        .then((data) => {
         
          console.log(data);
          console.log(data.responseCode);
          if(data.responseCode==200){
            this.helper.presentToastSuccess('Bill Raised Successfully');
            this.router.navigate(['/submitted-bill-page/']);
            this.dismissLoading();
          }else {
            this.helper.presentToastError('Something Went Wrong!')
            this.dismissLoading();
          }
        }, (err) => {
          this.dismissLoading();
          this.helper.presentToastError('Something Went Wrong!')
          console.log(err);
        });
      });
    }
  }
  selectDocument() {
    this.fileChooser.open()
      .then((uri) =>{
        console.log(1);
        this.filePath.resolveNativePath(uri).then((nativepath)=>{
          console.log(2);
          this.fileUri=nativepath;
           this.raiseBill.file_uri=nativepath;
          //this.uploadDocumentFile(nativepath);
        },(err)=>{
          console.log(3,err);
        });
        
      
      }
      ,(err)=>{
        console.log('Error', err)
      });
      // .catch(err => console.log('Error', err));
  }

  uploadDocumentFile(fileURI) {
    var splitPath = fileURI.split('/');
    var imageName = splitPath[splitPath.length - 1];
    console.log(1,imageName,splitPath,fileURI);
    const fileTransfer: FileTransferObject = this.transfer.create();
   
    let options: FileUploadOptions = {
      fileKey: 'file_uri',
      fileName: imageName,
      chunkedMode: false,
      params : {'api_token': this.apiToken, 'cp_executive_id': this.cpExecutiveID, 'cp_id': this.cpID
        , 'bill_type_id': 1, 'partner_bill_no': this.billNo
        , 'bill_amount': this.amount,'remarks':this.remarks,'agreement_id':this.raiseBill.agreement_id,'agreement_no':this.raiseBill.agreement_no,'applicable_brokerage_percent':this.totalbrokarage,
      'brokerage_desc':this.raiseBill.brokerage_desc,'lead_id':this.raiseBill.lead_id,'booking_id':this.raiseBill.booking_id},
      headers: {}
    };
    console.log('options',options);

    if (this.fileUri) {
      this.presentLoading().then(() => {
        fileTransfer.upload(this.fileUri,'https://vjpartners.co.in/ongoing/v7_new_clone/vj-sales-modules/public/api/cpbills/add', options)
        .then((data) => {
          console.log(data);
          console.log(data.responseCode);
          if(data.responseCode==200){
            this.helper.presentToastSuccess('Bill Raised Successfully');
            this.router.navigate(['/submitted-bill-page/']);
            this.dismissLoading();
          }else {
            this.helper.presentToastError('Something Went Wrong!')
            this.dismissLoading();
          }
        }, (err) => {
          this.dismissLoading();
          this.helper.presentToastError('Something Went Wrong!')
          console.log(err);
        });
      });
    }
  }


  async cancleRequest() {
    const me = this;
    const alert = await this.alertCtrl.create({
      header: 'Cancel Raise Bill',
      message: 'Are you sure you want to cancel Raise Bill?',
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
            this.events.publish('goToReadyToSubmit');
            this.router.navigate(['/readytosubmit-bills/']);
            this.modalController.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

  async submitRequest() {
    const me = this;
    const alert = await this.alertCtrl.create({
      header: 'Confirm Raise Bill',
      message: 'Are you sure you want to confirm Raise Bill?',
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
             if(this.fileUri){
              console.log('fileuri',this.fileUri);
              this.uploadDocumentFile(this.fileUri);
             }else{
              this.uploadCameraFile();
             }
        }
      }
      ]
    });
    await alert.present();
  }


  submitDataWithoutFile(){
    this.presentLoading().then(() => {
    this.apiservice.postRaiseBill(this.raiseBill).subscribe(
      response => {
        this.successvalue = JSON.stringify(response.body);
        const Value = JSON.parse(this.successvalue);
        if (Value.success === 1) {
          console.log('Value.success_lead added' + Value.success);
         // this.alert();
          this.events.publish('goToReadyToSubmit');
          this.modalController.dismiss();
          this.router.navigate(['/submitted-bill-page/']);
          this.dismissLoading();
        }else{
          this.dismissLoading();
          this.modalController.dismiss();
          this.helper.presentToastError('Something went wrong');
        }
        return response;
      }, error => {
        this.dismissLoading();
        this.modalController.dismiss();
        this.helper.presentToastError('Something went wrong');
      });
    });
}
  
  // alert() {
  //   Swal.fire({
  //     type: 'success',
  //     title: 'Bill Raised Successfully!',
  //     showConfirmButton: false,
  //     timer: 1500,
  //     position: 'center'
  //   });
  // }
  async abortRequest() {
    const me = this;
    const alert = await this.alertCtrl.create({
      header: 'Abort Raise Bill',
      message: 'Are you sure you want to abort Raise Bill?',
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
            this.events.publish('goToReadyToSubmit');
            this.router.navigate(['/readytosubmit-bills/']);
            this.modalController.dismiss();
          }
        }
      ]
    });
    await alert.present();
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
