import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams, PopoverController } from "@ionic/angular";

import { DataService } from "./../../services/data.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-custom-model",
  templateUrl: "./custom-model.component.html",
  styleUrls: ["./custom-model.component.scss"],
})
export class CustomModelComponent implements OnInit {
  cp_entity_id;
  firmnm = "";
  header;
  message;
  dataInfo;
  constructor(
    public data: DataService,
    public popoverctrl: PopoverController,
    public modalCtrl: ModalController,
    public navctrl: NavController,
    public navParams: NavParams
  ) {}

  ngOnInit() {
    // this.firms = this.data.firms();
    // this.cp_entity_id = this.navParams.get("cp_id");
    // this.firmnm = this.navParams.get("name");
    // console.log("cp_id");
    this.header = this.navParams.get("header");
    this.message = this.navParams.get("message");
    this.dataInfo = this.navParams.get("data");
  }
  closeModel() {
    this.modalCtrl.dismiss(null);
  }
  ok() {
    this.modalCtrl.dismiss({
      // cp_entity_id: this.cp_entity_id,
      // cp_nm: this.firmnm,
      data: this.dataInfo,
    });
  }
}
