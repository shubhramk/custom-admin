import { Component, OnInit, ViewChildren} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../../common/services/http.service";
import {PathConfig} from "../../../common/config/path.config";
import {Broadcaster} from "../../../common/services/broadcaster.service";
declare var $:any, mscConfirm:any;
@Component({
  selector: 'app-general-sh8ke',
  templateUrl: './general-sh8ke.component.html',
  styleUrls: ['./general-sh8ke.component.css']
})
export class GeneralSh8keComponent implements OnInit {
  categoryItems = [];
  options = [];
  generalSh8keEditableData  = [];
  titleName:string = "";
  selectedCategory:string = "";
  
  newPassword = "";
  confirmPassword = "";
  boolPasswordElem = false;

  visibleElement:boolean = false;
  topGeneralSh8ke = [];
  dtConfigGeneral:Object = {};

  showSuccess:boolean = false;
  showError:boolean= false;
  errorGeneralSh8ke = {
    'titleName':false,
    'selectedCategory':false,
    'password':false,
    'confirmPassword':false
  }

  constructor(private router:Router, private http:HttpService, private broadcaster:Broadcaster) { }

  ngOnInit(){
    this.dtConfigGeneral = {
      "columnDefs": [

        {
          "targets": 0,
          "orderable": false,
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="sh8ke-title">' +
              '<div>'+'<a href="javascript:void(0);" data-name="title" data-custom="' + full['rowId'] + '"data-creator="' + data + '">'+data+'</a>' +'</div>'+
              '<a href="javascript:void(0);" data-name="general-answers" data-custom="' + full['rowId'] + '"data-creator="' + full['id'] + '">Answers('+full['count']+')</a>' +
              '</div>';

            return template;
          }
        },
        {
          "targets": 5,
          "render": function (data, type, full, meta) {
            var template = '';
            template =
              '<a href="javascript:void(0);" data-name="general-creator" data-custom="' + full['creator_id'] + '" data-creator="' + data + '">'+data+'</a>';

            return template;
          }
        },
        {
          "targets": 6,
          "width": "10%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="general-edit" data-custom="' + full['rowId']  + '" data-creator="' + full['title'] + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
              '<a href="javascript:void(0);" data-name="delete" data-custom="' + full['rowId'] + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
              '</div>';

            return template;
          }
        }
      ],
      "columns": [
        { "title": 'Title', "data": "title" },
        { "title": 'Description', "data": "description" },
        { "title": 'Category', "data": "CategoryName" },
        { "title": 'Times sh8ken', "data": "timesSh8ken" },
        { "title": 'Times sh8red', "data": "timesSh8red" },
        { "title": 'Creater' , "data":"created"}
      ]
    }
    this.getTopGeneralShakes();
    this.getGeneralSh8keEditableData();
    this.broadcaster.on<string>('ROUTE_URL')
    .subscribe(message => {
      this.visibleElement = false;
  });
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
   //get top20 generalShakes
  getTopGeneralShakes(){
    this.http.post(PathConfig.GET_SHAKES_LIST, { "trending_type": "general","limit": "","user_type": "","user_id": 1})
      .subscribe((response)=> {
        this.broadcaster.broadcast("SHOW_LOADER",false);
          this.topGeneralSh8ke =  response.data;
          console.log(this.topGeneralSh8ke);
        },
        err => {
        }
      );
  }
   //on Menu Icon selected
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'general-edit') {
      this.navigateTo("sh8ke/genralsh8keedit/"+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'general-answers'){
        this.navigateTo('sh8ke/generalAnswer/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'title'){
        this.navigateTo('sh8ke/generalstatics/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'general-creator'){
      this.navigateTo('user/generalCreator/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'delete'){
      this.deleteRowFromTop20Trending(data['value'], PathConfig.DELETE_GENERAL_SH8KE)
    }
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  getGeneralSh8keEditableData(){
    this.options = [];
    this.http.get(PathConfig.GET_GENERAL_SH8KE_EDITABLE_DATA)
      .subscribe((response)=> {
        this.generalSh8keEditableData = response.data;
        console.log(this.generalSh8keEditableData);
        this.titleName = this.generalSh8keEditableData['title'];
        this.categoryItems = (this.generalSh8keEditableData['Category']);
        //this.selectedCategory = this.generalSh8keEditableData["category_id"];
        for(let obj in this.generalSh8keEditableData){
          if(obj != "Category" && obj !="title" && obj != "category_id" && obj != "id" && obj !="rowId"){
            let key = obj;
            let data:object ={}// {[key]:this.generalSh8keEditableData[obj]};
            if(this.generalSh8keEditableData[obj] === null && obj != "share" && obj != "socialize"){
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

  handleDropDown(){
    setTimeout(function(){
      $('#pass3').val('0');
    }, 500)
   
  }
  deleteRowFromTop20Trending(id:string, serviceUrl:string){
    
    var self = this;
    mscConfirm("Are you sure to delete!", function(){
      self.broadcaster.broadcast("SHOW_LOADER",true);
      self.http.post(serviceUrl, {'id':id}).subscribe((response)=> {
        self.broadcaster.broadcast("SHOW_LOADER",false);
         if(response.Status == "Success"){
          self.getTopGeneralShakes();
         }
       },
       err => {
       }
     );
    })
          
}
selectedList=[];

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
submitData(){
  this.resetErrorObj(this.errorGeneralSh8ke);
  if(!this.titleName){
    this.errorGeneralSh8ke['titleName']  = true;
  }
  if(!this.selectedCategory || this.selectedCategory=="0"){
    this.errorGeneralSh8ke['selectedCategory'] = true;
  }
  this.options.forEach((key, val)=>{
    if(key.name == "password" && key.selected == true){
      if(!this.newPassword){
        this.errorGeneralSh8ke['password']  = true;
      }else if(this.newPassword != this.confirmPassword){
        this.errorGeneralSh8ke['confirmPassword']  = true;
      }
    }
  })
  //All Validation passes
  if(this.allErrorResolved(this.errorGeneralSh8ke))
  {
    this.broadcaster.broadcast("SHOW_LOADER",true);
    let postData = {};
    postData["password"] = "";
    this.options.forEach((key,val) =>{
      //let setvalue = 
      postData[key.name] = (key.selected == true ? 1 : 0);
      console.log(postData[key.name] + "   postData[key.name]")
      if(key.name == "password" && key.selected == true){
        postData["password"] = this.newPassword;
      }
    });
    postData["userID"] = "1";
    postData["category_id"]= this.selectedCategory;
    postData["title"] = this.titleName;
    console.log(postData);
    this.http.post(PathConfig.ADD_NEW_GENERAL_SH8KE, postData).subscribe( (response)=>{
      console.log(response);
      this.broadcaster.broadcast("SHOW_LOADER",false);
          if(response.Status == "Success"){
            this.getTopGeneralShakes();
            this.showSuccess = true;
            this.showError = false;
            setTimeout(()=>{this.navigateTo('sh8ke/generalAnswer/'+response.data['rowId']+"/"+response.data['id']);},2000)
          }else if(response.Status == "Error"){
            this.showSuccess = false;
            this.showError = true;
          }
    },err =>{
      console.log(err);
    })
  }

  
  }
  updatedCategory( event){
    this.selectedCategory = event;
  }
}
