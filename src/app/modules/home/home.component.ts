import {Component, AfterViewInit, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../common/services/http.service";
import {PathConfig} from "../../common/config/path.config";

//import Chartist from 'chartist';
@Component({
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit,AfterViewInit{

  topGeneralSh8ke =[];
  currentWeekReport = [];
  initialCount:number = 30;
  dtConfig:Object = {};
  keysLength:number = 0;

  cardStatistcs = {
    "totalusers":0,
    "prousers":0,
    "generalsha8ke":0,
    "globalsha8ke":0,
    "uniquevisitscurrent":0,
    "uniquevisitsprevious":0,
    "deviation":0
  };

  constructor(
    private router:Router,
    private http:HttpService
  ) {}

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
        { "title": 'Category', "data": "CategoryName" },
        { "title": 'Times sh8ken', "data": "timesSh8ken" },
        { "title": 'Times sh8red', "data": "timesSh8red" },
        { "title": 'Creater' , "data":"created"}
      ]
     }

    //get statistics
    this.getStatistics();
    //get top general shakes
    this.getTopGeneralShakes();

    //get current week report
    this.getCurrentWeekReport();
  }

  //get statistics for stats cards
  getStatistics(){
    this.http.get(PathConfig.GET_STATISTICS)
      .subscribe((response)=> {
        this.cardStatistcs = response.data;
        this.cardStatistcs['deviation'] = 4;
      },
      err => {
          // Log errors if any
      }
    );
  }

  //get top20 generalShakes
  getTopGeneralShakes(){
    this.http.post(PathConfig.GET_GENERAL_SHAKES, {"limit": "20","user_type": "","user_id": 1})
      .subscribe((response)=> {
          this.topGeneralSh8ke =  response.data;
          console.log(JSON.stringify(this.topGeneralSh8ke));
        },
        err => {
        }
      );
  }
  //get current week report
  getCurrentWeekReport(){
    this.http.get(PathConfig.GET_CURR_WEEK_REPORT)
      .subscribe((response)=> {
          this.currentWeekReport = response;
          
        },
        err => {
        }
      );
  }

  //on Menu Icon selected
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
      this.navigateTo("sh8ke/genralsh8keedit");
    }
  }

  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

  ngAfterViewInit(){}
}
