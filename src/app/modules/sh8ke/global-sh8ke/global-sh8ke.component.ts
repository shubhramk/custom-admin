import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../../common/services/http.service";
import {PathConfig} from "../../../common/config/path.config";
import {Broadcaster} from "../../../common/services/broadcaster.service";
declare var $:any, mscConfirm:any;
@Component({
  selector: 'app-global-sh8ke',
  templateUrl: './global-sh8ke.component.html',
  styleUrls: ['./global-sh8ke.component.css']
})
export class GlobalSh8keComponent implements OnInit {
  categoryItems = [];
  options = [];
  generalSh8keEditableData  = [];
  titleName:string = "";
  selectedCategory:string = "";

  visibleElement:boolean = false;
  topGlobalSh8ke = [];
  dtConfigGlobal:Object = {};
  showSuccess:boolean = false;
  showError:boolean= false;
  
  temp_Option = [];
  constructor(private router:Router, private http:HttpService, private broadcaster:Broadcaster) { }

 ngOnInit(){
    this.dtConfigGlobal = {
      "columnDefs": [

        {
          "targets": 0,
          "orderable": false,
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="sh8ke-title">' +
                '<div>'+'<a href="javascript:void(0);" data-name="title" data-custom="' + full['rowId'] + '"data-creator="' + data + '">'+data+'</a>' +'</div>'+
                '<a href="javascript:void(0);" data-name="global-answers" data-custom="' + full['rowId'] + '"data-creator="' + full['id'] + '">Answers('+full['count']+')</a>' +
              '</div>';

            return template;
          }
        },
        {
          "targets": 4,
          "render": function (data, type, full, meta) {
            var template = '';
            template =
              '<a href="javascript:void(0);" data-name="global-creator" data-custom="' + full['creator_id'] + '" data-creator="' + data + '">'+data+'</a>';

            return template;
          }
        },
        {
          "targets": 7,
          "width": "10%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="global-edit" data-custom="'+ full['rowId']  + '" data-creator="' + full['id'] + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
              '<a href="javascript:void(0);" data-name="delete" data-custom="' + full['rowId'] + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
              '</div>';

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
            if(val == "No"){
              template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="global-publish"  data-custom="'+ full['rowId']  + '" data-creator="' + full['published'] + '"><span class="fa fa-times-circle" aria-hidden="true"></span></a>' +
             '</div>';
            }else if(val == "Yes"){
              template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="global-publish"  data-custom="'+ full['rowId']  + '" data-creator="' + full['published'] + '"><span class="fa fa-check-circle" aria-hidden="true"></span></a>' +
              '</div>';

            }
            

            return template;
          }
        }
      ],
      "columns": [
        { "title": 'Title', "data": "title" },
        { "title": 'Description', "data": "description" },
        { "title": 'Category', "data": "CategoryName" },
        { "title": 'Times sh8ken', "data": "timesSh8ken" },
        { "title": 'Creater' , "data":"created"},
        { "title": 'Approved' , "data":"status_approved"},
        { "title": 'Publish' , "data":"published"}
        
      ]
     }
     this.getTopGlobalShakes();
     this.getGlobalSh8keEditableData();
 }

