import {Component, Input, OnInit} from '@angular/core';
import {KYCRegDocuments} from '../models/KYCRegDocuments';
import {NewRegistration} from '../models/NewRegistration';
import {VerifyOTP} from '../models/VerifyOTP';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Login} from '../models/Login';
import {PostRegistrationResponce} from '../models/PostRegistrationResponce';
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
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {MatDialog} from '@angular/material';
import {WebServer} from '../services/WebServer';
import {APIService} from '../services/APIService';
import {Helper} from '../services/Helper';
import {ActivatedRoute, Router} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import Swal from "sweetalert2";
import {DialogContentExampleDialog} from '../new-registration/new-registration.page';
import {AddNewLead} from '../models/AddNewLead';
import {PostNewLead} from '../models/PostNewLead';
import {KYCDocuments} from '../models/KYCDocuments';
import {DatePipe} from '@angular/common';
import {AddFos} from '../models/AddFos';
import {PostFOS} from '../models/PostFOS';
import {AddReminder} from '../models/AddReminder';
import {UpdateFOS} from '../models/UpdateFOS';

@Component({
  selector: 'app-add-fos-list',
  templateUrl: './add-fos-list.page.html',
  styleUrls: ['./add-fos-list.page.scss'],
})
export class AddFosListPage implements OnInit {
  loader: any;
  verifyOTP: VerifyOTP = new VerifyOTP();
  loginifo: Login = new Login();
  addFOS: AddFos;
  postFOS: PostFOS;
  updateFos: UpdateFOS;
  successvalue: any;
  selectedNameprefixid: any;
  selectedNameprefixName: any;
  fullname: any;
  newapi: any;
  color1 = true;
  Regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  // tslint:disable-next-line:max-line-length
  EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  panelOpenState = true;
  expanded = true;
  credentialsForm: FormGroup;
  username = 'Username';
  position = 'Position';
  countrycode = '';
  mobile = '';
  response: AddNewLead;
  minDateNew: any;
  api_token: any;

  // tslint:disable-next-line:variable-name
  first_name:string;
  middle_name:string;
  last_name:string;
  email:string;
  ID:any;
  AddNEW:any;
  Leader:any;
  isActiveToggleTextPassword: Boolean = true;
  public disabled = true;
  @Input() editable = false;
    isChecked: Boolean = false;
    FromHome:any;

