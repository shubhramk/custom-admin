import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
declare var $:any;

@Component({
  selector: 'app-general-creator',
  templateUrl: './general-creator.component.html',
  styleUrls: ['./general-creator.component.css']
})
export class GeneralCreatorComponent implements OnInit {
  dtConfigGlobal:Object= {};
  topGlobalSh8ke = [];

  constructor(private http:HttpService) { }

  ngOnInit() {    
      this.dtConfigGlobal = {
      "columnDefs": [
        {
          "targets": 0,
          "orderable": false,
          "render": function (data, type, full, meta) {
            var template = '';
            let val = data;
            template = '<div class="sh8ke-title">' +
                '<div>'+data+'</div>' +
                '<a href="javascript:void(0);" data-name="global-answers" data-custom="' + full['rowId'] + '">Answers('+full['count']+')</a>' +
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
        { "title": 'Creater' , "data":"created"}
      ]
     }

     this.getTopGlobalShakes();
     setTimeout(()=>{
       $('#date-range').datepicker({
        toggleActive: true
    });
      },200)
  }
   getTopGlobalShakes(){
    this.http.post(PathConfig.GET_SHAKES_LIST, { "trending_type": "global","limit": "20","user_type": "","user_id": 1})
      .subscribe((response)=> {
          this.topGlobalSh8ke =  response.data;
        },
        err => {
        }
      );
  }
  onMenuSelect(data:any){

  }
}
