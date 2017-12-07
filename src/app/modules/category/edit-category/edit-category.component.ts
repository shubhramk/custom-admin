import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ConstantConfig} from "../../../common/config/constant.config";
import {HttpService} from "../../../common/services/http.service";
import {PathConfig} from "../../../common/config/path.config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { FileUploader } from 'ng2-file-upload';
import { ValidationService } from '../../../common/services/validation.service';

declare var $:any;

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  showError:boolean = false;
  showSuccess:boolean = false;
  message:string = "";
  imageBase64:string = "";
 
  englishName:string = "";
  frenchName:string = "";
  sorting:string = "";
  bool_fileUploaded= false;
  form: FormGroup;
  userForm: any;
  fileErrorMsg = "Please select a file to upload"; 
  isFileValid = false;
  path= "../../assets/images/1.jpg";
  category_id:string = "";
 
  uploader:FileUploader = new FileUploader({
   url:PathConfig.UPDATE_CATEGORY_UPLOADED_ITEM
 });
  constructor(private router:Router, private http:HttpService, private formBuilder: FormBuilder, private activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("title_english", this.englishName);
      form.append("title_french" ,this.frenchName);
      form.append("order" ,this.sorting);
      form.append('id', this.category_id);
    };

    this.uploader.onAfterAddingFile = (file)=> { 
      var ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];          
      if ($.inArray(file.file['type'], ValidImageTypes) < 0) {
        this.fileErrorMsg = "Please select valid Image type"; 
        this.isFileValid = true;
      }else{
        this.fileErrorMsg = "Please select a file to upload"; 
        this.isFileValid = false;
      }
      file.withCredentials = false; 
    };

    this.userForm = this.formBuilder.group({
      'englishName': ['', Validators.required],
      'frenchName': ['', Validators.required],
      'sorting': ['', Validators.required]/* ,
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'profile': ['', [Validators.required, Validators.minLength(10)]] */
    });

    this.getEditableCateGory(this.activatedroute.snapshot.params['id']);
  }
  getEditableCateGory(id:string){
    this.http.get(PathConfig.EDIT_CATEGORY+id).subscribe((response)=>{
      console.log(response);
      if(response.Status == 'Success'){
         this.englishName = response.data['title_english'] ;
         this.frenchName = response.data['title_french']
        this.sorting = response.data['sorting_order'];
        this.category_id = response.data['id'];
      }
    },err=>{

    });
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  updateCategory(){
    if($("#avatar").val() != "" && this.isFileValid == true){
      this.bool_fileUploaded = true;
      return true;
    }else{
      this.bool_fileUploaded = false;
    }

    if($("input[type =file]").val() == ""){      
      let postData = {};
      postData["order"] = this.sorting;
      postData["title_english"] = this.englishName;
      postData["title_french"] = this.frenchName;
      postData["id"] = this.category_id;
      

      this.http.post(PathConfig.UPDATE_CATEGORY, postData).subscribe((response)=>{
        console.log(response);
        if(response.Status == "Success"){
          this.showSuccess= true;
          this.showError= false;
          this.message = response.SucessMessage;
         // this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
         }else if(response.Status == "Error"){
          this.showSuccess= true;
          this.showError= false;
          this.message = response.ErrorMessage;
         }
      }, err=>{

      })
    }else{
      this.uploader.cancelAll();
      
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        var responsePath = JSON.parse(response);
        console.log(responsePath.Status);
        if(responsePath.Status == "Success"){
          this.showSuccess= true;
          this.showError= false;
          this.message = responsePath.SucessMessage;
         // this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
         }else if(responsePath.Status == "Error"){
          this.showSuccess= true;
          this.showError= false;
          this.message = responsePath.ErrorMessage;
         }
         $("#avatar").val("");
    }
  }
}

}
