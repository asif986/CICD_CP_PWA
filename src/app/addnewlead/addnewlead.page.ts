import { Component, Input, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  Platform,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Network } from "@ionic-native/network/ngx";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Helper } from "../services/Helper";
import { APIService } from "../services/APIService";
import { WebServer } from "../services/WebServer";
import { AddNewLead } from "../models/AddNewLead";
import { PostNewLead } from "../models/PostNewLead";
import { KYCDocuments } from "../models/KYCDocuments";
import { DatePipe } from "@angular/common";
import { VerifyOTP } from "../models/VerifyOTP";
import { Login } from "../models/Login";
import Swal from "sweetalert2";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

import { MatDialog, DateAdapter } from "@angular/material";
import { KycModalPage } from "./kyc-modal/kyc-modal.page";
@Component({
  selector: "app-addnewlead",
  templateUrl: "./addnewlead.page.html",
  styleUrls: ["./addnewlead.page.scss"],
})
export class AddnewleadPage implements OnInit {
  loader: any;
  verifyOTP: VerifyOTP = new VerifyOTP();
  loginifo: Login = new Login();
  addNewLead: AddNewLead;
  postNewLead: PostNewLead;
  kycDocuments: KYCDocuments;
  successvalue: any;
  kycsuccessvalue: any;
  Success: any;
  unitcategories = [];
  kycdocumentspath: Array<KYCDocuments> = [];
  selectedProjectId: any;
  selectedProject: any;
  selectedCategoryId: any;
  selectedCategory: any;
  selectedIncomerangeid: any;
  selectedIncomerange: any;
  selectedNameprefixid: any;
  selectedNameprefixName: any;
  selectedBuyingDuarationid: any;
  selectedBuyingDuaration: any;
  selectedBuyingForid: any;
  selectedBuyingFor: any;
  selectedProfessionid: any;
  selectedProfession: any;
  selectedFile = "No file Choose";
  fullname: any;
  newapi: any;
  color1 = true;
  Regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  // tslint:disable-next-line:max-line-length
  EmailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  panelOpenState = true;
  expanded = true;
  credentialsForm: FormGroup;
  username = "Username";
  position = "Position";
  countrycode = "";
  mobile = "";
  picker1: any;
  picker2: any;
  picker3: any;
  response: AddNewLead;
  minDate = new Date();
  maxDate = new Date();
  minDateNew: any;
  api_token: any;
  alive: boolean;
  hideMe: Boolean = false;
  read: Boolean = false;

  public disabled = true;
  @Input() editable = false;
  private startDate: string;
  private endDate: string;

  kyc_data = { adhar_no: null, pan_no: null, voter_no: null };
  kyc_doc_info: any = [
    {
      docs_type: "Adhar Card",
      doc_type_id: 1,
      is_verified: false,
    },
    {
      docs_type: "Pan Card",
      doc_type_id: 2,
      is_verified: false,
    },
    {
      docs_type: "Voter ID",
      doc_type_id: 3,
      is_verified: false,
    },
  ];

