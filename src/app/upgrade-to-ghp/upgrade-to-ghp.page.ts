import {Component, NgZone, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Camera} from '@ionic-native/camera/ngx';
import {MatDialog} from '@angular/material';
import {ActionSheetController, AlertController, LoadingController, NavController, Platform} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {Network} from '@ionic-native/network/ngx';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Helper} from '../services/Helper';
import {APIService} from '../services/APIService';
import {WebServer} from '../services/WebServer';
import {AddNewLead} from '../models/AddNewLead';
import {GetGHPCUIDData} from '../models/GetGHPCUIDData';
import {PostGHP} from '../models/PostGHP';
import Swal from 'sweetalert2';
import {UpdateGHP} from "../models/UpdateGHP";
declare var RazorpayCheckout: any;

@Component({
  selector: 'app-upgrade-to-ghp',
  templateUrl: './upgrade-to-ghp.page.html',
  styleUrls: ['./upgrade-to-ghp.page.scss'],
})
export class UpgradeToGHPPage implements OnInit {
  loader: any;
  successvalue: any;
  updateGHP: UpdateGHP;
  newapi: any;
  cpEX_ID: any;
  isSpinner: any = true;
  token :any;
  name :any;
  mobile :any;
  email :any;
  projectname :any;
  eventtitle :any;
  unit_category :any;
  lead_uid :any;
  lead_id :any;
  eventId :any;
  token_type :any;
  token_type_old :any;
  token_type_id :any;
  token_type_id_old :any;
  amount :any;
  amount_old :any;
  default_amount :any;
  default_amount_old :any;
  token_no :any;
  event_title :any;
  project_id :any;
  event_id :any;
  project_name :any;
  full_name :any;
  token_id :any;
  total: any;
  getGHPPlus = [];
  tokenTypes = [];
  ghplusid:any;
  public mode: any;
  ghp_request_created_at:any;
  payLink:any;
  ghpPlusDate:any;
  FromMyPerformanceFilter:any;
  constructor(private datePipe: DatePipe, private zone: NgZone, private camera: Camera, public dialog: MatDialog, private alertController: AlertController, private statusBar: StatusBar, private navctrl: NavController, private route: ActivatedRoute, private storage: Storage, public platform: Platform, private router: Router, public actionSheetController: ActionSheetController, private network: Network,  private http: HttpClient, public helper: Helper, public loadingController: LoadingController, public apiservice: APIService, private webserver: WebServer, private alertCtrl: AlertController) {
    this.updateGHP = new UpdateGHP();

      this.platform.backButton.subscribeWithPriority(1, () => {
        this.abortRequest();
      });


      this.mode = 5;
      this.updateGHP.payment_mode_id = 5;
      console.log("payment_mode_id",this.updateGHP.payment_mode_id);


   }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('FromMyPerformanceFilter').then((FromMyPerformanceFilter) => {
      this.FromMyPerformanceFilter=FromMyPerformanceFilter;
    });
      this.platform.backButton.subscribeWithPriority(1, () => {
        this.abortRequest();
      });

      this.storage.get('cp_executive_id').then((val) => {
      this.updateGHP.cp_executive_id = val;
      this.cpEX_ID = val;
      console.log(this.updateGHP.cp_executive_id);
      console.log(this.cpEX_ID);
    });
      this.storage.get('apiToken').then((val1) => {
        this.storage.get('event_id').then((event_id) => {
            this.storage.get('token_id').then((token_id) => {
              this.storage.get('sales_person_id').then((sales_person_id) => {

                this.storage.get('name').then((name) => {
                  this.storage.get('mobile').then((mobile) => {
                    this.storage.get('email').then((email) => {
                      this.storage.get('projectname').then((projectname) => {
                        this.storage.get('eventtitle').then((eventtitle) => {

              
                this.newapi = val1;
                this.token = token_id;
                this.eventId = event_id;
                this.updateGHP.sales_person_id = sales_person_id;
                this.name = name;
                this.mobile = mobile;
                this.email = email;
                this.projectname = projectname;
                this.eventtitle = eventtitle;

                this.getTokenData();
                console.log(this.updateGHP.api_token);
                console.log(this.newapi);
                console.log(this.eventId);
                console.log(this.token);
                console.log("sales_person_id",this.updateGHP.sales_person_id);


        });     
      });
     });
    });
  });     
});
});
});    
}); 
}


