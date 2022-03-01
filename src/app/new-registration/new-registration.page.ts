import {Component, OnInit} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  MenuController,
  NavController,
  Platform,
  ToastController
} from '@ionic/angular';
import {Router} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {NewRegistration} from '../models/NewRegistration';
import {WebServer} from '../services/WebServer';
import {APIService} from '../services/APIService';
import {Helper} from '../services/Helper';
import {Login} from '../models/Login';
import {KYCRegDocuments} from '../models/KYCRegDocuments';
import {VerifyOTP} from '../models/VerifyOTP';
import {MatDialog} from '@angular/material';
import {PostRegistrationResponce} from '../models/PostRegistrationResponce';
import {PostLoginResponce} from '../models/PostLoginResponce';
import Swal from 'sweetalert2';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
export interface Prefix {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.page.html',
  styleUrls: ['./new-registration.page.scss'],
})
export class NewRegistrationPage implements OnInit {
    loader: any;
  selectedNameprefixid: any;
  selectedNameprefixName: any;
  kycdocumentspath: Array<KYCRegDocuments> = [];
  newRegistration: NewRegistration = new NewRegistration();
  verifyOTP: VerifyOTP = new VerifyOTP();
  panelOpenState = true;
  expanded = true;
  credentialsForm: FormGroup;
  successvalue: any;
  kycsuccessvalue: any;
  relativeDiv: any;
  // tslint:disable-next-line:ban-types
  isActiveToggleTextPassword: Boolean = true;
  mobile: any;
  email: any;
  ifsc: any;
  gst: any;
  pan: any;
  res: string;
  flag: boolean;
  alive: boolean;
  hideMe: Boolean = false;
  read: Boolean = false;
  kycregDocuments: KYCRegDocuments;
  color1 = true;
  public disabled = true;
  // tslint:disable-next-line:ban-types
  isChecked: Boolean = false;
  loginifo: Login = new Login();
  IFSCRegex = /^[A-Za-z]{4}\d{7}$/;
  PANRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  GSTRegex = /^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;
  Regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  // tslint:disable-next-line:max-line-length
  EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // tslint:disable-next-line:max-line-length
    organisation = 1;
  postregistrationresponce: PostRegistrationResponce;
  // tslint:disable-next-line:max-line-length
  constructor(private statusBar: StatusBar,public navCtrl: NavController, public loadingController: LoadingController, private camera: Camera, public dialog: MatDialog, private alertController: AlertController, private alertCtrl: AlertController, public webServer: WebServer, private apiservice: APIService, public helper: Helper, private navctrl: NavController, public platform: Platform, public toastController: ToastController, private router: Router, public actionSheetController: ActionSheetController, private network: Network, private formBuilder: FormBuilder, private loadingCtrl: LoadingController, private http: HttpClient, private storage: Storage, private menuctrl: MenuController) {
    this.postregistrationresponce = new PostRegistrationResponce();
    this.kycregDocuments = new KYCRegDocuments();
    this.newRegistration = new NewRegistration();
    this.credentialsForm = this.formBuilder.group({
      mobile: [
        '', Validators.compose([
          Validators.pattern(this.Regex),
          Validators.required
        ])
      ],
      email: [
        '', Validators.compose([
          // tslint:disable-next-line:max-line-length
          Validators.pattern(this.EmailRegex),
          Validators.required
        ])
      ],
      ifsc: [
        '', Validators.compose([
          Validators.pattern(this.IFSCRegex),
          Validators.required
        ])
      ],
      gst: [
        '', Validators.compose([
          Validators.pattern(this.GSTRegex),

        ])
      ],
      pan: [
        '', Validators.compose([
          Validators.pattern(this.PANRegex),
          Validators.required
        ])
      ],
      firstName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]+'), Validators.required])],
      middlename: ['', Validators.compose([Validators.pattern('[a-zA-Z ]+'), Validators.required])],
      lastname: ['', Validators.compose([Validators.pattern('[a-zA-Z ]+'), Validators.required])],
    });

    this.getRegistrationFormdata();
    console.log(this.res);

