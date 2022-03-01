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
import {UpdateReminder} from '../models/UpdateReminder';

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
  selector: 'app-addreminder',
  templateUrl: './addreminder.page.html',
  styleUrls: ['./addreminder.page.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class AddreminderPage implements OnInit {
  read: Boolean = false;
  successValue: any;
  addReminder: AddReminder;
  updatReminder: UpdateReminder;
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
  MyName:any;
  private currentColor: string
  public selectedTime = new Date();

  FromDrillDownList:any;


  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, public loadingController: LoadingController, private zone: NgZone, public navCtrl: NavController,
              private route: ActivatedRoute,  private atp: AmazingTimePickerService, private plt: Platform, private network: Network, private alertCtrl: AlertController, private storage: Storage, private apiservice: APIService, public webServer: WebServer, private helper: Helper) {
               
    /*this.reminderNewTime = this.selectedTime;*/
    console.log(this.selectedTime);
    this.reminderDate=this.minDate;
    this.reminderNewTime = this.getTime(this.selectedTime);
    this.reminderTime=this.getConvertedTime(this.reminderNewTime);
    console.log(this.reminderNewTime);
    this.addReminder = new AddReminder();
    this.updatReminder = new UpdateReminder();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.addReminder = this.router.getCurrentNavigation().extras.state.reminder;
        this.UpID = this.router.getCurrentNavigation().extras.state.reminder.reminder_id;
        this.UpReminderPurpose = this.router.getCurrentNavigation().extras.state.reminder.reminder_comments;
        this.addReminder.reminder_id = this.UpID;
        console.log(this.getDateFormatted(this.addReminder.remind_at));
        console.log( this.UpID);
        this.reminderDate = this.getDateFormatted(this.addReminder.remind_at);
        console.log(this.reminderDate);
        this.reminderTime = this.getTimeFormatted(this.addReminder.remind_at);
        
        console.log(this.currentDate);
        console.log(this.currentTime);
    }
  });
    this.plt.backButton.subscribeWithPriority(1, () => {
      if(this.FromDrillDownList==0){
        this.router.navigate(['/leadslist-data/']);
      }else if(this.FromDrillDownList==1){
        this.router.navigate(['/reminder/']);
      }
    });
  }

  ngOnInit() {

    //  this.storage.get('Value').then((val) => {
    //   this.value = val;
    //   console.log('Value' + this.value)
    //  // alert(this.value);
    //   if (this.value === 1) {
    //     this.storage.get('ReminderName').then((val) => {
    //       this.title = val;
    //       this.addReminder.reminder_comments = 'Remind Me about' + ' ' + this.title;
    //
    //     });
    //   }
    // });
  }

  ionViewDidEnter() {
    this.plt.backButton.subscribeWithPriority(1, () => {
      if(this.FromDrillDownList==0){
        this.router.navigate(['/leadslist-data/']);
      }else if(this.FromDrillDownList==1){
        this.router.navigate(['/reminder/']);
      }
    });
   //this.USERID = this.route.snapshot.paramMap.get('this.USERNEWID');
    //this.MyName = this.route.snapshot.paramMap.get('this.MyName');
    console.log(this.MyName);
    console.log(this.selectedTime);
    this.reminderDate=this.minDate;
    this.reminderNewTime = this.getTime(this.selectedTime);
    this.reminderTime=this.getConvertedTime(this.reminderNewTime);
    console.log(this.reminderNewTime);
    console.log(this.getConvertDate(this.reminderDate));
    this.currentTime=this.reminderNewTime;
    this.currentDate= this.getConvertDate(this.reminderDate);

    this.storage.get('FromDrillDownList').then((FromDrillDownList) => {
      this.FromDrillDownList=FromDrillDownList;
      console.log(this.FromDrillDownList);
    });

    
    this.storage.get('apiToken').then((val) => {
      this.addReminder.api_token = val;
      this.updatReminder.api_token = val;
      console.log(val);
    });
    this.storage.get('user_id').then((user_id) => {
     this.addReminder.user_id=user_id;
     console.log(user_id);
    });
    this.storage.get('Reminder').then((Reminder) => {
      if(Reminder==1){
        console.log(Reminder);
        this.storage.get('ReminderName').then((val2) => {
         this.title = val2;
         this.addReminder.reminder_comments = 'Remind Me about' + ' ' + this.title; 
          });
      }
    });
  //   this.storage.get('Reminder').then((Reminder) => {
  //     console.log('Reminder' ,Reminder);
  //     if(Reminder==1){
  //       this.storage.get('user_id').then((val) => {
  //         this.storage.get('FromCard').then((val2) => {
  //         this.USERID= val;
  //         console.log('Value' ,val);
         
         
  //           this.value = val2;
  //           console.log('Value' ,val2)
  //           // alert(this.value);
           
         
  //               this.storage.get('ReminderName').then((val2) => {
  //                 this.title = val2;
  //                 this.addReminder.reminder_comments = 'Remind Me about' + ' ' + this.title;
      
  //               });
              
             
            
  //         });
  //       });
  //     }
  // });
   /* this.storage.get('Value').then((val) => {
      this.value = val;
     // alert(this.value);
      if (this.value === 1) {
        this.storage.get('ReminderName').then((val) => {
          this.title = val;
          this.addReminder.reminder_comments = 'Remind Me about' + ' ' + this.title;
        });
      }
    });*/

    this.storage.get('Reminder').then((val) => {
      this.ReminderID = val;
// if(val==2){
//   this.storage.get('StoreData').then((val) => {
//     console.log('StoreData', val);
//     this.reminderDate=  this.getDateFormatted(val[0]);
//     this.reminderTime=this.getTimeFormatted(val[0]);
//     this.UpReminderPurpose = val[2];
//     this.UpID  = val[3];
//     console.log(this.getDateFormatted(val[0]));
//     console.log( this.UpID);
//     console.log(this.reminderDate);
//     });
// } else{

// }
   
      console.log(this.ReminderID);
    });
  }



  addNewReminder() {
    // if (!this.reminderDate) {
    //   this.helper.presentToast('Please Enter Reminder Date!');
    // } else if (!this.reminderTime) {
    //   this.helper.presentToast('Please Enter Reminder Time!');
    // } else if (!this.addReminder.reminder_comments) {
    //   this.helper.presentToast('Please Enter Reminder Purpose!');
    // } else if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
    //   this.helper.presentToastError('Please on Internet Connection');
    // } else {
    //   this.sendReminderConfirm();
    // }
    this.reminderNewDate = this.getConvertDate(this.reminderDate);
    // if (!(this.network.type !== 'none' && this.network.type !== 'unknown')){
    //   this.helper.presentToast('Please check network connection!');
    // }else if (!this.addReminder.reminder_comments) {
    //   this.helper.presentToast('Please Enter Reminder Purpose!');
    // }else if(this.currentDate>=this.reminderNewDate){
    //   if(this.currentTime>this.reminderNewTime){
    //     this.helper.presentToast('please select correct time!')
    //   } 
    //  else {
    //   this.sendReminderConfirm();
    // }
    if (!this.addReminder.reminder_comments) {
      this.helper.presentToast('Please Enter Reminder Purpose!');
    } else if(this.currentDate>this.reminderNewDate){
      this.helper.presentToast('Please select correct Date!');
    }
    else if(this.currentDate==this.reminderNewDate && this.currentTime>this.reminderNewTime){
      this.helper.presentToast('Please select correct time!')
    }
   else {
    this.sendReminderConfirm();
  }
  }
  

  async sendReminderConfirm() {

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
            console.log(this.addReminder.remind_at);
            this.presentLoading().then(() => {
              this.apiservice.PostReminder(this.addReminder).subscribe(
                  response => {
                    this.successValue = JSON.stringify(response.body);
                    const Value = JSON.parse(this.successValue);
                    if (Value.success === 1) {
                      this.alert();
                      //this.helper.presentToast('Reminder Added Successfully');
                      if(this.FromDrillDownList==0){
                        this.router.navigate(['/leadslist-data/']);
                      }else  if(this.FromDrillDownList==1){
                        this.router.navigate(['/reminder/']);
                      }
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

  updateNewReminder() {
    this.reminderNewDate = this.getConvertDate(this.reminderDate);
    // if (!this.addReminder.reminder_comments) {
    //   this.helper.presentToast('Please Enter Reminder Purpose!');
    // }else  if(this.currentDate>=this.reminderNewDate){
    //   if(this.currentTime>this.reminderNewTime){
    //     this.helper.presentToast('please select correct time!')
    //   } 
    //  else if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
    //   this.helper.presentToast('Please on Internet Connection');
    // } else {
    //   this.sendUpdateReminderConfirm();
    // }
    if (!this.addReminder.reminder_comments) {
      this.helper.presentToast('Please Enter Reminder Purpose!');
    } else if(this.currentDate>this.reminderNewDate){
      this.helper.presentToast('Please select correct Date!');
    }
    else if(this.currentDate==this.reminderNewDate && this.currentTime>this.reminderNewTime){
      this.helper.presentToast('Please select correct time!')
    }
   else {
    this.sendUpdateReminderConfirm();
  }
  }


  async sendUpdateReminderConfirm() {
    const alertnew = await this.alertCtrl.create({
      header: 'Reminder',
      message: 'Are you sure you want to update your reminder ?',
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
            this.reminderNewTime = this.getTime(this.reminderTime);
            this.addReminder.remind_at = this.reminderNewDate + ' ' + this.reminderNewTime;
            console.log(this.addReminder.remind_at);
            this.presentLoading().then(() => {
              this.apiservice.UpdateReminder(this.addReminder).subscribe(
                  response => {
                    this.successValue = JSON.stringify(response.body);
                    const Value = JSON.parse(this.successValue);
                    if (Value.success === 1) {
                      this.dismissLoading();
                      this.alertUpdate();
                      //this.helper.presentToast('Reminder Updated Successfully');
                      if(this.FromDrillDownList==0){
                        this.router.navigate(['/leadslist-data/']);
                      }else{
                        this.router.navigate(['/reminder/']);
                      }
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
    await alertnew.present();
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

                if(this.FromDrillDownList==0){
                  this.router.navigate(['/leadslist-data/']);
                }else  if(this.FromDrillDownList==1){
                  this.router.navigate(['/reminder/']);
                }

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
