import { Component, Input, OnInit } from "@angular/core";

import { NavController } from "@ionic/angular";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() headernam:string ='';
  @Input() url:string ='';
  constructor(public navctrl: NavController) {}

  ngOnInit() {}
  goBack() {
    this.navctrl.navigateBack(this.url);
  }
}
