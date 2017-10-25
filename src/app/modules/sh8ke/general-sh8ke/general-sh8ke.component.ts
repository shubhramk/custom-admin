import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../../common/services/http.service";
import {PathConfig} from "../../../common/config/path.config";

@Component({
  selector: 'app-general-sh8ke',
  templateUrl: './general-sh8ke.component.html',
  styleUrls: ['./general-sh8ke.component.css']
})
export class GeneralSh8keComponent implements OnInit {
  categoryItems = ["Daily", "Shakedown", "Private", "Share", "Explode", "Socialize", "Password", "Adult Material"];
  visibleElement:boolean = false;
  topGeneralSh8ke = [];
  dtConfigGeneral:Object = {};
  constructor(private router:Router, private http:HttpService) { }

  ngOnInit(){
    this.dtConfigGeneral = {
      "columnDefs": [

        {
          "targets": 0,
          "orderable": false,
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="sh8ke-title">' +
              '<div>'+'<a href="javascript:void(0);" data-name="title" data-custom="' + full['rowId'] + '"data-creator="' + data + '">'+data+'</a>' +'</div>'+
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
              '<a href="javascript:void(0);" data-name="general-creator" data-custom="' + full['creator_id'] + '" data-creator="' + data + '">'+data+'</a>';

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
    this.getTopGeneralShakes();
  }

   //get top20 generalShakes
  getTopGeneralShakes(){
    this.http.post(PathConfig.GET_SHAKES_LIST, { "trending_type": "general","limit": "","user_type": "","user_id": 1})
      .subscribe((response)=> {
          this.topGeneralSh8ke =  response.data;
        },
        err => {
        }
      );
  }
   //on Menu Icon selected
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
      this.navigateTo('sh8ke/genralsh8keedit');
    }else if(data['clickedOn'] == 'general-answers'){
        this.navigateTo('sh8ke/generalAnswer/'+data['value']);
    }else if(data['clickedOn'] == 'title'){
        this.navigateTo('sh8ke/generalstatics/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'general-creator'){
      this.navigateTo('user/generalCreator/'+data['value']+"/"+data['creatorName']);
    }
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
