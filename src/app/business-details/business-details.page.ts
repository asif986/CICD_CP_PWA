import { Component, OnInit } from "@angular/core";

import { APIService } from "../services/APIService";
import { CommonHelperService } from "../services/common-helper.service";
import { FormGroup } from "@angular/forms";
import { HttpResponse } from "@angular/common/http";
import { NavController } from "@ionic/angular";
import { StateService } from "./../services/state.service";
import { responsefromSalesPerson } from "../models/business-details";

const salespersons = [
  {
    user_id: 1391,
    person_id: 8061,
    email: "aboli.garud@javdekars.com",
    is_team_lead: 0,
    mobile_number: "9988776655",
    first_name: "Aboli",
    middle_name: null,
    last_name: "Garud",
    full_name: "Aboli  Garud",
    profile_photo: null,
  },
  {
    user_id: 5830,
    person_id: 37772,
    email: "ps@gmail.com",
    is_team_lead: 0,
    mobile_number: "9921871227",
    first_name: "Admin",
    middle_name: null,
    last_name: "User 2",
    full_name: "Admin  User 2",
    profile_photo: null,
  },
  {
    user_id: 1,
    person_id: 1,
    email: "admin@gmail.com",
    is_team_lead: 1,
    mobile_number: "7058233110",
    first_name: "Admin",
    middle_name: null,
    last_name: "User",
    full_name: "Admin  User",
    profile_photo: null,
  },
  {
    user_id: 15,
    person_id: 15,
    email: "ajinkya.v@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8554997484",
    first_name: "Ajinkya",
    middle_name: null,
    last_name: "Vaishampayan",
    full_name: "Ajinkya  Vaishampayan",
    profile_photo:
      "http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/User/Profile_Photos/VJ_DOC_15905586828.jpg",
  },
  {
    user_id: 1377,
    person_id: 7847,
    email: "ajinkya.joshi@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8554990328",
    first_name: "Ajinkya",
    middle_name: null,
    last_name: "Joshi",
    full_name: "Ajinkya  Joshi",
    profile_photo:
      "http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/User/Profile_Photos/VJ_DOC_16192735359.jpg",
  },
  {
    user_id: 766,
    person_id: 4541,
    email: "ankit.paradkar@javdekars.com",
    is_team_lead: 0,
    mobile_number: "9923596914",
    first_name: "Ankit",
    middle_name: null,
    last_name: "Paradkar",
    full_name: "Ankit  Paradkar",
    profile_photo: null,
  },
  {
    user_id: 7707,
    person_id: 54923,
    email: "ankita.rajput@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8956064327",
    first_name: "Ankita",
    middle_name: null,
    last_name: "Rajput",
    full_name: "Ankita  Rajput",
    profile_photo: null,
  },
  {
    user_id: 3444,
    person_id: 20318,
    email: "anmol.giri@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8956308290",
    first_name: "Anmol",
    middle_name: null,
    last_name: "Giri",
    full_name: "Anmol  Giri",
    profile_photo:
      "http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/User/Profile_Photos/VJ_DOC_16172795486.jpg",
  },
  {
    user_id: 6,
    person_id: 6,
    email: "ashutosh.gawande@javdekars.com",
    is_team_lead: 0,
    mobile_number: "7767937370",
    first_name: "Ashutosh",
    middle_name: null,
    last_name: "Gawande",
    full_name: "Ashutosh  Gawande",
    profile_photo: null,
  },
  {
    user_id: 2481,
    person_id: 16398,
    email: "debjani.chakraborty@javdekars.com",
    is_team_lead: 0,
    mobile_number: "9988776656",
    first_name: "Debjani",
    middle_name: null,
    last_name: "Chakraborty",
    full_name: "Debjani  Chakraborty",
    profile_photo:
      "http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/User/Profile_Photos/VJ_DOC_16042072149.jpg",
  },
  {
    user_id: 7666,
    person_id: 54425,
    email: "divyansh.tehare@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8956064329",
    first_name: "Divyansh",
    middle_name: null,
    last_name: "Tehare",
    full_name: "Divyansh  Tehare",
    profile_photo: null,
  },
  {
    user_id: 2,
    person_id: 2,
    email: "garima.yadav@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8554990307",
    first_name: "Garima",
    middle_name: null,
    last_name: "Yadav",
    full_name: "Garima  Yadav",
    profile_photo:
      "http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/User/Profile_Photos/VJ_DOC_15905560018.jpg",
  },
  {
    user_id: 7,
    person_id: 7,
    email: "indrajit.dhurwe@javdekars.com",
    is_team_lead: 0,
    mobile_number: "9168216611",
    first_name: "Indrajit",
    middle_name: null,
    last_name: "Dhurwe",
    full_name: "Indrajit  Dhurwe",
    profile_photo:
      "http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/User/Profile_Photos/VJ_DOC_16202135835.jpg",
  },
  {
    user_id: 1392,
    person_id: 8065,
    email: "linki.parasnani@javdekars.com",
    is_team_lead: 0,
    mobile_number: "7030563472",
    first_name: "Linki",
    middle_name: null,
    last_name: "Parasnani",
    full_name: "Linki  Parasnani",
    profile_photo: null,
  },
  {
    user_id: 17,
    person_id: 17,
    email: "mahendra.zine@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8554982922",
    first_name: "Mahendra",
    middle_name: null,
    last_name: "Zine",
    full_name: "Mahendra  Zine",
    profile_photo: null,
  },
  {
    user_id: 7437,
    person_id: 53473,
    email: "mohit.kulkarni@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8484039330",
    first_name: "Mohit",
    middle_name: null,
    last_name: "Kulkarni",
    full_name: "Mohit  Kulkarni",
    profile_photo: null,
  },
  {
    user_id: 8403,
    person_id: 61531,
    email: "it@javdekars.com",
    is_team_lead: 0,
    mobile_number: "9834418497",
    first_name: "Nagesh",
    middle_name: null,
    last_name: "Pawar",
    full_name: "Nagesh  Pawar",
    profile_photo: null,
  },
  {
    user_id: 7664,
    person_id: 54423,
    email: "nisha.samudre@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8956064328",
    first_name: "Nisha",
    middle_name: null,
    last_name: "Samudre",
    full_name: "Nisha  Samudre",
    profile_photo: null,
  },
  {
    user_id: 4119,
    person_id: 25690,
    email: "pallavi.rathod@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8956609009",
    first_name: "Pallavi",
    middle_name: null,
    last_name: "Rathod",
    full_name: "Pallavi  Rathod",
    profile_photo: null,
  },
  {
    user_id: 7438,
    person_id: 53475,
    email: "pooja.pathak@javdekars.com",
    is_team_lead: 0,
    mobile_number: "9175952763",
    first_name: "Pooja",
    middle_name: null,
    last_name: "Pathak",
    full_name: "Pooja  Pathak",
    profile_photo: null,
  },
  {
    user_id: 4115,
    person_id: 25638,
    email: "pratik.raje@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8956519009",
    first_name: "Pratik",
    middle_name: "Mahesh",
    last_name: "Raje",
    full_name: "Pratik Mahesh Raje",
    profile_photo:
      "http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/User/Profile_Photos/VJ_DOC_16405218314.jpg",
  },
  {
    user_id: 4114,
    person_id: 25637,
    email: "pratik.suchak@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8956259009",
    first_name: "Pratik",
    middle_name: null,
    last_name: "Suchak",
    full_name: "Pratik  Suchak",
    profile_photo: null,
  },
  {
    user_id: 5,
    person_id: 5,
    email: "raj.kewlani@javdekars.com",
    is_team_lead: 1,
    mobile_number: "8554990500",
    first_name: "Raj",
    middle_name: null,
    last_name: "kewlani",
    full_name: "Raj  kewlani",
    profile_photo:
      "http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/User/Profile_Photos/VJ_DOC_15905684463.jpg",
  },
  {
    user_id: 5863,
    person_id: 37966,
    email: "rohit.agarwal@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8605168200",
    first_name: "Rohit",
    middle_name: null,
    last_name: "Agarwal",
    full_name: "Rohit  Agarwal",
    profile_photo: null,
  },
  {
    user_id: 7436,
    person_id: 53469,
    email: "Sachin.pawar@javdekars.com",
    is_team_lead: 0,
    mobile_number: "9175145866",
    first_name: "Sachin",
    middle_name: null,
    last_name: "Pawar",
    full_name: "Sachin  Pawar",
    profile_photo: null,
  },
  {
    user_id: 8,
    person_id: 8,
    email: "shreyas.kulkarni@javdekars.com",
    is_team_lead: 0,
    mobile_number: "7767926260",
    first_name: "Shreyas",
    middle_name: null,
    last_name: "Kulkarni",
    full_name: "Shreyas  Kulkarni",
    profile_photo: null,
  },
  {
    user_id: 14,
    person_id: 14,
    email: "shweta.uplap@javdekars.com",
    is_team_lead: 1,
    mobile_number: "8554990330",
    first_name: "Shweta",
    middle_name: null,
    last_name: "Uplap",
    full_name: "Shweta  Uplap",
    profile_photo: null,
  },
  {
    user_id: 1705,
    person_id: 9958,
    email: "siddesh.joshi@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8530111807",
    first_name: "Siddesh",
    middle_name: null,
    last_name: "Joshi",
    full_name: "Siddesh  Joshi",
    profile_photo: null,
  },
  {
    user_id: 3445,
    person_id: 20319,
    email: "suraj.singh@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8956308289",
    first_name: "Suraj",
    middle_name: null,
    last_name: "Singh",
    full_name: "Suraj  Singh",
    profile_photo: null,
  },
  {
    user_id: 155,
    person_id: 169,
    email: "swapnil.sathe@javdekars.com",
    is_team_lead: 0,
    mobile_number: "9607930661",
    first_name: "Swapnil",
    middle_name: null,
    last_name: "Sathe",
    full_name: "Swapnil  Sathe",
    profile_photo: null,
  },
  {
    user_id: 13,
    person_id: 13,
    email: "tushar.tayde@javdekars.com",
    is_team_lead: 0,
    mobile_number: "7030564746",
    first_name: "Tushar",
    middle_name: null,
    last_name: "Tayde",
    full_name: "Tushar  Tayde",
    profile_photo:
      "http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/User/Profile_Photos/VJ_DOC_15905631468.jpg",
  },
  {
    user_id: 4,
    person_id: 4,
    email: "vikrant.mamidwar@javdekars.com",
    is_team_lead: 0,
    mobile_number: "9607930662",
    first_name: "Vikrant",
    middle_name: null,
    last_name: "Mamidwar",
    full_name: "Vikrant  Mamidwar",
    profile_photo:
      "http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/User/Profile_Photos/VJ_DOC_16172771714.jpg",
  },
  {
    user_id: 7281,
    person_id: 50457,
    email: "vishal.sharma@javdekars.com",
    is_team_lead: 1,
    mobile_number: "8554990329",
    first_name: "Vishal",
    middle_name: null,
    last_name: "Sharma",
    full_name: "Vishal  Sharma",
    profile_photo: null,
  },
  {
    user_id: 11,
    person_id: 11,
    email: "vrushali.chaudhari@javdekars.com",
    is_team_lead: 0,
    mobile_number: "9673474949",
    first_name: "Vrushali",
    middle_name: null,
    last_name: "Chaudhari",
    full_name: "Vrushali  Chaudhari",
    profile_photo: null,
  },
  {
    user_id: 3,
    person_id: 3,
    email: "yugal.rathod@javdekars.com",
    is_team_lead: 0,
    mobile_number: "9607941098",
    first_name: "Yugal",
    middle_name: null,
    last_name: "Rathod",
    full_name: "Yugal  Rathod",
    profile_photo:
      "http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/User/Profile_Photos/VJ_DOC_159040783310.jpg",
  },
  {
    user_id: 8411,
    person_id: 61569,
    email: "nagesh241299@gmail.com",
    is_team_lead: 0,
    mobile_number: "8796586729",
    first_name: "sanket",
    middle_name: null,
    last_name: "B",
    full_name: "sanket  B",
    profile_photo: null,
  },
  {
    user_id: 8412,
    person_id: 61570,
    email: "suresh123@test.com",
    is_team_lead: 1,
    mobile_number: "7788994455",
    first_name: "suresh",
    middle_name: "k",
    last_name: "raina",
    full_name: "suresh k raina",
    profile_photo: null,
  },
  {
    user_id: 7665,
    person_id: 54424,
    email: "sri.raman@javdekars.com",
    is_team_lead: 0,
    mobile_number: "8956064326",
    first_name: "vankamamudi",
    middle_name: "Sri",
    last_name: "Raman",
    full_name: "vankamamudi Sri Raman",
    profile_photo: null,
  },
];

