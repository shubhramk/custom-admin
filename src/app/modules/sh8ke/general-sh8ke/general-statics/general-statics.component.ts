import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import {Router, ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
declare var $:any;

@Component({
  selector: 'app-general-statics',
  templateUrl: './general-statics.component.html',
  styleUrls: ['./general-statics.component.css']
})
export class GeneralStaticsComponent implements OnInit {
  monthlyReport = [];
  generalSh8keName:string = "";
  startDate = "";
  endDate:any;

  configLabel = [];
  configLinecolor = [];
  configYKeys = []; 

  constructor(private router:Router, private http:HttpService, private activedroute:ActivatedRoute) { }

  ngOnInit() {
    this.generalSh8keName = this.activedroute.snapshot.params["name"];
    
    this.startDate = "01-01-2016";
    this.endDate = new Date();
    this.endDate = this.endDate.getDate()+"-"+this.endDate.getMonth()+"-"+this.endDate.getFullYear();
    setTimeout(()=>{
       $('#date-range').datepicker({
        toggleActive: true,
        format:"dd-mm-yyyy"
      });
    },200);
    this.startDate = $("#startDate").val();
    this.endDate = $("#endDate").val();

    this.getCurrentMonthReport(this.activedroute.snapshot.params["id"], this.startDate, this.endDate);
  }
  //get month report
  getCurrentMonthReport(id:string, startDate, endDate){
    this.configLabel = ['Shared Count','Favorite Count'];
    this.configLinecolor = ['#009efb','#4DA74D'];
    this.configYKeys = ['a', 'b'];
    this.http.post(PathConfig.GET_GENERAL_SH8KE_STATICS+id, {"startDate" : startDate,"endDate": endDate})
      .subscribe((response)=> {
          let monthStr     = response['data']['monthStr'];
          let monthStrArr  = response['data']['monthStr'] ? response['data']['monthStr'].split(",") : [];
          let sharedCount  = response['data']['monthDataStr'] ? response['data']['monthDataStr'].split(",") : [];
          let favCount     = response['data']['monthDataFavStr'] ? response['data']['monthDataFavStr'].split(",") : [];

          let data = [];
          _.forEach(monthStrArr,function(val,index){
            let prevDate = new Date();
            let date = prevDate.getFullYear()+'-'+(prevDate.getMonth() + 1)+'-'+(index + 1);
            data.push( {"date": date, "a": parseInt(sharedCount[index]),"b": parseInt(favCount[index])});
          })
          this.monthlyReport =  data;
        },
        err => {
        }
      );
  }
  filterDataAccordingDate(){
    this.startDate = $("#startDate").val();
    this.endDate = $("#endDate").val();
    console.log(this.startDate, this.endDate);
    this.getCurrentMonthReport(this.activedroute.snapshot.params['id'], this.startDate, this.endDate);
  }

}
