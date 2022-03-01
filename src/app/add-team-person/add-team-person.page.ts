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
import { AddTeamPerson } from '../models/AddTeamPerson';
import { AddTeamMembers } from '../models/AddTeamMembers';
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-team-person',
  templateUrl: './add-team-person.page.html',
  styleUrls: ['./add-team-person.page.scss'],
})
export class AddTeamPersonPage implements OnInit {

  xd:any;
  AddTeamPerson: AddTeamPerson = new AddTeamPerson();

  AddTeamMembers: AddTeamMembers = new AddTeamMembers();

  isSpinner: any = true;
  successvalue: any;
  loader: any;
  cancelSuccessValue: any;
  visible: Boolean;
  teamPersonData:any = [];
  isChecked:boolean = false;
  team_person_id:any;
  team_person_array:any=[];
  apiToken:any;
 cpTeamLeadID:any;
  
  constructor(private storage: Storage, public loadingController: LoadingController, private alertCtrl: AlertController, public alertController: AlertController, public popoverController: PopoverController, public helper: Helper, public apiservice: APIService, private network: Network, private platform: Platform, private router: Router,
    public navCtrl: NavController, public modalController: ModalController) {

    this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(['/teamperson/']);
      console.log('Click on backpress');
    });

      }

  ngOnInit() {
  }

  ionViewDidEnter() {


    this.storage.get('cp_id').then((val1) => {
      this.storage.get('cp_team_lead_id').then((val2) => {
        this.storage.get('apiToken').then((val3) => {
          this.storage.get('is_team_lead').then((val4) => {
       

          this.AddTeamPerson.cp_id = val1;
          this.AddTeamPerson.cp_team_lead_id = val2;
          this.AddTeamPerson.api_token = val3;
          this.AddTeamPerson.is_team_lead = val4;

          this.apiToken=val3;
          this.cpTeamLeadID=val2;
        console.log('cp_team_lead_id',  this.AddTeamPerson.cp_id );    
        console.log('cp_id',  this.AddTeamPerson.cp_team_lead_id );  
        console.log('api',   this.AddTeamPerson.api_token );  
        console.log("is_team_lead",val4)


        if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
          this.helper.presentToastError('Please on Internet Connection');
          this.isSpinner = false;
        } else {
          this.isSpinner = true;
           this.getTeamPersonData();
        }

        });
      }); 
    });    
  });

    this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(['/teamperson/']);
      console.log('Click on backpress');
  });


}

getTeamPersonData()
{
  this.AddTeamPerson.is_team_lead = 2;
  this.apiservice.getCpFosList(this.AddTeamPerson.api_token, this.AddTeamPerson.cp_id,this.AddTeamPerson.cp_team_lead_id,this.AddTeamPerson.is_team_lead).subscribe(data => {
    this.isSpinner = false;
    this.successvalue = JSON.stringify(data.body);
    const Value = JSON.parse(this.successvalue);

    console.log("my data",Value.success);
    if (Value.success === 1) {
      this.teamPersonData = Value.data;
      console.log(this.teamPersonData);

    }
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

doRefresh(event) {
  console.log('Begin async operation');
  setTimeout(() => {
    this.teamPersonData = [];
    this.isSpinner = true;
    this.getTeamPersonData();
    console.log('Async operation has ended');
    event.target.complete();
  }, 500);

}
  goback() {
      this.router.navigate(['/teamperson/']);
      console.log('Click on backpress');
  }

  // Checked(i)
  // {
  //   console.log(this.teamPersonData[i].full_name);

  //     this.team_person_id = this.teamPersonData[i].cp_executive_id;
  //     console.log(this.team_person_id);
  //     this.team_person_array.push({sub1_id: this.team_person_id});
  //     this.team_person_array = this.checkSameCategory(this.team_person_array, this.team_person_id);
    
  //       console.log(this.AddTeamMembers.executive_ids);

  // }

  // checkSameCategory(value, id) {
  //   const newArr = value.filter(val => val.sub1_id === id);
  //   if (newArr.length > 1) {
  //     value = value.filter(val => val.sub1_id !== newArr[0].sub1_id);
  //   }
  //   return value;
  // }

  Checked(i)
    {
        console.log(this.teamPersonData[i].full_name);

        this.team_person_id = this.teamPersonData[i].cp_executive_id;
        console.log(this.team_person_id);
        this.team_person_array.push(this.team_person_id );
        this.team_person_array = this.checkSameCategory(this.team_person_array, this.team_person_id);

        console.log(this.team_person_array);

    }


    checkSameCategory(value, id) {
        const newArr = value.filter(val => val  === id);
        console.log('val => val',val => val);
        console.log('val => id',id);
        if (newArr.length > 1) {
            value = value.filter(val => val  !== id);
        }
        return value;
    }


  searchEvent(event) {
    const val1 = event.target.value;
    console.log(val1);
    // if the value is an empty string don't filter the items
    if (val1) {
        this.teamPersonData = this.teamPersonData.filter((item) => {
            return ((item.full_name != null ? item.full_name.toLowerCase().indexOf(val1.toLowerCase()) > -1 : '') ||
                (item.mobile_number != null ? item.mobile_number .toLowerCase().indexOf(val1.toLowerCase()) > -1: '')   )             
        });

    }
    else
    {
     this.getTeamPersonData();
    }
  }


  async addTeamMember()
  {
    const me = this;
    const alert = await this.alertCtrl.create({
      header: 'Team Member',
      message: 'Do you want to add team members in team?',
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
            /*this.helper.showLoader('Processing..');*/
            this.presentLoading().then(() => {
              this.AddTeamMembers.cp_team_lead_id=this.cpTeamLeadID;
              this.AddTeamMembers.api_token=this.apiToken;
              this.AddTeamMembers.executive_ids=this.team_person_array;
             this.apiservice.addCpTeamMember(this.AddTeamMembers).subscribe(
                  response => {
                    this.successvalue = JSON.stringify(response.body);
                    const Value = JSON.parse(this.successvalue);
                    if (Value.success === 1) {
                      console.log('Value.success_lead added' + Value.success);
                      this.alert();
                      this.router.navigate(['/teamperson/']);
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

  alert() {
    Swal.fire({
      type: 'success',
      title: 'Team members Added Successfully!',
      showConfirmButton: false,
      timer: 1500,
      position: 'center'
    });
  }

}