setMethod(val:any)
{
  this.mode = val;
  this.updateGHP.payment_mode_id = val;
  console.log("payment_mode_id",this.updateGHP.payment_mode_id);
}


  getTokenData() {
    if (this.network.type !== 'none' && this.network.type !== 'unknown') {
        this.apiservice.getTokenGHPInfo(this.newapi,this.eventId,this.token).subscribe(data => {
            this.successvalue = JSON.stringify(data.body);
            const Value = JSON.parse(this.successvalue);
            if (Value.success === 1) {
                this.getGHPPlus = Value.data;
                this.token_no = Value.data.token_no;
                this.token_id = Value.data.token_id;
                this.lead_id = Value.data.lead_id;
                this.event_title = Value.data.event_title;
                this.lead_uid = Value.data.lead_uid;
                this.project_id = Value.data.project_id;
                this.event_id = Value.data.event_id;
                this.project_name = Value.data.project_name;
                this.full_name = Value.data.full_name;
                this.token_type_old = Value.data.token_type;
                this.token_type_id_old= Value.data.token_type_id;
                this.amount_old =Value.data.amount;
                this.default_amount_old = Value.data.default_amount;
                console.log( this.token_type_old);
                console.log( this.token_type_id_old);
                console.log( this.amount_old);
                console.log( this.token_no);
                console.log( this.event_title);
                console.log( this.lead_uid);
                console.log( this.project_id);
                console.log( this.event_id);
                console.log( this.project_name);
                console.log( this.full_name);
                console.log( this.token_id);
                console.log( this.lead_id);
                this.tokenTypes = Value.data.token_types;
                this.ghplusid = this.tokenTypes[0].token_type_id;
                for (let i = 0; i < this.tokenTypes.length; i++) {
                    if (this.tokenTypes[i] && this.tokenTypes[i].token_type_id==3) {
                        this.token_type = this.tokenTypes[i].token_type;
                        this.token_type_id = this.tokenTypes[i].token_type_id;
                        this.amount = this.tokenTypes[i].amount;
                        this.default_amount = this.tokenTypes[i].default_amount;
                        console.log( 'this.token_type',this.token_type);
                        console.log( 'this.token_type_id',this.token_type_id);
                        console.log( 'this.amount',this.amount);
                        console.log( 'this.default_amount',this.default_amount);
                        console.log( 'this.ghplusid',this.ghplusid);

                    }
                }
                this.getCalculation();
            }
            else {
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

 getCalculation(){
      if(this.token_type_id==3){
          const x = this.amount;
          console.log('x',x);
          const y = this.amount_old ;
          console.log('y',y);
          // tslint:disable-next-line:radix
          this.total = parseInt(x)  - parseInt(y) ;
          console.log(this.total);
      }else {
          this.total = 0 ;
          console.log(this.total);
      }
}


    goback() {
      this.abortRequest();
    }



    generateGHP() {
        if (!(this.network.type !== 'none' && this.network.type !== 'unknown')) {
            this.helper.presentToast('Please on Internet Connection');
        } 
        else if(this.token_type_id!=3)
        {
          this.helper.presentToast('Unfortunately, GHP plus type is not available for this Event! \n Please do inform VJ Sales Head to add GHP Plus type for this event.');
        } else {
            this.updateGHP.api_token = this.newapi;
            this.updateGHP.project_id = this.project_id;
            this.updateGHP.event_id = this.eventId;
            this.updateGHP.token_type_id = 3;
            this.updateGHP.lead_id = this.lead_id;
            this.updateGHP.payment_mode_id = this.mode;
            this.updateGHP.amount = this.total;
            this.updateGHP.cancelled_token_id = this.token_id;
            this.storage.get('cp_executive_id').then((val) => {
                this.updateGHP.cp_executive_id = val;
                this.sendGenerateUpgradeGHP();
            });
        }
    }


/*Send Advertisement*/
async sendGenerateUpgradeGHP() {
  const me = this;
  const alert = await this.alertCtrl.create({
    header: 'Upgrade GHP',
    message: 'Are you sure to generate this Upgrade GHP?',
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
            this.dismissLoading();
            //this.callGHP(1234);
            if(this.updateGHP.payment_mode_id == 4)
            {
              this.payWithRazor();
            }
            else
            {
              this.generateGHPPlusRequest()
            }
          }, error => {
            this.dismissLoading();
            this.helper.presentToastError('Server Error.Could not get Data!!');
          });
        }
      }
    ]
  });
  await alert.present();
}
    payWithRazor() {
        const amount = Number(this.total) * 100;
        // return false;
        const options = {
            description: 'Generate GHP Amount ',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR', // your 3 letter currency code
            key: 'rzp_test_wN44N3LJbzWHQd', // your Key Id from Razorpay dashboard
            password: 'TJkCPNcMcCZIdW7gzXy1Y2AR',
            amount, // Payment amount in smallest denomiation e.g. cents for USD
            name: '',
            prefill: {
                email: '',
                contact: '',
                name: ''
            },
            theme: {
                color: '#0055a5'
            },
            modal: {
                ondismiss() {
                    alert('dismissed');
                }
            },


        };

        const successCallback  = (success) => {
            //alert('payment_id: ' + success);
            this.callGHP(success);
        };

        const cancelCallback = function(error) {
            this.helper.presentToastError('Payment Not Done Yet!');
            alert(error.description + ' (Error ' + error.code + ')');
        };

        RazorpayCheckout.open(options, successCallback, cancelCallback);
    }






    generateGHPPlusRequest()
    {
      console.log("inside generateGHPPlusRequest");
  
      this.presentLoading().then(() => {
        this.apiservice.PostUpgradeToken(this.updateGHP).subscribe(
            response => {
                this.successvalue = JSON.stringify(response.body);
                const Value = JSON.parse(this.successvalue);

                // this.payLink = Value.data.payment_link;
                // this.ghp_request_created_at = Value.data.created_at;

                if (Value.success === 1) {
                  this.payLink = Value.data.payment_link;
                  this.ghp_request_created_at = Value.data.created_at;
                  this.ghpPlusDate = this.datePipe.transform(this.ghp_request_created_at, 'dd-MM-yyyy');


                  this.storage.set('name', this.name);
                  this.storage.set('mobile', this.mobile);
                  this.storage.set('email', this.email);  
                  this.storage.set('projectname', this.projectname);
                  this.storage.set('eventtitle', this.eventtitle);
                  this.storage.set('ghpPlusDate', this.ghpPlusDate);
                  this.storage.set('ghpPlusAmount', this.total);
                  this.storage.set('ghpPlusPaymentLink', this.payLink);




                  
                    this.helper.hideLoader();
                    this.dismissLoading();
                    this.storage.set('FromMyPerformanceFilter', this.FromMyPerformanceFilter);
                    this.router.navigate(['/ghp-plus-request/']);
                    this.alert();
                }
                return response;
            }, error => {
                alert(JSON.stringify(error));
                this.dismissLoading();
                this.helper.presentToastError('Something went wrong');
            });
    }, error => {
        console.log(3);
        this.dismissLoading();
        this.helper.presentToastError('Server Error.Could not get Data!!');
    });
  
  
  
    }





    /*Call GHP After Razor Payment*/
    async callGHP(paymentID: any) {
        // tslint:disable-next-line:prefer-const
        let paymentDetailsModes = [];
        paymentDetailsModes.push({payment_mode_details_title: paymentID , payment_mode_details_description: 'test'});
        this.updateGHP.payment_mode_details = paymentDetailsModes;
        console.log('this.postGenenateGHP.payment_mode_details>',this.updateGHP.payment_mode_details);
        // this.postGenenateGHP.payment_mode_details.push({payment_mode_details_title: paymentID , payment_mode_details_description: paymentID});
        this.presentLoading().then(() => {
            this.apiservice.PostUpgradeToken(this.updateGHP).subscribe(
                response => {
                    this.successvalue = JSON.stringify(response.body);
                    const Value = JSON.parse(this.successvalue);
                    if (Value.success === 1) {
                        this.helper.hideLoader();
                        this.dismissLoading();
                        this.router.navigate(['/home/']);
                        this.alert();
                    }
                    return response;
                }, error => {
                    //alert(JSON.stringify(error));
                    this.dismissLoading();
                    this.helper.presentToastError('Something went wrong');
                });
        }, error => {
            console.log(3);
            this.dismissLoading();
            this.helper.presentToastError('Server Error.Could not get Data!!');
        });

    }




    alert() {
      Swal.fire({
        type: 'success',
        title: 'GHP upgrade request generated successfully!',
        showConfirmButton: false,
        timer: 1500,
        position: 'center'
      });
    }


    async abortRequest() {
      const me = this;
      const alert = await this.alertCtrl.create({
        header: 'Abort GHP+ Upgradation',
        message: 'Are you sure you want to abort GHP+ upgradation?',
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
              me.router.navigate(['/ghpdetails/']);
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


 

}
