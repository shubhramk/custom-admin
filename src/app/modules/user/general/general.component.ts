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
   topGeneralSh8ke = [];
   dtConfigGeneral:Object = {};
  constructor(private router:Router, private http:HttpService) {}
  ngAfterViewInit(){
    
  }
  ngOnInit(){
     //general data table
      this.dtConfigGeneral = {
        "columnDefs": [
          {
            "targets": 0,
            "orderable": false,
            "render": function (data, type, full, meta) {
              var template = '';

              let val = data;
              template = '<div class="sh8ke-title">' +
                '<div>'+data+'</div>' +
                '<a href="javascript:void(0);" data-name="general-answers" data-custom="' + full['rowId'] + '">Answers('+full['count']+')</a>' +
                '</div>';

              return template;
            }
          },
          {
            "targets": 5,
            "render": function (data, type, full, meta) {
              var template = '';
              template =
                '<a href="javascript:void(0);" data-name="general-creator" data-custom="' + full['creator_id'] + '">'+data+'</a>';

              return template;
            }
          },
          {
            "targets": 6,
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
          }
        ],
        "columns": [
          { "title": 'Title', "data": "title" },
          { "title": 'Description', "data": "description" },
          { "title": 'Category', "data": "CategoryName" },
          { "title": 'Times sh8ken', "data": "timesSh8ken" },
          { "title": 'Times sh8red', "data": "timesSh8red" },
          { "title": 'Creater' , "data":"created"}
        ]
      }
      //get top global shakes
      this.getTopGeneralShakes();
  }

      //on Menu Icon selected
  
  //get generalShakes
  getTopGeneralShakes(){
    this.http.post(PathConfig.GET_SHAKES_LIST, { "trending_type": "general","limit": "","user_type": "","user_id": 1})
      .subscribe((response)=> {
          this.topGeneralSh8ke =  response.data;
        },
        err => {
        }
      );
  }
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
       this.navigateTo('users/edit-general');
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
