import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import { FileUploader } from 'ng2-file-upload';
import {Broadcaster} from "../../../../common/services/broadcaster.service";
import {GlobalVariableConfig} from "../../../../common/config/globalVariable.config";
declare var $:any;
declare var mscConfirm:any;

@Component({
  selector: 'app-general-answer',
  templateUrl: './general-answer.component.html',
  styleUrls: ['./general-answer.component.css']
})
export class GeneralAnswerComponent implements OnInit, AfterViewInit {
  visibleElement:boolean = false;
  preferencesItems = ["Arty", "Girly", "Nerdy", "Craftsman", "Hip-ster", "Old School", "Dapper", "Jock", "Quiet", "Extreme", "Loud", "Romantic",
  "Funny", "Manly", "Sassy", "Ditzy", "Social", "Techie"];

   generalAnswerList = [];
   dtConfig:Object = {};
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
      url:PathConfig.ADD_GENERAL_SH8KE_ANSWER_UPLOADED_ITEM
    });
    errorGeneralSh8keEdit = {
      'selectedItem':false,
      'otherTextAnswer':false,
      'selectedImage':false
    }
  constructor(private router:Router, private http:HttpService, private activeRoute:ActivatedRoute, private broadcaster:Broadcaster) {}
  ngAfterViewInit(){
    
  }
  ngOnInit(){
    GlobalVariableConfig.ANSWER_ID = "";
    GlobalVariableConfig.QUESTION_ID = "";
    
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
                '<a href="javascript:void(0);" data-name="edit" data-custom="' + full['rowId'] + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
                '<a href="javascript:void(0);" data-name="delete" data-custom="' + full['rowId']  + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
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
      //get top global shakes
      
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
        console.log("HELLo"); 
        if(this.selectedItem == "1"){          
          if ($.inArray(file.file['type'], ValidImageTypes) < 0) {
            this.fileErrorMsg = "Please select valid Image type"; 
            this.errorGeneralSh8keEdit['selectedImage'] = true;
            this.isFileValid = true;
          }else{
            this.fileErrorMsg = "required"; 
            this.errorGeneralSh8keEdit['selectedImage'] = false;
            this.isFileValid = false;
          }
         }else if(this.selectedItem == "2"){
          if ($.inArray(file.file['type'], ValidAudioTypes) < 0) {
            this.fileErrorMsg = "Please select valid Audio type"; 
            this.errorGeneralSh8keEdit['selectedImage'] = true;
            this.isFileValid = true;
          }else{
            this.fileErrorMsg = "required"; 
            this.errorGeneralSh8keEdit['selectedImage'] = false;
            this.isFileValid = false;
          }
        }else if(this.selectedItem == "3"){
          if ($.inArray(file.file['type'], ValidVideoTypes) < 0) {
            this.fileErrorMsg = "Please select valid Video type"; 
            this.errorGeneralSh8keEdit['selectedImage'] = true;
            this.isFileValid = true;
          }else{
            this.fileErrorMsg = "required"; 
            this.errorGeneralSh8keEdit['selectedImage'] = false;
            this.isFileValid = false;
          }
        }

        file.withCredentials = false; 
      };
  
      this.bool_answerOther = false;
      this.bool_fileType = false;

      this.getGeneralAnswerList(this.activeRoute.snapshot.params['id']);
      this.broadcaster.on<string>('ROUTE_URL')
      .subscribe(message => {
        this.visibleElement = false;
      }); 
      
  }

      //on Menu Icon selected

  valueChange(event){
    $("#avatar").val('');
    this.errorGeneralSh8keEdit['selectedImage'] = false;
    this.fileErrorMsg = "required";
    console.log(event);
    if(event == "0"){
      this.bool_answerOther = true;
      this.bool_fileType = false
    }else{
      this.bool_answerOther = false;
      this.bool_fileType = true;
    }
    setTimeout(()=>{
      if(event == "1"){
        $("#avatar").attr("accept", "image/*") ;
        
      }else if(event == "2"){
        $("#avatar").attr("accept", "audio/*") ;
      }else if(event == "3"){
        $("#avatar").attr("accept", "video/*") ;
      }
    }, 100);
  }



  //get generalShakes
  getGeneralAnswerList(id:string){
    this.broadcaster.broadcast("SHOW_LOADER",false);
    this.http.get(PathConfig.GET_GENERAL_SH8KE_ANSWER+id)
      .subscribe((response)=> {
        this.broadcaster.broadcast("SHOW_LOADER",false);
          this.generalAnswerList =  response.data;
          console.log(this.generalAnswerList);
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

       this.navigateTo('sh8ke/editGeneralAnswer/'+customData);
    }else if(data['clickedOn'] == 'name'){
      this.navigateTo('user/generalCreator');
    }else if (data['clickedOn'] == 'delete') {
      let customData = data['value'];
      this.deleteAnswer(data['value']);
    }
  }
  deleteAnswer(id:string){
    var self = this;
    mscConfirm("Are you sure to delete", function(){
      self.http.get(PathConfig.DELETE_GENERAL_ANSWER+id).subscribe((response)=>{
        self.broadcaster.broadcast("SHOW_LOADER",false);
        self.getGeneralAnswerList(self.activeRoute.snapshot.params['id']);
      },
      err=>{
    
      });

    })
       
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
    this.resetErrorObj(this.errorGeneralSh8keEdit);
    
    if(!this.selectedItem || this.selectedItem == "-1"){
      this.errorGeneralSh8keEdit['selectedItem']  = true;
    }
    if(!this.otherTextAnswer){
      if(this.selectedItem == "0"){
        this.errorGeneralSh8keEdit['otherTextAnswer'] = true;
      } 
      
    } 
    if(this.selectedItem != "0"){
      if($("input[type='file']").val() == "" ||  this.isFileValid == true)
      {
        this.errorGeneralSh8keEdit['selectedImage'] = true;
      }
    }
    if(this.allErrorResolved(this.errorGeneralSh8keEdit)){
      this.broadcaster.broadcast("SHOW_LOADER",true);
      if(this.selectedItem != "0"){
        this.uploader.cancelAll();
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          var responsePath = JSON.parse(response);
          this.broadcaster.broadcast("SHOW_LOADER",true);
          if(responsePath.Status == "Success"){
            this.showSuccess= true;
            this.showError= false;
            this.message = responsePath.SucessMessage;
            this.getGeneralAnswerList(this.activeRoute.snapshot.params['id']);
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
  
        this.http.post(PathConfig.ADD_GENERAL_SH8KE_ANSWER, postData).subscribe((response)=>{
          console.log(response);
          this.broadcaster.broadcast("SHOW_LOADER",false);
          if(response.Status == "Success"){
           this.showSuccess= true;
           this.showError= false;
           this.message = response.SucessMessage;
           this.getGeneralAnswerList(this.activeRoute.snapshot.params['id']);
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


  handleVisiblity(){    
    this.visibleElement = !this.visibleElement;
    setTimeout(()=>{
       $('#datepicker-autoclose').datepicker({
        autoclose: true,
        todayHighlight: true 
     });
      },200)
      
  }
  
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  
}
