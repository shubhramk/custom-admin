import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {HttpService} from '../../../common//services/http.service';
import {PathConfig} from "../../../common/config/path.config";
import { FileUploader } from 'ng2-file-upload';
import { ValidationService } from '../../../common/services/validation.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Broadcaster} from "../../../common/services/broadcaster.service";
declare var $:any

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {
  newsTitle:string = "";
  expireDate:string = "";
  description = "";
  showSuccess:boolean = false;
  showError:boolean= false;
  message:string = "";
  bool_fileUploaded:boolean = false;
  /* uploader:FileUploader = new FileUploader({
   url:PathConfig.UPDATE_NEWS_ANSWER_UPLOADED_ITEM
 }); */
 uploader:FileUploader = new FileUploader({
  url:PathConfig.UPDATE_NEWS_ANSWER_UPLOADED_ITEM
});
answer_id:string = "";
oldImagePath:string = "";
userForm:any;
  constructor(private broadcaster:Broadcaster, private router:Router, private http:HttpService, private activatedroute:ActivatedRoute, private formBuilder: FormBuilder) {
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

  ngOnInit() {
      this.uploader.onBuildItemForm = (item, form) => {
      console.log(this.uploader.onBeforeUploadItem = (file)=>{console.log(file)});
      form.append("title", this.newsTitle);
      form.append("description" ,this.description);
      form.append("expire_on" ,this.expireDate);
      form.append("id", this.answer_id);
    };

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.getEditableNewsData(this.activatedroute.snapshot.params['id']);
    var self = this;
    setTimeout(()=>{
       $('#datepicker-autoclose').datepicker({
        autoclose: true,
        todayHighlight: true ,
        format:"yyyy-mm-dd"
     }).on('changeDate', function(e) {
      console.log(e.date);
      let date = new Date(e.date);
      console.log(date);
      self.expireDate = String(date.getFullYear())+"-" +String(date.getMonth()+1)+"-"+String(date.getDate());
      
        });
      },200);

  }

  getEditableNewsData(id:string){
   
    
    this.http.get(PathConfig.GET_EDITABLE_NEWS + id).subscribe((response)=>{
      console.log(response);
      this.broadcaster.broadcast("SHOW_LOADER",false);
      if(response.Status == "Success"){
        this.newsTitle = response.data['title'];
        this.description = response.data['description'];
        this.expireDate = response.data['expire_on'];
        this.answer_id = response.data["id"];
        this.oldImagePath = response.data['old_file'];
        let tempExpire = this.expireDate.split("-");
        this.expireDate = tempExpire[2]+"-"+tempExpire[1]+"-"+tempExpire[0];
        //$("#datepicker-autoclose").datepicker("update", new Date(this.expireDate));
      }
    }, err=>{

    })
  }
     //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  updateNews(){
    /* console.log(this.uploader.isFile);
    if($("#avatar").val() == ""){
      this.bool_fileUploaded = true;
      return true;
    }else{
      this.bool_fileUploaded = false;
    } */
    this.broadcaster.broadcast("SHOW_LOADER",true);
    
    if($("input[type =file]").val() == ""){      
      let postData = {};
      postData["title"] = this.newsTitle;
      postData["description"] = this.description;
      postData["expire_on"] = this.expireDate;
      postData["id"] = this.answer_id;
      console.log(postData);
      this.http.post(PathConfig.UPDATE_NEWS_ANSWER, postData).subscribe((response)=>{
        this.broadcaster.broadcast("SHOW_LOADER",false);
        
        if(response.Status == "Success"){
          this.showSuccess= true;
          this.showError= false;
          this.message = response.SucessMessage;
          window.scrollTo(0, 0);
         // this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
         }else if(response.Status == "Error"){
          this.showSuccess= true;
          this.showError= false;
          this.message = response.ErrorMessage;
          window.scrollTo(0, 0);
         }
      }, err=>{

      })
    }else{
      this.uploader.cancelAll();
      
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        var responsePath = JSON.parse(response);
        this.broadcaster.broadcast("SHOW_LOADER",false);
        
        if(responsePath.Status == "Success"){
          this.showSuccess= true;
          this.showError= false;
          this.message = responsePath.SucessMessage;
          window.scrollTo(0, 0);
         // this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
         }else if(responsePath.Status == "Error"){
          this.showSuccess= true;
          this.showError= false;
          this.message = responsePath.ErrorMessage;
          window.scrollTo(0, 0);
         }
         $("#avatar").val("");
    }
  }
}
}
