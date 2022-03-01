import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, Platform, ToastController,Events} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Helper} from '../services/Helper';
import {APIService} from '../services/APIService';
import {WebServer} from '../services/WebServer';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-popupalert',
  templateUrl: './popupalert.page.html',
  styleUrls: ['./popupalert.page.scss'],
})
export class PopupalertPage implements OnInit {
  Title:any;
  Message:any;
  constructor(public toastController: ToastController,public events: Events,private storage: Storage, private route: ActivatedRoute, public helper: Helper, public apiservice: APIService, private webserver: WebServer, public navCtrl: NavController, private router: Router, public modalController: ModalController, private platform: Platform) {
    
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.storage.get('notificationData').then((val) => {
      if (val != null) {
        this.Title=val.title;
        this.Message=val.message
        console.log('Notify',this.Title);
      }
    });
  }

  goBack() {
    if(this.Title=='Remove Cp Team Lead'){
      this.storage.set('IDFromPerformance',2);
      this.storage.set('is_team_lead',2);
      this.storage.set('add_Fos',2);
      this.events.publish('forAddFOS');
      this.router.navigate(['/home/']);
      this.modalController.dismiss();
    }else if(this.Title!=='Remove Cp Team Lead'){
    this.storage.set('IDFromPerformance',2);
    this.storage.set('is_team_lead',1);
    this.storage.set('add_Fos',1);
    this.events.publish('forAddFOS');
    this.router.navigate(['/home/']);
    this.modalController.dismiss();
  }else{
    this.storage.set('IDFromPerformance',2);
    this.router.navigate(['/home/']);
    this.modalController.dismiss();
   }
 }
}
