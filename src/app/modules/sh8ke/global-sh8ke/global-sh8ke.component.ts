import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../../common/services/http.service";
import {PathConfig} from "../../../common/config/path.config";
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
  constructor(private router:Router, private http:HttpService) { }

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
                '<a href="javascript:void(0);" data-name="global-answers" data-custom="' + full['rowId'] + '">Answers('+full['count']+')</a>' +
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
          "targets": 5,
          "width": "10%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="global-edit" data-custom="'+ full['rowId']  + '" data-creator="' + full['title'] + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
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
        { "title": 'Creater' , "data":"created"}
      ]
     }
     this.getTopGlobalShakes();
     this.getGlobalSh8keEditableData();
 }

getTopGlobalShakes(){
    this.http.post(PathConfig.GET_SHAKES_LIST, { "trending_type": "global","limit": "","user_type": "","user_id": 1})
      .subscribe((response)=> {
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
      this.navigateTo('sh8ke/globalAnswer/'+data['value']);
    }else if(data['clickedOn'] == 'global-creator'){
      this.navigateTo('user/globalCreator/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'title'){
        this.navigateTo('sh8ke/globalstatics/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn']== 'delete'){
      this.deleteRowFromTop20Trending(data['value'], PathConfig.DELETE_GLOBAL_SH8KE)
    }
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
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
            if(this.generalSh8keEditableData[obj] === null){
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
  updateCheckedOptions(data,event){  
  }
  deleteRowFromTop20Trending(id:string, serviceUrl:string){
    let confirmElem = confirm("Are you sure to delete!");
    if (confirmElem == true) {
       this.http.post(serviceUrl, {'id':id}).subscribe((response)=> {
          if(response.Status == "Success"){
            this.getTopGlobalShakes();
          }
        },
        err => {
        }
      );
    }       
  }
  submitData(){
    let postData = {};
    this.options.forEach((key,val) =>{
      //let setvalue = 
      postData[key.name] = (key.selected == true ? 1 : 0);
      console.log(postData[key.name] + "   postData[key.name]");    
    });
    postData["admin_id"] = "1";
    postData["category_id"]= this.selectedCategory;
    postData["title_english"] = this.titleName;
    postData["user_type"] = "Administrator";    
    postData["status_approved"] = "1",
    postData["published"] = "1",

    console.log(postData);
    this.http.post(PathConfig.ADD_NEW_GLOBAL_SH8KE, postData).subscribe( (response)=>{
      console.log(postData);
          if(response.Status == "Success"){
            this.getTopGlobalShakes();
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
  updatedCategory( event){
    this.selectedCategory = event;
  }
  
}
