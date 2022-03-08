import { Component, OnInit } from "@angular/core";

const ELEMENT_DATA: any[] = [
  {Leads: 150, Site: 100, GT: 80, PS: 50,Allotment:40,Cancellation:2}
];
@Component({
  selector: "app-sales-performance",
  templateUrl: "./sales-performance.page.html",
  styleUrls: ["./sales-performance.page.scss"],
})
export class SalesPerformancePage implements OnInit {
  displayedColumns: string[] = ['Leads', 'Site', 'GT', 'PS','Allotment','Cancellation'];
  dataSource = ELEMENT_DATA;
  projectList: any = [];
  constructor() {}

  ngOnInit() {
    this.projectList = [
      {
        projectnm: "Project1",
        projectID: 1,
      },
      {
        projectnm: "Project2",
        projectID: 2,
      },
      {
        projectnm: "Project3",
        projectID: 3,
      },
      {
        projectnm: "Project4",
        projectID: 4,
      },
      {
        projectnm: "Project5",
        projectID: 5,
      },
      {
        projectnm: "Project6",
        projectID: 6,
      },
    ];
  }
}
