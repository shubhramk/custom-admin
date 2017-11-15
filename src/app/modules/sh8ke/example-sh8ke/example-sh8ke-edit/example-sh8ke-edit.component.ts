import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import {Broadcaster} from "../../../../common/services/broadcaster.service";
declare var $:any;
@Component({
  selector: 'app-example-sh8ke-edit',
  templateUrl: './example-sh8ke-edit.component.html',
  styleUrls: ['./example-sh8ke-edit.component.css']
})
export class ExampleSh8keEditComponent implements OnInit {

  categoryItems = [];
  visibleElement:boolean = false;
   exampleSh8keList = [];
   dtConfig:Object = {};

   exampleTitle:string = "";
   description:string = "";
   selectedCategory:string = "";
   showSuccess:boolean = false;
   showError:boolean = false;
   message:string = "";
   question_id:string = ""
  constructor(private router:Router, private broadcaster:Broadcaster ,private http:HttpService, private activated:ActivatedRoute) { }

  ngOnInit() {
    this.getCategoryList();
    this.getExampleSh8keEditableData(this.activated.snapshot.params['id'])
  }
  getExampleSh8keEditableData(id:string){
    this.broadcaster.broadcast("SHOW_LOADER",false);
    
    this.http.get(PathConfig.EDIT_EXAMPLE_SH8KE+id).subscribe((response)=>{
      if(response.Status == "Success"){
        this.selectedCategory = response.data['category_id'];
        this.exampleTitle = response.data['title'];
        this.description = response.data['description'];
        this.question_id = response.data["id"];
        console.log(response.data);
      }
    }, err=>{

    })
  }
  updateExampleSh8ke(){
    this.broadcaster.broadcast("SHOW_LOADER",true);
    
    let postData= {};
    postData["title"] = this.exampleTitle;
    postData["category"]  =  this.selectedCategory;
    postData["description"] = this.description;
    postData["uid"] = "1";
    postData["id"] = this.question_id;
    this.http.post(PathConfig.UPDATE_SH8KE_EXAMPLE, postData).subscribe((response)=>{
      this.broadcaster.broadcast("SHOW_LOADER",false);
      
      if(response.Status == "Success"){
        this.showSuccess = true;
        this.showError = false;
        this.message = response.SucessMessage;
      }else if(response.Status == "Error"){
        this.showSuccess = false;
        this.showError = true;
        this.message = response.ErrorMessage;
      }
    }, err=>{

    })
  }
  updatedCategory(event){
    this.selectedCategory = event;
  }

  getCategoryList(){
    this.http.get(PathConfig.GET_GENERAL_SH8KE_EDITABLE_DATA).subscribe((response) =>{
      this.categoryItems = response.data["Category"];
      console.log(this.categoryItems);
    }, err=>{
    })
  }
   //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
