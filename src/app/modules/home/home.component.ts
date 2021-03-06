import {Component, AfterViewInit, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../common/services/http.service";
import {PathConfig} from "../../common/config/path.config";
import * as _ from 'lodash';
import {Broadcaster} from "../../common/services/broadcaster.service";

declare var mscConfirm:any;

//import Chartist from 'chartist';
@Component({
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit,AfterViewInit{

  topGeneralSh8ke =[];
  topGlobalSh8ke  = [];
  currentWeekReport = [];
  monthlyReport = [];
  initialCount:number = 30;
  dtConfigGlobal:Object = {};
  dtConfigGeneral:Object = {};
  keysLength:number = 0;
  cardStatistcs = {};

  configLabel = [];
  configLinecolor = [];
  configYKeys = [];
  constructor(
    private router:Router,
    private http:HttpService,
    private broadcaster:Broadcaster
  ) {}

  ngOnInit(){
    //global data table
    this.dtConfigGlobal = {
      "columnDefs": [
        {
          "targets": 0,
          "orderable": false,
          "render": function (data, type, full, meta) {
            var template = '';
            let val = data;
            template = '<div class="sh8ke-title">' +
                '<div>'+data+'</div>' +
                '<a href="javascript:void(0);" data-name="global-answers" data-custom="' + full['rowId'] + '">Answers('+full['count']+')</a>' +
              '</div>';
            return template;
          }
        },
        {
          "targets": 4,
          "render": function (data, type, full, meta) {
            var template = '';
            template =
              '<a href="javascript:void(0);" data-name="global-creator" data-custom="' + full['creator_id'] + '"data-creator="' + data + '">'+data+'</a>';

            return template;
          }
        },
        {
          "targets": 5,
          "width": "10%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="global-edit" data-custom="' + full['rowId'] + '" data-creator="' + full['title'] + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
              '<a href="javascript:void(0);" data-name="global-delete" data-custom="' + full['rowId'] + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
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
        { "title": 'Creater' , "data":"created"}
      ]
     }

    //general data table
    this.dtConfigGeneral = {
      "columnDefs": [

        {
          "targets": 0,
          "orderable": false,
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="sh8ke-title">' +
              '<div>'+data+'</div>' +
              '<a href="javascript:void(0);" data-name="general-answers" data-custom="' + full['rowId'] + '">Answers('+full['count']+')</a>' +
              '</div>';

            return template;
          }
        },
        {
          "targets": 5,
          "render": function (data, type, full, meta) {
            var template = '';
            template =
              '<a href="javascript:void(0);" data-name="general-creator" data-custom="' + full['creator_id'] + '" data-creator="' + data + '">'+data+'</a>';

            return template;
          }
        },
        {
          "targets": 6,
          "width": "10%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';
            let val = data;
            template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="general-edit" data-custom="' + full['rowId']  + '" data-creator="' + full['title'] + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
              '<a href="javascript:void(0);" data-name="general-delete" data-custom="' + full['rowId']  + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
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

    //get top global shakes
    this.getTopGlobalShakes();

    //get current week report
    this.getCurrentWeekReport();

    //get current mpnth report
    this.getCurrentMonthReport();



  }

  //get statistics for stats cards
  getStatistics(){

    this.http.get(PathConfig.GET_STATISTICS)
      .subscribe((response)=> {
        this.cardStatistcs = response.data;
        this.cardStatistcs['deviation'] = 4;

        this.broadcaster.broadcast("SHOW_LOADER",false);
      },
      err => {
          // Log errors if any
      }
    );
  }

  //get top20 globalShakes
  getTopGlobalShakes(){
    this.http.post(PathConfig.GET_SHAKES_LIST, { "trending_type": "global","limit": "20","user_type": "","user_id": 1})
      .subscribe((response)=> {
          this.topGlobalSh8ke =  response.data;
        },
        err => {
        }
      );
  }
  //get top20 generalShakes
  getTopGeneralShakes(){
    this.http.post(PathConfig.GET_SHAKES_LIST, { "trending_type": "general","limit": "20","user_type": "","user_id": 1})
      .subscribe((response)=> {
          this.topGeneralSh8ke =  response.data;
          console.log(this.topGeneralSh8ke);
        },
        err => {
        }
      );
  }
  //get current week report
  getCurrentWeekReport(){
    this.http.get(PathConfig.GET_CURR_WEEK_REPORT)
      .subscribe((response)=> {
        let weekDataStr = response['data']['weekDataStr'];
        let weekDataStrArr = response['data']['weekDataStr'] ? response['data']['weekDataStr'].split(",").reverse() : [];

        let data = [];
        _.forEach(weekDataStrArr,function(val,index){
            let prevDate = new Date();
            prevDate.setDate(prevDate.getDate() - index);
            let date = prevDate.getFullYear()+'-'+(prevDate.getMonth() + 1)+'-'+prevDate.getDate();

            data.push( {"year": date, "item": parseInt(weekDataStrArr[index])});
        })

        this.currentWeekReport =  data;
        console.log(this.currentWeekReport);
        },
        err => {
        }
      );
  }

  //get month report
  getCurrentMonthReport(){
    this.configLabel = ['Total Users','Sh8ke Shared','Sh8ke Created'];
    this.configLinecolor = ['#009efb','#4DA74D','#617381'];
    this.configYKeys = ['a', 'b','c'];
    this.http.get(PathConfig.GET_MONTHLY_REPORT)
      .subscribe((response)=> {
          let monthStr = response['data']['monthStr'];
          let monthStrArr = response['data']['monthStr'] ? response['data']['monthStr'].split(",") : [];
          let totalUser   = response['data']['monthDataStr'] ? response['data']['monthDataStr'].split(",") : [];
          let createdUser   = response['data']['monthDataShcreateStr'] ? response['data']['monthDataShcreateStr'].split(",") : [];
          let sharedUser   = response['data']['monthSharedDataStr'] ? response['data']['monthSharedDataStr'].split(",") : [];

          let data = [];
          _.forEach(monthStrArr,function(val,index){
            let prevDate = new Date();
            let date = prevDate.getFullYear()+'-'+(prevDate.getMonth() + 1)+'-'+(index + 1);
            data.push( {"date": date, "a": parseInt(totalUser[index]),"b": parseInt(createdUser[index]),"c": parseInt(sharedUser[index])});
          })
          this.monthlyReport =  data;
        },
        err => {
        }
      );
  }


  //on Menu Icon selected
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'general-edit') {
      let customData = data['value'];
      this.navigateTo("sh8ke/genralsh8keedit/"+data['value']+"/"+data['creatorName']);
    }else if (data['clickedOn'] == 'general-delete') {
      this.deleteRowFromTop20Trending(data['value'], PathConfig.DELETE_GENERAL_SH8KE, 'generalSh8ke')
    }else if (data['clickedOn'] == 'global-edit') {
      let customData = data['value'];
      this.navigateTo("sh8ke/globalsh8keedit/"+data['value']+"/"+data['creatorName']);
    }else if (data['clickedOn'] == 'global-delete') {
      this.deleteRowFromTop20Trending(data['value'], PathConfig.DELETE_GLOBAL_SH8KE, 'globalSh8ke')
    }else if(data['clickedOn'] == 'general-answers'){
        this.navigateTo('sh8ke/generalAnswer/'+data['value']);
    }else if(data['clickedOn'] == 'general-creator'){
      this.navigateTo('user/generalCreator/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'global-answers'){
      this.navigateTo('sh8ke/globalAnswer/'+data['value']);
    }else if(data['clickedOn'] == 'global-creator'){
      this.navigateTo('user/globalCreator/'+data['value']+"/"+data['creatorName']);
    }
  }

  deleteRowFromTop20Trending(id:string, serviceUrl:string, type:string){
    var self = this;
    mscConfirm("Are you sure to delete?", function(){
      self.http.post(serviceUrl, {'id':id}).subscribe((response)=> {
        if(response.Status == "Success"){
          if(type == "generalSh8ke"){
            self.getTopGeneralShakes();
          }else if(type == "globalSh8ke"){
            self.getTopGlobalShakes();
          }

        }
      },
      err => {
      }
    );
    });
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

  ngAfterViewInit(){}
}
