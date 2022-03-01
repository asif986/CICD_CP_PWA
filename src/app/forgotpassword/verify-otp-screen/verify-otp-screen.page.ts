import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {LoadingController, NavController, Platform, ToastController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Login} from '../../models/Login';
import {WebServer} from '../../services/WebServer';
import {Network} from '@ionic-native/network/ngx';
import {APIService} from '../../services/APIService';
import { Storage } from '@ionic/storage';
import {Helper} from '../../services/Helper';
import {PostRegistrationResponce} from '../../models/PostRegistrationResponce';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-verify-otp-screen',
  templateUrl: './verify-otp-screen.page.html',
  styleUrls: ['./verify-otp-screen.page.scss'],
})
export class VerifyOtpScreenPage implements OnInit {
  verifyOTPForm: FormGroup;
  otpReceive: any;
  successvalue: any;
  mobile: any;
  baseUrl: any;
  OTP = '';
  public disabled = true;
  loginifo: Login = new Login();
  credentialsForm: FormGroup;
  color1 = true;
  postregistrationresponce: PostRegistrationResponce;
  // tslint:disable-next-line:max-line-length
  constructor(public router: Router, public helper: Helper, private storage: Storage, private apiservice: APIService, private route: ActivatedRoute, public webServer: WebServer, private network: Network, public nav: NavController, public http: HttpClient, public loadingController: LoadingController, private  formBuilder: FormBuilder, public platform: Platform, private toastController: ToastController) {
    this.postregistrationresponce = new PostRegistrationResponce();
    this.platform.resume.subscribe(() => {

    });

    this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(['/enter-mobile-screen/']);
    });

  }

  ngOnInit() {
    this.loginifo.otp = this.route.snapshot.paramMap.get('otp');
   /* this.presentToast(this.loginifo.otp);*/
    console.log(this.loginifo.otp);
    const me = this;
    me.storage.get('apiData').then((val) => {
      me.baseUrl = val.external_token;
      me.mobile = val.username;
      console.log(this.baseUrl);
      console.log(this.mobile);
    });
    this.ResendOtp();
  }


  goToChangePassword() {
    console.log('confirmotp', this.loginifo.confirmotp);
    console.log('confirmotp', this.loginifo.otp);
    if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
      this.presentToast('Please on Internet Connection!');
    } else if (this.loginifo.confirmotp != this.loginifo.otp) {
      // Remember
      this.presentToast('OTP does not match!');
    } else {
      this.helper.showLoader('');
      this.router.navigate(['/change-password/']);
      this.helper.hideLoader();
    }
  }

  /*Toast Message*/
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: 'my-custom-class'
    });
    toast.present();
  }

  /*Loading*/
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1500
    });
    await loading.present();

    const {role, data} = await loading.onDidDismiss();

  }

  /*Resend OTP*/
  ResendOtp() {
    if (this.disabled === true) {
      this.changeStatus();
    } else {
      this.click();
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
  click() {
      const me = this;
      me.storage.get('apiData').then((val) => {
        me.baseUrl = val.external_token;
        me.mobile = val.username;
        this.loginifo.username = me.mobile;
        this.loginifo.api_token = me.baseUrl;
        if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
          this.presentToast('Please on Internet Connection');
        } else {
          // Call API
          this.apiservice.forgotPasswordSendOTP(this.loginifo).subscribe(
              response => {
                console.log('responseBody**' + JSON.stringify(response.body));
                this.successvalue = JSON.stringify(response.body);
                const Value = JSON.parse(this.successvalue);
                if (Value.success === 1) {
                  const otpData = Value.data;
                  console.log('responseBody 1' + otpData);
                  this.loginifo.otp = otpData.otp;
                  console.log(otpData.user_id);
                  /*this.presentToast(this.loginifo.otp);*/
                  console.log('otp' + this.loginifo.otp);
                } else {
                  this.presentToast('Something went wrong!');
                }
                return response;
              }, error => {
                this.presentToast('Something went wrong!');
              });
        }
      });
    }

    /*Press Back*/
  goBackMobile() {
    this.router.navigate(['/enter-mobile-screen/']);
    console.log('Click on backpress');
  }
}


