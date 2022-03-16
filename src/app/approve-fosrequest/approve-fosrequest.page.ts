import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-approve-fosrequest',
  templateUrl: './approve-fosrequest.page.html',
  styleUrls: ['./approve-fosrequest.page.scss'],
})
export class ApproveFOSRequestPage implements OnInit {

  public myForm: FormGroup = this.fb.group({});

  constructor(public fb:FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        searchbox:['']
      })
  }

}
