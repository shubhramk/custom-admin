import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../../common/services/http.service";
import {PathConfig} from "../../../common/config/path.config";
import {Broadcaster} from "../../../common/services/broadcaster.service";
declare var mscConfirm:any;
@Component({
  selector: 'app-example-sh8ke',
  templateUrl: './example-sh8ke.component.html',
  styleUrls: ['./example-sh8ke.component.css']
})
export class ExampleSh8keComponent implements OnInit {
  categoryItems = [];
  visibleElement:boolean = false;
   exampleSh8keList = [];
   dtConfig:Object = {};

   exampleTitle:string = "";
   description:string = "";
   selectedCategory:string = "-1";
   showSuccess:boolean = false;
   showError:boolean = false;
   errorValidationObj = {
    'selectedCategory':false,
    'exampleTitle':false
  }
  constructor(private router:Router, private http:HttpService, private broadcaster:Broadcaster) { }

  ngOnInit(){
    this.dtConfig = { 
      "columnDefs": [
        {
          "targets": 0,
          "orderable": false,
          "render": function (data, type, full, meta) {
            var template = '';
            let val = data;
            template = '<div class="sh8ke-title">' +
                '<div>'+'<a href="javascript:void(0);" data-name="title" data-custom="' + full['rowId'] + '"data-creator="' + data + '">'+data+'</a>' +'</div>'+
                '<a href="javascript:void(0);" data-name="example-answers" data-custom="' + full['rowId'] + '"data-creator="' + full['id'] + '">Answers('+full['total']+')</a>' +
              '</div>';
            return template;
          }
        },
        {
          "targets": 3,
          "width": "10%",
          "orderable": false,
          "className": "noPadding",
          "render": function (data, type, full, meta) {
            var template = '';

            let val = data;
            template = '<div class="dt-menu-icons">' +
              '<a href="javascript:void(0);" data-name="edit" data-custom="' + full['rowId'] + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
              '<a href="javascript:void(0);" data-name="delete" data-custom="' + full['rowId'] + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
              '</div>';

            return template;
          }
        }
      ],
      "columns": [
        { "title": 'Title', "data": "title" },
        { "title": 'Description', "data": "description" },
        { "title": 'Category', "data": "CategoryName" }
      ]
     }
     this.getExampleSh8keList();
     this.getCategoryList();
     this.broadcaster.on<string>('ROUTE_URL')
     .subscribe(message => {
       this.visibleElement = false;
   });
}

  getExampleSh8keList(){
    this.broadcaster.broadcast("SHOW_LOADER",false);
    this.http.get(PathConfig.GET_EXAMPLE_SH8KE)
      .subscribe((response)=> {
        this.broadcaster.broadcast("SHOW_LOADER",false);
          this.exampleSh8keList =  response.data;
          console.log(this.exampleSh8keList);
        },
        err => {
        }
      );
  }

  //to get category drop down value
  getCategoryList(){
    this.http.get(PathConfig.GET_GENERAL_SH8KE_EDITABLE_DATA).subscribe((response) =>{
      console.log(response);
      this.categoryItems = response.data["Category"];
      console.log(this.categoryItems);
    }, err=>{
    })
  }
  updatedCategory( event){
    this.selectedCategory = event;
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
  addExampleSh8ke(){
    this.resetErrorObj(this.errorValidationObj);
    
    if(!this.selectedCategory || this.selectedCategory == "-1"){
      this.errorValidationObj['selectedCategory']  = true;
    }
    if(!this.exampleTitle){
      this.errorValidationObj['exampleTitle'] = true;
    }
    
    if(this.allErrorResolved(this.errorValidationObj)){
      
      this.http.post(PathConfig.ADD_NEW_EXAMPLE_SH8KE, {
        "title": this.exampleTitle,
        "description": this.description,
        "category_id": this.selectedCategory,
        "admin_id": "1"
      }).subscribe((response)=>{
        if(response.Status == "Success"){
          this.getExampleSh8keList();
          this.showSuccess = true;
          this.showError = false;
        }else if(response.Status == "Error"){
          this.showSuccess = false;
          this.showError = true;
        }
      }, err =>{
  
      })

    }
   
  }
  //on Menu Icon selected
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value']; 
      this.navigateTo('sh8ke/examplesh8keedit/'+customData);       
    }else if(data['clickedOn'] == 'example-answers'){
      this.navigateTo('sh8ke/exampleAnswer/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'title'){
        this.navigateTo('sh8ke/examplestatics/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'delete'){
      this.deleteExampleSh8ke(data['value'], PathConfig.DLETE_EXAMPLE_SH8KE)
    }
  }
  deleteExampleSh8ke(id:string, serviceUrl:string){
    var self = this;
    mscConfirm("Are you sure to delete", function(){
      self.broadcaster.broadcast("SHOW_LOADER",true);
      self.http.get(serviceUrl+id).subscribe((response)=> {
        self.broadcaster.broadcast("SHOW_LOADER",false);
         if(response.Status == "Success"){
           self.getExampleSh8keList();
         }
       },
       err => {
       }
     );
    });
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
