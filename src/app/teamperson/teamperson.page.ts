import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {APIService} from '../services/APIService';
import {Reminder} from '../models/Reminder';
import {FosList} from '../models/FosList';
import {AlertController, LoadingController, ModalController, NavController, Platform, PopoverController} from '@ionic/angular';
import {Helper} from '../services/Helper';
import {Network} from '@ionic-native/network/ngx';
import {WebServer} from '../services/WebServer';
import {TeamPerson} from "../models/TeamPerson";
import { DeleteTeamPerson  } from '../models/DeleteTeamPerson';


@Component({
  selector: 'app-teamperson',
  templateUrl: './teamperson.page.html',
  styleUrls: ['./teamperson.page.scss'],
})
export class TeampersonPage implements OnInit {
    // tslint:disable-next-line:ban-types
    visible: Boolean;
    teamPerson: TeamPerson = new TeamPerson();
    DeleteTeamPerson: DeleteTeamPerson = new DeleteTeamPerson();
    isSpinner: any = true;
    successvalue: any;
    loader: any;
    cancelSuccessValue: any;
    full_name:any;
    mobile:any;
    email:any;
    teamPersonModel = new TeamPerson();
    teamMembers:any=[];
    
    constructor(private storage: Storage, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, public webServer: WebServer, private cd: ChangeDetectorRef, private platform: Platform, private router: Router,
      public navCtrl: NavController, public modalController: ModalController) {
  
      this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(['/home/']);
      });
  
        }

  ngOnInit() {
  }


    ionViewDidEnter() {
        this.storage.get('StoreDataNew').then((val) => {
            console.log('StoreDataNew', val);
            this.full_name = val[0];
            this.mobile = val[1];
            this.email = val[2];
            console.log(' this.full_name',  this.full_name );
            console.log(' this.mobile',  this.mobile);
            console.log(' this.email',  this.email);

        });

        this.storage.get('StoreData').then((val1) => {
          console.log('cp_team_lead_id',  val1 );  
          this.teamPersonModel.cp_team_lead_id = val1;
            });

        this.storage.get('apiToken').then((val1) => {
          this.teamPersonModel.api_token = val1;
          this.DeleteTeamPerson.api_token = val1;

  
          if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
            this.helper.presentToastError('Please on Internet Connection');
            this.isSpinner = false;
          } else {
            this.isSpinner = true;
             this.getCpTeamMembers();
          }
        });
   
        this.platform.backButton.subscribeWithPriority(1, () => {
          this.router.navigate(['/home/']);
      });
  

  }


  getCpTeamMembers()
  {
    this.apiservice.getCpTeamMembers(this.teamPersonModel.api_token, this.teamPersonModel.cp_team_lead_id).subscribe(data => {
      this.isSpinner = false;
      this.successvalue = JSON.stringify(data.body);
      const Value = JSON.parse(this.successvalue);

      console.log("my data",Value.success);
      if (Value.success === 1) {
        console.log(Value.data);
        this.teamMembers = Value.data;
      }
    });
  }
    
xd()
{
  alert("mcbc");
}
  async deleteData(cp_team_member_id,name,mobile) {
    this.DeleteTeamPerson.cp_team_member_id = cp_team_member_id;
    const alert = await this.alertCtrl.create({
      header: 'Remove Team Member?',
      message: 'Are you sure you want to remove member'+''+name+''+'&'+''+mobile+''+'from team member list?',
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
              this.apiservice.removeCpTeamMember(this.DeleteTeamPerson).subscribe(
                  response => {
                    this.cancelSuccessValue = JSON.stringify(response.body);
                    const Value = JSON.parse(this.cancelSuccessValue);
                    if (Value.success === 1) {
                      console.log('Value.success' + Value.success);
                      this.helper.presentToastSuccess('Delete Successfully!');
                      this.dismissLoading();
                      /*Call Project Update API*/
                      if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
                        this.helper.presentToastError('Please on Internet Connection');
                      } else {
                        this.getCpTeamMembers();
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

 doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.teamMembers = [];
      this.isSpinner = true;
      this.getCpTeamMembers();
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);

  }
    goback() {
        this.router.navigate(['/teamlist/']);
        console.log('Click on backpress');
    }
    addTeamPerson()
    {
        this.storage.set('cp_team_lead_id', this.teamPersonModel.cp_team_lead_id);
        this.router.navigate(['/add-team-person/']);
    }
}
