import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
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

   generalAnswerList = [];
   dtConfig:Object = {};
  constructor(private router:Router, private http:HttpService, private activeRoute:ActivatedRoute) {}
  ngAfterViewInit(){
    
  }
  ngOnInit(){
     //general data table
      this.dtConfig =  {
        "columnDefs": [
          {
            "targets": 0,
            "orderable": false,
          },
          {
            "targets": 3,
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
            "targets": 2,
            "width": "10%",
            "orderable": false,
            "className": "noPadding",
            "render": function (data, type, full, meta) {
              var template = '';
              //console.log(data + "    FULLLL" );
              let val = data;
              template = '<span>'+data+'</span>';

              return template;
            }
          }

        ],
        "columns": [
          { "title": 'ID', "data": "id" },
          { "title": 'Type', "data": "type" },
          { "title": 'Answer', "data": "answer" }
        ]
      }
      //get top global shakes
      this.getGeneralAnswerList(this.activeRoute.snapshot.params['id']);
      
  }

      //on Menu Icon selected
  
  //get generalShakes
  getGeneralAnswerList(id:string){
    this.http.get(PathConfig.GET_GENERAL_SH8KE_ANSWER+id)
      .subscribe((response)=> {
          this.generalAnswerList =  response.data;
          console.log(this.generalAnswerList);
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
