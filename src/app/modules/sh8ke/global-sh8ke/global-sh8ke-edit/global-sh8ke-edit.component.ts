import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import {Broadcaster} from "../../../../common/services/broadcaster.service";

@Component({
  selector: 'app-global-sh8ke-edit',
  templateUrl: './global-sh8ke-edit.component.html',
  styleUrls: ['./global-sh8ke-edit.component.css']
})
export class GlobalSh8keEditComponent implements OnInit {
  categoryItems = [];
  options = [];
  generalSh8keEditableData  = [];
  titleName:string = "";
  selectedCategory:string = "";
  selectedDevice:string = "";
  showSuccess:boolean = false;
  showError:boolean= false;
  message:string = "";
  questionId = "";
  questionRowId = "";
  newPassword = "";
  confirmPassword = "";
  boolPasswordElem = false;
  errorGlobalSh8ke = {
    'titleName':false,
    'selectedCategory':false,
    'password':false,
    'confirmPassword':false
  }
  constructor(private router:Router, private activateRoute:ActivatedRoute, private http:HttpService, private broadcaster:Broadcaster) { }

  ngOnInit() {
   // this.titleName = this.activateRoute.snapshot.params['name'];
    this.getGlobalSh8keEditableData(this.activateRoute.snapshot.params['id']);
  }
  getGlobalSh8keEditableData(id:string){
    this.options = [];
    
    this.http.get(PathConfig.GET_GLOBAL_SH8KE_EDITABLE_DATA+id)
      .subscribe((response)=> {
        this.broadcaster.broadcast("SHOW_LOADER",false);
        this.generalSh8keEditableData = response.data;
        this.questionId = this.generalSh8keEditableData['id'];
        this.questionRowId = this.generalSh8keEditableData['rowId'];
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
          }          
        }
        //this.options.push[this.generalSh8keEditableData[]];
      },
      err => {
          // Log errors if any
      }
    );
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
  
  saveGlobalSh8keEditableData(){
    this.resetErrorObj(this.errorGlobalSh8ke);
    if(!this.titleName){
      this.errorGlobalSh8ke['titleName']  = true;
    }
    if(!this.selectedCategory || this.selectedCategory=="0"){
      this.errorGlobalSh8ke['selectedCategory'] = true;
    }
    this.options.forEach((key, val)=>{
      if(key.name == "password" && key.selected == true){
        if(!this.newPassword){
          this.errorGlobalSh8ke['password']  = true;
        }else if(this.newPassword != this.confirmPassword){
          this.errorGlobalSh8ke['confirmPassword']  = true;
        }
      }
    });
    //All Validation passes
    if(this.allErrorResolved(this.errorGlobalSh8ke))
    {
      this.broadcaster.broadcast("SHOW_LOADER",true);
      let postData = {};
      postData["password"] = "";
      this.options.forEach((key,val) =>{
        //let setvalue = 
        postData[key.name] = (key.selected == true ? 1 : 0);
        console.log(postData[key.name] + "   postData[key.name]"); 
        if(key.name == "password" && key.selected == true){
          postData["password"] = this.newPassword;
        }     
      });
  
      postData["title_english"] = this.titleName;
      postData["category_id"]= this.selectedCategory;
      postData["id"] = this.activateRoute.snapshot.params['name'];
      postData["adult"]="1";
      postData["password"] = this.newPassword;
      console.log(postData)
      this.http.post(PathConfig.POST_GLOBAL_SH8KE_EDITABLE_DATA, postData)
        .subscribe((response)=> {
          this.broadcaster.broadcast("SHOW_LOADER",false);
          console.log(response);
          //this.getGlobalSh8keEditableData(this.activateRoute.snapshot.params['id']);
          if(response.Status == "Success"){
            this.showSuccess = true;
            this.showError = false;
            this.message = response.SucessMessage;
            setTimeout(()=>{ this.navigateTo('sh8ke/globalAnswer/'+this.questionRowId+"/"+this.questionId)}, 2000);
            
          }else if(response.Status == "Error"){
            this.showSuccess = false;
            this.showError = true;
            this.message = response.ErrorMessage;
          }
          
        },
        err => {
            // Log errors if any
        }
      );
    }
    
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

  valueChange(event){
    this.selectedCategory = event;
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
}
