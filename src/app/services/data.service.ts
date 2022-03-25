import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public leadlist: any = [];
  apiUrl: any = 'https://restcountries.eu/rest/v2/all';
  apiData: any;
  constructor(  public httpClient: HttpClient) {
    this.leadlist = [
      // tslint:disable-next-line:max-line-length
      {
        cuid: 'VJYOH023-007',
        leadname: 'Sushant Tejas Patil',
        leadprojectname: 'YashOne,Wakad| 1BHK',
        date: 'Just now',
        status: 'Lead Added',
        tag: 'CP lead',
        Leadstatusid : 1,
      },
      // tslint:disable-next-line:max-line-length
      {
        cuid: 'VJYOH023-007',
        leadname: 'Sachin Patil',
        leadprojectname: 'YashOne,Wakad | 1BHK',
        date: '2 days ago',
        status: 'Token Generated',
        tag: 'CP lead',
        visitdate: '03 sept 2019 at 01.00pm',
        conductedby: 'Shweta Uplap',
        generateddate: '02 sept 2019 at 10.30am',
        token: 'VJYH3253',
        tokentype: 'Priority Token',
        Leadstatusid : 2,
      },
      {
        cuid: 'VJYOH023-007',
        leadname: 'Sushant Tejas Patil',
        leadprojectname: 'YashOne,Wakad| 1BHK',
        date: 'Just now',
        status: 'Site Visit',
        tag: 'CP lead',
        Leadstatusid : 3,
        visitdate: '03 sept 2019 at 01.00pm',
        conductedby: 'Shweta Uplap',
      },
      {
        cuid: 'VJYOH023-007',
        leadname: 'Sukrut Mujumdar',
        leadprojectname: 'YashOne,Wakad| 1BHK',
        date: 'Just now',
        status: 'Lead Added',
        tag: 'CP lead',
        Leadstatusid : 1,
      },
      // tslint:disable-next-line:max-line-length
      {
        cuid: 'VJYOH023-007',
        leadname: 'Prashant Sawant',
        leadprojectname: 'YashOne,Wakad | 1BHK',
        date: '2 days ago',
        status: 'Token Generated',
        tag: 'CP lead',
        visitdate: '03 sept 2019 at 01.00pm',
        conductedby: 'Shweta Uplap',
        generateddate: '02 sept 2019 at 10.30am',
        token: 'VJYH3253',
        tokentype: 'Priority Token',
        Leadstatusid : 2,
      },
      {
        cuid: 'VJYOH023-007',
        leadname: 'Maruti Kesarkar',
        leadprojectname: 'YashOne,Wakad| 1BHK',
        date: 'Just now',
        status: 'Site Visit',
        tag: 'CP lead',
        Leadstatusid : 3,
        visitdate: '03 sept 2019 at 01.00pm',
        conductedby: 'Shweta Uplap',
      },

    ];
  }

  filterItems(searchTerm) {
    return this.leadlist.filter(item => {
      return item.leadname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }


  getCountries() {
    return this.httpClient.get(this.apiUrl).subscribe(res => {

      // let data=JSON.parse(res["_body"]);
      const Data = JSON.parse( res[0] ) ;
      // if (data.success== 1) {
      if ( Data.length !== 0) {
        this.apiData = Data;
        console.log(this.apiData);
      }
      // this.checked = 1;
    }, err => {
    });
    // }
  }
public firms()
{
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
public persondetailsForm()
{
  const filels =  {
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
            icon:"person",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            ischekble:1,
            requiredError: "Please enter a valid full name!.",
            patternError: "Please proper full name!.",
            validators: {
              required: true,
              pattern: "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
            },
          },
          {
            inputtype: 2,
            placeholder: "Official Mobile",
            icon:"phone-portrait",
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
            isButton:true,
            icontoggle:"eye-off",
            defaultval:false,
            icon:"eye",
            cssClass: "col",
            label: "Name:",
            value: "",
            inital: 0,
            type: "text",
            type_2: "password",
            requiredError: "Please enter a valid Password!.",
            patternError: "Password must contain characters and numbers at least 8 !.",
            validators: {
              required: true,
              // pattern:
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
            label: "Proceed to Business Details",
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
  return filels;
}
}
