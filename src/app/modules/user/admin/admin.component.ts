import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from "../../../common/services/http.service";
import {PathConfig} from "../../../common/config/path.config";
@Component({
  styleUrls: ['./admin.component.scss'],
  templateUrl: './admin.component.html'
})
export class AdminUserComponent implements OnInit {
  visibleElement:boolean = false;
  topGlobalSh8ke = [];
  dtConfigGlobal:object = {};
  constructor(private router:Router, private http:HttpService) {}
  ngOnInit(){
    //global data table
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
        },
        {
          "targets": 4,
          "render": function (data, type, full, meta) {
            var template = '';
            template =
              '<a href="javascript:void(0);" data-name="global-creator" data-custom="' + full['creator_id'] + '">'+data+'</a>';

            return template;
          }
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
        { "title": 'Creater' , "data":"created"}
      ]
     }

     this.getTopGlobalShakes()
   
 }

      //on Menu Icon selected
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
      this.navigateTo('users/edit-admin');
    }
  }
//get top20 globalShakes
  getTopGlobalShakes(){
    
    this.http.post(PathConfig.GET_SHAKES_LIST, { "trending_type": "global","limit": "","user_type": "","user_id": 1})
      .subscribe((response)=> {
          this.topGlobalSh8ke =  response.data;
        },
        err => {
        }
      );
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
}