  // tslint:disable-next-line:max-line-length
  constructor(private datePipe: DatePipe, private camera: Camera, public dialog: MatDialog, private alertController: AlertController, private statusBar: StatusBar, private navctrl: NavController, private route: ActivatedRoute, private storage: Storage, public platform: Platform, private router: Router, public actionSheetController: ActionSheetController, private network: Network, private formBuilder: FormBuilder, private http: HttpClient, public helper: Helper, public loadingController: LoadingController, public apiservice: APIService, private webserver: WebServer, private alertCtrl: AlertController) {


    this.addFOS = new AddFos();
    this.postFOS = new PostFOS();
    this.updateFos = new UpdateFOS();
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
      first_name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]+'), Validators.required])],
      //middle_name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]+'), Validators.required])],
      last_name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]+'), Validators.required])],
    });

    /*Get Lead Form Data*/
    // this.getLeadFormdata();

    // this.platform.backButton.subscribeWithPriority(1, () => {
    //   this.storage.get('ID').then((val) => {
    //     this.ID=val;
    //     if(val==3){
    //       this.router.navigate(['/foslist/']);
    //     }
    //   this.router.navigate(['/foslist/']);
    //   });
    // });

  this.platform.backButton.subscribeWithPriority(1, () => {
      this.storage.get('FromHome').then((val) => {
        if(val==0){
          this.abortRequest('Are you sure you want to abort Adding FOS?'); 
        }else if(val==1){
          this.abortRequest('Are you sure you want to abort Adding FOS?');
        }else if(val==2){
          this.abortRequestForLeaderList('Are you sure you want to abort Adding Team Leader?');
        }else if(val==3){
          this.abortRequest('Are you sure you want to abort Updating FOS?');
        }
     });
  });


    this.postFOS = new PostFOS();

      // this.platform.backButton.subscribeWithPriority(1, () => {
      //   this.storage.set('IDFromPerformance',2);
      //     this.router.navigate(['/home/']);
      // });

  }


  ngOnInit() {

   /* if (this.router.getCurrentNavigation().extras.state) {
      this.postFOS = this.router.getCurrentNavigation().extras.state.Fos;
      this.postFOS.first_name = this.router.getCurrentNavigation().extras.state.Fos.first_name;
      this.last_name = this.router.getCurrentNavigation().extras.state.Fos.last_name;
      this.middle_name = this.router.getCurrentNavigation().extras.state.Fos.middle_name;
      this.mobile = this.router.getCurrentNavigation().extras.state.Fos.mobile_number;
      this.email = this.router.getCurrentNavigation().extras.state.Fos.email;

      console.log(this.postFOS.first_name);
    }*/
    /*Get Country Code*/


  }

  /*ionViewDidEnter() {
    this.route.snapshot.paramMap.get('id');
    // get CP Info
    this.storage.get('fullname').then((val) => {
      this.username = val;
      this.storage.get('position').then((val1) => {
        this.position = val1;
        this.storage.get('cp_id').then((val2) => {
          this.postFOS.cp_id = val2;
          this.storage.get('apiToken').then((val3) => {
            this.postFOS.api_token = val3;
            if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
              this.helper.presentToast('Please on Internet Connection');
            } else {
              this.storage.get('fos').then((val4) => {
                if (val4 === 1) {
                  this.postFOS = new PostFOS();
                  this.getLeadFormdata();
                } else if (val4 === 2) {
                  this.storage.get('LeadModelFormData').then((data) => {
                    if (data != null) {
                      this.postFOS = data;
                    }
                  });
                }
                console.log('LeadModelFormData ' + this.postFOS);
              });
            }
          });
        });
      });
    });

*/

  ionViewDidEnter() {
    
    this.storage.get('FromHome').then((FromHome) => {
      this.FromHome = FromHome; //TODO:FromHome=>>>0=Home Page Varun,1=Fos List Varun,2=TeamList Varun;
      console.log("FromHome",this.FromHome);
    });

    this.storage.get('Leader').then((Leader) => {
      this.Leader = Leader;
      console.log("Leader",this.Leader);
    });

    this.storage.get('AddNEW').then((AddNEW) => {
      this.AddNEW = AddNEW;
      console.log("AddNEW",this.AddNEW);
    });

    this.platform.backButton.subscribeWithPriority(1, () => {
      this.storage.get('FromHome').then((val) => {
        if(val==0){
          this.abortRequest('Are you sure you want to abort Adding FOS?'); 
        }else if(val==1){
          this.abortRequest('Are you sure you want to abort Adding FOS?');
        }else if(val==2){
          this.abortRequestForLeaderList('Are you sure you want to abort Adding Team Leader?');
        }else if(val==3){
          this.abortRequest('Are you sure you want to abort Updating FOS?');
        }
     });
  });

      if (this.route.snapshot.paramMap.get('countryCode') != null) {
          this.postFOS.country_code = this.route.snapshot.paramMap.get('countryCode');
          this.countrycode =this.route.snapshot.paramMap.get('countryCode');
      } else {
          this.postFOS.country_code = '91';
          this.countrycode = '91';
      }

    this.storage.get('cp_Ex_id').then((val) => {
      this.updateFos.cp_executive_id = val;
      console.log(this.updateFos.cp_executive_id);
    });

    this.storage.get('ID').then((val) => {
      this.ID=val;
      console.log("ID",val);
      if(val==2){
        this.storage.get('StoreData').then((val) => {
          console.log('StoreData', val);
          this.first_name = val[0];
          this.middle_name = val[1];
          this.last_name = val[2];
          this.mobile = val[3];
          this.email = val[4];
            if(val[5] === 1)
            {
                this.isChecked = true;
            }


            this.updateFos.first_name=this.first_name;
          this.updateFos.middle_name=this.middle_name;
          this.updateFos.last_name=this.last_name;
          this.updateFos.mobile_number=this.mobile;
          this.updateFos.email=this.email;
          console.log(' this.updateFos.first_name',  this.postFOS.first_name);
          console.log(' this.postFOS.first_name',  this.first_name);
          console.log(' this.postFOS.middle_name',  this.middle_name);
          console.log('  this.postFOS.last_name',   this.last_name);
          console.log('  this.postFOS.mobile',   this.mobile);
          console.log('  this.postFOS.email',   this.email);
        });
      }
    });


    this.route.snapshot.paramMap.get('id');
    // get CP Info
    this.storage.get('fullname').then((val) => {
      this.username = val;
      this.storage.get('position').then((val1) => {
        this.position = val1;
        this.storage.get('cp_id').then((val2) => {
          this.postFOS.cp_id = val2;
          this.storage.get('apiToken').then((val3) => {
            this.newapi = val3;
            this.api_token = val3;
            if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
              this.helper.presentToast('Please on Internet Connection');
            } else {
                this.postFOS = new PostFOS();
                this.getLeadFormdata();
              /*this.storage.get('NewLead').then((val4) => {
                if (val4 === 1) {
                  this.postFOS = new PostFOS();
                  this.getLeadFormdata();
                } else if (val4 === 2) {
                  this.storage.get('LeadModelFormData').then((data) => {
                    if (data != null) {
                      this.postFOS = data;
                    }
                  });
                }
                console.log('LeadModelFormData ' + this.postFOS);
              });*/
            }
          });
        });
      });
    });


    /*/!*Get Country Code*!/
    if(this.ID==1) {
      if (this.route.snapshot.paramMap.get('countryCode') != null) {
        this.postFOS.country_code = '+' + this.route.snapshot.paramMap.get('countryCode');
        this.countrycode = '+' + this.route.snapshot.paramMap.get('countryCode');
      } else {
        this.postFOS.country_code = '+91';
        this.countrycode = '+91';
      }
    }else if(this.ID==2){
      if (this.route.snapshot.paramMap.get('countryCode') != null) {
        this.updateFos.country_code = '+' + this.route.snapshot.paramMap.get('countryCode');
        this.countrycode = '+' + this.route.snapshot.paramMap.get('countryCode');
      } else {
        this.updateFos.country_code = '+91';
        this.countrycode = '+91';
      }
    }*/
  }

  getLeadFormdata() {
    if (this.network.type !== 'none' && this.network.type !== 'unknown') {
      this.apiservice.getLeadFormData(this.api_token).subscribe(data => {
        this.successvalue = JSON.stringify(data.body);
        const Value = JSON.parse(this.successvalue);

        if (Value.success === 1) {
          this.addFOS = Value.data;
          this.selectedNameprefixName = this.addFOS.person_name_prefix[0].name_prefix;
        } else {
          this.helper.presentToast('Something went wrong!');
        }
      }, error => {
        this.helper.presentToast('Something went wrong!');
      });
    } else {
      console.log('Network Type :' + this.network.type);
      this.helper.presentToast('Please on Internet Connection!');
    }
  }

  getNamePrefixvalue(index: any) {
    this.selectedNameprefixid = this.addFOS.person_name_prefix[index].name_prefix_id;
    this.selectedNameprefixName = this.addFOS.person_name_prefix[index].name_prefix;
    console.log('selectedNameprefixName :' + this.selectedNameprefixName);
  }

  selectcountry() {
    this.storage.set('LeadModelFormData', this.postFOS);
    this.storage.set('fos', 3);
    this.router.navigate(['/countrycodelist/']);
  }

  /*TogglePassword*/
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword === true) ? false : true;
  }

  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  /*TogglePassword*/
  public toggleTextPassword1(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword === true) ? false : true;
  }

  public getType1() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  addPostFOS(value: any) {
      if(this.ID==1){
         if (!this.selectedNameprefixName) {
        this.helper.presentToast('Please Select Name Prefix');
      } else if (!this.postFOS.first_name) {
        this.helper.presentToast('Please Enter First Name');
      } else if (!this.postFOS.last_name) {
        this.helper.presentToast('Please Enter Last Name');
      } else if(!value.mobile){
          this.helper.presentToast('Please Enter Valid Mobile Number!');
      }else if (!this.postFOS.email) {
        this.helper.presentToast('Please Enter Email');
      }  else if (!this.postFOS.password) {
        this.helper.presentToast('Please Enter Password');
      } else if (!this.postFOS.confirm_password) {
        this.helper.presentToast('Please Enter Confirm Password');
      }else if ((this.postFOS.password != this.postFOS.confirm_password)) {
        this.helper.presentToast('Password does not match!');
      } else if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
        this.helper.presentToast('Please on Internet Connection');
      }  else {
        /*Add New Lead*/
        /*Get Country Code*/
        if (this.route.snapshot.paramMap.get('countryCode') != null) {
          this.postFOS.country_code = '+' + this.route.snapshot.paramMap.get('countryCode');
          this.countrycode = '+' + this.route.snapshot.paramMap.get('countryCode');
        } else {
          this.postFOS.country_code = '91';
          this.countrycode = '91';
        }
        this.postFOS.api_token = this.newapi;
        this.postFOS.prefix = this.selectedNameprefixName;
        this.postFOS.mobile_number = value.mobile;
        this.Checked();
        this.storage.get('cp_id').then((val) => {
          this.postFOS.cp_id = val;
          if(this.ID==1){
           this.sendLeadConfirm();
          }else if(this.ID==3){
            this.sendLeadConfirmTeamLeader();
          }
         
        });
      }
    }else if(this.ID==2){
      if (!this.selectedNameprefixName) {
        this.helper.presentToast('Please Select Name Prefix');
      } else if (!this.updateFos.first_name) {
        this.helper.presentToast('Please Enter First Name');
      } else if (!this.updateFos.last_name) {
        this.helper.presentToast('Please Enter Last Name');
      } else if (!this.updateFos.email) {
        this.helper.presentToast('Please Enter Email');
      }else if ((this.updateFos.password != this.updateFos.confirm_password)) {
        this.helper.presentToast('Password does not match!');
      }  else if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
        this.helper.presentToast('Please on Internet Connection');
      } else {
        /*Add New Lead*/
        /*Get Country Code*/
        if (this.route.snapshot.paramMap.get('countryCode') != null) {
          this.updateFos.country_code = '+' + this.route.snapshot.paramMap.get('countryCode');
          this.countrycode = '+' + this.route.snapshot.paramMap.get('countryCode');
        } else {
          this.updateFos.country_code = '91';
          this.countrycode = '91';
        }
        this.updateFos.api_token = this.newapi;
        this.updateFos.prefix = this.selectedNameprefixName;
        this.updateFos.first_name = this.first_name;
        this.updateFos.last_name = this.last_name;
        this.updateFos.middle_name = this.middle_name;
        this.updateFos.email = this.email;
        this.updateFos.mobile_number = this.mobile;
        this.Checked();
        this.storage.get('cp_Ex_id').then((val) => {
          this.updateFos.cp_executive_id = val;
          console.log(this.updateFos.cp_executive_id );
          this.sendLeadConfirmUpdate();
        });
      }
    }else if(this.ID==3){
      if (!this.selectedNameprefixName) {
        this.helper.presentToast('Please Select Name Prefix');
      } else if (!this.postFOS.first_name) {
        this.helper.presentToast('Please Enter First Name');
      }  else if (!this.postFOS.last_name) {
        this.helper.presentToast('Please Enter Last Name');
      }else if (!value.mobile) {
        this.helper.presentToast('Please Enter  Mobile Number!');
      } else if (!this.postFOS.email) {
        this.helper.presentToast('Please Enter Email');
      } else if (!this.postFOS.password) {
        this.helper.presentToast('Please Enter Password');
      } else if (!this.postFOS.confirm_password) {
        this.helper.presentToast('Please Enter Confirm Password');
      }else if ((this.postFOS.password != this.postFOS.confirm_password)) {
        this.helper.presentToast('Password does not match!');
      }  else if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
        this.helper.presentToast('Please on Internet Connection');
      } else {
        /*Add New Lead*/
        /*Get Country Code*/
        if (this.route.snapshot.paramMap.get('countryCode') != null) {
          this.postFOS.country_code = '+' + this.route.snapshot.paramMap.get('countryCode');
          this.countrycode = '+' + this.route.snapshot.paramMap.get('countryCode');
        } else {
          this.postFOS.country_code = '91';
          this.countrycode = '91';
        }
        this.postFOS.api_token = this.newapi;
        this.postFOS.prefix = this.selectedNameprefixName;
        this.postFOS.mobile_number = value.mobile;
        this.postFOS.is_team_lead=1;
        this.storage.get('cp_id').then((val) => {
          this.postFOS.cp_id = val;
          this.sendLeadConfirmTeamLeader();
        });
      }
    }
  }


  
    Checked(){
    console.log('isChecked',this.isChecked);
        if(this.isChecked===true){
            console.log('isCheckedtrue',this.isChecked);
            this.postFOS.is_team_lead=1;
            this.updateFos.is_team_lead=1;
        }else if(this.isChecked===false){
            console.log('isCheckedfalse',this.isChecked);
          this.postFOS.is_team_lead=2;
          this.updateFos.is_team_lead=2;
        }
        console.log('this.postFOS.is_team_lead',this.postFOS.is_team_lead);
        console.log('this.updateFos.is_team_lead',this.updateFos.is_team_lead);
    }

  async sendLeadConfirm() {
    
    const me = this;
    const alert = await this.alertCtrl.create({
      header: 'FOS',
      message: 'Are you sure to add this fos?',
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
              this.apiservice.Postfos(this.postFOS).subscribe(
                  response => {
                    this.successvalue = JSON.stringify(response.body);
                    const Value = JSON.parse(this.successvalue);
                    if (Value.success === 1) {
                      console.log('Value.success_lead added' + Value.success);
                      this.dismissLoading();
                      this.alert();
                      this.router.navigate(['/foslist/']);
                    } else if (Value.success === 0) {
                      this.dismissLoading();
                      this.helper.presentToastError('Mobile Number Already');
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

  async sendLeadConfirmTeamLeader() {
    const me = this;
    const alert = await this.alertCtrl.create({
      header: 'TeamLeader',
      message: 'Are you sure to add this team leader?',
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
              this.apiservice.Postfos(this.postFOS).subscribe(
                  response => {
                    this.successvalue = JSON.stringify(response.body);
                    const Value = JSON.parse(this.successvalue);
                    if (Value.success === 1) {
                      console.log('Value.success_lead added' + Value.success);
                      this.dismissLoading();
                      this.alertForTeamLeader();
                      this.router.navigate(['/teamlist/']);
                    }else if (Value.success === 0) {
                      this.dismissLoading();
                      this.helper.presentToastError('Mobile Number Already Exists');
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

  async sendLeadConfirmUpdate() {
    const me = this;
    const alert = await this.alertCtrl.create({
      header: 'FOS',
      message: 'Are you sure to update this FOS?',
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
              this.apiservice.updateCpFOS(this.updateFos).subscribe(
                  response => {
                    this.successvalue = JSON.stringify(response.body);
                    const Value = JSON.parse(this.successvalue);
                    if (Value.success === 1) {
                      console.log('Value.success_lead added' + Value.success);
                      this.alertUpdate();
                      this.dismissLoading();
                      if(this.Leader==1 ){
                         this.dismissLoading();
                        this.router.navigate(['/foslist/']);
                       
                      }else if(this.Leader==3){
                        this.dismissLoading();
                        this.router.navigate(['/teamlist/']);
                       
                      }else{
                        this.dismissLoading();
                        this.router.navigate(['/foslist/']);
                        
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


  goback(msg) {
    // if(this.Leader==1 && this.ID==3){//Add in WFH 19/03/2020
    //   this.abortRequestForLeaderList(msg);
    // }else{
    //   if (this.addFOS) {
    //     this.abortRequest(msg);
    //   } else {
    //     this.router.navigate(['/foslist/']);
    //     console.log('Click on backpress');
    //   }
    // }
    this.storage.get('FromHome').then((val) => {
      if(val==0){
        this.abortRequest('Are you sure you want to abort Adding FOS?'); 
      }else if(val==1){
        this.abortRequest('Are you sure you want to abort Adding FOS?');
      }else if(val==2){
        this.abortRequestForLeaderList('Are you sure you want to abort Adding Team Leader?');
      }else if(val==3){
        this.abortRequest('Are you sure you want to abort Updating FOS?');
      }
   });
   
  }


  //For Go to Leader List
  async abortRequestForLeaderList(msg) {//Add in WFH 19/03/2020

    const alert = await this.alertCtrl.create({
      header: 'Abort TeamLeader',
      message: msg,
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
            this.storage.set('IDFromPerformance',2);
            this.router.navigate(['/teamlist/']);
          }
        }
      ]
    });
    await alert.present();
  }


 

  //For Regular Go to FOS List
  async abortRequest(msg) {

    const alert = await this.alertCtrl.create({
      header: 'Abort FOS',
      message: msg,
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
            if(this.FromHome==0){
              this.router.navigate(['/home/']);
            } else if(this.FromHome==1 ){
              this.router.navigate(['/foslist/']);
            }else if(this.FromHome==3){
              this.router.navigate(['/foslist/']);
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
      title: 'FOS Added Successfully!',
      showConfirmButton: false,
      timer: 1500,
      position: 'center'
    });
  }

  alertUpdate() {
    Swal.fire({
      type: 'success',
      title: 'FOS Update Successfully!',
      showConfirmButton: false,
      timer: 1500,
      position: 'center'
    });
  }

  alertForTeamLeader() {
    Swal.fire({
      type: 'success',
      title: 'TeamLeader Added Successfully!',
      showConfirmButton: false,
      timer: 1500,
      position: 'center'
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

    onKeyPress(event) {
        // tslint:disable-next-line:max-line-length
        if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
            return true;
        } else {
            return false;
        }
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }


}

