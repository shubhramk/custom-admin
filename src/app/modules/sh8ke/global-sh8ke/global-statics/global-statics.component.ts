import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import {Router, ActivatedRoute} from "@angular/router";
import {Broadcaster} from "../../../../common/services/broadcaster.service";
import * as _ from 'lodash';
declare var $:any;

@Component({
  selector: 'app-global-statics',
  templateUrl: './global-statics.component.html',
  styleUrls: ['./global-statics.component.css']
})
export class GlobalStaticsComponent implements OnInit {
  monthlyReport = [];
  globalSh8keName:string = "";
  startDate = "";
  endDate:any;

  configLabel = [];
  configLinecolor = [];
  configYKeys = []; 
  constructor(private router:Router, private http:HttpService, private activedroute:ActivatedRoute, private broadcaster:Broadcaster) { }

  ngOnInit() {
    this.globalSh8keName = this.activedroute.snapshot.params["name"];
    
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
    this.broadcaster.broadcast("SHOW_LOADER",false);
    this.configLabel = ['Favorite Count'];
    this.configLinecolor = ['#4DA74D'];
    this.configYKeys = ['a'];
    this.http.post(PathConfig.GET_GLOBAL_SH8KE_STATICS+id, {"startDate" : startDate,"endDate": endDate})
      .subscribe((response)=> {
          let monthStr     = response['data']['monthStr'];
          let monthStrArr  = response['data']['monthStr'] ? response['data']['monthStr'].split(",") : [];
          let favCount     = response['data']['monthDataFavStr'] ? response['data']['monthDataFavStr'].split(",") : [];

          let data = [];
          _.forEach(monthStrArr,function(val,index){
            let prevDate = new Date();
            let date = prevDate.getFullYear()+'-'+(prevDate.getMonth() + 1)+'-'+(index + 1);
            data.push( {"date": date, "a": parseInt(favCount[index])});
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
