import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalController } from "@ionic/angular";
@Component({
  selector: "app-kyc-modal",
  templateUrl: "./kyc-modal.page.html",
  styleUrls: ["./kyc-modal.page.scss"],
})
export class KycModalPage implements OnInit {
  modalTitle: string;
  modelId: number;

  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      //  this.firstname = params["param1"];
      console.log(params);
    });
  }

  ngOnInit() {}

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
