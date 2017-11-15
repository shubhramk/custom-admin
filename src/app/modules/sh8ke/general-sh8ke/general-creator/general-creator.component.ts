import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import {ActivatedRoute} from '@angular/router';
import {Broadcaster} from "../../../../common/services/broadcaster.service";
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
  bool_noRecord:boolean = false;
  noRecordMessage:string = "";
  userActive:string = "";
  constructor(private http:HttpService, private activateroute:ActivatedRoute, private broadcaster:Broadcaster) { }

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
    this.getUserIsactiveOrNot(this.activateroute.snapshot.params['id']);
  }

  getUserIsactiveOrNot(id:string){
    this.http.get(PathConfig.GET_GENERAL_USER_EDITABLE_DATA+id).subscribe((response)=>{
      console.log(response);
      if(response.Status == "Success"){
        if(response.data['isActive'] == 0){
          this.userActive = "Activate User";
        }else{
          this.userActive = "Deactivate User";
        }
      }
    }, err=>{

    })
  }
  chnageStatus(){
    let confirmElem  = confirm('sure to change status user?');
    let isActive:string = "";
    if(confirmElem== true){
      if(this.userActive == "Activate User"){
        isActive ="1";
      }else{
        isActive = "0";
      }
      //alert(status);
      this.http.post(PathConfig.UPDATE_GENERAL_USER_ISACTIVE, {st:isActive, id:this.activateroute.snapshot.params['id']}).subscribe((response)=>{
      console.log(response);
      this.getUserIsactiveOrNot(this.activateroute.snapshot.params['id']);
    }, err=>{

    });
    }
  }
   getGeneralCreator(id:string, startDate, endDate){
    this.http.post(PathConfig.GET_GENERAL_SH8KE_CREATOR+id, {"startDate" : startDate,	"endDate" : endDate})
      .subscribe((response)=> {
        this.broadcaster.broadcast("SHOW_LOADER",false);
        
        this.generalCreator =  response.data;
          if(this.generalCreator.length == 0){
            this.noRecordMessage =  response.SucessMessage;
            this.generalCreator = [];
            this.bool_noRecord = true;
            
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
