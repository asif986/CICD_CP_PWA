import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { responsefromSalesPerson } from "../models/business-details";
import { StateService } from "./state.service";
import { APIService } from "src/app/services/APIService";

@Injectable({
  providedIn: "root",
})
export class DataService {
  public leadlist: any = [];
  apiUrl: any = "https://restcountries.eu/rest/v2/all";
  apiData: any;
  salePersonList: any = [];
  constructor(
    public httpClient: HttpClient,
    public state: StateService,
    public apiService: APIService
  ) {
    // });

    this.leadlist = [
      // tslint:disable-next-line:max-line-length
      {
        cuid: "VJYOH023-007",
        leadname: "Sushant Tejas Patil",
        leadprojectname: "YashOne,Wakad| 1BHK",
        date: "Just now",
        status: "Lead Added",
        tag: "CP lead",
        Leadstatusid: 1,
      },
      // tslint:disable-next-line:max-line-length
      {
        cuid: "VJYOH023-007",
        leadname: "Sachin Patil",
        leadprojectname: "YashOne,Wakad | 1BHK",
        date: "2 days ago",
        status: "Token Generated",
        tag: "CP lead",
        visitdate: "03 sept 2019 at 01.00pm",
        conductedby: "Shweta Uplap",
        generateddate: "02 sept 2019 at 10.30am",
        token: "VJYH3253",
        tokentype: "Priority Token",
        Leadstatusid: 2,
      },
      {
        cuid: "VJYOH023-007",
        leadname: "Sushant Tejas Patil",
        leadprojectname: "YashOne,Wakad| 1BHK",
        date: "Just now",
        status: "Site Visit",
        tag: "CP lead",
        Leadstatusid: 3,
        visitdate: "03 sept 2019 at 01.00pm",
        conductedby: "Shweta Uplap",
      },
      {
        cuid: "VJYOH023-007",
        leadname: "Sukrut Mujumdar",
        leadprojectname: "YashOne,Wakad| 1BHK",
        date: "Just now",
        status: "Lead Added",
        tag: "CP lead",
        Leadstatusid: 1,
      },
      // tslint:disable-next-line:max-line-length
      {
        cuid: "VJYOH023-007",
        leadname: "Prashant Sawant",
        leadprojectname: "YashOne,Wakad | 1BHK",
        date: "2 days ago",
        status: "Token Generated",
        tag: "CP lead",
        visitdate: "03 sept 2019 at 01.00pm",
        conductedby: "Shweta Uplap",
        generateddate: "02 sept 2019 at 10.30am",
        token: "VJYH3253",
        tokentype: "Priority Token",
        Leadstatusid: 2,
      },
      {
        cuid: "VJYOH023-007",
        leadname: "Maruti Kesarkar",
        leadprojectname: "YashOne,Wakad| 1BHK",
        date: "Just now",
        status: "Site Visit",
        tag: "CP lead",
        Leadstatusid: 3,
        visitdate: "03 sept 2019 at 01.00pm",
        conductedby: "Shweta Uplap",
      },
    ];
  }

