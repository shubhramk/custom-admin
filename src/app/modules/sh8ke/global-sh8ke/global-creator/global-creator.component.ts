import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import {ActivatedRoute} from '@angular/router';
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
  constructor(private http:HttpService, private activateroute:ActivatedRoute) { }

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
    },
    err => {
    });
  }
  getglobalSh8keList(id:string){
    this.http.post(PathConfig.GET_GLOBAL_SH8KE_CREATOR+id, {"type" : "global"}).subscribe((response)=>{
      this.globalSh8keList = response.data;
      console.log(this.globalSh8keList);
    },
    err => {
    });
  }
  onMenuSelect(data: any) {
  }

}
