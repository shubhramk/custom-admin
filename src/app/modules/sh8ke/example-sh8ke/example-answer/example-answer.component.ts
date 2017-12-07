import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import {Broadcaster} from "../../../../common/services/broadcaster.service";
import { FileUploader } from 'ng2-file-upload';
import {GlobalVariableConfig} from "../../../../common/config/globalVariable.config";

declare var $:any;
declare var mscConfirm:any;

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

   selectedItem:string = "-1";
   bool_answerOther:boolean = false;
   bool_fileType:boolean = false;

   otherTextAnswer:string = "";

   showSuccess= false;
   showError= false;
   message:string = "";

   fileErrorMsg = "required";
   isFileValid = false;

   uploader:FileUploader = new FileUploader({
      url:PathConfig.ADD_EXAMPLE_SH8KE_ANSWER_UPLOADED_ITEM
    });
    errorValidationObj = {
      'selectedItem':false,
      'otherTextAnswer':false,
      'selectedImage':false
    }

  constructor(private router:Router, private http:HttpService, private activeRoute:ActivatedRoute, private broadcaster:Broadcaster) { }

   ngOnInit(){
     //general data table
     GlobalVariableConfig.ANSWER_ID = "";
     GlobalVariableConfig.QUESTION_ID = "";
     
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
      this.uploader.onAfterAddingFile = (file)=> { 
        var ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
      var ValidAudioTypes = ["audio/mp3", "audio/ogg", "audio/wav"];
      var ValidVideoTypes = ["video/mp4", "video/wenm", "video/ogg"];
      console.log("HEEELLLLOOOO");
     if(this.selectedItem == "1"){          
      if ($.inArray(file.file['type'], ValidImageTypes) < 0) {
        this.fileErrorMsg = "Please select valid Image type"; 
        this.errorValidationObj['selectedImage'] = true;
        this.isFileValid = true;
      }else{
        this.fileErrorMsg = "required"; 
        this.errorValidationObj['selectedImage'] = false;
        this.isFileValid = false;
      }
     }else if(this.selectedItem == "2"){
      if ($.inArray(file.file['type'], ValidAudioTypes) < 0) {
        this.fileErrorMsg = "Please select valid Audio type"; 
        this.errorValidationObj['selectedImage'] = true;
        this.isFileValid = true;
      }else{
        this.fileErrorMsg = "required"; 
        this.errorValidationObj['selectedImage'] = false;
        this.isFileValid = false;
      }
    }else if(this.selectedItem == "3"){
      if ($.inArray(file.file['type'], ValidVideoTypes) < 0) {
        this.fileErrorMsg = "Please select valid Video type"; 
        this.errorValidationObj['selectedImage'] = true;
        this.isFileValid = true;
      }else{
        this.fileErrorMsg = "required"; 
        this.errorValidationObj['selectedImage'] = false;
        this.isFileValid = false;
      }
    }
      file.withCredentials = false; 
    };
      //get top global shakes
      this.getExampleAnswerList(this.activeRoute.snapshot.params['id']);
      this.broadcaster.on<string>('ROUTE_URL')
      .subscribe(message => {
        this.visibleElement = false;
      }); 
  }

      //on Menu Icon selected
  
  //get generalShakes
  getExampleAnswerList(id:string){
    
    
    this.http.get(PathConfig.GET_EXAMPLE_ANSWER_LST+id)
      .subscribe((response)=> {
        this.broadcaster.broadcast("SHOW_LOADER",false);
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
        
        GlobalVariableConfig.ANSWER_ID = this.activeRoute.snapshot.params['id'];
        GlobalVariableConfig.QUESTION_ID = this.activeRoute.snapshot.params['primeNo'];

         this.navigateTo('sh8ke/editExampleAnswer/'+customData);
    }else if(data['clickedOn'] == 'name'){
      this.navigateTo('user/generalCreator');
    }else if(data['clickedOn'] == 'delete'){
      this.deleteAnswer(data['value']);
    }
  }

  deleteAnswer(id:string){
    var self = this;
    mscConfirm("Are you sure to delete Answer", function(){
      self.broadcaster.broadcast("SHOW_LOADER",true);      
      self.http.get(PathConfig.DELETE_EXAMPLE_ANSWER+id).subscribe((response)=>{
        console.log(response);
        self.broadcaster.broadcast("SHOW_LOADER",false);
        self.getExampleAnswerList(self.activeRoute.snapshot.params['id']);
      },
      err=>{
    
      });
    });    
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
  addGeneralAnswer(){
    this.resetErrorObj(this.errorValidationObj);
    
    if(!this.selectedItem || this.selectedItem == "-1"){
      this.errorValidationObj['selectedItem']  = true;
    }
    if(this.selectedItem == "0"){
      if(!this.otherTextAnswer){
        this.errorValidationObj['otherTextAnswer'] = true;
      }
    }
    if(this.selectedItem != "0"){
      if($("input[type='file']").val() == ""  ||  this.isFileValid == true)
      {
        this.errorValidationObj['selectedImage'] = true;
      }
    }
    
    if(this.allErrorResolved(this.errorValidationObj)){
      this.broadcaster.broadcast("SHOW_LOADER",true);
      if(this.selectedItem != "0"){
        this.uploader.cancelAll();
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          var responsePath = JSON.parse(response);
          console.log(responsePath.Status);
          this.broadcaster.broadcast("SHOW_LOADER",false);
          
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
          this.broadcaster.broadcast("SHOW_LOADER",false);
          
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


    
  }

  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
