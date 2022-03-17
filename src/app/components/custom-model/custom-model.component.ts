import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

import { DataService } from './../../services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-custom-model',
  templateUrl: './custom-model.component.html',
  styleUrls: ['./custom-model.component.scss'],
})
export class CustomModelComponent implements OnInit {
firms = [];
firmnm='';
  constructor(
    public data:DataService,
    public popoverctrl:PopoverController,
    public navctrl:NavController,public navParams : NavParams) { }

  ngOnInit() 
  {
    this.firms = this.data.firms();
    const id = this.navParams.get('cp_id');
   this.firmnm = this.firms.find(item=>item.id==id).name
    console.log("cp_id",)
  }
closeModel()
{
  this.popoverctrl.dismiss({data:0});
}
SendMailMsg()
{
  this.popoverctrl.dismiss({data:1});
this.navctrl.navigateForward("cpstatus");
}
}
