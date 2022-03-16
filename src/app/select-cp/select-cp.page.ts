import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

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
@Component({
  selector: "app-select-cp",
  templateUrl: "./select-cp.page.html",
  styleUrls: ["./select-cp.page.scss"],
})
export class SelectCPPage implements OnInit {
  public myForm: FormGroup = this.fb.group({});
  public firms = Firms;
searchbox ='searchbox';
firm ='firm';
  constructor(public fb: FormBuilder) {}

  ngOnInit() {

    this.myForm = this.fb.group({
      [this.searchbox]: [""],
      [this.firm]:['']
    });
  }
  changeOrgz($event: any) {
    // console.log($event);
  }
  confirmBox()
  {
    console.log("selected box",this.myForm.controls[this.firm].value)
    // console.log("selected box",this.myForm.controls[this.firm].value)
  }
}
