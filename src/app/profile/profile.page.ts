import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  detailsArray = [
    {
      info:"Sameer Kulkarni",
      iconnm:"person"
    },
    {
      info:"+91 9876543210",
      iconnm:"phone-portrait"
    },
    {
      info:"Sameer.kulkarni@gmail.com",
      iconnm:"mail"
    },{
      info:"SunOrbit",
      iconnm:"business"
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
