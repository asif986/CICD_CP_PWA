import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalController, NavParams } from "@ionic/angular";
import { Helper } from "src/app/services/Helper";
import Swal from "sweetalert2";

@Component({
  selector: "app-kyc-modal",
  templateUrl: "./kyc-modal.page.html",
  styleUrls: ["./kyc-modal.page.scss"],
})
export class KycModalPage implements OnInit {
  kycInfo: any = {};
  doc;

  adharcardTwelveDigit = /^\d{12}$/;
  adharSixteenDigit = /^\d{16}$/;

  panValidation = "[A-Z]{5}[0-9]{4}[A-Z]{1}";

  voterValidation = /^([a-zA-Z]){3}([0-9]){7}?$/g;

  public settings = {
    length: 4,
    numbersOnly: true,
    timer: 30,
    timerType: 1,
  };

  isOtpSend: boolean = false;

  cb_data: any = {};

  constructor(
    private modalController: ModalController,
    // private route: ActivatedRoute
    private navParams: NavParams,
    public helper: Helper
  ) {
    console.log(this.navParams.data);
    this.kycInfo = this.navParams.data;
  }

  ngOnInit() {}

  async closeModal() {
    const onClosedData: any = this.cb_data;
    await this.modalController.dismiss(onClosedData);
  }
  // otp box value changes
  public onInputChange(e, doc_id) {
    console.log(e);
    if (e.length == this.settings.length) {
      // e will emit values entered as otp and,
      console.log("otp is", e);

      this.updateData(doc_id);
    } else if (e == -1) {
      // if e == -1, timer has stopped
      console.log(e, "resend button enables");
    } else if (e == -2) {
      // e == -2, button click handle
      console.log("resend otp");
    }
  }

  updateData(doc_id) {
    if (doc_id == 1) {
      this.cb_data = { adhar_no: this.doc, doc_id };
    } else if (doc_id == 2) {
      this.cb_data = { pan_no: this.doc, doc_id };
    } else if (doc_id == 3) {
      this.cb_data = { voter_no: this.doc, doc_id };
    }
    this.isOtpSend = false;
    // this.alertVerification();
    this.helper.swAlert("Success", "Verification Succesfully!");
    this.closeModal();
  }

  verfiy() {
    // Adhar card validation

    if (this.kycInfo.ductypeId == 1) {
      if (this.doc != "") {
        if (this.doc.match(this.adharcardTwelveDigit)) {
          this.isOtpSend = true;
          // return true;
        } else if (this.doc.match(this.adharSixteenDigit)) {
          this.isOtpSend = true;
          // return true;
        } else {
          // alert("Enter valid Aadhar Number");
          this.helper.presentToast("Enter valid Aadhar Number");
          return false;
        }
      }
    }
    // PAN card
    else if (this.kycInfo.ductypeId == 2) {
      if (this.doc != "") {
        if (this.doc.match(this.panValidation)) {
          this.isOtpSend = true;
          // return true;
        } else {
          // alert("Enter valid Aadhar Number");
          this.helper.presentToast("Enter valid Pan number");
          return false;
        }
      }
    }
    // Voter ID
    else if (this.kycInfo.ductypeId == 3) {
      if (this.doc != "") {
        if (this.doc.match(this.voterValidation)) {
          this.isOtpSend = true;
          // return true;
        } else {
          // alert("Enter valid Aadhar Number");
          this.helper.presentToast("Enter valid Voter ID");
          return false;
        }
      }
    }
  }

  sendOtp() {}
}
