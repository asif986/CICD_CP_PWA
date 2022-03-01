import {Component, Input, NgModule, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, LoadingController, NavController, Platform} from '@ionic/angular';
import {Network} from '@ionic-native/network/ngx';
import {APIService} from '../services/APIService';
import {WebServer} from '../services/WebServer';
import {Helper} from '../services/Helper';
import {AddReminder} from '../models/AddReminder';
import Swal from 'sweetalert2';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {Storage} from '@ionic/storage';


import * as moment from 'moment';
import { NativeDateAdapter, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';

const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
// const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
export class AppDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      return `${day}/${months[month]}/${year}`;
    }
    return date.toDateString();
  }
}

export const APP_DATE_FORMATS = {
      parse: {
        dateInput: { day: 'numeric', month: 'short', year: 'numeric' },
      },
      display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
      }
    };

@Component({
  selector: 'app-new-reaminder',
  templateUrl: './new-reaminder.page.html',
  styleUrls: ['./new-reaminder.page.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class NewReaminderPage implements OnInit {
  read: Boolean = false;
  successValue: any;
  addReminder: AddReminder;
  reminderDate: any;
  reminderTime: any;
  reminderNewTime: any;
  reminderNewDate: any;
  minDate = new Date();
  @Input() editable = false;
  UpID: any;
  UpReminderPurpose: any;
  loader: any;
  title: any;
  value: any;
  NewValue:any;
  ReminderID:any;
  currentTime:any;
  currentDate:any;
  USERID:any;
  public selectedTime = new Date();
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, public loadingController: LoadingController, private zone: NgZone, public navCtrl: NavController,
              private route: ActivatedRoute,  private atp: AmazingTimePickerService, private plt: Platform, private network: Network, private alertCtrl: AlertController, private storage: Storage, private apiservice: APIService, public webServer: WebServer, private helper: Helper) {

    /*this.reminderNewTime = this.selectedTime;*/
    console.log(this.selectedTime);
    this.reminderDate=this.minDate;
    this.reminderNewTime = this.getTime(this.selectedTime);
    this.reminderTime=this.getConvertedTime(this.reminderNewTime);
    console.log(this.reminderNewTime);
    console.log( this.reminderDate);
    this.addReminder = new AddReminder();
    this.plt.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(['/reminder/']);
    });
  }

  ngOnInit() {

   
    
    
    
  
  }

  ionViewDidEnter() {

    this.USERID = this.route.snapshot.paramMap.get('this.cpReminder.user_id');
    console.log(this.USERID);
    console.log(this.selectedTime);
    this.reminderDate=this.minDate;
    this.reminderNewTime = this.getTime(this.selectedTime);
    this.reminderTime=this.getConvertedTime(this.reminderNewTime);
    this.currentTime=this.reminderNewTime;
    console.log(this.reminderNewTime);
    console.log(this.getConvertDate(this.reminderDate));
    this.currentDate=this.getConvertDate(this.reminderDate);
    this.storage.get('apiToken').then((val) => {
      this.addReminder.api_token = val;
    });
    this.storage.get('Reminder').then((val) => {
      this.ReminderID = val;
      if(val==0){
        this.addReminder.reminder_comments='';
      }
    });
    
  }



  addNewReminder() {
    this.reminderNewDate = this.getConvertDate(this.reminderDate);
    
   if (!this.addReminder.reminder_comments) {
      this.helper.presentToast('Please Enter Reminder Purpose!');
    } else if(this.currentDate>this.reminderNewDate){
      this.helper.presentToast('Please select correct Date!');
    }
    else if(this.currentDate==this.reminderNewDate && this.currentTime>this.reminderNewTime){
      this.helper.presentToast('Please select correct time!')
    }
   else {
    this.sendReminderConfirmNew();
  }
  }
  async sendReminderConfirmNew() {

    const alert = await this.alertCtrl.create({
      header: 'Reminder',
      message: 'Are you sure you want to post your reminder ?',
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
            this.reminderNewDate = this.getConvertDate(this.reminderDate);
            this.addReminder.remind_at = this.reminderNewDate + ' ' + this.reminderNewTime;
            this.addReminder.user_id=this.USERID;
            console.log(this.addReminder.remind_at);
            console.log(this.reminderNewDate);
            this.presentLoading().then(() => {
              this.apiservice.PostReminder(this.addReminder).subscribe(
                  response => {
                    this.successValue = JSON.stringify(response.body);
                    const Value = JSON.parse(this.successValue);
                    if (Value.success === 1) {
                      this.alert();
                      this.storage.remove('Reminder');
                      //this.helper.presentToast('Reminder Added Successfully');
                      this.router.navigate(['/reminder/']);
                      this.dismissLoading();
                    }
                    return response;
                  }, error => {
                    this.dismissLoading();
                    this.helper.presentToastError('Something went wrong');
                  });
            });
          }
        }
      ]
    });
    await alert.present();
  }

 
  goback() {
    this.abortRequest();
  }
  async abortRequest() {
    var me = this;
    const alert = await this.alertCtrl.create({
      header: 'Abort Reminder',
      message: 'Are you sure you want to abort reminder?',
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

            if(this.value===1){
              me.zone.run(async () => {

                me.router.navigate(['/home/']);

              });
            }else{
              me.zone.run(async () => {

                me.router.navigate(['/reminder/']);

              });
            }

          }
        }
      ]
    });
    await alert.present();
  }


  alert() {
    Swal.fire({
      type: 'success',
      title: 'Reminder Added Successfully!',
      showConfirmButton: false,
      timer: 1500,
      position: 'center'
    });
  }

  alertUpdate() {
    Swal.fire({
      type: 'success',
      title: 'Reminder Update Successfully!',
      showConfirmButton: false,
      timer: 1500,
      position: 'center'
    });
  }

  open() {
    const amazingTimePicker = this.atp.open({
      time:  this.reminderNewTime,
    });
    // const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
     this.reminderTime = this.getConvertedTime(time);
     this.reminderNewTime = this.getTime(this.reminderTime);
     
     console.log(this.reminderTime);
     console.log(this.reminderNewTime);
     console.log(this.currentTime);
    });
  }
  getConvertedTime(time) {
    let timeString = time;
    const H = +timeString.substr(0, 2);
    const h = (H % 12) || 12;
    const ampm = H < 12 ? 'AM' : 'PM';
    timeString = h + timeString.substr(2, 3) + ' ' + ampm;
    return timeString;
  }

  getTime(timeString) {
    const timeStringNewConvert = timeString;
    const dt = moment(timeStringNewConvert, ['h:mm A']).format('HH:mm:ss');
    return dt;
  }

  getTimeFormatted(dateTimeString) {
    const dt = moment(dateTimeString, ['YYYY-MM-DD HH:mm:ss']).format('h:mm A');
    return dt;
  }

  getDateFormatted(dateTimeString) {
    const dt = moment(dateTimeString, ['YYYY-MM-DD HH:mm:ss']).toDate();
    return dt;
  }
  getConvertDate(str) {
    const date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
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

