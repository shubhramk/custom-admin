import {Component, AfterViewInit, OnInit} from '@angular/core';
declare var $:any;
@Component({
  styleUrls: ['./general.component.scss'],
  templateUrl: './general.component.html'
})
export class GeneralUserComponent implements OnInit, AfterViewInit {
  visibleElement:boolean = false;
  preferencesItems = ["Arty", "Girly", "Nerdy", "Craftsman", "Hip-ster", "Old School", "Dapper", "Jock", "Quiet", "Extreme", "Loud", "Romantic",
  "Funny", "Manly", "Sassy", "Ditzy", "Social", "Techie"];
   topGeneralSh8ke = [];
   dtConfig:Object = {};
  constructor() {}
  ngAfterViewInit(){
    
  }
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
  handleVisiblity(){    
    this.visibleElement = !this.visibleElement;
    setTimeout(()=>{
       $('#datepicker-autoclose').datepicker({
        autoclose: true,
        todayHighlight: true 
     });
      },200)
      
  }
  
}