  // tslint:disable-next-line:max-line-length
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private datePipe: DatePipe,
    private camera: Camera,
    public dialog: MatDialog,
    private alertController: AlertController,
    private statusBar: StatusBar,
    private navctrl: NavController,
    private route: ActivatedRoute,
    private storage: Storage,
    public platform: Platform,
    private router: Router,
    public actionSheetController: ActionSheetController,
    private network: Network,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public helper: Helper,
    public loadingController: LoadingController,
    public apiservice: APIService,
    private webserver: WebServer,
    private alertCtrl: AlertController,
    public modalController: ModalController
  ) {
    dateAdapter.setLocale("en-In");
    this.addNewLead = new AddNewLead();
    this.postNewLead = new PostNewLead();
    this.kycDocuments = new KYCDocuments();
    this.credentialsForm = this.formBuilder.group({
      // dob: ['', Validators.required],
      mobile: ["", Validators.compose([Validators.required])],
      email: [
        "",
        Validators.compose([
          // tslint:disable-next-line:max-line-length
          Validators.pattern(this.EmailRegex),
          Validators.required,
        ]),
      ],
      full_name: [
        "",
        Validators.compose([
          Validators.pattern("[a-zA-Z ]+"),
          Validators.required,
        ]),
      ],
      /*middlename: ['', Validators.compose([Validators.pattern('[a-zA-Z ]+'), Validators.required])],
      lastname: ['', Validators.compose([Validators.pattern('[a-zA-Z ]+'), Validators.required])],*/
    });

    /*Get Lead Form Data*/
    // this.getLeadFormdata();

    this.platform.backButton.subscribeWithPriority(1, () => {
      this.storage.set("IDFromPerformance", 2);
      this.abortRequest();
    });
  }

  ngOnInit() {
    /*Get Country Code*/
    if (this.route.snapshot.paramMap.get("countryCode") != null) {
      this.postNewLead.country_code =
        this.route.snapshot.paramMap.get("countryCode");
      this.countrycode = this.route.snapshot.paramMap.get("countryCode");
    } else {
      this.postNewLead.country_code = "91";
      this.countrycode = "91";
    }
    // this.presentActionSheet();
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.storage.set("IDFromPerformance", 2);
      this.abortRequest();
    });

    this.route.snapshot.paramMap.get("id");

    this.helper.getUserInfo().then((val: any) => {
      this.username = val.name;
      this.newapi = val.data.api_token;
      this.api_token = val.data.api_token;
    });

    // get CP Info
    this.storage.get("fullname").then((val) => {
      // this.username = val;
      this.storage.get("position").then((val1) => {
        this.position = val1;
        this.storage.get("cp_executive_id").then((val2) => {
          this.postNewLead.cp_executive_id = val2;
          this.storage.get("apiToken").then((val3) => {
            // this.newapi = val3;
            // this.api_token = val3;
            // this.kycDocuments.api_token = val3;
            // console.log("newleadflag " + this.newapi);
            // console.log("newleadflag " + this.kycDocuments.api_token);
            this.postNewLead.buying_for = 1;
            if (
              !(this.network.type !== "none" && this.network.type !== "unknown")
            ) {
              this.helper.presentToast("Please on Internet Connection");
            } else {
              this.storage.get("NewLead").then((val4) => {
                if (val4 === 1) {
                  this.postNewLead = new PostNewLead();
                  this.getLeadFormdata();
                } else if (val4 === 2) {
                  this.storage.get("LeadModelFormData").then((data) => {
                    if (data != null) {
                      this.postNewLead = data;
                      this.getLeadFormdata();
                    }
                  });
                }
                console.log("LeadModelFormData " + this.postNewLead);
              });
            }
          });
        });
      });
    });

    /*Get Country Code*/
    if (this.route.snapshot.paramMap.get("countryCode") != null) {
      this.postNewLead.country_code =
        "+" + this.route.snapshot.paramMap.get("countryCode");
      this.countrycode = "+" + this.route.snapshot.paramMap.get("countryCode");
    } else {
      this.postNewLead.country_code = "+91";
      this.countrycode = "+91";
    }
    /* this.storage.get('id').then((val) => {
  console.log(val);
  if (val == 0) {
    this.getLeadFormdata();
  }else{
    this.storage.get('LeadModelFormData').then((val) => {
      if (val != null) {
        this.postNewLead = val;
      }
      console.log('LeadModelFormData ' + this.postNewLead);
    });
  }
});*/
  }

  getLeadFormdata() {
    if (this.network.type !== "none" && this.network.type !== "unknown") {
      this.apiservice.getLeadFormData(this.newapi).subscribe(
        (data) => {
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);

          if (Value.success === 1) {
            this.addNewLead = Value.data;
            this.selectedNameprefixName =
              this.addNewLead.person_name_prefix[0].name_prefix;
          } else {
            this.helper.presentToast("Something went wrong!");
          }
        },
        (error) => {
          this.helper.presentToast("Something went wrong!");
        }
      );
    } else {
      console.log("Network Type :" + this.network.type);
      this.helper.presentToast("Please on Internet Connection!");
    }
  }

  getNamePrefixvalue(index: any) {
    this.selectedNameprefixid =
      this.addNewLead.person_name_prefix[index].name_prefix_id;
    this.selectedNameprefixName =
      this.addNewLead.person_name_prefix[index].name_prefix;
    console.log("selectedNameprefixName :" + this.selectedNameprefixName);
  }

  getProjectsvalue(index: any) {
    this.selectedProjectId = this.addNewLead.projects[index].project_id;
    this.selectedProject = this.addNewLead.projects[index].project_name;
    this.unitcategories = this.addNewLead.projects[index].unit_categories;
    console.log("unitcategories :" + this.unitcategories.length);
    console.log("selectedProject :" + this.selectedProject);
  }

  getCategoriesvalue(index: any) {
    this.selectedCategoryId = this.unitcategories[index].unit_category_id;
    this.selectedCategory = this.unitcategories[index].unit_category;
    console.log("selectedCategoryId :" + this.selectedCategoryId);
  }

  getLeadBuyingForvalue(index: any) {
    this.selectedBuyingForid =
      this.addNewLead.lead_buying_for[index].buying_for_reason_id;
    this.selectedBuyingFor =
      this.addNewLead.lead_buying_for[index].buying_for_reason;
    console.log("selectedBuyingFor :" + this.selectedBuyingFor);
  }

  getLeadBuyingDurationvalue(index: any) {
    this.selectedBuyingDuarationid =
      this.addNewLead.lead_buying_in_duration[index].buying_in_duration_id;
    this.selectedBuyingDuaration =
      this.addNewLead.lead_buying_in_duration[index].buying_in_duration;
    console.log("selectedNameprefixName :" + this.selectedBuyingDuaration);
  }

  getLeadProfession(index: any) {
    this.selectedProfessionid =
      this.addNewLead.lead_professions[index].lead_professions_id;
    this.selectedProfession =
      this.addNewLead.lead_professions[index].lead_professions_id;
  }

  buyingFor(val) {
    console.log("val" + val);
    this.postNewLead.buying_for = val;
  }

  selectcountry() {
    this.storage.set("LeadModelFormData", this.postNewLead);
    this.storage.set("NewLead", 2);
    this.router.navigate(["/countrycodelist/"]);
  }

  addlead(value: any) {
    if (!this.selectedNameprefixName) {
      this.helper.presentToast("Please Select Name Prefix");
    } else if (!this.postNewLead.first_name) {
      this.helper.presentToast("Please Enter Full Name");
    } else if (!this.postNewLead.email) {
      this.helper.presentToast("Please Enter Email Address");
    } else if (!value.mobile) {
      this.helper.presentToast("Please Enter  Mobile Number!");
    } else if (!this.hideMe && this.countrycode == "+91") {
      this.helper.presentToast("Please Verify your Mobile Number!");
    } else if (!this.selectedProfessionid) {
      this.helper.presentToast("Please Select Work In!");
    } else if (!this.selectedProjectId) {
      this.helper.presentToast("Please Select Project!");
    } else if (!this.selectedCategoryId) {
      this.helper.presentToast("Please Select Flat type!");
    } else if (!this.postNewLead.site_visit_from) {
      this.helper.presentToast("Please Select Site Visit from date!");
    } else if (!this.postNewLead.site_visit_to) {
      this.helper.presentToast("Please Select Site Visit to date!");
    } else if (
      !(this.network.type !== "none" && this.network.type !== "unknown")
    ) {
      this.helper.presentToast("Please on Internet Connection");
    } else {
      /*Add New Lead*/
      /*Get Country Code*/
      if (this.route.snapshot.paramMap.get("countryCode") != null) {
        this.postNewLead.country_code =
          "+" + this.route.snapshot.paramMap.get("countryCode");
        this.countrycode =
          "+" + this.route.snapshot.paramMap.get("countryCode");
      } else {
        this.postNewLead.country_code = "+91";
        this.countrycode = "+91";
      }
      this.postNewLead.api_token = this.newapi;
      this.postNewLead.prefix = this.selectedNameprefixName;
      this.postNewLead.project_id = this.selectedProjectId;
      this.postNewLead.unit_category_id = this.selectedCategoryId;
      this.postNewLead.buying_in_duration_id = this.selectedBuyingDuarationid;
      this.postNewLead.buying_for_reason_id = this.selectedBuyingForid;
      this.postNewLead.site_visit_from = this.datePipe.transform(
        this.postNewLead.site_visit_from,
        "yyyy-MM-dd"
      );
      this.postNewLead.site_visit_to = this.datePipe.transform(
        this.postNewLead.site_visit_to,
        "yyyy-MM-dd"
      );
      // this.postNewLead.dob = this.datePipe.transform(this.postNewLead.dob, 'yyyy-MM-dd');
      this.storage.get("cp_executive_id").then((val) => {
        this.postNewLead.cp_executive_id = val;
        this.sendLeadConfirm();
      });
    }
  }

  async sendLeadConfirm() {
    const me = this;
    const alert = await this.alertCtrl.create({
      header: "Submit Lead",
      message: "Are you sure to submit this lead to VJ Team?",
      buttons: [
        {
          text: "No",
          role: "no",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            /this.helper.showLoader('Processing..');/;
            this.presentLoading().then(() => {
              console.log(this.postNewLead);
              let data = { ...this.postNewLead, ...this.kyc_data };
              // return;
              this.apiservice.postCPLead(data).subscribe(
                (response) => {
                  this.successvalue = JSON.stringify(response.body);
                  const Value = JSON.parse(this.successvalue);

                  if (Value.success === 1) {
                    this.helper.swAlert("success", "Lead Added Successfully!");
                    this.storage.set("IDFromPerformance", 2);
                    this.router.navigate(["/home/"]);
                    this.dismissLoading();
                  }

                  //   this.kycDocuments.lead_id = Value.data.lead_id;
                  //   // this.kycDocuments.api_token=this.successvalue.data.api_token;
                  //   me.postKYCDocuments(Value.data.lead_id);
                  //   this.dismissLoading();
                  //   console.log("Value.success_lead added" + Value.success);
                  //   /* this.helper.hideLoader();*/

                  //   this.helper.presentToastSuccess("File Upload Successfully");
                  //   this.alert();
                  //   this.storage.set("IDFromPerformance", 2);
                  //   this.router.navigate(["/home/"]);
                  //   //  this.dismissLoading();
                  // }
                  // return response;
                },

                (error) => {
                  this.dismissLoading();
                  this.helper.presentToastError("Something went wrong");
                }
              );
            });
          },
        },
      ],
    });
    await alert.present();
  }

  private postKYCDocuments(lead_id) {
    /* console.log(lead_id);
     console.log('sukrut postKYCDocuments' );*/
    this.kycsuccessvalue = JSON.stringify(this.kycdocumentspath);
    this.kycdocumentspath = JSON.parse(this.kycsuccessvalue);
    console.log(" this.kycdocumentspath" + this.kycsuccessvalue);

    if (this.kycdocumentspath.length !== 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.kycdocumentspath.length; i++) {
        this.kycDocuments.doc_type_id = this.kycdocumentspath[i].doc_type_id;
        this.kycDocuments.file_uri = this.kycdocumentspath[i].file_uri;
        this.kycDocuments.lead_id = lead_id;
        this.kycDocuments.api_token = this.newapi;
        console.log(
          "post",
          this.kycDocuments.api_token,
          this.kycDocuments.lead_id
        );
        /* this.helper.showLoader('Processing..');*/
        this.apiservice.postCPLeadKYC(this.kycDocuments).subscribe(
          (response) => {
            this.successvalue = JSON.stringify(response.body);
            const Value = JSON.parse(this.successvalue);
            if (Value.success === 1) {
              console.log("Success Docs Upload!");
              /this.helper.hideLoader();/;
              // this.dismissLoading();
            } else {
              // this.dismissLoading();
              this.helper.presentToastError("File not uploaded yet!");
              console.log("Docs file not uploaded yet!");
            }
            // return response;
          },
          (error) => {
            // this.dismissLoading();
            this.helper.presentToastError("Something went wrong!");
            console.log("Something went wrong!");
            // return error;
          }
        );
      }
    }
  }

  goback() {
    if (this.addNewLead) {
      this.abortRequest();
    } else {
      this.storage.set("IDFromPerformance", 2);
      this.router.navigate(["/home/"]);
      console.log("Click on backpress");
    }
  }

  async abortRequest() {
    const alert = await this.alertCtrl.create({
      header: "Abort Lead",
      message: "Are you sure you want to abort lead?",
      buttons: [
        {
          text: "No",
          role: "no",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            this.storage.set("IDFromPerformance", 2);
            this.router.navigate(["/home/"]);
          },
        },
      ],
    });
    await alert.present();
  }

  /*Valid Date For Date Picker*/
  validDate() {
    this.minDateNew = new Date(
      this.datePipe.transform(this.postNewLead.site_visit_from, "yyyy-MM-dd")
    );
  }

  /*Verfiy OTP Method*/
  click(newValue: any) {
    if (!newValue.mobile) {
      this.helper.presentToast("Please Enter Mobile Number!");
    } else if (
      !(this.network.type !== "none" && this.network.type !== "unknown")
    ) {
      this.helper.presentToast("Please on Internet Connection!");
    } else {
      this.verifyOTP.country_code = this.countrycode;
      this.verifyOTP.mobile_number = newValue.mobile;
      const param = {
        username: this.verifyOTP.mobile_number,
      };
      this.postNewLead.mobile_number = newValue.mobile;
      console.log(this.postNewLead.mobile_number);
      this.storage.set("apiData", param);
      this.verifyOTP.api_token = this.webserver.API_TOKEN_EXTERNAL;
      this.presentLoading().then(() => {
        this.apiservice.PostverifysendOTP(this.verifyOTP).subscribe(
          (response) => {
            console.log("responseBody" + JSON.stringify(response.body));
            this.successvalue = JSON.stringify(response.body);
            const Value = JSON.parse(this.successvalue);
            if (Value.success === 1) {
              this.alive = !this.alive;
              const otpData = Value.data;
              this.loginifo.otp = otpData.otp;
              // this.helper.presentToast(this.loginifo.otp);
              this.Resendotp();
              this.dismissLoading();
            } else {
              this.helper.presentToastError("Something went wrong!");
            }
            return response;
          },
          (error) => {
            this.dismissLoading();
            this.helper.presentToastError("Something went wrong!");
          }
        );
      });
    }
  }

  /*Resend OTP*/
  Resendotp() {
    if (this.disabled === true) {
      this.changeStatus();
    } else {
      this.Resendclick();
    }
  }

  /*Change Status For Button*/
  changeStatus() {
    setTimeout(() => {
      this.disabled = !this.disabled;
      console.log(this.disabled);
      this.color1 = false;
      console.log("7 seconds!");
    }, 7000);
    console.log("5 seconds!");
  }

  /*Click For Resend API Call*/
  Resendclick() {
    const me = this;
    me.storage.get("apiData").then((val) => {
      me.mobile = this.credentialsForm.controls.mobile.value;
      console.log(me.mobile);
      this.verifyOTP.country_code = this.countrycode;
      this.verifyOTP.mobile_number = me.mobile;
      this.verifyOTP.api_token = this.webserver.API_TOKEN_EXTERNAL;
      if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
        this.helper.presentToast("Please on Internet Connection");
      } else {
        // Call API
        if (!this.credentialsForm.controls.mobile.value) {
          this.helper.presentToast("Please on enter mobile number!");
        } else {
          this.presentLoading().then(() => {
            this.apiservice.PostverifysendOTP(this.verifyOTP).subscribe(
              (data) => {
                this.successvalue = JSON.stringify(data.body);
                const Value = JSON.parse(this.successvalue);
                console.log("successvalue", Value.success);
                if (Value.success === 1) {
                  this.dismissLoading();
                  const otpData = Value.data;
                  this.loginifo.otp = otpData.otp;
                  //this.helper.presentToast(this.loginifo.otp);
                  console.log("otp" + otpData.otp);
                  console.log("otp" + this.loginifo.otp);
                } else {
                  this.helper.presentToastError("Something went wrong!");
                }
              },
              (error) => {
                this.dismissLoading();
                console.log(error);
              }
            );
          });
        }
      }
    });
  }

  /*Otp and Confirm Otp */
  verifyconfirmotp() {
    console.log("confirmotp", this.loginifo.confirmotp);
    console.log("otp", this.loginifo.otp);
    if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
      this.helper.presentToast("Please on Internet Connection!");
    } else if (!this.loginifo.confirmotp) {
      // Remember
      this.helper.presentToast("Enter OTP!");
    } else if (this.loginifo.confirmotp != this.loginifo.otp) {
      // Remember
      this.helper.presentToast("OTP does not match!");
    } else {
      this.helper.showLoader("");
      this.helper.hideLoader();
      this.helper.swAlert("success", "Verification Succesfully!");
      this.hide();
      this.isReadonly();
    }
  }

  // alert() {
  //   Swal.fire({
  //     type: "success",
  //     title: "Lead Added Successfully!",
  //     showConfirmButton: false,
  //     timer: 1500,
  //     position: "center",
  //   });
  // }

  alertVerification() {
    Swal.fire({
      type: "success",
      title: "Verified Successfully!",
      showConfirmButton: false,
      timer: 1500,
      position: "center",
    });
  }

  /*Hide Div*/
  hide() {
    this.hideMe = true;
  }

  /*ReadOnly*/
  isReadonly() {
    this.read = true;
  }

  async presentActionSheet(ductypeId: any = 1, dyc_name: any = "Adhar card") {
    // const actionSheet = await this.actionSheetController.create({
    //   header: "Select Using",
    //   buttons: [
    //     {
    //       text: "Camera",
    //       handler: () => {
    //         this.takephoto(ductypeId);
    //       },
    //     },
    //     {
    //       text: "Gallery",
    //       handler: () => {
    //         this.openGalley(ductypeId);
    //       },
    //     },
    //     {
    //       text: "Cancel",
    //       role: "cancel",
    //       handler: () => {},
    //     },
    //   ],
    // });
    // await actionSheet.present();
    let data = { ductypeId, dyc_name };
    const modal = await this.modalController.create({
      component: KycModalPage,
      componentProps: data,
      cssClass: "select-modal",
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log(dataReturned.data);
        if (dataReturned.data != null) {
          let { voter_no, adhar_no, pan_no } = dataReturned.data;
          if (dataReturned.data.doc_id == 1) {
            this.kyc_data.adhar_no = dataReturned.data.adhar_no;
          } else if (dataReturned.data.doc_id == 2) {
            this.kyc_data.pan_no = dataReturned.data.pan_no;
          } else if (dataReturned.data.doc_id == 3) {
            this.kyc_data.voter_no = dataReturned.data.voter_no;
          }

          let objIndex = this.kyc_doc_info.findIndex(
            (obj) => obj.doc_type_id == dataReturned.data.doc_id
          );
          this.kyc_doc_info[objIndex].is_verified = true;
        }

        console.log(this.kyc_data);
        // this.dataReturned = dataReturned.data;
        // alert("Modal Sent Data :" + dataReturned);
      }
    });

    return await modal.present();
  }

  takephoto(ductypeId: any) {
    console.log("In get Photo Method");
    const options: CameraOptions = {
      quality: 20,
      targetHeight: 600,
      targetWidth: 600,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        const resolvedFilePath = "data:image/png;base64," + imageData;
        console.log(ductypeId);
        console.log(resolvedFilePath);
        this.kycDocuments = new KYCDocuments();
        this.addNewLead.kyc_doc_types[ductypeId - 1].doc_path =
          resolvedFilePath;
        this.kycDocuments.doc_type_id = ductypeId;
        this.kycDocuments.file_uri = resolvedFilePath;
        this.kycdocumentspath.push({
          doc_type_id: ductypeId,
          file_uri: resolvedFilePath,
          api_token: "",
          lead_id: "",
        });
        console.log("stringyfy", JSON.stringify(this.kycdocumentspath));

        console.log("Check Image" + imageData);
      },
      (err) => {
        console.log("Check Error Red" + err);
      }
    );
  }

  openGalley(ductypeId: any) {
    const optionsGallery: CameraOptions = {
      quality: 10,
      targetHeight: 600,
      targetWidth: 600,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(optionsGallery).then(
      (imageData) => {
        const resolvedFilePath = "data:image/png;base64," + imageData;
        this.kycDocuments = new KYCDocuments();
        this.addNewLead.kyc_doc_types[ductypeId - 1].doc_path =
          resolvedFilePath;
        this.kycDocuments.doc_type_id = ductypeId;
        this.kycDocuments.file_uri = resolvedFilePath;
        this.kycdocumentspath.push({
          doc_type_id: ductypeId,
          file_uri: resolvedFilePath,
          api_token: "",
          lead_id: "",
        });
        console.log(JSON.stringify(this.kycdocumentspath));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /* Use Data From Response Object*/
  storeData(loginData) {
    const me = this;
    me.storage.set("lead_id", loginData.lead_id);
  }

  async presentAlertError(msg: any) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ["Ok"],
      cssClass: "alertDanger",
    });
    await alert.present();
  }
  getMIMEtype(extn) {
    const ext = extn.toLowerCase();
    const MIMETypes = {
      txt: "text/plain",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      doc: "application/msword",
      pdf: "application/pdf",
      jpg: "image/jpeg",
      bmp: "image/bmp",
      png: "image/png",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      rtf: "application/rtf",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    };
    return MIMETypes[ext];
  }

  async presentLoading() {
    this.loader = await this.loadingController.create({
      translucent: true,
    });
    await this.loader.present();
  }

  async dismissLoading() {
    await this.loader.dismiss();
  }

  onKeyPress(event) {
    // tslint:disable-next-line:max-line-length
    if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122) ||
      event.keyCode == 32 ||
      event.keyCode == 46
    ) {
      return true;
    } else {
      return false;
    }
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
