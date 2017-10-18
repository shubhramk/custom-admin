import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
declare var $:any;

@Component({
  selector: 'app-general-answer',
  templateUrl: './general-answer.component.html',
  styleUrls: ['./general-answer.component.css']
})
export class GeneralAnswerComponent implements OnInit, AfterViewInit {
  visibleElement:boolean = false;
  preferencesItems = ["Arty", "Girly", "Nerdy", "Craftsman", "Hip-ster", "Old School", "Dapper", "Jock", "Quiet", "Extreme", "Loud", "Romantic",
  "Funny", "Manly", "Sassy", "Ditzy", "Social", "Techie"];
   generalUser = [];
   dtConfigGeneralUser:Object = {};
  constructor(private router:Router, private http:HttpService) {}
  ngAfterViewInit(){
    
  }
  ngOnInit(){
     //general data table
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
              template = '<a href="javascript:void(0);" data-name="name" data-custom="' + val + '">'+val+'</a>';

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
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
       this.navigateTo('users/edit-general');
    }else if(data['clickedOn'] == 'name'){
      this.navigateTo('user/generalCreator');
    }
  }
  handleVisiblity(){    
    this.visibleElement = !this.visibleElement;
    setTimeout(()=>{
       $('#datepicker-autoclose').datepicker({
        autoclose: true,
        todayHighlight: true 
     });
      },200)
      
  }
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  
}
