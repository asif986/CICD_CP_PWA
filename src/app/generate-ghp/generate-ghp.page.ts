import { Component, NgZone, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { MatDialog } from "@angular/material";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  NavController,
  Platform,
} from "@ionic/angular";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { Network } from "@ionic-native/network/ngx";
import { FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Helper } from "../services/Helper";
import { APIService } from "../services/APIService";
import { WebServer } from "../services/WebServer";
import { AddNewLead } from "../models/AddNewLead";
import { GetGHPCUIDData } from "../models/GetGHPCUIDData";
import { PostGHP } from "../models/PostGHP";
import Swal from "sweetalert2";
import { KYCDocuments } from "../models/KYCDocuments";
declare var RazorpayCheckout: any;
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-generate-ghp",
  templateUrl: "./generate-ghp.page.html",
  styleUrls: ["./generate-ghp.page.scss"],
})
export class GenerateGHPPage implements OnInit {
  loader: any;
  successvalue: any;
  newapi: any;
  isSpinner: any = true;
  selectedProjectId: any;
  selectedProject: any;
  selectedEventId: any;
  selectedEvent: any;
  selectedTokenId: any;
  selectedToken: any;
  selectedTokenAmount: any;
  is_kyc_uploaded: any;
  cpEX_ID: any;
  leadID: any;
  tokens = [];
  getghpgenerate: GetGHPCUIDData;
  postGenenateGHP: PostGHP;
  kycDocuments: KYCDocuments;
  kycsuccessvalue: any;
  kycdocumentspath: Array<KYCDocuments> = [];
  sales_person_id: any;

  public mode: any;
  mobile_no: any;
  payLink: any;
  email: any;
  ghp_request_created_at: any;
  f2: any;

  FromDrillDownList: any;

  constructor(
    private datePipe: DatePipe,
    private zone: NgZone,
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
    private http: HttpClient,
    public helper: Helper,
    public loadingController: LoadingController,
    public apiservice: APIService,
    private webserver: WebServer,
    private alertCtrl: AlertController
  ) {
    this.getghpgenerate = new GetGHPCUIDData();
    this.postGenenateGHP = new PostGHP();
    this.kycDocuments = new KYCDocuments();

    this.platform.backButton.subscribeWithPriority(1, () => {
      this.abortRequest();
    });

    this.mode = 5;
    this.postGenenateGHP.payment_mode_id = 5;
    console.log("payment_mode_id", this.postGenenateGHP.payment_mode_id);
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.storage.get("FromDrillDownList").then((FromDrillDownList) => {
      this.FromDrillDownList = FromDrillDownList;
      console.log(this.FromDrillDownList);
    });

    this.platform.backButton.subscribeWithPriority(1, () => {
      this.abortRequest();
    });

    this.storage.get("Value").then((val) => {
      if (val == 1) {
        this.storage.get("CustomerName").then((CustomerName) => {
          this.storage.get("CustomerID").then((CustomerID) => {
            this.storage.get("LeadID").then((LeadID) => {
              this.storage.get("is_kyc_uploaded").then((is_kyc_uploaded) => {
                this.storage.get("mobile").then((mobile) => {
                  this.storage.get("email").then((email) => {
                    this.storage
                      .get("sales_person_id")
                      .then((sales_person_id) => {
                        this.postGenenateGHP.cuid = CustomerID;
                        this.postGenenateGHP.name = CustomerName;
                        this.leadID = LeadID;
                        this.is_kyc_uploaded = is_kyc_uploaded;
                        this.mobile_no = mobile;
                        this.email = email;
                        this.postGenenateGHP.sales_person_id = sales_person_id;

                        console.log(
                          " this.postGenenateGHP.cuid",
                          this.postGenenateGHP.cuid
                        );
                        console.log(
                          " this.postGenenateGHP.name",
                          this.postGenenateGHP.name
                        );
                        console.log(
                          "this.is_kyc_uploaded",
                          this.is_kyc_uploaded
                        );
                        console.log("sales_person_id", this.sales_person_id);
                        console.log(
                          "from home  - sales_person_id",
                          this.postGenenateGHP.sales_person_id
                        );

                        this.storage.set("name", this.postGenenateGHP.name);
                        this.storage.set("mobile", this.mobile_no);
                        this.storage.set("email", this.email);
                      });
                  });
                });
              });
            });
          });
        });
      } else if (val == 2) {
        this.storage.get("StoreData").then((val) => {
          console.log("StoreData", val);
          this.postGenenateGHP.cuid = val[0];
          this.postGenenateGHP.name = val[1];
          this.leadID = val[2];
          this.is_kyc_uploaded = val[3];
          this.postGenenateGHP.sales_person_id = val[4];
          this.mobile_no = val[5];
          this.email = val[6];
          console.log("StoreData", val[0]);
          console.log("fullname", val[1]);
          console.log("StoreData", val[2]);
          console.log("StoreData", val[3]);
          console.log("mobile_no", this.mobile_no);
          console.log("email", this.email);
          console.log(
            "StoreData - sales_person_id",
            this.postGenenateGHP.sales_person_id
          );
          this.storage.set("name", this.postGenenateGHP.name);
          this.storage.set("mobile", this.mobile_no);
          this.storage.set("email", this.email);
        });
      }
    });

    this.storage.get("cp_executive_id").then((val) => {
      this.postGenenateGHP.cp_executive_id = val;
      this.cpEX_ID = val;
      console.log(this.postGenenateGHP.cp_executive_id);
      console.log(this.cpEX_ID);
    });
    this.storage.get("apiToken").then((val1) => {
      this.newapi = val1;
      this.postGenenateGHP.api_token = val1;
      if (!(this.network.type !== "none" && this.network.type !== "unknown")) {
        this.helper.presentToastError("Please on Internet Connection");
        this.isSpinner = false;
      } else {
        this.isSpinner = true;
        this.getcuidtokenFormdata();
      }
    });
  }

