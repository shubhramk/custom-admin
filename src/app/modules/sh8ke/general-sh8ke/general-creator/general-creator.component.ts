import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import {ActivatedRoute} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-general-creator',
  templateUrl: './general-creator.component.html',
  styleUrls: ['./general-creator.component.css']
})
export class GeneralCreatorComponent implements OnInit {
  dtConfig:Object= {};
  generalCreator = [];

  startDate = "";
  endDate:any;
  creatorName:string="";

  constructor(private http:HttpService, private activateroute:ActivatedRoute) { }

  ngOnInit() {    
    this.creatorName = this.activateroute.snapshot.params['name'];
   // alert(this.generalCreator);

    this.startDate = "01-01-2016";
    this.endDate = new Date();
    this.endDate = this.endDate.getDate()+"-"+this.endDate.getMonth()+"-"+this.endDate.getFullYear();
    //console.log(this.endDate + "    this.endDate");
      this.dtConfig = {
      "columnDefs": [],
      "columns": [
        { "title": 'Title', "data": "title" },
        { "title": 'Description', "data": "description" },
        { "title": 'Category', "data": "CategoryName" }
      ]
     }
     setTimeout(()=>{
       $('#date-range').datepicker({
        toggleActive: true,
        format:"dd-mm-yyyy"
      });
    },200);
    this.startDate = $("#startDate").val();
    this.endDate = $("#endDate").val();
    this.getGeneralCreator(this.activateroute.snapshot.params['id'], this.startDate, this.endDate);
  }
   getGeneralCreator(id:string, startDate, endDate){
    this.http.post(PathConfig.GET_GENERAL_SH8KE_CREATOR+id, {"startDate" : startDate,	"endDate" : endDate})
      .subscribe((response)=> {
          this.generalCreator =  response.data;
          if(this.generalCreator.length == 0){
            this.generalCreator = [];
          }
          console.log(this.generalCreator);
        },
        err => {
        }
      );
  }
  filterDataAccordingDate(){
    this.startDate = $("#startDate").val();
    this.endDate = $("#endDate").val();
    console.log(this.startDate, this.endDate);
    this.getGeneralCreator(this.activateroute.snapshot.params['id'], this.startDate, this.endDate);
  }
  onMenuSelect(data:any){

  }
}
