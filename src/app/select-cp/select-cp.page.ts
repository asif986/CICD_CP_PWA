import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalController, PopoverController } from "@ionic/angular";

import { CommonHelperService } from './../services/common-helper.service';
import { CustomModelComponent } from "../components/custom-model/custom-model.component";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-select-cp",
  templateUrl: "./select-cp.page.html",
  styleUrls: ["./select-cp.page.scss"],
})
export class SelectCPPage implements OnInit {
  public myForm: FormGroup = this.fb.group({});
   public firms = [];
  private static readonly searchbox = "searchbox";
  private static readonly firm = "firm";
  constructor(public fb: FormBuilder, public data:DataService,public commonser:CommonHelperService,public popoverController:PopoverController) {}

  ngOnInit() {
    this.firms = [...this.data.firms()];
    this.myForm = this.fb.group({
      [SelectCPPage.searchbox]: [""],
      [SelectCPPage.firm]: [""],
    });
  }
  changeOrgz($event: any) {
    // console.log($event);
  }
  async confirmBox() {
    const cp_id =this.myForm.controls[SelectCPPage.firm].value;
    console.log(typeof(cp_id) )
    console.log(cp_id )
    if(!cp_id)
    {
      this.commonser.presentToast("Please select any one of Firm");
      return;
    }
    const model = await this.popoverController.create({
      component: CustomModelComponent,
      translucent:true,
      cssClass:'custom-popover',
      componentProps:{cp_id}
    });

    model.present();

    model.onDidDismiss().then(res=>
      {
        console.log(res.data.data==1)
        if(res.data.data == 1)
        {
          this.myForm.reset()
        }
      console.log("res",res)
      })
    console.log("selected box", this.myForm.controls[SelectCPPage.firm].value);
    // console.log("selected box",this.myForm.controls[this.firm].value)
  }
  public valuechange(events:any)
  {
const inputtype = (this.myForm.controls[SelectCPPage.searchbox].value).toLowerCase();
    console.log(inputtype);
    if(inputtype=='')
    {
      this.firms = [...this.data.firms()];
      return;
    }
    this.firms = this.firms.filter(item=>((item.name).toLowerCase()).startsWith(inputtype))
// console.log(events.data)
  }
}