@Component({
  selector: "app-business-details",
  templateUrl: "./business-details.page.html",
  styleUrls: ["./business-details.page.scss"],
})
export class BusinessDetailsPage implements OnInit {
  getAllSalesPerson = [...salespersons];
  temp: any = {
    header: [
      {
        headernm: "Business Details",
        index: 1,
        controls: [
          {
            inputtype: 4,
            placeholder: "CP Name",
            name: "registration_type_id",
            cssClass: "col",
            label: "Name:",
            value: 1,
            is_fos: 1,
            is_cp: 1,
            is_cp_indivial: 1,
            inital: 0,
            type: "text",
            sub_menus: [
              { index: 1, value: "CP Entitiy" },
              { index: 2, value: "FOS" },
            ],
            requiredError: "Please enter a valid full name!.",
            patternError: "Please proper full name!.",
            validators: {
              required: true,
            },
          },
          {
            inputtype: 2,
            is_fos: 0,
            is_cp: 1,
            is_cp_indivial: 1,
            placeholder: "CP Name",
            name: "fos_name",
            icon: "person",
            cssClass: "col",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid CP full name!.",
            patternError: "Please proper CP full name!.",
            validators: {
              required: true,
              pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
            },
          },
          {
            is_fos: 0,
            is_cp: 1,
            is_cp_indivial: 1,
            inputtype: 2,
            placeholder: "Billing Name",
            name: "billing_name",
            cssClass: "col",
            label: "Name:",
            value: "",
            icon: "business",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid Billing Name!.",
            patternError: "Please proper Billing Name!.",
            validators: {
              required: true,
              pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
            },
          },
          {
            is_fos: 0,
            is_cp: 1,
            is_cp_indivial: 1,
            inputtype: 9,
            placeholder: "Rera Number",
            name: "rera_no",
            icon: "aperture",
            cssClass: "col",
            label: "Name:",
            value: "",
            inital: 0,
            verificationmsg: "RERA NUMBER  IS VERIFIED",
            type: "text",
            requiredError: "Please enter a valid Rera Number!.",
            patternError: "Please proper Rera Number!.",
            validateError: "Please validated Rera Number!.",
            isValidatedError: 0,
            isValidatedtoDBError: 1,
            isValidatedid: 0,
            validators: {
              required: true,
              // pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
            },
          },
          {
            is_fos: 1,
            is_cp: 1,
            is_cp_indivial: 1,
            inputtype: 9,
            placeholder: "PAN Number",
            name: "pan_no",
            cssClass: "col",
            icon: "card",
            verificationmsg: "PAN CARD IS VERIFIED",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid PAN!.",
            patternError: "Please proper PAN!.",
            validateError: "Please validated PAN!.",
            isValidatedid: 1,
            isValidatedError: 1,
            isValidatedtoDBError: 1,
            isStrictCheck: 1,
            stricklyfailedmsg: "Does not match PAN name with your name",
            validators: {
              required: true,
              pattern: "[A-Z]{5}[0-9]{4}[A-Z]{1}",
            },
          },
          {
            is_fos: 0,
            is_cp: 1,
            is_cp_indivial: 1,
            inputtype: 9,
            placeholder: "GST Number",
            name: "gst_no",
            icon: "card",
            cssClass: "col",
            label: "Name:",
            value: "",
            verificationmsg: "GST Number IS VERIFIED",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid GST number!.",
            patternError: "Please proper GST number!.",
            validateError: "Please validated GST Number!.",
            isValidatedError: 1,
            isValidatedtoDBError: 1,
            isValidatedid: 4,
            validators: {
              required: true,
              pattern:
                "^[0-9]{2}[A-Z]{5}[0-9]{4}" +
                "[A-Z]{1}[1-9A-Z]{1}" +
                "Z[0-9A-Z]{1}$",
            },
          },
          {
            is_fos: 1,
            is_cp: 0,
            is_cp_indivial: 0,
            inputtype: 9,
            placeholder: "AADHAR Number",
            name: "aadhar_no",
            icon: "card",
            cssClass: "col",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid ADHAR number!.",
            patternError: "Please proper ADHAR number!.",
            validateError: "Please validated ADHAR number!.",
            isValidatedError: 1,
            verificationmsg: "AADHAR CARD IS VERIFIED",
            isValidatedtoDBError: 1,
            isValidatedid: 2,
            validators: {
              required: true,
              pattern: "^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$",
            },
          },
          {
            is_fos: 0,
            is_cp: 1,
            is_cp_indivial: 0,
            inputtype: 10,
            placeholder: "Select sales person",
            name: "sales_person_id",
            cssClass: "col",
            icon: "card",
            verificationmsg: "PAN CARD IS VERIFIED",
            label: "Select sales person",
            value: "",
            inital: 0,
            issalesperson_available: 1,

            type: "text",
            requiredError: "Please enter a select sales person!.",
            // patternError: "Please proper PAN!.",
            sales_person_ids: [...this.getAllSalesPerson],
            validateError: "Please validated PAN!.",
            validators: {
              required: true,
            },
          },
          {
            is_fos: 1,
            is_cp: 1,
            is_cp_indivial: 1,
            inputtype: 3,
            placeholder: "btn2",
            name: "btn2",
            cssClass: "col",
            label: "Proceed to Bank Details",
            value: "",
            inital: 0,
            type: "text",
            requiredError: "Please enter a valid full name!.",
            patternError: "Please proper full name!.",
            validators: {},
          },
        ],
      },
    ],
  };
  form: any = {};

