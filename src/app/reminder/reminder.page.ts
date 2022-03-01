import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, Platform, PopoverController} from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Helper} from '../services/Helper';
import {DataService} from '../services/data.service';
import {APIService} from '../services/APIService';
import {Network} from '@ionic-native/network/ngx';
import {WebServer} from '../services/WebServer';
import {NavigationExtras, Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import {CPFeed} from '../models/CPFeed';
import {Storage} from '@ionic/storage';
import { Reminder } from '../models/Reminder';
import {MarkDoneReminder} from '../models/MarkDoneReminder';
import {DeleteReminder} from '../models/DeleteReminder';
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  reminderList= [];
  data: any = [];
  storageData = [];
  newUserID = 0;
  newLoginApi: any;
  successValue: any;
  cancelSuccessValue: any;
  cpReminder: Reminder = new Reminder();
  markasDone: MarkDoneReminder = new MarkDoneReminder();
  deleterminder: DeleteReminder = new DeleteReminder();
  isSpinner: any = true;
  lastPage: any;
  currentPage = 1;
  loader: any;
  dynamicColor: string;
  // tslint:disable-next-line:max-line-length
  constructor(private storage: Storage, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private cd: ChangeDetectorRef, private platform: Platform, private router: Router, private matIconRegistry: MatIconRegistry,
              // tslint:disable-next-line:max-line-length
              private domSanitizer: DomSanitizer, public navCtrl: NavController, public modalController: ModalController, private dataService: DataService) {
    // this.initialiseJsonData();
    this.matIconRegistry.addSvgIcon(
        'cp',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/cp_leads.svg')
    );
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.storage.set('IDFromPerformance',2);

      this.router.navigate(['/home/']);
    });
  }


  ngOnInit() {

  }

  ionViewDidEnter() {

    
      this.dynamicColor = 'color_d';
    
    this.storage.get('user_id').then((val) =>{
      console.log('1', val);
      this.cpReminder.user_id = val;
      this.storage.set('USERID', this.cpReminder.user_id);
      this.storage.get('apiToken').then((val1) => {
        this.cpReminder.api_token = val1;
        this.markasDone.api_token = val1;
        this.deleterminder.api_token = val1;

        if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
          this.helper.presentToast('Please on Internet Connection');
          this.isSpinner = false;
        } else {
          this.isSpinner = true;
          this.geMyReminders();
        }
      });
    });
  }

  /*Call API*/
  geMyReminders() {
    if (this.network.type !== 'none' && this.network.type !== 'unknown') {
      // tslint:disable-next-line:max-line-length
      this.presentLoading().then(() => {
        this.isSpinner = true;
        this.apiservice.getCPReminder(this.cpReminder.user_id, this.cpReminder.api_token, 1).subscribe(data => {

          const data1 = data.body.data.data;
          const success = data.body.success;
          this.currentPage = data.body.data.current_page;
          console.log(this.currentPage);
          this.lastPage = data.body.data.last_page;
          console.log(this.lastPage);
          this.isSpinner = false;
          if (success === 1) {
            console.log(data1);
            this.reminderList = data1;
            this.dismissLoading();
            console.log(this.reminderList);
          }
        }, err => {
          this.isSpinner = false;
          this.dismissLoading();
          this.helper.presentToast('Something Went Wrong');
        });
      });
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.reminderList = [];
      this.isSpinner = true;
      this.geMyReminders();
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);

  }

  addReminder() {
    this.storage.set('Reminder',0);
    this.navCtrl.navigateRoot(['/new-reaminder/',+this.cpReminder.user_id]);
  }

  updateReminder(val) {
    console.log(val);
    const navigationExtras: NavigationExtras = {
      state: {
        reminder: val
      }
    };
    console.log(navigationExtras);
    this.storage.set('Reminder',2)
    this.router.navigate(['/addreminder/'], navigationExtras);
   
      // this.storage.remove('StoreData');
      // this.storageData = [];
      // this.storageData.push(this.data[index].remind_at);
     // this.storageData.push(this.reminderList[index].remind_at);
      // this.storageData.push(this.data1[index].remind_at_date);
      // this.storageData.push(this.reminderList[index].reminder_comments);
      // this.storageData.push(this.reminderList[index].reminder_id);
      
      
    
  }

  goback() {
    this.storage.set('IDFromPerformance',2);

    this.router.navigate(['/home/']);
  }


  /*Mark As Done Reminder*/
  async markAsDone(ReminderID) {
    this.markasDone.reminder_id = ReminderID;
    const alert = await this.alertCtrl.create({
      header: 'Reminder mark as done',
      message: 'Do you want to mark this reminder as done?',
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
              this.apiservice.markasDone(this.markasDone).subscribe(
                  response => {
                    this.cancelSuccessValue = JSON.stringify(response.body);
                    const Value = JSON.parse(this.cancelSuccessValue);
                    if (Value.success === 1) {
                      console.log('Value.success' + Value.success);
                      this.helper.presentToast('Mark As Done Successfully!');
                      this.dismissLoading();
                      /*Call Project Update API*/
                      if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
                        this.helper.presentToast('Please on Internet Connection');
                      } else {
                        this.geMyReminders();
                      }
                    }
                    return response;
                  }, error => {
                    this.dismissLoading();
                    this.helper.presentToast('Something went wrong');
                  });
            });
          }
        }
      ]
    });
    await alert.present();
  }


  doneReminder(ReminderID) {
    this.markAsDone(ReminderID);

  }

  /*Delete Reminder*/
  async DeleteReminder(ReminderID) {
    this.deleterminder.reminder_id = ReminderID;
    const alert = await this.alertCtrl.create({
      header: 'Delete Reminder',
      message: 'Do you want to done the reminder?',
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
              this.apiservice.DeleteReminder(this.deleterminder).subscribe(
                  response => {
                    this.cancelSuccessValue = JSON.stringify(response.body);
                    const Value = JSON.parse(this.cancelSuccessValue);
                    if (Value.success === 1) {
                      console.log('Value.success' + Value.success);
                      this.helper.presentToast('Delete Successfully!');
                      this.dismissLoading();
                      /*Call Project Update API*/
                      if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
                        this.helper.presentToast('Please on Internet Connection');
                      } else {
                        this.geMyReminders();
                      }
                    }
                    return response;
                  }, error => {
                    this.dismissLoading();
                    this.helper.presentToast('Something went wrong');
                  });
            });
          }
        }
      ]
    });
    await alert.present();
  }

  deleteReminder(ReminderID) {
    this.DeleteReminder(ReminderID);
  }

  /*Current Page & Last Page Display View*/

  doInfinite(infiniteScroll) {
    if (this.currentPage > 1) {
      const me = this;
      me.isSpinner = true;

      this.apiservice.getCPReminder(this.cpReminder.user_id, this.cpReminder.api_token, this.currentPage).subscribe(data => {
        const data1 = data.body.data.data;
        const success = data.body.success;
        this.currentPage = data.body.data.current_page;
        this.lastPage = data.body.data.last_page;
        this.isSpinner = false;
        if (success === 1) {
          console.log(data1);
        //  this.reminderList = data1;
          for (const val of data1) {
            console.log('1', this.reminderList[(this.reminderList.findIndex(d => d.reminder_id == val.reminder_id))], val.reminder_id);

           // if ((this.reminderList.findIndex(d => d.reminder_id == val.ireminder_id)) == -1) {
            this.reminderList.push(val);
           // }
          }
          console.log(this.reminderList);
        }
        me.isSpinner = false;
        infiniteScroll.target.complete();

      }, err => {
        me.isSpinner = false;
        infiniteScroll.target.complete();

      });

    } else {
      infiniteScroll.target.complete();
    }
  }





  loadMore(infiniteScroll) {
    this.currentPage++;
    this.doInfinite(infiniteScroll);

    if (this.currentPage === this.lastPage) {
      infiniteScroll.enable(false);
    }
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
