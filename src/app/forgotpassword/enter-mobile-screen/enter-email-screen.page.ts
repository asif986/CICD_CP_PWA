import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActionSheetController, LoadingController, NavController, Platform, ToastController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {Storage} from '@ionic/storage';
import {Login} from '../../models/Login';
import {WebServer} from '../../services/WebServer';
import {APIService} from '../../services/APIService';
import {Helper} from '../../services/Helper';



@Component({
  selector: 'app-enter-email-screen',
  templateUrl: './enter-email-screen.page.html',
  styleUrls: ['./enter-email-screen.page.scss'],
})
export class EnterEmailScreenPage implements OnInit {
  successValue: any;
  credentialsForm: FormGroup;
  Regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
  counter: string;
  loginifo: Login = new Login();
  // tslint:disable-next-line:max-line-length
  constructor(public router: Router, public helper: Helper, private apiservice: APIService, public webServer: WebServer, public platform: Platform, public toastController: ToastController, public navCtrl: NavController, public actionSheetController: ActionSheetController, private network: Network, private formBuilder: FormBuilder, private loadingCtrl: LoadingController, private storage: Storage) {
    this.credentialsForm = this.formBuilder.group({
      mobile: [
        '', Validators.compose([
          Validators.pattern(this.Regex),
          Validators.required
        ])
      ]
    });
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(['/login/']);
    });
  }

  ngOnInit() {
    // tslint:disable-next-line:prefer-const

  }


  GoBack() {
    this.router.navigate(['/login/']);
    console.log('Click on backpress');
  }

  /*SendOTP*/
  sendOTP(value: any) {
    if ( !value.mobile) {
      this.presentToast('Please Enter Mobile Number!');
    } else if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
      this.presentToast('Please on Internet Connection!');
    } else {
      this.loginifo.username = '91' + value.mobile;
      const param = {
        external_token: this.webServer.API_TOKEN_EXTERNAL,
        username: this.loginifo.username
      };
      this.storage.set('apiData', param);
      this.loginifo.api_token = this.webServer.API_TOKEN_EXTERNAL;
      this.apiservice.forgotPasswordSendOTP(this.loginifo).subscribe(
          response => {
            this.helper.showLoader('');
            console.log('responseBody' + JSON.stringify(response.body));
            this.successValue = JSON.stringify(response.body);
            const Value = JSON.parse(this.successValue);
            if (Value.success === 1) {
              const otpData = Value.data;
              this.loginifo.otp = Value.data;
              console.log('otp' + otpData.otp);
              this.loginifo.user_id = otpData.user_id;
              this.storage.set('user_id_from_otp',  this.loginifo.user_id);
              this.router.navigate(['/verify-otp-screen/' + otpData.otp]);
              this.helper.hideLoader();
            } else {
              this.presentToast('Your account does not exists!');
            }
            return response;
          }, error => {
            this.presentToast('Something went wrong!');
          });
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
}