  constructor(
    private CommonHelper: CommonHelperService,
    private state: StateService,
    private apiSer: APIService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.apiSer
      .getAllSalesPerson()
      .toPromise()
      .then((data: HttpResponse<any>) => {
        let allSalesPerson: responsefromSalesPerson = data.body;
        if (allSalesPerson.success == 1) {
          this.getAllSalesPerson = allSalesPerson.data;
          console.log(allSalesPerson.data);
        }
      });
    this.form.header = [
      ...this.temp.header.map((item) => {
        const filtered = item.controls.filter((item2) => item2.is_cp == 1);
        let getPerson_name = item.controls.find(
          (item2) => item2.issalesperson_available == 1
        );
        getPerson_name = getPerson_name.name;
        const attacthedsales = filtered.map((item) => {
          if (item.name == getPerson_name) {
            console.log("before", item.sales_person_ids);
            item.sales_person_ids = [...this.getAllSalesPerson];
            console.log("after", item.sales_person_ids);
            console.log("after", this.getAllSalesPerson);
          }
          return item;
        });
        console.log({ attacthedsales });
        return {
          headernm: item.headernm,
          index: item.index,
          controls: attacthedsales,
        };
      }),
    ];
    // this.form  = { ...this.temp };
    console.log("form", this.form);
  }
  businessFormValidation($event: FormGroup) {
    this.CommonHelper.presentLoading().then(() => {
      try {
        let controls = $event.controls;
        // console.warn({ controls });
        let invalid = false;

        let form_fields = [];
        let form_fields_for_DB = [];
        this.form.header.forEach((element: any) => {
          element.controls.map((item) => {
            if (item.isValidatedError == 1) {
              form_fields.push(item.name);
            }
            if (item.isValidatedtoDBError == 1) {
              form_fields_for_DB.push(item.name);
            }
            return item;
          });
        });
        // return;
        let newcontrols = Object.keys(controls).sort((a: any, b: any) => {
          return a - b;
        });
        newcontrols = newcontrols.reverse();
        newcontrols.forEach((key) => {
          // console.log({ key });
          if (
            controls[key].hasError("required") ||
            controls[key].hasError("pattern")
          ) {
            if (controls[key].hasError("required")) {
              this.form.header.forEach((element: any) => {
                let errormsg = element.controls.find(
                  (item) => item.name == key
                );
                this.CommonHelper.presentToast(errormsg.requiredError);
              });
              invalid = true;
            } else if (controls[key].hasError("pattern")) {
              this.form.header.forEach((element: any) => {
                let errormsg = element.controls.find(
                  (item) => item.name == key
                );
                this.CommonHelper.presentToast(errormsg.patternError);
              });
              invalid = true;
            }
          } else {
            if (form_fields.includes(key) && controls[key].enabled) {
              console.log("Invalid");
              this.form.header.forEach((element: any) => {
                let errormsg = element.controls.find(
                  (item) => item.name == key
                );
                this.CommonHelper.presentToast(errormsg.validateError);
              });
              invalid = true;
            }
          }
        });
        if (invalid) {
          this.CommonHelper.dismissLoading();
          return;
        }
        // if (
        //   this.personaldetailsForm.valid &&
        //   !this.personaldetailsForm.controls["mobile"].disabled
        // ) {
        //   this.dismissLoading();

        //   this.presentToast("Please verify your mobile number");
        //   return;
        // }
        console.log("validated", $event.value);
        this.CommonHelper.dismissLoading();
        // return;
        let formdata = this.state.formValue.value;
        this.navCtrl.navigateForward("bank-details");
        let aftersubmit = $event.value;
        this.state.formValue.next({ ...formdata, ...aftersubmit });
      } catch (error) {
        this.CommonHelper.dismissLoading();

        console.log(error);
      }
      // console.log("form",controls);
      //  console.log("loading started")
      setTimeout(() => {
        this.CommonHelper.dismissLoading();
      }, 2000);
    });
    console.log($event);
  }
  changeOrg($event) {
    console.log({ $event });
    let filteredcontrols = [];
    if ($event == 1) {
      filteredcontrols = this.temp.header.map((items) => {
        const subfiltered = items.controls.filter((filtered) => {
          return filtered.is_cp == 1;
        });
        return {
          headernm: items.headernm,
          index: items.index,
          controls: subfiltered,
        };
      });
      this.state.formArray.next(filteredcontrols);
      console.log({ filteredcontrols });
    } else if ($event == 2) {
      filteredcontrols = this.temp.header.map((items) => {
        const subfiltered = items.controls.filter((filtered) => {
          return filtered.is_fos == 1;
        });
        return {
          headernm: items.headernm,
          index: items.index,
          controls: subfiltered,
        };
      });
      console.log({ filteredcontrols });
      this.state.formArray.next(filteredcontrols);
      // this.form.header = []
      // this.form.header = [...filteredcontrols]
    }
  }
  validationApi(event: any) {
    console.log(event);
  }
}
