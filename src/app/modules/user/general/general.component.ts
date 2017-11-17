import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from "../../../common/services/http.service";
import {PathConfig} from "../../../common/config/path.config";
import {Broadcaster} from "../../../common/services/broadcaster.service";
declare var $:any, mscConfirm:any;
import { FileUploader } from 'ng2-file-upload';
import * as _ from 'lodash';

@Component({
  styleUrls: ['./general.component.scss'],
  templateUrl: './general.component.html'
})
export class GeneralUserComponent implements OnInit, AfterViewInit {
  visibleElement:boolean = false;
  preferencesItems = [{name:"Arty", selected:false, disabled:false }, {name:"Girly",selected:false, disabled:false }, {name:"Nerdy",selected:false, disabled:false }, {name:"Craftsman",selected:false, disabled:false }, {name:"Hip-ster",selected:false, disabled:false }, {name:"Old School",selected:false, disabled:false }, {name:"Dapper",selected:false, disabled:false }, {name:"Jock",selected:false, disabled:false}, {name:"Quiet",selected:false, disabled:false}, {name:"Extreme",selected:false, disabled:false}, {name:"Loud",selected:false, disabled:false}, {name:"Romantic",selected:false, disabled:false},
  {name:"Funny",selected:false, disabled:false}, {name:"Manly",selected:false, disabled:false}, {name:"Sassy",selected:false, disabled:false}, {name:"Ditzy",selected:false, disabled:false}, {name:"Social",selected:false, disabled:false}, {name:"Techie",selected:false, disabled:false}];

   generalUser = [];
   dtConfigGeneralUser:Object = {};

   fName:string = "";
   surName:string = "";
   phoneNo:number;
   email:string = "";
   userName_general:string = "";
   password:string = "";
   selectedGender:string = "";
   selectStatus:string = "";
   selectIntrest:string = "";
   selectedDate:string = "";
   selectedMonth:string = "";
   selectedYear:string = "";
   showSuccess:boolean = false;
   showError:boolean = false;
   message:string = "";
   self = this;
   noRecordFound:boolean = false;

   uploader:FileUploader = new FileUploader({url:PathConfig.ADD_GENERAL_USER_IMAGE});

  constructor(private router:Router, private http:HttpService, private broadcaster:Broadcaster) {}
  ngAfterViewInit(){

  }
  ngOnInit(){
    let selectedPrefrences = [];
    this.uploader.onBuildItemForm = (item, form) => {
      selectedPrefrences = [];
      form.append("name", this.fName);
      form.append("surname" ,this.surName);
      form.append("username" ,this.userName_general);
      form.append('password', this.password);

      form.append("mail_id", this.email);
      form.append("mobile_no" ,this.phoneNo);
      form.append('gender', this.selectedGender);

      form.append("birth_month", this.selectedMonth);
      form.append("birth_year" ,this.selectedYear);
      form.append("birth_day" ,this.selectedDate);
      form.append('intrested_gender', this.selectIntrest);

      form.append("status" ,this.selectStatus);
      this.preferencesItems.forEach((val,key)=>{
        if(val.selected == true){

          selectedPrefrences.push(val.name);
        }
      });
      form.append("prefrence" , selectedPrefrences);
    };

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };

