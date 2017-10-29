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
  categoryItems = [];
  visibleElement:boolean = false;
   exampleSh8keList = [];
   dtConfig:Object = {};

   exampleTitle:string = "";
   description:string = "";
   selectedCategory:string = "";
   showSuccess:boolean = false;
   showError:boolean = false;
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
                '<div>'+'<a href="javascript:void(0);" data-name="title" data-custom="' + full['rowId'] + '"data-creator="' + data + '">'+data+'</a>' +'</div>'+
                '<a href="javascript:void(0);" data-name="example-answers" data-custom="' + full['rowId'] + '">Answers('+full['total']+')</a>' +
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
     this.getCategoryList();
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

  //to get category drop down value
  getCategoryList(){
    this.http.get(PathConfig.GET_GENERAL_SH8KE_EDITABLE_DATA).subscribe((response) =>{
      console.log(response);
      this.categoryItems = response.data["Category"];
      console.log(this.categoryItems);
    }, err=>{
    })
  }
  updatedCategory( event){
    this.selectedCategory = event;
  }
  addExampleSh8ke(){
    this.http.post(PathConfig.ADD_NEW_EXAMPLE_SH8KE, {
      "title": this.exampleTitle,
      "description": this.description,
      "category_id": this.selectedCategory,
      "admin_id": "1"
    }).subscribe((response)=>{
      if(response.Status == "Success"){
        this.getExampleSh8keList();
        this.showSuccess = true;
        this.showError = false;
      }else if(response.Status == "Error"){
        this.showSuccess = false;
        this.showError = true;
      }
    }, err =>{

    })
  }
  //on Menu Icon selected
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
        
    }else if(data['clickedOn'] == 'example-answers'){
      this.navigateTo('sh8ke/exampleAnswer/'+data['value']);
    }else if(data['clickedOn'] == 'title'){
        this.navigateTo('sh8ke/examplestatics/'+data['value']+"/"+data['creatorName']);
    }
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
