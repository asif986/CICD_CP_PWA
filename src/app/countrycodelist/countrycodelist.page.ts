import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../services/data.service";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Observable, Subscription } from "rxjs";
import { LoadingController, NavController, Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AnimationOptions } from "@ionic/angular/dist/providers/nav-controller";

@Component({
  selector: "app-countrycodelist",
  templateUrl: "./countrycodelist.page.html",
  styleUrls: ["./countrycodelist.page.scss"],
})
export class CountrycodelistPage implements OnInit {
  countrieslist: Observable<any>;
  apiUrl: any = "https://restcountries.eu/rest/v2/all";
  apiData: any;
  countries: any = [];
  searchTerm: any = "";
  items: any;
  slice: any = 5;
  page = 1;
  isSpinner: any = true;

  leadMobileCodeSub = new Subscription();

  // tslint:disable-next-line:max-line-length
  constructor(
    public httpClient: HttpClient,
    private storage: Storage,
    public platform: Platform,
    private navctrl: NavController,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public dataService: DataService,
    private router: Router
  ) {
    this.presentLoading();
  }

  ngOnInit() {
    this.getCountries();
  }
  goback() {
    this.router.navigate(["/addnewlead/"]);
    console.log("Click on backpress");
  }
  ionViewDidLoad() {
    this.setFilteredItems(event);
  }

  /*Get Api For Country List*/
  getCountries() {
    this.countrieslist = this.httpClient.get("assets/json/country.json");
    this.countrieslist.subscribe(
      (data) => {
        this.isSpinner = false;
        console.log("my data: ", data);
        this.apiData = data;
        this.countries = data;
        // this.storage.set('id',  1 );
      },
      (e) => {
        console.log(e);
        this.isSpinner = false;
      }
    );
  }

  setFilteredItems(event) {
    const val = event.target.value;
    console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() !== "") {
      this.countries = this.countries.filter((item) => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: "Please wait",
      duration: 1000,
    });
    await loading.present();
  }

  openDetails(index: any) {
    console.log("Value", this.countries[index].callingCodes);
    // this.router.navigate(["/addnewlead/" + this.countries[index].callingCodes]);
    // this.navCtrl.back() + this.countries[index].callingCodes;
    this.dataService.setLeadMobileCode(this.countries[index].callingCodes);
    this.navCtrl.back();
  }

  onCancel() {
    this.presentLoading();
    this.getCountries();
    console.log("refresh list");
  }
  pop() {
    this.navctrl.pop();
  }

  doRefresh(event) {
    console.log("Begin async operation");

    setTimeout(() => {
      this.countries = [];
      this.getCountries();
      console.log("Async operation has ended");
      event.target.complete();
    }, 500);
  }
}
