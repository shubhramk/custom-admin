import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from "../../../common/services/http.service";
import {PathConfig} from "../../../common/config/path.config";
import {Broadcaster} from "../../../common/services/broadcaster.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ValidationService } from '../../../common/services/validation.service';
import { FileUploader } from 'ng2-file-upload';

declare var $:any, mscConfirm:any;

@Component({
  styleUrls: ['./admin.component.scss'],
  templateUrl: './admin.component.html'
})
export class AdminUserComponent implements OnInit {
  visibleElement:boolean = false;
  adminUserList = [];
  dtConfigAdminUser:object = {};
  form: FormGroup;
  userForm: any;

  uploader:FileUploader = new FileUploader({
    url:PathConfig.ADD_ADMIN_USER_WITH_IMAGE
  });

  fName:string = "";
  email:string = "";
  user_Name:string = "";
  password_admin:string = "";
  user_type:string = "";
  showSuccess:boolean = false;
  showError:boolean = false;
  message:string = "";
  fileErrorMsg = "Please select a file to upload"; 
  isFileValid = false;
  bool_fileUploaded = false;
  constructor( private router:Router, private http:HttpService, private broadcaster:Broadcaster) {  }
ngOnInit(){

  this.uploader.onBuildItemForm = (item, form) => {
    let checkBoxFinalAnswer:string;
    form.append("name", this.fName);
    form.append("user_type" ,this.user_type);
    form.append("email" ,this.email);
    form.append("password" ,this.password_admin);
    form.append("username" ,this.user_Name);
  };

  this.uploader.onAfterAddingFile = (file)=> {
    var ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];          
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
    this.dtConfigAdminUser =  {
      "columnDefs": [
        {
          "targets": 0,
          "orderable": false,
        },
        {
          "targets": 5,
          "width": "10%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="edit" data-custom="' + full['rowId'] + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
              '<a href="javascript:void(0);" data-name="delete" data-custom="' + full['rowId'] + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
              '</div>';

            return template;
          }
        },
        {
          "targets": 0,
          "width": "10%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<a href="javascript:void(0);" data-name="name" data-custom="' + full['rowId'] + '" data-creator="' + data + '">'+val+'</a>';

            return template;
          }
        },{
          "targets": 4,
          "width": "10%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            if(full['isActive'] == '1'){
              template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="status" data-custom="' + full['rowId']  + '"data-creator="' + full['isActive'] + '"><span class="fa fa-check-circle" aria-hidden="true">'+'</span></a>' +
              '</div>';
            }else{
              template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="status" data-custom="' + full['rowId']  + '"data-creator="' + full['isActive'] + '"><span class="fa fa-times-circle" aria-hidden="true">'+'</span></a>' +
              '</div>';
            }

            return template;
          }
        }

      ],
      "columns": [
        { "title": 'Name', "data": "name" },
        { "title": 'Username', "data": "username" },
        { "title": 'Email', "data": "email" },
        { "title": 'User Type', "data": "user_type" },
        { "title": 'isActive', "data": "isActive" }
      ]
    }
    //get top global shakes
    this.getAdminUsers();

    //register events
    this.broadcaster.on<string>('ROUTE_URL')
      .subscribe(message => {
        this.visibleElement = false;
    });
  }
  //on Menu Icon selected
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {

      this.navigateTo('users/edit-admin/'+data['value']);
    }else if(data['clickedOn'] == 'name'){
      this.navigateTo('user/globalCreator/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'delete'){
      this.deleteAdminUser(data['value']);
    } else if(data['clickedOn'] == 'status'){
      this.chnageStatus(data['value'], data['creatorName']);
    }
  }

  chnageStatus(id:string, status){
    var self = this;
    mscConfirm("Are you sure to change status!", function(){
        self.broadcaster.broadcast("SHOW_LOADER",true)
        if(status == "0"){

          status ="1";
        }else{
          status = "0";
        }
        console.log(status);
        //alert(status);
        self.http.post(PathConfig.UPDATE_ADMIN_USER_ISACTIVE, {st:status, id:id}).subscribe((response)=>{
          self.broadcaster.broadcast("SHOW_LOADER",false)
        console.log(response);
        self.getAdminUsers();
      }, err=>{

      });
    })
  }

  adMinUserDateWithoutImage(){
    let postData = {};

    postData["name"] = this.fName;
    postData["user_type"]  = this.user_type;
    postData["email"] = this.email;
    postData["password"] = this.password_admin;
    postData["username"] = this.user_Name;
    console.log(postData);
    this.broadcaster.broadcast("SHOW_LOADER",true);
    this.http.post(PathConfig.ADD_ADMIN_USER, postData).subscribe((response)=>{
      console.log(response);
      this.broadcaster.broadcast("SHOW_LOADER",false)
      if(response.Status == "Success"){
        this.message = " Record Updated Successfully"
        this.showError = false;
        this.showSuccess = true;
        this.getAdminUsers();
        this.resetForm();
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
    this.broadcaster.broadcast("SHOW_LOADER",true);
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      var responsePath = JSON.parse(response);
      this.broadcaster.broadcast("SHOW_LOADER",false);
      if(responsePath.Status == "Success"){
        this.showSuccess= true;
        this.showError= false;
        this.message = responsePath.SucessMessage;
        this.getAdminUsers();
        this.resetForm();
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
    'fName':false,
    'email':false,
    'user_Name':false,
    'password_admin':false,
    'user_type':false,
    'uploader':false
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
  addAdminUser(){
    //resetting all errors
    this.resetErrorObj(this.errorAddAdminUser);
    //validation
    
    if(!this.fName){
      this.errorAddAdminUser['fName']  = true;
    }

    if(!this.email || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))){
      this.errorAddAdminUser['email']   = true;
    }
    if(!this.user_Name){
      this.errorAddAdminUser['user_Name']   = true;
    }
    if(!this.password_admin){
      this.errorAddAdminUser['password_admin']   = true;
    }
    if(!this.user_type ){
      this.errorAddAdminUser['user_type'] = true;
    }
    if($("#avatar").val() == "" || this.isFileValid == true){
      this.errorAddAdminUser['uploader'] = true;
     // this.bool_fileUploaded = true;
     // return true;
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
  resetForm(){
    this.fName = "";
    this.email = "";
    this.user_Name = "";
    this.password_admin = "";
    this.user_type = "";
  }
//get top20 globalShakes
deleteAdminUser(id){
  var self = this;
  mscConfirm("Are you sure to delete!", function(){
    self.broadcaster.broadcast("SHOW_LOADER",true);
    self.http.get(PathConfig.DELETE_ADMIN_USER+id).subscribe((response)=>{
      self.broadcaster.broadcast("SHOW_LOADER",false);
      if(response.Status == "Success"){
        self.getAdminUsers();
      }
    },
    err=>{

    })
  });
}
getAdminUsers(){

  this.http.get(PathConfig.GET_ADMIN_USER)
    .subscribe((response)=> {
      this.broadcaster.broadcast("SHOW_LOADER",false)
      
        this.adminUserList =  response.data;
        console.log((this.adminUserList));
      },
      err => {
      }
    );
}
updatedUserType(event){
  this.user_type = event;
}
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
