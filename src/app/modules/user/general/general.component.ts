import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from "../../../common/services/http.service";
import {PathConfig} from "../../../common/config/path.config";
declare var $:any;

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
  constructor(private router:Router, private http:HttpService) {}
  ngAfterViewInit(){
    
  }
  ngOnInit(){
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
              template = '<div class="dt-menu-icons">' +
                '<span class="fa fa-check-circle" aria-hidden="true" *ngIf="'+val+'">'+'</span>' +
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
  
  //get generalShakes
  getGeneralUsersList(){
    this.http.get(PathConfig.GET_GENERAL_USER)
      .subscribe((response)=> {
        
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
    debugger;
    console.log(type);
    if(type == 'gender'){
      this.selectedGender = event;
    }else if(type == 'status'){
      this.selectStatus = event;
    }else if(type == 'intrest'){
      this.selectIntrest = event;
    }
  }

  
  addNewGenralUser(){
    console.log(this.selectedYear);
    let postData = {};
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
    postData['prefrences'] = this.preferencesItems;
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
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
       this.navigateTo('users/edit-general/'+data['value']);
    }else if(data['clickedOn'] == 'name'){
      this.navigateTo('user/generalCreator/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'delete'){
      this.deleteGeneralUser(data['value']);
    }
  }
  deleteGeneralUser(id){
    let confirmElem = confirm("Are you sure to delete!");
    if (confirmElem == true){
      this.http.get(PathConfig.DELETE_GENERAL_USER+id).subscribe((response)=>{
        if(response.Status == "Success"){
          this.getGeneralUsersList();
        }
      },
    err=>{})
    }
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
