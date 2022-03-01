import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Platform, ToastController} from '@ionic/angular';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router, RouterModule} from '@angular/router';
import {Login} from '../../models/Login';
import {WebServer} from '../../services/WebServer';
import {Network} from '@ionic-native/network/ngx';
import {APIService} from '../../services/APIService';
import {Helper} from '../../services/Helper';
import {PostLoginResponce} from '../../models/PostLoginResponce';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
    // tslint:disable-next-line:ban-types
    isActiveToggleTextPassword: Boolean = true;
    // tslint:disable-next-line:ban-types
    isActiveToggleTextPassword1: Boolean = true;
    loginifo: Login = new Login();
    successValue: any;
    postloginresponce: PostLoginResponce;
    userid:any;
    // tslint:disable-next-line:max-line-length
    constructor(public router: Router, private storage: Storage, public helper: Helper, private apiservice: APIService, public webServer: WebServer, private network: Network, public platform: Platform, private toastController: ToastController) {
        this.postloginresponce = new PostLoginResponce();

        this.platform.backButton.subscribeWithPriority(1, () => {
            this.router.navigate(['/enter-mobile-screen/']);
        });
    }

    ngOnInit() {
        this.storage.get('user_id_from_otp').then((val) => {
            this.userid = val;
            console.log(this.userid);
            this.changePassword();
        });
    }

    goBack() {
        this.router.navigate(['/enter-mobile-screen/']);
        console.log('Click on backpress');
    }

    /*Change Passsword*/
    changePassword() {
        console.log(this.loginifo.password);
        console.log(this.loginifo.confirmpassword);
        if (!this.loginifo.password) {
            this.presentToast('Enter password!');
        } else if (!this.loginifo.confirmpassword) {
            this.presentToast('Enter confirm password!');
        } else if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
            this.presentToast('Please on Internet Connection!');
        } else if ((this.loginifo.password != this.loginifo.confirmpassword)) {
            this.presentToast('Password does not match!');
        } else {
            this.loginifo.user_id =  this.userid;
            this.loginifo.api_token = this.webServer.API_TOKEN_EXTERNAL;
            /*Call API For Login*/
            this.apiservice.updatePassword(this.loginifo).subscribe(
                response => {
                    this.helper.showLoader('Password change successfully');
                    console.log('responseBody' + JSON.stringify(response.body));
                    this.successValue = JSON.stringify(response.body);
                    this.presentToast('Password Changed Successfully!');
                    this.router.navigate(['/login/']);
                    this.helper.hideLoader();
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
            cssClass: "my-custom-class"
        });
        toast.present();
    }

    /*TogglePassword*/
    public toggleTextPassword(): void {
        this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword === true) ? false : true;
    }

    /*TogglePassword*/
    public toggleTextPassword1(): void {
        this.isActiveToggleTextPassword1 = (this.isActiveToggleTextPassword1 === true) ? false : true;
    }

    public getType() {
        return this.isActiveToggleTextPassword ? 'password' : 'text';
    }

    public getTypeNew() {
        return this.isActiveToggleTextPassword1 ? 'password' : 'text';
    }

}
