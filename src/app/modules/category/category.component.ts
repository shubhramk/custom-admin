import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ConstantConfig} from "../../common/config/constant.config";
import {HttpService} from "../../common/services/http.service";
import {PathConfig} from "../../common/config/path.config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { FileUploader } from 'ng2-file-upload';
import { ValidationService } from '../../common/services/validation.service';
import {Broadcaster} from "../../common/services/broadcaster.service";

declare var $:any;
declare var mscConfirm:any;
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

 englishName:string = "";
 frenchName:string = "";
 sorting:string = "";

 form: FormGroup;
 userForm: any;

 path= "../../assets/images/1.jpg";

 uploader:FileUploader = new FileUploader({
  url:PathConfig.ADD_NEW_CATEGORY_UPLOADED_ITEM
});

  constructor(private router:Router, private http:HttpService, private formBuilder: FormBuilder, private broadcaster:Broadcaster) {
    
   }
   createForm() {
    this.userForm = this.formBuilder.group({
      'englishName': ['', Validators.required],
      'frenchName': ['', Validators.required],
      'sorting': ['', Validators.required]/* ,
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'profile': ['', [Validators.required, Validators.minLength(10)]] */
    });
   }
  ngOnInit(){
    this.createForm();
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("title_english", this.englishName);
      form.append("title_french" ,this.frenchName);
      form.append("order" ,this.sorting);
    };

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };


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
              '<a href="javascript:void(0);" data-name="edit" data-custom="' + full['rowId'] + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
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
            template = '<div class="dt-menu-icons">' +val
              /* '<img src ="'+val+'" data-name="img" data-custom="' + val + '" style="height:40px;"/>' */ +
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
    //$("#avatar").attr('val', this.path);
    
}

handleInput(){
  this.sorting = "";
  this.englishName = "";
  this.frenchName = "";
}

getCategoryList(){
  this.broadcaster.broadcast("SHOW_LOADER",false);
  
  this.http.get(PathConfig.GET_CATEGORY)
      .subscribe((response)=> {
        this.broadcaster.broadcast("SHOW_LOADER",false);
        this.categoryList = response.data;
        console.log(this.categoryList);
      },
      err => {
          // Log errors if any
      }
      );
      
};
  //on Menu Icon selected
 
  
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
      this.navigateTo('sh8ke/categoryEdit/'+customData);
    }else if(data['clickedOn'] == 'delete'){
      this.deleteCategory(data['value']);
    }
  }

  deleteCategory(id:string){
  var self = this;    
    mscConfirm("Are you sure to delete Category?", function(){
      self.broadcaster.broadcast("SHOW_LOADER",true);      
      self.http.get(PathConfig.DELETE_CATEGORY+id).subscribe((response)=>{
        console.log(response);
        self.broadcaster.broadcast("SHOW_LOADER",false);        
        self.getCategoryList();
      }, err=>{
  
      });
    });
    /* let confirmElem = confirm("Are you sure to delete!");
    if (confirmElem == true) {
      
    } */
    
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

  addCategoryData(){
    if($("input[type =file]").val() == ""){
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
          this.createForm();
        }
      },
      err => {
        
          // Log errors if any
      }
      )
  
    }else{
      this.uploader.cancelAll();
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        var responsePath = JSON.parse(response);
        console.log(responsePath);
        if(responsePath.Status == "Success"){
          this.showSuccess= true;
          this.showError= false;
          this.message = responsePath.SucessMessage;
          this.englishName = "";
          this.frenchName = "";
          this.sorting = "";
          this.getCategoryList();
         // this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
         }else if(responsePath.Status == "Error"){
          this.showSuccess= false;
          this.showError= true;
          this.message = responsePath.ErrorMessage;
         }
         $("#avatar").val("");
    }
    }

  }

}
