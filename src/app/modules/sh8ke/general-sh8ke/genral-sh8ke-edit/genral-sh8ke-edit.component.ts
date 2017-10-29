import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import { ObjectKeyPipe } from '../../../../common/pipes/object-key.pipe';

@Component({
  selector: 'app-genral-sh8ke-edit',
  templateUrl: './genral-sh8ke-edit.component.html',
  styleUrls: ['./genral-sh8ke-edit.component.css']
})
export class GenralSh8keEditComponent implements OnInit {

  categoryItems = [];
  options = [];
  generalSh8keEditableData  = [];
  titleName:string = "";
  selectedCategory:string = "";
  showSuccess:boolean = false;
  showError:boolean= false;
  constructor(private router:Router, private activateRoute:ActivatedRoute, private http:HttpService) { }

  ngOnInit() {
    //this.titleName = this.activateRoute.snapshot.params['name'];
    this.getGeneralSh8keEditableData(this.activateRoute.snapshot.params['id']);
  }
  //get Data from server
  getGeneralSh8keEditableData(id:string){
    this.options = [];
    this.http.get(PathConfig.GET_GENERAL_SH8KE_EDITABLE_DATA+id)
      .subscribe((response)=> {
        this.generalSh8keEditableData = response.data;
        console.log(this.generalSh8keEditableData);
        this.titleName = this.generalSh8keEditableData['title'];
        this.categoryItems = (this.generalSh8keEditableData['Category']);
        this.selectedCategory = this.generalSh8keEditableData["category_id"];
        for(let obj in this.generalSh8keEditableData){
          if(obj != "Category" && obj !="title" && obj != "category_id" && obj != "id"){
            let key = obj;
            let data:object = {[key]:this.generalSh8keEditableData[obj]};
            if(this.generalSh8keEditableData[obj] === null || this.generalSh8keEditableData[obj] === "0"){
              data = {"name":key, "selected":false}
            }else{
              data = {"name":key, "selected":true}
            } 
            this.options.push(data);
            console.log(this.options, "   OPTIONS");
          }          
        }
        //this.options.push[this.generalSh8keEditableData[]];
      },
      err => {
          // Log errors if any
      }
    );
  }
  valueChange(event){
      console.log("gggg");
  }
  saveGeneralSh8keEditableData(){
    let postData = {};
    this.options.forEach((key,val) =>{
      //let setvalue = 
      postData[key.name] = (key.selected == true ? 1 : 0);
      console.log(postData[key.name] + "   postData[key.name]")
    
    });
    postData["userID"] = "1";
    postData["category_id"]= this.selectedCategory;
    postData["title"] = this.titleName;

    console.log(postData);
    this.http.post(PathConfig.ADD_NEW_GENERAL_SH8KE, postData).subscribe( (response)=>{
      console.log(response);
          if(response.Status == "Success"){
            this.showSuccess = true;
            this.showError = false;
          }else if(response.Status == "Error"){
            this.showSuccess = false;
            this.showError = true;
          }
    },err =>{
      console.log(err);
    })
  }
  //navigate to page
  updateCheckedOptions(data,event){ 
    console.log(event); 
  }
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  updatedCategory( event){
    this.selectedCategory = event;
  }
}