getTopGlobalShakes(){
    this.http.post(PathConfig.GET_SHAKES_LIST, { "trending_type": "global","limit": "","user_type": "","user_id": 1})
      .subscribe((response)=> {
        this.broadcaster.broadcast("SHOW_LOADER",false);
          this.topGlobalSh8ke =  response.data;
          console.log(this.topGlobalSh8ke);
        },
        err => {
        }
      );
  }
      //on Menu Icon selected
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'global-edit') {
      let customData = data['value'];
      this.navigateTo("sh8ke/globalsh8keedit/"+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'global-answers'){
      this.navigateTo('sh8ke/globalAnswer/'+data['value']+"/"+data['creatorName']);
      
    }else if(data['clickedOn'] == 'global-creator'){
      this.navigateTo('user/globalCreator/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'title'){
        this.navigateTo('sh8ke/globalstatics/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn']== 'delete'){
      this.deleteGlobalSh8keQuestion(data['value'], PathConfig.DELETE_GLOBAL_SH8KE)
    }else if(data['clickedOn'] == 'global-publish'){
      this.chnageStatus(data['value'], data['creatorName']);
    }
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

  chnageStatus(id:string, status:string){
    var self = this;
    mscConfirm("sure to change status!", function(){
        self.broadcaster.broadcast("SHOW_LOADER",true)
        console.log(status, "    ", id);
        if(status == "No"){
          status ="Yes";
        }else{
          status = "No";
        }
        console.log(status, "    ", id);
        //alert(status);
        self.http.post(PathConfig.CHANGE_PUBLISH_STATUS_GLOBAL_SH8KE, {st:status, id:id}).subscribe((response)=>{
          self.broadcaster.broadcast("SHOW_LOADER",false)
        console.log(response);
        self.getTopGlobalShakes();
      }, err=>{

      });
    });
  }


  getGlobalSh8keEditableData(){
    this.options = [];
    this.http.get(PathConfig.GET_GENERAL_SH8KE_EDITABLE_DATA)
      .subscribe((response)=> {
        this.generalSh8keEditableData = response.data;
        console.log(this.generalSh8keEditableData);
        this.titleName = this.generalSh8keEditableData['title'];
        this.categoryItems = (this.generalSh8keEditableData['Category']);
        //this.selectedCategory = this.generalSh8keEditableData["category_id"];
        for(let obj in this.generalSh8keEditableData){
          if(obj != "Category" && obj !="title" && obj != "category_id" && obj != "id"){
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
       // this.temp_Option = this.options;
        console.log(this.temp_Option);
        this.options.forEach((val, key)=>{
          this.temp_Option.push(val);
        })
        console.log(this.temp_Option);
        //this.options.push[this.generalSh8keEditableData[]];
      },
      err => {
          // Log errors if any
      }
    );
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

    console.log(this.options);
  }
  
  handleDropDown(){
    setTimeout(function(){
      $('#pass3').val('0');
    }, 500);   
  }

  deleteGlobalSh8keQuestion(id:string, serviceUrl:string){
    var self = this;
    mscConfirm("Are you sure to delete!", function(){
      self.broadcaster.broadcast("SHOW_LOADER",true);
      self.http.post(serviceUrl, {'id':id}).subscribe((response)=> {
         if(response.Status == "Success"){
          self.getTopGlobalShakes();
          self.broadcaster.broadcast("SHOW_LOADER",false);
         }
       },
       err => {
       }
     );
    });      
  }
  submitData(){   
    let postData = {};
    this.options.forEach((key,val) =>{
      //let setvalue = 
      postData[key.name] = (key.selected == true ? 1 : 0);
      console.log(postData[key.name] + "   postData[key.name]");    
    });
    console.log(this.options, "    OPTIONS");
    postData["admin_id"] = "1";
    postData["category_id"]= this.selectedCategory;
    postData["title_english"] = this.titleName;
    postData["user_type"] = "Administrator";    
    postData["status_approved"] = "1";
    postData["published"] = "1";

    console.log(postData);
    this.broadcaster.broadcast("SHOW_LOADER",true);
    this.http.post(PathConfig.ADD_NEW_GLOBAL_SH8KE, postData).subscribe( (response)=>{
      console.log(postData);
          if(response.Status == "Success"){
            this.broadcaster.broadcast("SHOW_LOADER",false);
            this.options = [];
            this.options = this.temp_Option;
            console.log(this.options);
            this.getTopGlobalShakes();
            this.showSuccess = true;
            this.showError = false;
            this.selectedCategory = "0";
            this.titleName = "";
          }else if(response.Status == "Error"){
            this.showSuccess = false;
            this.showError = true;
          }
    },err =>{
      console.log(err);
    })
  }
  updatedCategory( event){
    this.selectedCategory = event;
  }
  
}
