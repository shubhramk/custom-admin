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
  dtConfig:Object = {};
  constructor(private router:Router, private http:HttpService) { }

  ngOnInit(){
    this.dtConfig = {
      "columnDefs": [
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
     //get top general shakes
    this.getTopGeneralShakes();
      }

   //get top20 generalShakes
  getTopGeneralShakes(){
    this.http.post(PathConfig.GET_SHAKES_LIST, { "trending_type": "general","limit": "20","user_type": "","user_id": 1})
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
    }
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
