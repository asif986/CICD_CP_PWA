import { Component, OnInit } from "@angular/core";
import { CommonHelperService } from "../services/common-helper.service";

@Component({
  selector: "app-comingsoon",
  templateUrl: "./comingsoon.page.html",
  styleUrls: ["./comingsoon.page.scss"],
})
export class ComingsoonPage implements OnInit {
  constructor(public commonHelperService: CommonHelperService) {}

  ngOnInit() {}

  sideNavMenu() {
    this.commonHelperService.sideMenu();
  }
}
