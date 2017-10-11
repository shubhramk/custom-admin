import {Component, AfterViewInit, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
//import Chartist from 'chartist';
@Component({
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit,AfterViewInit{
 /* visitData = [
              {total:2301, name:"Total Visits", symbol:"down", color:'red', val:[ 0, 5, 6, 10, 9, 12, 4, 9]},
              {total:2421, name:"Page Views", symbol:"up", color:'blue', val:[ 0, 5, 6, 10, 9, 12, 4, 9]},
              {total:2515, name:"Unique Visits", symbol:"down", color:'yellow', val:[ 0, 5, 6, 10, 9, 12, 4, 9]},
              {total:1122, name:"Bounce Rate", symbol:"up", color:'green', val:[ 0, 5, 6, 10, 9, 12, 4, 9]}
  ];*/
  visitData = {
    totalusers:50, 
    totalprousers:100,
    generalsha8ke:50, 
    globalsh8ke:100
  };
  uniqueVisit ={
    uniqueVisits:4444,
    decrease:6,   
    decreaseTime:"1W" 
  };
  topGeneralSh8ke =[];
  initialCount:number = 30;
  dtConfig:Object = {};

  constructor(private router:Router) {}

  ngOnInit(){
    this.dtConfig = { 
      "columnDefs": [
        {
          "targets": 6,
          "width": "10%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="edit" data-custom="' + val + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
              '<a href="javascript:void(0);" data-name="delete" data-custom="' + val + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
              '</div>';

            return template;
          }
        }
      ],
      "columns": [
        { "title": 'Title', "data": "title" },
        { "title": 'Description', "data": "description" },
        { "title": 'Category', "data": "category" },
        { "title": 'Times sh8ken', "data": "timesh8ken" },
        { "title": 'Times sh8red', "data": "timesh8red" },
        { "title": 'Creater' , "data":"creater"},
        { "title": '' , "data":"title"}
      ]
     }

    //data
    this.topGeneralSh8ke = [
      {title:"goals", description:"Share, Socialize", category:"goals 1", "timesh8ken":167, "timesh8red":0, creater:"akshay Kumar"},
      {title:"goals", description:"Share, Socialize", category:"goals 2", "timesh8ken":167, "timesh8red":0, creater:"akshay Kumar"},
      {title:"goals", description:"Share, Socialize", category:"goals 3", "timesh8ken":167, "timesh8red":0, creater:"akshay Kumar"},
      {title:"goals", description:"Share, Socialize", category:"goals 4", "timesh8ken":167, "timesh8red":0, creater:"akshay Kumar"},
      {title:"goals", description:"Share, Socialize", category:"goals 5", "timesh8ken":167, "timesh8red":0, creater:"akshay Kumar"},
      {title:"goals", description:"Share, Socialize", category:"goals 6", "timesh8ken":167, "timesh8red":0, creater:"akshay Kumar"}
      ];
      }

  //on Menu Icon selected
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
      alert(customData);
    }
  }

  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

  ngAfterViewInit(){}
}
