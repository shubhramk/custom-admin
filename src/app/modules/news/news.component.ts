import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from '../../common//services/http.service';
import {PathConfig} from "../../common/config/path.config";
import { FileUploader } from 'ng2-file-upload';
import { ValidationService } from '../../common/services/validation.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  constructor(private router:Router, private http:HttpService, private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      'newsTitle': ['', Validators.required],
      'description': ['', Validators.required],
      'expireDate': ['', Validators.required],/* 
      'uploadedAnswer': ['', ValidationService.fileValidator], */
      /* ,
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'profile': ['', [Validators.required, Validators.minLength(10)]] */
    });
  }
  fileChanged(){
    /* this.userForm = this.formBuilder.group({
      'uploadedAnswer': ['', ValidationService.fileValidator]
    }) */
  }
  ngOnInit(){
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
    console.log(status);
    let confirmElem  = confirm('sure to change status for this news?');
    if(confirmElem== true){
      this.http.post(PathConfig.NEWS_CHANGE_STATUS, {st:status, id:id}).subscribe((response)=>{
      console.log(response);
      this.getNewsList();
    }, err=>{

    });
    }
  } 
  sendNotification(id:string){
    this.http.get(PathConfig.NEWS_CHANGE_STATUS+id).subscribe((response)=>{
      console.log(response);
      this.getNewsList();
    }, err=>{

    });
  }
  deleteNews(id:string){
    let confirmElem = confirm("Are you sure to delete!");
    if(confirmElem == true){
      this.http.get(PathConfig.DELETE_NEWS+id).subscribe((response)=>{       
        this.getNewsList();
      }, err=>{
  
      })
    }
    
  }

   //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  fileSelection(){
    if($("#avatar").val() == ""){
      this.bool_fileUploaded = true;
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
    if($("input[type =file]").val() == ""){
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
    }else{
        this.uploader.cancelAll();
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          var responsePath = JSON.parse(response);
          console.log(responsePath.Status);
          if(responsePath.Status == "Success"){
            this.showSuccess= true;
            this.showError= false;
            this.message = responsePath.SucessMessage;
           // this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
           }else if(responsePath.Status == "Error"){
            this.showSuccess= true;
            this.showError= false;
            this.message = responsePath.ErrorMessage;
           }
           $("#avatar").val("");
          };
    }
    
  }
}