  filterItems(searchTerm) {
    return this.leadlist.filter((item) => {
      return item.leadname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  async getSalesPersonList() {
    return new Promise((resolve, reject) => {
      this.apiService
        .getAllSalesPerson()
        .map((res) => {
          return res.body.data.map((r: any) => {
            return { id: r.person_id, name: r.full_name };
          });
        })
        .subscribe((data: any) => {
          console.log(data);
          // resolve(data);
          // data = data;
        });
    });
    console.log("getPerson function");
    // return data;
  }
  getCountries() {
    return this.httpClient.get(this.apiUrl).subscribe(
      (res) => {
        // let data=JSON.parse(res["_body"]);
        const Data = JSON.parse(res[0]);
        // if (data.success== 1) {
        if (Data.length !== 0) {
          this.apiData = Data;
          console.log(this.apiData);
        }
        // this.checked = 1;
      },
      (err) => {}
    );
    // }
  }
  public firms() {
    const Firms = [
      { name: "Percepta Pvt Ltd", id: 1 },
      { name: "Exela Movers", id: 2 },
      { name: "Intrepid Travel", id: 3 },
      { name: "Twisters Gymnastics Academy", id: 4 },
      { name: "Kaboom Fireworks", id: 5 },
      { name: "Compass Mortgage", id: 6 },
      { name: "Marathon Physical Therapy", id: 7 },
      { name: "Semicolon Bookstore", id: 8 },
    ];
    return Firms;
  }
  public persondetailsForm(name?: string): any {
    let personDetails = this.state.persondetails.value;
    let filels: any;
    console.log({ personDetails });
    if (personDetails != null) {
      return personDetails;
    } else {
      filels = {
        header: [
          {
            headernm: "Personal Details",
            index: 0,
            controls: [
              {
                inputtype: 2,
                placeholder: "Full Name",
                name: "name",
                cssClass: "col",
                icon: "person",
                label: "Name:",
                value: "",
                inital: 0,
                type: "text",
                ischekble: 1,
                requiredError: "Please enter a valid full name!.",
                validationSucess: "Sucessfully verified PAN",
                patternError: "Please proper full name!.",
                validators: {
                  required: true,
                  pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
                },
              },
              {
                inputtype: 2,
                placeholder: "Official Mobile",
                icon: "phone-portrait",
                name: "mobile",
                cssClass: "col",
                label: "Name:",
                value: "",
                inital: 0,
                type: "text",
                requiredError: "Please enter a valid Mobile number!.",
                patternError: "Please proper Mobile number!.",
                validators: {
                  required: true,
                  pattern: /^[6-9]\d{9}$/gi,
                },
              },
              {
                inputtype: 2,
                placeholder: "Official Email",
                name: "email",
                icon: "mail",
                cssClass: "col",
                label: "Name:",
                value: "",
                inital: 0,
                type: "text",
                requiredError: "Please enter a valid Email ID!.",
                patternError: "Please proper Email ID!.",
                validators: {
                  required: true,
                  pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
                },
              },
              {
                inputtype: 2,
                placeholder: "Password",
                name: "password",
                isButton: true,
                icontoggle: "eye-off",
                defaultval: false,
                icon: "eye",
                cssClass: "col",
                label: "Name:",
                value: "",
                inital: 0,
                type: "text",
                type_2: "password",
                requiredError: "Please enter a valid Password!.",
                patternError: "Password must contain at least 8 characters !.",
                validators: {
                  required: true,
                  pattern: "^[A-Za-z0-9_@./#&+-]{8,}$",
                  // minLength:8,
                  // maxLength:8
                  //   "^(?=.*[0-9])" +
                  //   "(?=.*[a-z])(?=.*[A-Z])" +
                  //   // "(?=.*[@#$%^&+=])" +
                  //   "(?=\\S+$).{8,20}$",
                },
              },
              {
                inputtype: 3,
                placeholder: "Password",
                name: "password",
                cssClass: "col",
                label: "Proceed to Bank Details",
                value: "",
                inital: 0,
                type: "text",
                requiredError: "Please enter a valid full name!.",
                patternError: "Please proper full name!.",
                validators: {
                  required: true,
                  pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
                },
              },
            ],
          },
        ],
      };
      this.state.persondetails.next(filels);
    }

    return filels;
  }

  public businessDetailsForms() {
    let businessDetails;
    // this.getSalesPersonList().then((data) => {
    // console.log(data);
    businessDetails = {
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
              is_cp: 1,
              is_cp_indivial: 1,
              inputtype: 9,
              ischeckWithCPName: 1,
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
              isValidatedError: 1,
              isValidatedid: 1,
              isValidatedtoDBError: 1,
              isStrictCheck: 1,
              stricklyfailedmsg: "Does not match PAN name with CP name",
              validators: {
                required: true,
                pattern: "[A-Z]{5}[0-9]{4}[A-Z]{1}",
              },
            },
            {
              is_fos: 1,
              ischeckWithPersonName: 1,
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
              is_cp_indivial: 0,
              inputtype: 11,
              placeholder: "GST Applicable",
              name: "gst_applicable",
              cssClass: "col",
              icon: "card",
              verificationmsg: "",
              label: "Select GST Applicable",
              value: "",
              inital: 0,
              // defaultValue: "Yes",
              list: [
                {
                  id: "Yes",
                  name: "Yes",
                },
                {
                  id: "No",
                  name: "No",
                },
              ],
              // issalesperson_available: 1,

              type: "text",
              requiredError: "Please select GST Applicable!.",
              // patternError: "Please proper PAN!.",
              // sales_person_ids: [...this.getAllSalesPerson],
              validateError: "Please select GST Applicable!.",
              validators: {
                required: true,
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
              inputtype: 2,
              is_fos: 0,
              is_cp: 1,
              is_cp_indivial: 1,
              placeholder: "CP Name",
              name: "cp_name",
              icon: "person",
              cssClass: "col",
              label: "Name:",
              value: "",
              inital: 0,
              type: "text",
              requiredError: "Please enter a valid CP full name!.",
              patternError: "Please proper CP full name!.",
              validationSucess: "Sucessfully verified PAN",
              validationFailed: "Failed verified PAN",
              validators: {
                required: true,
                pattern: "[a-zA-Z0-9][a-zA-Z0-9 ]+[a-zA-Z0-9]$",
              },
            },
            {
              is_fos: 0,
              is_cp: 1,
              is_cp_indivial: 1,
              inputtype: 2,
              ischekbleforcp: 1,
              placeholder: "Billing Name",
              name: "billing_name",
              validationSucess: "Sucessfully verified PAN",
              validationFailed: "Failed verified PAN",
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
              is_fos: 0,
              is_cp: 1,
              is_cp_indivial: 1,
              inputtype: 12,
              placeholder: "Rera Number",
              name: "file_uri",
              icon: "aperture",
              cssClass: "col",
              label: "Rera file",
              value: "",
              inital: 0,
              verificationmsg: "RERA NUMBER  IS VERIFIED",
              type: "text",
              requiredError: "Please upload Rera file!.",
              patternError: "Please proper Rera Number!.",
              validateError: "Please validated Rera Number!.",
              isValidatedError: 0,
              // isValidatedtoDBError: 1,
              isValidatedid: 0,
              validators: {
                required: true,
                // pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
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
              // list: [
              //   { id: 1, name: "asif" },
              //   { id: 1, name: "asif" },
              // ],
              list: "",
              defaultValue: "",
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
              label: "Proceed to Personal Details",
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
    console.log("hi");
    // });
    return businessDetails;
  }
}