    this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(['/login/']);
    });
  }

  ngOnInit() {
  }

  gstNo() {
    // console.log(this.newRegistration.gst_no);
    // if (this.newRegistration.gst_no !== '' || this.newRegistration.gst_no !== null) {
    //     this.res = this.newRegistration.gst_no.substr(2, 10);
    //     console.log(this.res);
    // }
  }

  getNamePrefixvalue(index: any) {
    this.selectedNameprefixid = this.newRegistration.person_name_prefix[index].name_prefix_id;
    this.selectedNameprefixName = this.newRegistration.person_name_prefix[index].name_prefix;
    console.log('selectedNameprefixName :' + this.selectedNameprefixName);
  }

  /*GetLeadFromData API*/
  getRegistrationFormdata() {
    if (this.network.type !== 'none' && this.network.type !== 'unknown') {
      /*this.helper.showLoader('Processing..');*/
        this.presentLoading().then(() => {
            this.apiservice.getRegistrationFormData().subscribe(data => {
                this.successvalue = JSON.stringify(data.body);
                const Value = JSON.parse(this.successvalue);
                console.log('successvalue', Value.success);
                if (Value.success === 1) {
                    this.newRegistration = Value.data;
                    this.selectedNameprefixName = this.newRegistration.person_name_prefix[0].name_prefix;
                    this.dismissLoading();
                } else {
                    this.helper.presentToast('Something went wrong!');
                }
            }, error => {
                this.dismissLoading();
                console.log(error);
            });
        });
    } else {
      console.log('Network Type :' + this.network.type);
      this.helper.presentToast('Please on Internet Connection!');
    }
  }

  // else if (!this.newRegistration.rera_no) {
  //   this.helper.presentToast('Please Enter RERA Number!');
  // }
  /*Registration*/
  Register(value: any) {
     console.log( this.newRegistration);
      
          if (!this.newRegistration.first_name) {
              this.helper.presentToast('Please Enter First Name!');
          } else if (!this.newRegistration.middle_name) {
              this.helper.presentToast('Please Enter Middle Name!');
          } else if (!this.newRegistration.last_name) {
              this.helper.presentToast('Please Enter Last Name!');
          } else if (!value.mobile) {
              this .helper.presentToast('Please Enter  Mobile Number!');
          } else if (!this.hideMe) {
              this.helper.presentToast('Please Verify your Mobile Number!');
          } else if (!this.newRegistration.email) {
              this.helper.presentToast('Please Enter Email Id!');
          } else if (!this.newRegistration.password) {
              this.helper.presentToast('Please Enter Password!');
          } else if (!this.newRegistration.name) {
              this.helper.presentToast('Please Enter channel partner Name!');
          } else if (!this.newRegistration.billing_name) {
              this.helper.presentToast('Please Enter Billing Name!');
          }   else if (!this.newRegistration.pan_no) {
              this.helper.presentToast('Please Enter PAN !');
          } else if (!this.newRegistration.bank_name) {
              this.helper.presentToast('Please Enter Bank Name!');
          } else if (!this.newRegistration.bank_branch_name) {
              this.helper.presentToast('Please Enter Branch Name!');
          } else if (!this.newRegistration.account_number) {
              this.helper.presentToast('Please Enter Account Number!');
          } else if (!this.newRegistration.iffc_code) {
              this.helper.presentToast('Please Enter IFSC code!');
          }  else if (this.isChecked === false) {
              this.helper.presentToast('Please accept terms & condition!');
          } else if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
              this.helper.presentToast('Please on Internet Connection');
          } else {
              if (this.newRegistration.gst_no) {
                  this.res = this.newRegistration.gst_no.substr(2, 10);
                  if ((this.newRegistration.pan_no.toUpperCase() !== this.res.toUpperCase())) {
                      this.helper.presentToast('Your PAN  & GST no. are not matching!');
                  } else {
                      this.newRegistration.verification_status_id = 2;
                      this.newRegistration.login_provider_id = 1;
                      this.newRegistration.provider_id = 1;
                      this.newRegistration.is_org = this.organisation;
                      this.newRegistration.api_token = this.webServer.API_TOKEN_EXTERNAL;
                      this.newRegistration.email = value.email;
                      this.newRegistration.iffc_code = value.ifsc;
                      this.newRegistration.gst_no = value.gst;
                      this.newRegistration.pan_no = value.pan;
                      this.newRegistration.prefix = this.selectedNameprefixName;
                      this.newRegistration.country_code = '91';
                      this.newRegistration.mobile_number = this.verifyOTP.mobile_number;
                      if(!this.newRegistration.rera_no){
                        this.newRegistration.rera_no='';
                      }
                      this.sendRegistrationConfirm();
                  }
              } else {
                  this.newRegistration.verification_status_id = 2;
                  this.newRegistration.login_provider_id = 1;
                  this.newRegistration.provider_id = 1;
                  this.newRegistration.is_org = this.organisation;
                  this.newRegistration.api_token = this.webServer.API_TOKEN_EXTERNAL;
                  this.newRegistration.email = value.email;
                  this.newRegistration.iffc_code = value.ifsc;
                  this.newRegistration.gst_no = '';
                  this.newRegistration.pan_no = value.pan;
                  this.newRegistration.prefix = this.selectedNameprefixName;
                  this.newRegistration.country_code = '91';
                  this.newRegistration.mobile_number = this.verifyOTP.mobile_number;
                  if(!this.newRegistration.rera_no){
                    this.newRegistration.rera_no='';
                  }
                  this.sendRegistrationConfirm();
              }
          }

  }

      /*Post KYC Documents*/
  private postKYCDocuments(cp_id) {
      console.log(cp_id);
      this.kycsuccessvalue = JSON.stringify(this.kycdocumentspath);
      this.kycdocumentspath = JSON.parse(this.kycsuccessvalue);
      console.log(' this.kycdocumentspath' + this.kycsuccessvalue);
      console.log('kycdocumentspathLength', this.kycdocumentspath);
      if (this.kycdocumentspath.length !== 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.kycdocumentspath.length; i++) {
          this.kycregDocuments.api_token = this.webServer.API_TOKEN_EXTERNAL;
          this.kycregDocuments.cp_id = cp_id;
          this.kycregDocuments.doc_type_id = this.kycdocumentspath[i].doc_type_id;
          this.kycregDocuments.file_uri = this.kycdocumentspath[i].file_uri;
          /* this.helper.showLoaderKYC('Processing..');*/
          this.presentLoading().then(() => {
              this.apiservice.postCPRegistrationKYC(this.kycregDocuments).subscribe(
                  response => {
                      this.successvalue = JSON.stringify(response.body);
                      const Value = JSON.parse(this.successvalue);
                      if (Value.success === 1) {
                          // alert(2)
                          this.dismissLoading();
                          this.helper.presentToast('File Upload Successfully');
                      }
                      return response;
                  }, error => {
                      // alert(1);
                      this.dismissLoading();
                      alert(JSON.stringify(this.kycregDocuments));
                      this.helper.presentToast('Something went wrong');
                  });
          });
      }

    } /*else {
          this.helper.presentToast('Registered Successfully');
          this.alert();
          this.router.navigate(['/login/']);
          this.helper.hideLoader();
      }*/
  }


    async sendRegistrationConfirm() {

        const alert1 = await this.alertCtrl.create({
            header: 'New Registration',
            message: 'Are you sure to submit this registration?',
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
                        this.presentLoading().then(() => {
                            this.apiservice.newRegistration(this.newRegistration).subscribe(
                                response => {
                                    console.log('responseBody' + JSON.stringify(response.body));
                                    this.successvalue = JSON.stringify(response.body);
                                    const Value = JSON.parse(this.successvalue);
                                    this.dismissLoading();
                                    if (Value.success === 1) {
                                        this.kycregDocuments.cp_id = Value.data.cp_id;
                                        this.postKYCDocuments(Value.data.cp_id);
                                        //this.helper.presentToast('Registered Successfully');
                                        this.alert();
                                        this.router.navigate(['/login/']);
                                        this.dismissLoading();
                                    } else if (Value.success === 2){
                                        this.helper.presentToast(Value.msg);
                                    }
                                   else {
                                        this.presentToast('Something went wrong!');
                                    }
                                    return response;
                                }, error => {
                                    this.dismissLoading();
                                    this.presentToast('Something went wrong!');
                                });
                        });
                    }
                }
            ]
        });
        await alert1.present();
    }


  async presentAlertError(msg: any) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['Ok'],
      cssClass: 'alertDanger'
    });
    await alert.present();
  }
  /*Attachment*/
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


  /*Verfiy OTP Method*/
   click(newValue: any) {
     if ( !newValue.mobile) {
       this.presentToast('Please Enter Mobile Number!');
     } else if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
       this.presentToast('Please on Internet Connection!');
     } else {
         this.verifyOTP.country_code = '91';
         this.verifyOTP.mobile_number = newValue.mobile;
         const param = {
             username: this.verifyOTP.mobile_number
         };
         this.storage.set('apiData', param);
         this.verifyOTP.api_token = this.webServer.API_TOKEN_EXTERNAL;
         this.presentLoading().then(() => {
             this.apiservice.PostverifysendOTP(this.verifyOTP).subscribe(
                 response => {
                     /*this.helper.showLoader('');*/
                     console.log('responseBody' + JSON.stringify(response.body));
                     this.successvalue = JSON.stringify(response.body);
                     const Value = JSON.parse(this.successvalue);
                     if (Value.success === 1) {
                         this.alive = !this.alive;
                         const otpData = Value.data;
                         this.loginifo.otp = otpData.otp;
                        // this.presentToast(this.loginifo.otp);
                         this.ResendOtp();
                         this.dismissLoading();
                     } else {
                         this.presentToast('Your account does not exists!');
                     }
                     return response;
                 }, error => {
                     alert(this.newRegistration);
                     this.presentToast('Something went wrong!');
                     this.dismissLoading();
                 });
         });
     }
  }

  /*Resend OTP*/
  ResendOtp() {
    if (this.disabled === true) {
      this.changeStatus();
    } else {
      this.ResendClick();
    }
  }

  /*Change Status For Button*/
  changeStatus() {
    setTimeout(() => {
      this.disabled = !this.disabled;
      console.log(this.disabled);
      this.color1 = false;
      console.log('7 seconds!');
    }, 7000);
    console.log('5 seconds!');
  }


  /*Click For Resend API Call*/
  ResendClick() {
      const me = this;
      me.storage.get('apiData').then((val) => {
          me.mobile = this.credentialsForm.controls.mobile.value;
          console.log(me.mobile);
          this.verifyOTP.country_code = '91';
          this.verifyOTP.mobile_number = me.mobile;
          this.verifyOTP.api_token = this.webServer.API_TOKEN_EXTERNAL;
          if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
              this.helper.presentToast('Please on Internet Connection');
          } else {
              // Call API
              if (!this.credentialsForm.controls.mobile.value) {
                  this.helper.presentToast('Please on enter mobile number!');
              } else {
                  this.presentLoading().then(() => {

                      this.apiservice.PostverifysendOTP(this.verifyOTP).subscribe(data => {
                          this.successvalue = JSON.stringify(data.body);
                          const Value = JSON.parse(this.successvalue);
                          console.log('successvalue', Value.success);
                          if (Value.success === 1) {
                              /*this.helper.showLoader('');*/
                              const otpData = Value.data;
                              this.loginifo.otp = otpData.otp;
                            //  this.presentToast(this.loginifo.otp);
                              console.log('otp' + otpData.otp);
                              console.log('otp' +  this.loginifo.otp);
                              this.dismissLoading();
                          } else {
                              this.helper.presentToast('Something went wrong!');
                          }
                      }, error => {
                          this.dismissLoading();
                          console.log(error);
                      });
                  });
              }
          }
      });
  }

  /*Otp and Confirm Otp */
  verifyConfirmOtp(newValue: any) {
    console.log('confirmotp', this.loginifo.confirmotp);
    console.log('otp', this.loginifo.otp);
    if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
      this.helper.presentToast('Please on Internet Connection!');
    } else if (this.loginifo.confirmotp != this.loginifo.otp) {
      // Remember
      this.helper.presentToast('OTP does not match!');
    } else {
      this.helper.showLoader('');
      this.helper.hideLoader();
      this.hide();
      this.alertVerification();
      this.isReadonly();
    }
  }

  /*Hide Div*/
  hide() {
    this.hideMe = true;
  }

  /*ReadOnly*/
  isReadonly() {
    this.read = true;
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(`Dialog result: ` + result);
      if (result === true) {
        console.log(`True ` + result);
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
    });
  }

  /*TogglePassword*/
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword === true) ? false : true;
  }

  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  /*Toast Message*/
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


    goback() {
        if (this.newRegistration) {
            this.abortRequest();
        } else {
            this.navCtrl.navigateRoot('login');
            console.log('Click on backpress');
        }
    }

    async abortRequest() {

        const alert = await this.alertCtrl.create({
            header: 'Abort Registration',
            message: 'Are you sure you want to abort registration?',
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
                        this.navCtrl.navigateRoot('login');
                        // this.router.navigate(['/login/']);
                    }
                }
            ]
        });
        await alert.present();
    }
  changeOrg(val) {
    this.organisation = val;
    console.log(this.organisation);
  }
    alert() {
        Swal.fire({
            type: 'success',
            title: 'Registered Successfully!',
            showConfirmButton: false,
            timer: 1500,
            position: 'center'
        });
    }
    alertVerification() {
        Swal.fire({
            type: 'success',
            title: 'Verified Successfully!',
            showConfirmButton: false,
            timer: 1500,
            position: 'center'
        });
    }
    async presentActionSheet(ductypeId: any) {
        const actionSheet = await this.actionSheetController.create({
            header: 'Select Using',
            buttons: [{
                text: 'Camera',
                handler: () => {
                    this.takephoto(ductypeId);
                }
            }, {
                text: 'Gallery',
                handler: () => {
                    this.openGalley(ductypeId);
                }
            },   {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {

                }
            }]
        });
        await actionSheet.present();
    }


    takephoto(ductypeId: any) {
        const optionsCamera: CameraOptions = {
          quality: 20,
          targetHeight:600,
          targetWidth: 600,
          sourceType: this.camera.PictureSourceType.CAMERA,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.PNG,
          mediaType: this.camera.MediaType.PICTURE,
        };

        this.camera.getPicture(optionsCamera).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            // const resolvedFilePath = 'data:image/png;base64,' + imageData;
            // var imageData='';
            const resolvedFilePath = 'data:image/png;base64,' + imageData;
            // tslint:disable-next-line:max-line-length
            // var path='data:image/gif;base64,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';
            // resolvedFilePath=path;
            this.kycregDocuments = new KYCRegDocuments();
            this.newRegistration.kyc_doc_types[ductypeId - 1].doc_path = resolvedFilePath;

            this.kycregDocuments.doc_type_id = ductypeId;
            this.kycregDocuments.file_uri = resolvedFilePath;
            this.kycdocumentspath.push({doc_type_id: ductypeId, file_uri: resolvedFilePath, api_token: '', cp_id: ''});
            console.log(JSON.stringify(this.kycdocumentspath));
        }, (err) => {
            // Handle error
        });
    }

    openGalley(ductypeId: any) {
        const optionsGallery: CameraOptions = {
          quality: 20,
          targetHeight:600,
          targetWidth: 600,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.PNG,
          mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(optionsGallery).then((imageData) => {
            // var imageData='';
            const resolvedFilePath = 'data:image/png;base64,' + imageData;
            // tslint:disable-next-line:max-line-length
            // var path='data:image/gif;base64,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';
            // resolvedFilePath=path;
            this.kycregDocuments = new KYCRegDocuments();
            this.newRegistration.kyc_doc_types[ductypeId - 1].doc_path = resolvedFilePath;

            this.kycregDocuments.doc_type_id = ductypeId;
            this.kycregDocuments.file_uri = resolvedFilePath;
            this.kycdocumentspath.push({doc_type_id: ductypeId, file_uri: resolvedFilePath, api_token: '', cp_id: ''});
            console.log(JSON.stringify(this.kycdocumentspath));
        }, (err) => {
            // Handle error
            console.log(err);
        });
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
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example.html',
})
export class DialogContentExampleDialog {

}



/*/!*Change Div *!/
  changeDiv(e) {
    console.log(e.value);
    if (e.value === '1' ) {
    /!*  this.flag = true;*!/
      this.organisation = e.value;
      console.log(this.organisation);
    /!*  this.relativeDiv = false;
      console.log(this.relativeDiv);*!/
    } else {
   /!*   this.flag = false;*!/
      this.organisation = e.value;
      console.log(this.organisation);
      /!*this.relativeDiv = true;
      console.log(this.relativeDiv);*!/
    }
  }*/
