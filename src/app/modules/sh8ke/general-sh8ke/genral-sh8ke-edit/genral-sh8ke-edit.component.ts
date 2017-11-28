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

  questionRowId = "";
  newPassword = "";
  confirmPassword = "";
  boolPasswordElem = false;

  errorGeneralSh8keEdit = {
    'titleName':false,
    'selectedCategory':false,
    'password':false,
    'confirmPassword':false
  }
  constructor(private router:Router, private activateRoute:ActivatedRoute, private http:HttpService, private broadcaster:Broadcaster) { }

  ngOnInit() {
    //this.titleName = this.activateRoute.snapshot.params['name'];
    this.getGeneralSh8keEditableData(this.activateRoute.snapshot.params['id']);
  }
  allErrorResolved(obj:Object):boolean{
    //resetting all errors on Add
    for (let v in obj){
      if(obj[v.toString()]){
        return false;
      }
    }
    return true;
  }

  resetErrorObj(obj:Object){
    //resetting all errors
    for (let v in obj){
      obj[v.toString()] = false;
    }
  }
  //get Data from server
  getGeneralSh8keEditableData(id:string){
    
    this.options = [];
    this.http.get(PathConfig.GET_GENERAL_SH8KE_EDITABLE_DATA+id)
      .subscribe((response)=> {
        this.broadcaster.broadcast("SHOW_LOADER",false);
        this.generalSh8keEditableData = response.data;
              
        //this.questionId = this.generalSh8keEditableData['id'];
        this.questionRowId = this.generalSh8keEditableData['rowId'];
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
    this.resetErrorObj(this.errorGeneralSh8keEdit);
    if(!this.titleName){
      this.errorGeneralSh8keEdit['titleName']  = true;
    }
    if(!this.selectedCategory || this.selectedCategory=="0"){
      this.errorGeneralSh8keEdit['selectedCategory'] = true;
    }
    this.options.forEach((key, val)=>{
      if(key.name == "password" && key.selected == true){
        if(!this.newPassword){
          this.errorGeneralSh8keEdit['password']  = true;
        }else if(this.newPassword != this.confirmPassword){
          this.errorGeneralSh8keEdit['confirmPassword']  = true;
        }
      }
    });
    //All Validation passes
    if(this.allErrorResolved(this.errorGeneralSh8keEdit))
    {
      this.broadcaster.broadcast("SHOW_LOADER",true);
      let postData = {};
      postData["password"] = "";
      this.options.forEach((key,val) =>{
        //let setvalue = 
        console.log(key);
        postData[key.name] = (key.selected == true ? 1 : 0);
        if(key.name == "sh8ke_down"){
          console.log(key)
          postData["shakedown"] = (key.selected == true ? 1 : 0); 
          delete postData['sh8ke_down']; 
        }
        if(key.name == "password" && key.selected == true){
          postData["password"] = this.newPassword;
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
              setTimeout(()=>{this.navigateTo('sh8ke/generalAnswer/'+this.questionRowId+"/"+this.question_id);},2000)
            }else if(response.Status == "Error"){
              this.showSuccess = false;
              this.showError = true;
            }
      },err =>{
        console.log(err);
      })
    }

    
  }
  updateCheckedOptions(data,event){  
    
    console.log(data, "   DATA");
    if(data['name'] == "share" && data['selected'] == true){
      this.options.forEach((val,key) =>{
        if(val['name'] == 'private'){
          console.log("val['name']    ", val['name']);
          val['selected'] = false; 
        }
      })
    }
    if(data['name'] == "share" && data['selected'] == false){
      this.options.forEach((val,key) =>{
        if(val['name'] == 'private'){
          console.log("val['name']    ", val['name']);
          val['selected'] = true; 
        }
      })
    }
    if(data['name'] == "private" && data['selected'] == true){
      this.options.forEach((val,key) =>{
        if(val['name'] == 'share'){
          console.log("val['name']    ", val['name']);
          val['selected'] = false; 
        }
      })
    }
    if(data['name'] == "private" && data['selected'] == false){
      this.options.forEach((val,key) =>{
        if(val['name'] == 'share'){
          console.log("val['name']    ", val['name']);
          val['selected'] = true; 
        }
      })
    }
    if(data['name'] == "password" && data['selected'] == true){
      this.boolPasswordElem = true;
    }else if(data['name'] == "password" && data['selected'] == false){
      this.boolPasswordElem = false;
    }
    console.log(this.options);
  }
  
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  updatedCategory( event){
    this.selectedCategory = event;
  }
}
