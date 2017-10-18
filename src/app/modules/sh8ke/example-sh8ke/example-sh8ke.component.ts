import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../../common/services/http.service";
import {PathConfig} from "../../../common/config/path.config";

@Component({
  selector: 'app-example-sh8ke',
  templateUrl: './example-sh8ke.component.html',
  styleUrls: ['./example-sh8ke.component.css']
})
export class ExampleSh8keComponent implements OnInit {
  categoryItems = ["Daily", "Shakedown", "Private", "Share", "Explode", "Socialize", "Password", "Adult Material"];
  visibleElement:boolean = false;
   exampleSh8keList = [];
   dtConfig:Object = {};
  constructor(private router:Router, private http:HttpService) { }

  ngOnInit(){
    this.dtConfig = { 
      "columnDefs": [
        {
          "targets": 0,
          "orderable": false,
          "render": function (data, type, full, meta) {
            var template = '';
            let val = data;
            template = '<div class="sh8ke-title">' +
                '<div>'+'<a href="javascript:void(0);" data-name="title" data-custom="">'+data+'</a>' +'</div>'+
                '<a href="javascript:void(0);" data-name="global-answers" data-custom="' + full['rowId'] + '">Answers('+full['count']+')</a>' +
              '</div>';
            return template;
          }
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
        }
      ],
      "columns": [
        { "title": 'Title', "data": "title" },
        { "title": 'Description', "data": "description" },
        { "title": 'Category', "data": "CategoryName" }
      ]
     }
     this.getExampleSh8keList();
}

  getExampleSh8keList(){
    this.http.get(PathConfig.GET_EXAMPLE_SH8KE)
      .subscribe((response)=> {
          this.exampleSh8keList =  response.data;
          console.log(this.exampleSh8keList);
        },
        err => {
        }
      );
  }
  //on Menu Icon selected
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
        this.navigateTo('sh8ke/examplesh8keedit');
    }
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
