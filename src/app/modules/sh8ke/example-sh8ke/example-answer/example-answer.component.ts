import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import { FileUploader } from 'ng2-file-upload';
declare var $:any;

@Component({
  selector: 'app-example-answer',
  templateUrl: './example-answer.component.html',
  styleUrls: ['./example-answer.component.css']
})
export class ExampleAnswerComponent implements OnInit {
visibleElement:boolean = false;
  preferencesItems = ["Arty", "Girly", "Nerdy", "Craftsman", "Hip-ster", "Old School", "Dapper", "Jock", "Quiet", "Extreme", "Loud", "Romantic",
  "Funny", "Manly", "Sassy", "Ditzy", "Social", "Techie"];

   generalAnswerList = [];
   dtConfig:Object = {};
   boolErrorMessageOnLoad:boolean = false;
   errorMessageOnLoad:string = "";

   selectedItem;string = "";
   bool_answerOther:boolean = false;
   bool_fileType:boolean = false;

   otherTextAnswer:string = "";

   showSuccess= false;
   showError= false;
   message:string = "";
   uploader:FileUploader = new FileUploader({
      url:PathConfig.ADD_EXAMPLE_SH8KE_ANSWER_UPLOADED_ITEM
    });

  constructor(private router:Router, private http:HttpService, private activeRoute:ActivatedRoute) { }

   ngOnInit(){
     //general data table
      this.dtConfig =  {
        "columnDefs": [
          {
            "targets": 0,
            "orderable": false,
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
                '<a href="javascript:void(0);" data-name="edit" data-custom="' + full['rowId']  + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
                '<a href="javascript:void(0);" data-name="delete" data-custom="' + full['rowId'] + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
                '</div>';

              return template;
            }
          },{
            "targets": 2,
            "width": "10%",
            "orderable": false,
            "className": "noPadding",
            "render": function (data, type, full, meta) {
              var template = '';
              //console.log(data + "    FULLLL" );
              let val = data;
              template = '<span>'+data+'</span>';

              return template;
            }
          }

        ],
        "columns": [
          { "title": 'ID', "data": "id" },
          { "title": 'Type', "data": "type" },
          { "title": 'Answer', "data": "answer" }
        ]
      }
      this.uploader.onBuildItemForm = (item, form) => {
        //form.append('key1', 'S');
        //form.append('key2', 'K');
        //let postData = {};
        let checkBoxFinalAnswer:string;
        form.append("type", this.selectedItem);
        form.append("ans" ,this.otherTextAnswer);
        form.append("qid" ,this.activeRoute.snapshot.params['primeNo']);
      };
      this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
      //get top global shakes
      this.getExampleAnswerList(this.activeRoute.snapshot.params['id']);
      
  }

      //on Menu Icon selected
  
  //get generalShakes
  getExampleAnswerList(id:string){
    console.log(PathConfig.GET_EXAMPLE_ANSWER_LST+id);
    this.http.get(PathConfig.GET_EXAMPLE_ANSWER_LST+id)
      .subscribe((response)=> {
          if(response.SucessMessage == "No record found"){
            this.boolErrorMessageOnLoad = true
            this.errorMessageOnLoad = response.SucessMessage
          
          }
          this.generalAnswerList =  response.data;          
        },
        err => {
        }
      );
  }
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
        let customData = data['value'];
         this.navigateTo('sh8ke/editExampleAnswer/'+customData);
    }else if(data['clickedOn'] == 'name'){
      this.navigateTo('user/generalCreator');
    }else if(data['clickedOn'] == 'delete'){
      this.deleteAnswer(data['value']);
    }
  }

  deleteAnswer(id:string){
    console.log(PathConfig.DELETE_EXAMPLE_ANSWER+id);
    let confirmElem = confirm("Are you sure to delete!");
    if (confirmElem == true) {
      this.http.get(PathConfig.DELETE_EXAMPLE_ANSWER+id).subscribe((response)=>{
        console.log(response);
        this.getExampleAnswerList(this.activeRoute.snapshot.params['id']);
      },
      err=>{
    
      });

    }    
  }


  handleVisiblity(){    
    this.visibleElement = !this.visibleElement;
    setTimeout(()=>{
       $('#datepicker-autoclose').datepicker({
        autoclose: true,
        todayHighlight: true 
     });
      },200)
      
  }
  valueChange(event){
    console.log(event);
    if(event == "0"){
      this.bool_answerOther = true;
      this.bool_fileType = false
    }else{
      this.bool_answerOther = false;
      this.bool_fileType = true;
    }
  }

  addGeneralAnswer(){
    if(this.selectedItem != 0){
      this.uploader.cancelAll();
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        var responsePath = JSON.parse(response);
        console.log(responsePath.Status);
        if(responsePath.Status == "Success"){
          this.showSuccess= true;
          this.showError= false;
          this.message = responsePath.SucessMessage;
          this.getExampleAnswerList(this.activeRoute.snapshot.params['id']);
         }else if(responsePath.Status == "Error"){
          this.showSuccess= true;
          this.showError= false;
          this.message = responsePath.ErrorMessage;
         }
        this.bool_answerOther = false;
        this.bool_fileType = false;
        this.selectedItem = "-1";
        $("#avatar").val("");
        };
    }else{
      let postData = {};
      postData["type"] = this.selectedItem;
      postData["ans"] = this.otherTextAnswer;
      postData["qid"]= this.activeRoute.snapshot.params['primeNo'];

      console.log(postData);
   
      this.http.post(PathConfig.ADD_EXAMPLE_SH8KE_ANSWER, postData).subscribe((response)=>{
        console.log(response);
        if(response.Status == "Success"){
         this.showSuccess= true;
         this.showError= false;
         this.message = response.SucessMessage;
         this.getExampleAnswerList(this.activeRoute.snapshot.params['id']);
        }else if(response.Status == "Error"){
         this.showSuccess= true;
         this.showError= false;
         this.message = response.ErrorMessage;
        }
        $("#avatar").val("");
       this.bool_answerOther = false;
       this.bool_fileType = false;
       this.selectedItem = "-1";
      }, err=>{
        
        });
    }
  }

  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
