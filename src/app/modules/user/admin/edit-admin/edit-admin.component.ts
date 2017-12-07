import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import {Broadcaster} from "../../../../common/services/broadcaster.service";
import { FileUploader } from 'ng2-file-upload';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var $:any;

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  name:string = "";
  email:string = "";
  user_Name:string = "";
  password:string = "";
  imageUrl:string = "";
  user_type:string = "";
  getUserId:string = "";
  showSuccess:boolean = false;
  showError:boolean = false;
  message:string = "";
  form: FormGroup;
  userForm: any;

  fileErrorMsg = "Please select a file to upload"; 
  isFileValid = false;
  bool_fileUploaded = false;

  uploader:FileUploader = new FileUploader({
    url:PathConfig.UPDATE_ADMIN_USER_WITH_IMAGE
  });

  constructor(private router:Router, private http:HttpService, private activatedRouteL:ActivatedRoute, private broadcaster:Broadcaster) { }

  ngOnInit() {

    this.uploader.onBuildItemForm = (item, form) => {
      let checkBoxFinalAnswer:string;
      form.append("id", this.getUserId);
      form.append("name", this.name);
      form.append("user_type" ,this.user_type);
      form.append("email" ,this.email);
      form.append("password" , this.password ? "" : this.password);
      form.append("username" ,this.user_Name);
    };

    this.uploader.onAfterAddingFile = (file)=> { 
      var ValidImageTypes = ["image/gif", "image/jpeg", "image/png"]; 
      console.log($("#avatar").val());
        if ($.inArray(file.file['type'], ValidImageTypes) < 0) {
          this.fileErrorMsg = "Please select valid Image type"; 
          this.isFileValid = true;
          this.errorAddAdminUser['uploader'] = true;
        }else{
          this.fileErrorMsg = "Please select a file to upload"; 
          this.isFileValid = false;
          this.errorAddAdminUser['uploader'] = false;
        }

      file.withCredentials = false; 
    };

    console.log(this.activatedRouteL.snapshot.params["id"]);
    this.getAdminUserDetail();
  }
  getAdminUserDetail(){
    this.http.get(PathConfig.GET_ADMIN_USER_EDITABLE_DATA+this.activatedRouteL.snapshot.params["id"]).subscribe((response)=>{
      this.broadcaster.broadcast("SHOW_LOADER",false)
      this.name = response.data['name'];
      this.email = response.data['email'];
      this.getUserId = response.data['id']
      this.user_Name = response.data['username'];
      console.log(this.user_Name);
      //this.imageUrl = response.data['profile_image'];
      this.user_type = response.data['user_type'];
    },err=>{

    })
  }
  adMinUserDateWithoutImage(){
    let postData = {};
    postData["id"] = this.getUserId;
    postData["name"] = this.name;
    postData["user_type"]  = this.user_type;
    postData["email"] = this.email;
    postData["password"] = this.password ? "" : this.password;
    postData["username"] = this.user_Name;
    console.log(postData);
    this.broadcaster.broadcast("SHOW_LOADER",true);
    this.http.post(PathConfig.UPDATE_ADMIN_USER_ADMIN, postData).subscribe((response)=>{
      console.log(response);
      this.broadcaster.broadcast("SHOW_LOADER",false)
      if(response.Status == "Success"){
        this.message = " Record Updated Successfully"
        this.showError = false;
        this.showSuccess = true;
        window.scrollTo(0, 0);
      }else{
        this.message = response.data['ErrorMessage'];
        this.showError = true;
        this.showSuccess = false;
        window.scrollTo(0, 0);
      }
    }, err=>{

    });
  }
  adMinUserDateWithImage(){
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

  errorAddAdminUser = {
    'name':false,
    'email':false,
    'user_Name':false,
    'user_type':false,
    'uploader':false
  }
  fileElementChnage(){
    if($("#avatar").val() == ""){
      this.errorAddAdminUser['uploader'] = false;
    }
  }
  allErrorResolved(obj:Object):boolean{
    //resetting all errors on Add
    for (let v in obj){
      if(obj[v.toString()]){
        return false;
      }
    }
    return true;
  }

  resetErrorObj(obj:Object){
    //resetting all errors
    for (let v in obj){
      obj[v.toString()] = false;
    }
  }
  saveUpdatedAdminUser(){
    //resetting all errors
    this.resetErrorObj(this.errorAddAdminUser);
    //validation
    if($("#avatar").val() != "" && this.isFileValid == true){
      this.errorAddAdminUser['uploader']  = true;
      //return true;
    }
    if(!this.name){
      this.errorAddAdminUser['name']  = true;
    }

    if(!this.email || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))){
      this.errorAddAdminUser['email']   = true;
    }
    if(!this.user_Name){
      this.errorAddAdminUser['user_Name']   = true;
    }

    if(!this.user_type ){
      this.errorAddAdminUser['user_type'] = true;
    }

    //All Validation passes
    if(this.allErrorResolved(this.errorAddAdminUser)) {
      if ($("input[type =file]").val() == "") {
        this.adMinUserDateWithoutImage()
      } else {
        this.adMinUserDateWithImage();
      }
    }
  }
   //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  updatedUserType(event){
    this.user_type = event;
  }
}