  getcuidtokenFormdata() {
    if (this.network.type !== "none" && this.network.type !== "unknown") {
      this.apiservice.getcpGHP(this.newapi).subscribe(
        (data) => {
          this.successvalue = JSON.stringify(data.body);
          const Value = JSON.parse(this.successvalue);
          if (Value.success === 1) {
            this.getghpgenerate = Value.data;
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

  getProjectsvalue(index: any) {
    this.selectedProjectId = this.getghpgenerate.projects[index].project_id;
    this.selectedProject = this.getghpgenerate.projects[index].project_name;
    this.storage.set("selectedProjectID", this.selectedProjectId);
    this.storage.set("projectname", this.selectedProject);
    console.log("selectedProject :" + this.selectedProject);
  }

  /* getEventsvalue(index: any) {
    this.selectedProjectId = this.getghpgenerate.projects[index].project_id;
    this.selectedProject = this.getghpgenerate.projects[index].project_name;
    console.log('selectedProject :' + this.selectedProject);
  }
*/

  getEventsvalue(index: any) {
    this.selectedEventId = this.getghpgenerate.events[index].event_id;
    this.selectedEvent = this.getghpgenerate.events[index].event_title;
    this.tokens = this.getghpgenerate.events[index].tokens;
    this.storage.set("selectedEventId", this.selectedEventId);
    this.storage.set("eventtitle", this.selectedEvent);
    console.log("unitcategories :" + this.tokens.length);
    console.log("selectedEvent :" + this.selectedEvent);
  }

  getTokenvalue(index: any) {
    this.selectedTokenId = this.tokens[index].token_type_id;
    this.selectedToken = this.tokens[index].token_type;
    this.selectedTokenAmount = this.tokens[index].amount;
    this.postGenenateGHP.amount = this.tokens[index].amount;
    this.storage.set("selectedTokenId", this.selectedTokenId);
    console.log("selectedCategoryId :" + this.selectedTokenId);
    console.log("selectedTokenAmount :" + this.selectedTokenAmount);
  }

  goback() {
    this.abortRequest();
  }

  generateGHPRequest() {
    this.postKYCDocuments();

    this.presentLoading().then(
      () => {
        this.apiservice.PostToken(this.postGenenateGHP).subscribe(
          (response) => {
            this.successvalue = JSON.stringify(response.body);
            const Value = JSON.parse(this.successvalue);

            if (Value.success === 1) {
              this.payLink = Value.data.payment_link;
              this.ghp_request_created_at = Value.data.created_at;
              this.helper.hideLoader();

              this.dismissLoading();

              this.f2 = this.datePipe.transform(
                this.ghp_request_created_at,
                "dd-MM-yyyy"
              );

              // this.storage.set('name', this.postGenenateGHP.name);
              // this.storage.set('mobile', this.mobile_no);
              // this.storage.set('email', this.email);
              // this.storage.set('projectname', this.selectedProject);
              // this.storage.set('eventtitle', this.selectedEvent);

              if (this.selectedTokenId == 3) {
                this.storage.set("ghp_plus_date", this.f2);
                this.storage.set("ghp_plus_amount", this.selectedTokenAmount);
                this.storage.set("ghp_date", "null");
                this.storage.set("ghp_amount", "null");
                this.storage.set("checkGhp", 1);
              }
              if (this.selectedTokenId == 1) {
                this.storage.set("ghp_date", this.f2);
                this.storage.set("ghp_amount", this.selectedTokenAmount);
                this.storage.set("ghp_plus_date", "xd");
                this.storage.set("ghp_plus_amount", "xd");
                this.storage.set("checkGhp", 2);
              }

              this.storage.set("payment_link", this.payLink);
              this.storage.set("FromDrillDownList", this.FromDrillDownList);
              this.router.navigate(["/ghp-request/"]);

              // document.location.href = "https://wa.me/91"+this.mobile_no+"?text= Hello "+this.postGenenateGHP.name+" , %0a  %0a Thank you for showing your interest for Golden Hour Pass(GHP) of project {{projectname}}.  %0a %0a You are just one step ahead of becoming a member of VJ Family! %0a %0a Kindly click on the below link and pay for your Golden Hour Pass. And get confirm your GHP for the event {{eventtitle}}. %0a %0a "+this.payLink+" .";
              this.alert();
            }
            return response;
          },
          (error) => {
            alert(JSON.stringify(error));
            this.dismissLoading();
            this.helper.presentToastError("Something went wrong");
          }
        );
      },
      (error) => {
        console.log(3);
        this.dismissLoading();
        this.helper.presentToastError("Server Error.Could not get Data!!");
      }
    );
  }
  payWithRazor() {
    console.log("inside razopay");
    const amount = Number(this.selectedTokenAmount) * 100;
    // return false;
    const options = {
      description: "Generate GHP Amount ",
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: "INR", // your 3 letter currency code
      key: "rzp_test_wN44N3LJbzWHQd", // your Key Id from Razorpay dashboard
      password: "TJkCPNcMcCZIdW7gzXy1Y2AR",
      amount, // Payment amount in smallest denomiation e.g. cents for USD
      name: "",
      prefill: {
        email: "",
        contact: "",
        name: "",
      },
      theme: {
        color: "#0055a5",
      },
      modal: {
        ondismiss() {
          alert("dismissed");
        },
      },
    };

    const successCallback = (success) => {
      //alert('payment_id: ' + success);
      this.callGHP(success);
    };

    const cancelCallback = function (error) {
      this.helper.presentToastError("Payment Not Done Yet!");
      //this.callGHP(error);
      //alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }

  setMethod(val: any) {
    this.mode = val;
    this.postGenenateGHP.payment_mode_id = val;
    console.log("payment_mode_id", this.postGenenateGHP.payment_mode_id);
  }

  generateGHP(msg) {
    if (!this.selectedProjectId) {
      this.helper.presentToast("Please Select Project!");
    } else if (!this.selectedProjectId) {
      this.helper.presentToast("Please Select Project!");
    } else if (!this.selectedEventId) {
      this.helper.presentToast("Please Select Event!");
    } else if (!this.selectedTokenId) {
      this.helper.presentToast("Please Select GHP Type!");
    } else if (!this.kycDocuments.doc_type_id && this.is_kyc_uploaded !== 1) {
      this.helper.presentToast("Please Select KYC Document!");
    } else if (
      !(this.network.type !== "none" && this.network.type !== "unknown")
    ) {
      this.helper.presentToast("Please on Internet Connection");
    } else {
      this.postGenenateGHP.api_token = this.newapi;
      this.postGenenateGHP.project_id = this.selectedProjectId;
      this.postGenenateGHP.event_id = this.selectedEventId;
      this.postGenenateGHP.token_type_id = this.selectedTokenId;
      this.postGenenateGHP.lead_id = this.leadID;
      if (this.is_kyc_uploaded !== 1) {
        //this.postKYCDocuments();

        this.sendGenerateGHP(msg);
      } else {
        this.sendGenerateGHP(msg);
      }
    }
  }

  /*  getPostValue() {

  }*/

  /*Send Advertisement*/
  async sendGenerateGHP(msg) {
    const me = this;
    const alert = await this.alertCtrl.create({
      header: "Generate GHP",
      message: msg,
      buttons: [
        {
          text: "No",
          role: "no",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            this.presentLoading().then(
              () => {
                this.dismissLoading();
                //this.callGHP(1234);
                if (this.postGenenateGHP.payment_mode_id == 4) {
                  this.payWithRazor();
                } else {
                  this.generateGHPRequest();
                }
              },
              (error) => {
                this.dismissLoading();
                this.helper.presentToastError(
                  "Server Error.Could not get Data!!"
                );
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }

  private postKYCDocuments() {
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
        this.kycDocuments.lead_id = this.leadID;
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
            // if(this.selectedTokenId==1 && this.mode==4){

            //   this.sendGenerateGHP(" Are you sure to pay and generate this GHP?");
            // }else if(this.selectedTokenId==3 && this.mode==4){
            //   this.sendGenerateGHP("Are you sure to pay and  generate this GHP + ?");

            // } else if(this.selectedTokenId==1 && this.mode==5){
            //   this.sendGenerateGHP("Are you sure to generate this GHP request?");

            // }else if(this.selectedTokenId==3 && this.mode==5){
            //   this.sendGenerateGHP("Are you sure to generate this GHP + request?");

            // }
            if (Value.success === 1) {
              /*console.log('Success Docs Upload!');*/
              /*this.helper.hideLoader();*/

              this.storage.get("cp_executive_id").then((val) => {
                this.postGenenateGHP.cp_executive_id = val;
              });
              this.helper.presentToastSuccess("File Upload Successfully");
            } else {
              this.helper.presentToastError("File not uploaded yet!");
              console.log("Docs file not uploaded yet!");
            }
            return response;
          },
          (error) => {
            this.helper.presentToastError("Something went wrong!");
            console.log("Something went wrong!");
            return error;
          }
        );
      }
    }
  }

  async presentActionSheet(ductypeId: any) {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Using",
      buttons: [
        {
          text: "Camera",
          handler: () => {
            this.takephoto(ductypeId);
          },
        },
        {
          text: "Gallery",
          handler: () => {
            this.openGalley(ductypeId);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }

  takephoto(ductypeId: any) {
    console.log("In get Photo Method");
    const options: CameraOptions = {
      quality: 15,
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
        this.getghpgenerate.kyc_doc_types[
          ductypeId - 1
        ].doc_path = resolvedFilePath;
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

  // this.camera.getPicture(optionsCamera).then((imageData) => {

  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     const resolvedFilePath = 'data:image/png;base64,' + imageData;
  //     console.log(ductypeId);
  //     console.log(resolvedFilePath);
  //     this.kycDocuments = new KYCDocuments();
  //     this.getghpgenerate.kyc_doc_types[ductypeId - 1].doc_path = resolvedFilePath;
  //     this.kycDocuments.doc_type_id = ductypeId;
  //     this.kycDocuments.file_uri = resolvedFilePath;
  //     this.kycdocumentspath.push({doc_type_id: ductypeId, file_uri: resolvedFilePath, api_token: '', lead_id: ''});
  //     console.log(JSON.stringify(this.kycdocumentspath));
  // }, (err) => {
  //     // Handle error
  // });

  openGalley(ductypeId: any) {
    const optionsGallery: CameraOptions = {
      // quality: 5,
      // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      // destinationType: this.camera.DestinationType.DATA_URL,
      // encodingType: this.camera.EncodingType.PNG,
      // mediaType: this.camera.MediaType.PICTURE
      quality: 15,
      targetHeight: 600,
      targetWidth: 600,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(optionsGallery).then(
      (imageData) => {
        // var imageData='';
        const resolvedFilePath = "data:image/png;base64," + imageData;
        // tslint:disable-next-line:max-line-length
        // var path='data:image/gif;base64,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';
        // resolvedFilePath=path;
        this.kycDocuments = new KYCDocuments();
        this.getghpgenerate.kyc_doc_types[
          ductypeId - 1
        ].doc_path = resolvedFilePath;
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
        // Handle error
        console.log(err);
      }
    );
  }

  /* Use Data From Response Object*/
  storeData(loginData) {
    const me = this;
    me.storage.set("lead_id", loginData.lead_id);
  }

  /*Call GHP After Razor Payment*/
  async callGHP(paymentID: any) {
    // tslint:disable-next-line:prefer-const
    let paymentDetailsModes = [];
    paymentDetailsModes.push({
      payment_mode_details_title: paymentID,
      payment_mode_details_description: "test",
    });
    this.postGenenateGHP.payment_mode_details = paymentDetailsModes;
    console.log(
      "this.postGenenateGHP.payment_mode_details>",
      this.postGenenateGHP.payment_mode_details
    );
    // this.postGenenateGHP.payment_mode_details.push({payment_mode_details_title: paymentID , payment_mode_details_description: paymentID});
    this.presentLoading().then(
      () => {
        this.apiservice.PostToken(this.postGenenateGHP).subscribe(
          (response) => {
            this.successvalue = JSON.stringify(response.body);
            const Value = JSON.parse(this.successvalue);
            if (Value.success === 1) {
              this.helper.hideLoader();
              this.dismissLoading();
              this.router.navigate(["/home/"]);
              this.alert();
            }
            return response;
          },
          (error) => {
            alert(JSON.stringify(error));
            this.dismissLoading();
            this.helper.presentToastError("Something went wrong");
          }
        );
      },
      (error) => {
        console.log(3);
        this.dismissLoading();
        this.helper.presentToastError("Server Error.Could not get Data!!");
      }
    );
  }

  alert() {
    Swal.fire({
      type: "success",
      title: "GHP/GHP+ request generated Successfully!",
      showConfirmButton: false,
      timer: 1500,
      position: "center",
    });
  }

  async abortRequest() {
    const me = this;
    const alert = await this.alertCtrl.create({
      header: "Abort GHP/GHP+ Generation",
      message: "Are you sure you want to abort GHP/GHP+ Generation?",
      buttons: [
        {
          text: "No",
          role: "no",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            this.storage.get("Value").then((val) => {
              if (val == 2) {
                me.router.navigate(["/customer-unique-id/"]);
              } else if (val == 1) {
                if (this.FromDrillDownList == 0) {
                  this.router.navigate(["/leadslist-data/"]);
                } else if (this.FromDrillDownList == 1) {
                  me.router.navigate(["/home"]);
                }
              }
            });
          },
        },
      ],
    });
    await alert.present();
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
  goTOcuid() {
    this.router.navigate(["/customer-unique-id/"]);
  }
}
