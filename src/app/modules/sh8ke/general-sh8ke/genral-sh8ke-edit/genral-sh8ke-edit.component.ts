import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import { ObjectKeyPipe } from '../../../../common/pipes/object-key.pipe';
import {Broadcaster} from "../../../../common/services/broadcaster.service";

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
  selectedDevice:string = "";
  question_id:string = "";
  constructor(private router:Router, private activateRoute:ActivatedRoute, private http:HttpService, private broadcaster:Broadcaster) { }

  ngOnInit() {
    //this.titleName = this.activateRoute.snapshot.params['name'];
    this.getGeneralSh8keEditableData(this.activateRoute.snapshot.params['id']);
  }
  //get Data from server
  getGeneralSh8keEditableData(id:string){
    this.broadcaster.broadcast("SHOW_LOADER",false);
    this.options = [];
    this.http.get(PathConfig.GET_GENERAL_SH8KE_EDITABLE_DATA+id)
      .subscribe((response)=> {
        this.generalSh8keEditableData = response.data;
        console.log(this.generalSh8keEditableData);
        this.titleName = this.generalSh8keEditableData['title'];
        this.categoryItems = (this.generalSh8keEditableData['Category']);
        this.selectedCategory = this.generalSh8keEditableData["category_id"];
        this.question_id = this.generalSh8keEditableData["id"];
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
    this.broadcaster.broadcast("SHOW_LOADER",true);
    let postData = {};
    this.options.forEach((key,val) =>{
      //let setvalue = 
      console.log(key);
      postData[key.name] = (key.selected == true ? 1 : 0);
      if(key.name == "sh8ke_down"){
        console.log(key)
        postData["shakedown"] = (key.selected == true ? 1 : 0); 
        delete postData['sh8ke_down']; 
      }
    
    });
    postData["admin_id"] = "1";
    postData["category_id"]= this.selectedCategory;
    postData["title"] = this.titleName;
    postData["id"] = this.question_id;

    console.log(postData);
    this.http.post(PathConfig.POST_GENERAL_SH8KE_EDITABLE_DATA, postData).subscribe( (response)=>{
      this.broadcaster.broadcast("SHOW_LOADER",false);
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
