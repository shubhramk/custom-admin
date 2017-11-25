import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import {Router, ActivatedRoute} from '@angular/router';
import {Broadcaster} from "../../../../common/services/broadcaster.service";
declare var $:any;

@Component({
  selector: 'app-global-creator',
  templateUrl: './global-creator.component.html',
  styleUrls: ['./global-creator.component.css']
})
export class GlobalCreatorComponent implements OnInit {
  creatorName:string="";
  generalSh8keList = [];
  globalSh8keList = [];
  dtConfig:Object = {};
  bool_noRecordGeneral:boolean = false;
  bool_noRecordGlobal:boolean = false;
  noRecordMessage:string = "";
  constructor(private router:Router, private http:HttpService, private activateroute:ActivatedRoute, private broadcaster:Broadcaster) { }

  ngOnInit() {
    this.creatorName = this.activateroute.snapshot.params['name'];
    //global data table
    this.dtConfig = {
      "columnDefs": [
      ],
      
      "columns": [
        { "title": 'Title', "data": "Title" },
        { "title": 'Description', "data": "description" },
        { "title": 'Category', "data": "CategoryName" }
      ]
     }
     this.getgeneralSh8keList(this.activateroute.snapshot.params['id']);
     this.getglobalSh8keList(this.activateroute.snapshot.params['id']);
  }
  getgeneralSh8keList(id:string){
    
    this.http.post(PathConfig.GET_GLOBAL_SH8KE_CREATOR+id, {"type" : "general"}).subscribe((response)=>{
      this.generalSh8keList = response.data;
      console.log(response);
      this.broadcaster.broadcast("SHOW_LOADER",false);
      if(this.generalSh8keList.length == 0 || response.data == ""){
        this.noRecordMessage =  response.SucessMessage;
        this.generalSh8keList = [];
        this.bool_noRecordGeneral = true;        
      }
    },
    err => {
    });
  }
  getglobalSh8keList(id:string){
    this.http.post(PathConfig.GET_GLOBAL_SH8KE_CREATOR+id, {"type" : "global"}).subscribe((response)=>{
      this.globalSh8keList = response.data;
      this.broadcaster.broadcast("SHOW_LOADER",false);
      if(this.globalSh8keList.length == 0){
        this.noRecordMessage =  response.SucessMessage;
        this.globalSh8keList = [];
        this.bool_noRecordGlobal = true;
        
      }

      console.log(this.globalSh8keList);
    },
    err => {
    });
  }
  onMenuSelect(data: any) {
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
