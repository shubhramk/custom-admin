import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ConstantConfig} from "../../common/config/constant.config";
import {HttpService} from "../../common/services/http.service";
import {PathConfig} from "../../common/config/path.config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var $:any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    
 categoryList = [];
 dtConfig:Object = {};
 visibleElement:boolean = false;
 showError:boolean = false;
 showSuccess:boolean = false;
 message:string = "";
 imageBase64:string = "";

 form: FormGroup;
 
  constructor(private router:Router, private http:HttpService) {
   }
   
  ngOnInit(){
    this.visibleElement = ConstantConfig.visibleElement;
    this.dtConfig = { 
      "columnDefs": [
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
              '<a href="javascript:void(0);" data-name="delete" data-custom="' + full['rowId'] + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
              '</div>';

            return template;
          }
        },
        {
          "targets": 2,
          "width": "20%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="dt-menu-icons">' +
              '<img src ="'+val+'" data-name="img" data-custom="' + val + '" style="height:40px;"/>' +
              '</div>';

            return template;
          }
        }
      ],
      "columns": [
        { "title": 'Title English', "data": "title_english" },
        { "title": 'Order', "data": "sorting_order" },
        { "title": 'Icon', "data": "iconUrl" }
      ]
     }
    this.getCategoryList();
}

getCategoryList(){
  this.http.get(PathConfig.GET_CATEGORY)
      .subscribe((response)=> {
        this.categoryList = response.data;
        console.log(this.categoryList);
      },
      err => {
          // Log errors if any
      }
      )
};
  //on Menu Icon selected
  englishName:string = "";
  frenchName:string = "";
  sorting:string = "";
  
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
      this.navigateTo('sh8ke/categoryEdit');
    }else if(data['clickedOn'] == 'delete'){
      this.deleteCategory(data['value']);
    }
  }

  deleteCategory(id:string){
    console.log(id);
    let confirmElem = confirm("Are you sure to delete!");
    if (confirmElem == true) {
      this.http.get(PathConfig.DELETE_CATEGORY+id).subscribe((response)=>{
        console.log(response);
        this.getCategoryList();
      }, err=>{
  
      });
    }
    
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  onFileChange(event){
  event = document.getElementById("avatar");
    //console.log(event);
    if (event.files[0]) {
      var fileReader = new FileReader();
      fileReader.onload = function (e) {
          console.log(e.target);   
          $("#targetLayer").html('<img src="'+e.target['result']+'" width="50px" height="50px" class="upload-preview" />'); 
      }
    fileReader.readAsDataURL(event.files[0]);
  }
  }
  addCategoryData(){
    
    this.http.post(PathConfig.ADD_NEW_CATEGORY, 
      {
        "title_english": this.englishName,
        "title_french": this.frenchName,
        "order": this.sorting
      })
      .subscribe((response)=> {
        console.log(response);
        if(response.Status == "Error"){
          this.showError = true;
          this.showSuccess = false;
          this.message  = response.ErrorMessage;
        }else if(response.Status == "Success"){
          this.message = response.SucessMessage;
          this.showError = false;
          this.showSuccess = true;
          this.getCategoryList();
        }
      },
      err => {
        
          // Log errors if any
      }
      )
  }
  

}