     //general data table
     var self = this;
      this.dtConfigGeneralUser =  {
        "columnDefs": [
          {
            "targets": 0,
            "orderable": false,
          },
          {
            "targets": 8,
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
          },{
            "targets": 7,
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
          }

        ],
        "columns": [
          { "title": 'Name', "data": "name" },
          { "title": 'Mobile', "data": "mobile_no" },
          { "title": 'Email', "data": "mail_id" },
          { "title": 'Gender', "data": "gender" },
          { "title": 'Date of Birth', "data": "birth" },
          { "title": 'Platform' , "data":"platform"},
          { "title": 'Status' , "data":"status"},
          { "title": 'isActive' , "data":"isActive"}
        ]
      }
      //get top global shakes
      this.getGeneralUsersList();
  }

  //on Menu Icon selected

  addGeneralUserWithoutImage(){
    console.log(this.selectedYear);
    let postData = {};
    let selectedPrefrences = [];
    postData["name"] = this.fName;
    postData["surname"] = this.surName
    postData["username"] = this.userName_general;
    postData["password"] = this.password;
    postData["mail_id"] = this.email;
    postData["mobile_no"] = this.phoneNo
    postData["gender"] = this.selectedGender;
    postData["birth_month"] = this.selectedMonth;
    postData["birth_year"] = this.selectedYear;
    postData["birth_day"] = this.selectedDate;
    postData["intrested_gender"] = this.selectIntrest;
    postData["status"] = this.selectStatus;
    this.preferencesItems.forEach((val,key)=>{
      if(val.selected == true){
        selectedPrefrences.push(val.name);
      }
    });
    postData['preference'] = selectedPrefrences;
    console.log(postData);

   this.http.post(PathConfig.ADD_GENERAL_USER, postData).subscribe((response)=>{
      console.log(response.SucessMessage, "    ", response.ErrorMessage);
      if(response.Status == "Success"){
        this.message = response.SucessMessage;
        this.showError = false;
        this.showSuccess = true;
        window.scrollTo(0, 0);
        this.getGeneralUsersList();
      }else if(response.Status == "Error"){
        this.message = response.ErrorMessage;
        this.showError = true;
        this.showSuccess = false;
        window.scrollTo(0, 0);
      }
    },
    err=>{

    })

  }

  addGeneralUsreWithImage(){
    this.uploader.cancelAll();
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      var responsePath = JSON.parse(response);
      console.log(responsePath.Status);
      if(responsePath.Status == "Success"){
        this.showSuccess= true;
        this.showError= false;
        this.message = responsePath.SucessMessage;

        this.getGeneralUsersList();
       // this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
       }else if(responsePath.Status == "Error"){
        this.showSuccess= true;
        this.showError= false;
        this.message = responsePath.ErrorMessage;
       }
       $("#avatar").val("");
    }
  }
  //get generalShakes
  getGeneralUsersList(){
    this.http.get(PathConfig.GET_GENERAL_USER)
      .subscribe((response)=> {
        this.broadcaster.broadcast("SHOW_LOADER",false)
          this.generalUser =  response.data;
          if(this.generalUser.length < 1){
            this.noRecordFound = true;
          }
          console.log(this.generalUser);
        },
        err => {
        }
      );
  }

  selectFromDropdown(event, type){

    console.log(type);
    if(type == 'gender'){
      this.selectedGender = event;
    }else if(type == 'status'){
      this.selectStatus = event;
    }else if(type == 'intrest'){
      this.selectIntrest = event;
    }
  }

  errorAddGeneralUser = {
    'fname':false,
    'surName':false,
    'phoneNo':false,
    'email':false,
    'userName_general':false,
    'password':false,
    'uploader':false,
    'selectedGender':false,
    'selectIntrest':false,
    'selectStatus':false,
    'preferencesItems':false,
    'date':false
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
  addNewGenralUser(){

    //resetting all errors
    this.resetErrorObj(this.errorAddGeneralUser);
    //validation
    if(!this.fName){
      this.errorAddGeneralUser['fname']  = true;
    }
    if(!this.surName){
      this.errorAddGeneralUser['surName'] = true;
    }
    if(!this.phoneNo){
      this.errorAddGeneralUser['phoneNo'] = true;
    }
    if(!this.email || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))){
      this.errorAddGeneralUser['email']   = true;
    }
    if(!this.userName_general){
      this.errorAddGeneralUser['userName_general']   = true;
    }
    if(!this.password){
      this.errorAddGeneralUser['password']   = true;
    }
    if($("input[type =file]").val() == ""){
      this.errorAddGeneralUser['uploader']   = true;
    }
    if(!this.selectedGender || this.selectedGender == "0"){
      this.errorAddGeneralUser['selectedGender'] = true;
    }
    if(!this.selectIntrest || this.selectIntrest == "-1"){
      this.errorAddGeneralUser['selectIntrest'] = true;
    }
    if(!this.selectStatus || this.selectIntrest == "0"){
      this.errorAddGeneralUser['selectStatus'] = true;
    }

    if(_.filter(this.preferencesItems,{'selected':true}).length == 0){
      this.errorAddGeneralUser['preferencesItems'] = true;
    }
    if(!this.selectedDate){
      this.errorAddGeneralUser['date'] = true;
    }

    //All Validation passes
    if(this.allErrorResolved(this.errorAddGeneralUser)){
      this.broadcaster.broadcast("SHOW_LOADER",true);
      if($("input[type =file]").val() == ""){
        this.addGeneralUserWithoutImage();
        this.broadcaster.broadcast("SHOW_LOADER",false)
      }else{
        this.addGeneralUsreWithImage();
        this.broadcaster.broadcast("SHOW_LOADER",false)
      }
    }

  }
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
       this.navigateTo('users/edit-general/'+data['value']);
    }else if(data['clickedOn'] == 'name'){
      this.navigateTo('user/generalCreator/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'delete'){
      this.deleteGeneralUser(data['value']);
    }else if(data['clickedOn'] == 'status'){
      this.chnageStatus(data['value'], data['creatorName']);
    }
  }
  deleteGeneralUser(id){
    var self = this;
    mscConfirm("Are you sure to delete!", function(){
      self.http.get(PathConfig.DELETE_GENERAL_USER+id).subscribe((response)=>{
        if(response.Status == "Success"){
          self.getGeneralUsersList();
        }
      },
    err=>{});
    });
  }
  counter = 0;
  updateCheckedOptions(data,event){
    console.log(data);
    console.log(event);
    if(event == true){
      this.counter++;
    }else{
      this.counter --;
    }
    if(this.counter == 3){
      this.preferencesItems.forEach((val, key) => {
        if(val.selected == false){
          val.disabled = true;
        }
      });
    }else{
      this.preferencesItems.forEach((val, key) => {
        //if(val.selected == false){
          val.disabled = false;
        //}
      });
    }

  }

  chnageStatus(id:string, status) {
    var self = this;
    mscConfirm("Are you sure to change the status!", function () {

        if (status == "0") {
          status = "1";
        } else {
          status = "0";
        }
        console.log(status);
        //alert(status);
        self.http.post(PathConfig.UPDATE_GENERAL_USER_ISACTIVE, {st: status, id: id}).subscribe((response)=> {
          console.log(response);
          self.getGeneralUsersList();
        }, err=> {

        });
    });
  }

  handleVisiblity(){
    var self = this;
    this.visibleElement = !this.visibleElement;
    setTimeout(()=>{
       $('#datepicker-autoclose').datepicker({
        autoclose: true,
        todayHighlight: true
     }).on('changeDate', function(e) {
       console.log(e.date);
       let date = new Date(e.date);

       self.selectedDate = String(date.getDate());
       self.selectedMonth = String(date.getMonth());
       self.selectedYear = String(date.getFullYear());

     });
      },200);
  }
  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
