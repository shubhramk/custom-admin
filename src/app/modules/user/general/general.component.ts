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
  preferencesItems = ["Arty", "Girly", "Nerdy", "Craftsman", "Hip-ster", "Old School", "Dapper", "Jock", "Quiet", "Extreme", "Loud", "Romantic",
  "Funny", "Manly", "Sassy", "Ditzy", "Social", "Techie"];
   generalUser = [];
   dtConfigGeneralUser:Object = {};

   fName:string = "";
   surName:string = "";
   phoneNo:number;
   email:string = "";
   userName:string = "";
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
                '<a href="javascript:void(0);" data-name="edit" data-custom="' + val + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
                '<a href="javascript:void(0);" data-name="delete" data-custom="' + val + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
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

  
  addNewGenralUser(){
    console.log(this.selectedYear);
    let postData = {};
    postData["name"] = this.fName;
    postData["surname"] = this.surName
    postData["username"] = this.userName;
    postData["password"] = this.password;
    postData["mail_id"] = this.email;
    postData["mobile_no"] = this.phoneNo
    postData["gender"] = this.selectedGender;
    postData["birth_month"] = this.selectedMonth;
    postData["birth_year"] = this.selectedYear;
    postData["birth_day"] = this.selectedDate;
    postData["intrested_gender"] = this.selectIntrest;
    postData["status"] = this.selectStatus;
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
       this.navigateTo('users/edit-general');
    }else if(data['clickedOn'] == 'name'){
      this.navigateTo('user/generalCreator/'+data['value']+"/"+data['creatorName']);
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
