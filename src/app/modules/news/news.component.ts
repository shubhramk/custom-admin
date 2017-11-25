import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from '../../common//services/http.service';
import {PathConfig} from "../../common/config/path.config";
import { FileUploader } from 'ng2-file-upload';
import { ValidationService } from '../../common/services/validation.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Broadcaster} from "../../common/services/broadcaster.service";

declare var mscConfirm:any;
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
   message:string = "";
   uploader:FileUploader = new FileUploader({
    url:PathConfig.ADD_NEWS_WITH_IMAGE
  });
  bool_fileUploaded = false;
  userForm:any;
  constructor(private router:Router, private http:HttpService, private formBuilder: FormBuilder, private broadcaster:Broadcaster) { 
    
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      'newsTitle': ['', Validators.required],
      'description': ['', Validators.required],
      'expireDate': ['', Validators.required]
    });
   }
  fileChanged(){
  
  }
  ngOnInit(){
    this.broadcaster.on<string>('ROUTE_URL')
    .subscribe(message => {
      this.visibleElement = false;
  });

    this.createForm();
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("title", this.newsTitle);
      form.append("description" ,this.description);
      form.append("expire_on" ,this.expireDate);
    };

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };

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
              '<a href="javascript:void(0);" data-name="edit"  data-custom="' + full['rowId'] + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
              '<a href="javascript:void(0);" data-name="delete" data-custom="' + full['rowId'] + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
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
              '<a href="javascript:void(0);" data-name="notification" (click) ="alert("asas")" data-custom="' + full['rowId'] + '">Send Notifaction</a>' +
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
            if(val !=""){
              template = '<div class="dt-menu-icons">' +val +
              '</div>';
            }
            if(val == ""){
              template = '<div class="dt-menu-icons">' +"No Image Available"+
              '</div>';

            }
            
            
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
              let val = data;
              if(full['publish'] == 'Yes'){
                template = '<div class="dt-menu-icons">' +
                '<a href="javascript:void(0);" data-name="status" data-custom="' + full['rowId']  + '"data-creator="' + full['publish'] + '"><span class="fa fa-check-circle" aria-hidden="true">'+'</span></a>' +
                '</div>';
              }else{
                template = '<div class="dt-menu-icons">' +
                '<a href="javascript:void(0);" data-name="status" data-custom="' + full['rowId']  + '"data-creator="' + full['publish'] + '"><span class="fa fa-times-circle" aria-hidden="true">'+'</span></a>' +
                '</div>';
              }
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
      var self = this;
      setTimeout(()=>{
        $('#datepicker-autoclose').datepicker({
        autoclose: true,
        todayHighlight: true,
        startDate:new Date(),
        format:'yyyy-mm-dd'
      }).on('changeDate', function(e) {
        console.log(e.date);
        let date = new Date(e.date);
        console.log(String(date.getDate()) +"-"+String(date.getMonth())+"-"+String(date.getFullYear()));
        self.expireDate = String(String(date.getFullYear() +"-"+String(date.getMonth()+1)+"-"+ date.getDate()));
        
      });
    },200);
    }
    getNewsList(){  
      this.http.get(PathConfig.GET_NEWS)
      .subscribe((response)=> {
        this.broadcaster.broadcast("SHOW_LOADER",false);
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
      this.navigateTo('news/editNews/'+data['value'])   
    }else if(data['clickedOn'] == 'delete'){
      this.deleteNews(data['value']);
    }else if(data['clickedOn'] == 'status'){
      this.chnageStatus(data['value'], data['creatorName']);
    }else if(data['clickedOn'] == 'notification'){
      this.sendNotification(data['value']);
    }
  }

  chnageStatus(id:string, status){
    var self = this;
    mscConfirm("Are you sure to chnage status", function(){
      self.broadcaster.broadcast("SHOW_LOADER",true);
      self.http.post(PathConfig.NEWS_CHANGE_STATUS, {st:status, id:id}).subscribe((response)=>{
        self.broadcaster.broadcast("SHOW_LOADER",false);    
        self.getNewsList();
      }, err=>{

      });
    });
  } 
  sendNotification(id:string){
    this.http.get(PathConfig.NEWS_CHANGE_STATUS+id).subscribe((response)=>{
      console.log(response);
      this.getNewsList();
    }, err=>{

    });
  }
  deleteNews(id:string){
    var self = this;
    mscConfirm("Are you sure to chnage status", function(){
      self.broadcaster.broadcast("SHOW_LOADER",true);      
      self.http.get(PathConfig.DELETE_NEWS+id).subscribe((response)=>{
        self.broadcaster.broadcast("SHOW_LOADER",false);        
        self.getNewsList();
      }, err=>{
  
      })
    });
  }

   //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  fileSelection(){
    if($("#avatar").val() == ""){
      this.bool_fileUploaded = true;
      return true;
    }else{
      this.bool_fileUploaded = false;
    }
  }
  addNews(){
    if($("#avatar").val() == ""){
      this.bool_fileUploaded = true;
      return true;
    }else{
      this.bool_fileUploaded = false;
    }
    this.broadcaster.broadcast("SHOW_LOADER",true);
    if($("input[type =file]").val() == ""){
      this.http.post(PathConfig.ADD_NEWS, {
        "title": this.newsTitle,
        "description": this.description,
        "image": "",
        "size": "",
        "expire_on":this.expireDate
      }).subscribe((response)=>{
        this.broadcaster.broadcast("SHOW_LOADER",false);
  
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
    }else{

        this.uploader.cancelAll();
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          var responsePath = JSON.parse(response);
          console.log(responsePath.Status);
          this.broadcaster.broadcast("SHOW_LOADER",false);
          
          if(responsePath.Status == "Success"){
            this.showSuccess= true;
            this.showError= false;
            this.message = responsePath.SucessMessage;
            this.getNewsList();
           // this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
           }else if(responsePath.Status == "Error"){
            this.showSuccess= true;
            this.showError= false;
            this.message = responsePath.ErrorMessage;
           }
           $("#avatar").val("");
          };
    }
    this.createForm();
  }
  cancelBtnHandler(){
    this.createForm(); 
    this.newsTitle = "";
    this.expireDate = "";
    this.description = "";
    this.visibleElement = !this.visibleElement;
    this.showSuccess=false;
    this.showError= false;
  }
}
