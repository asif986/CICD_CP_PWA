import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { NavController } from "@ionic/angular";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() headernam: string = "";
  @Input() url: string = "";
  isArrowHide = true;

  constructor(public navctrl: NavController, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length != 0) {
        console.log(params);
        if (params["pending"] == true || params.pending == true) {
          // console.log("hi");
          this.isArrowHide = false;
        } else {
          this.isArrowHide = true;
        }
      } else {
        this.isArrowHide = true;
      }
    });
  }
  goBack() {
    this.navctrl.navigateBack(this.url);
  }
}
