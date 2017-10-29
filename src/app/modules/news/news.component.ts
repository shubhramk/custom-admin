import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from '../../common//services/http.service';
import {PathConfig} from "../../common/config/path.config";
declare var $:any
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  categoryItems = ["Daily", "Shakedown", "Private", "Share", "Explode", "Socialize", "Password", "Adult Material"];
  visibleElement:boolean = false;
   newsList = [];
   dtConfig:Object = {}; 

   newsTitle:string = "";
   expireDate:string = "";
   description = "";
   showSuccess:boolean = false;
   showError:boolean= false;
  constructor(private router:Router, private http:HttpService) { }

  ngOnInit(){
    this.dtConfig = { 
      "columnDefs": [
        {
          "targets": 5,
          "width": "10%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="edit" (click) ="alert("asas")" data-custom="' + val + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
              '<a href="javascript:void(0);" data-name="delete" data-custom="' + val + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
              '</div>';

            return template;
          }
        },
        {
          "targets": 4,
          "width": "10%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="notification" (click) ="alert("asas")" data-custom="' + val + '">Send Notifaction</a>' +
               '</div>';

            return template;
          }
        },
        {
          "targets": 1,
          "width": "20%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="dt-menu-icons">' +
              '<img src ="'+val+'" data-name="img" data-custom="' + val + '" style="height:40px;"/>' +
              '</div>';

            return template;
          }
        },
        {
            "targets": 3,
            "width": "10%",
            "orderable": false,
            "className": "noPadding",
            "render": function (data, type, full, meta) {
              var template = '';
              console.log(full['publish']=='Yes');
              let val = data;
              template = '<div class="dt-menu-icons">' +
              '<span class="fa fa-check-circle" aria-hidden="true" *ngIf="'+full['publish']+'==Yes'+'">'+'</span>' +
              '</div>';

              return template;
            }
        }
      ],
      "columns": [
        { "title": 'Title', "data": "title" },
        { "title": 'Image', "data": "image" },
        { "title": 'Expires on', "data": "expire_on" },
        { "title": 'Publish', "data": "publish" },
        { "title": 'Send Notification', "data": "" }
      ]
     }
     this.getNewsList();
     
    }
    setDatepicker(){
      setTimeout(()=>{
        $('#datepicker-autoclose').datepicker({
        autoclose: true,
        todayHighlight: true,
        format:'yyyy-mm-dd'
      });
    },200);
    }
    getNewsList(){
      this.http.get(PathConfig.GET_NEWS)
      .subscribe((response)=> {
        this.newsList = response.data;
        console.log(this.newsList);
      },
      err => {
          // Log errors if any
      }
      )
    }
  //on Menu Icon selected
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
      this.navigateTo('news/editNews')   
    }
  }
   //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  addNews(){
    let currentTime = new Date().toLocaleTimeString();
    currentTime = currentTime.split(" ")[0];
    this.http.post(PathConfig.ADD_NEWS, {
      "title": this.newsTitle,
      "description": this.description,
      "image": "",
      "size": "",
      "expire_on":this.expireDate 
    }).subscribe((response)=>{
      if(response.Status == "Success"){
        this.getNewsList();
        this.showSuccess = true;
        this.showError = false;
      }else if(response.Status == "Error"){
        this.showSuccess = false;
        this.showError = true;
      }
    }, err=>{
      
    })
  }
}
