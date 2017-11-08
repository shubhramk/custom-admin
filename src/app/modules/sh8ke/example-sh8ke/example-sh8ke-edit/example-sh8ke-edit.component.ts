import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
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

  constructor(private router:Router, private http:HttpService, private activated:ActivatedRoute) { }

  ngOnInit() {
    this.getCategoryList();
    this.getExampleSh8keEditableData(this.activated.snapshot.params['id'])
  }
  getExampleSh8keEditableData(id:string){

  }
  updateExampleSh8ke(){
    let postData= {};
    postData["title"] = this.exampleTitle;
    postData["category_id"]  =  this.selectedCategory;
    postData["description"] = this.description;
    postData["uid"] = "1";
    postData["id"] = "";
    this.http.post(PathConfig.UPDATE_SH8KE_EXAMPLE, postData).subscribe((response)=>{

    }, err=>{

    })
  }
  updatedCategory(event){
    this.selectedCategory = event;
  }

  getCategoryList(){
    this.http.get(PathConfig.GET_GENERAL_SH8KE_EDITABLE_DATA).subscribe((response) =>{
      console.log(response);
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
