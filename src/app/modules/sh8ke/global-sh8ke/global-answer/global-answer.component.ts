import {Component, AfterViewInit, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import { FileUploader } from 'ng2-file-upload';
import {Broadcaster} from "../../../../common/services/broadcaster.service";
import {GlobalVariableConfig} from "../../../../common/config/globalVariable.config";

declare var $:any, mscConfirm:any;
@Component({
  selector: 'app-global-answer',
  templateUrl: './global-answer.component.html',
  styleUrls: ['./global-answer.component.css']
})
export class GlobalAnswerComponent implements OnInit {
  globalsh8keAnswer = [];
  dtConfig:Object = {};
  visibleElement:boolean = false;

 text_AnswerType =["Positive", "Negative", "Neutral", "8Ball", "Other"]; 
 text_Answers = [];
 bool_answerType:boolean = false;
 bool_answer:boolean = false;
 bool_answerOther:boolean = false;
 selectedDevice:string = "-1";
 bool_fileType = false;

 uploadedFileDetail = {'base64Code':""};
 link_url:string = "";

 answer_type:string = "-1";
 answerValue:string = "-1";
 otherTextAnswer:string = ""; 
 finalAnswer:boolean = false;

 selectedItem:string = "-1";
 showSuccess= false;
 showError= false;
 message:string = "";

 fileErrorMsg = "required";
 isFileValid = false;
 
 uploader:FileUploader = new FileUploader({
    url:PathConfig.ADD_GLOBAL_ANSWER_UPLOADED_DATA
  });
  errorGlobalSh8keAnswer = {
    'selectedDevice':false,
    'answerValue':false,
    'answer_type':false,
    'otherTextAnswer':false,
    'selectedImage':false
  }
 //uploadedFileDetail:object = {'base64Code':""};
  constructor(private router:Router, private http:HttpService, private activeRoute:ActivatedRoute, private broadcaster:Broadcaster) { }

  ngOnInit(){
    GlobalVariableConfig.ANSWER_ID = "";
    GlobalVariableConfig.QUESTION_ID = "";
    this.uploader.onBuildItemForm = (item, form) => {
      //form.append('key1', 'S');
      //form.append('key2', 'K');
      //let postData = {};
      let checkBoxFinalAnswer:string;
      checkBoxFinalAnswer = this.finalAnswer?"1":"0";
      form.append("type", this.selectedDevice);
      form.append("anstype" , this.answer_type);
      form.append("ans" ,this.otherTextAnswer);
      form.append("getans", this.answerValue);
      form.append("qid" ,this.activeRoute.snapshot.params['primeNo']);
      form.append("url_link",this.link_url);
      form.append("finalans", checkBoxFinalAnswer);
      form.append("img" , this.uploadedFileDetail['base64Code']);
      console.log(form);

      this.broadcaster.on<string>('ROUTE_URL')
      .subscribe(message => {
        this.visibleElement = false;
    });

    };

    this.uploader.onAfterAddingFile = (file)=> { 
      var ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
      var ValidAudioTypes = ["audio/mp3", "audio/ogg", "audio/wav"];
      var ValidVideoTypes = ["video/mp4", "video/wenm", "video/ogg"];
     if(this.selectedDevice == "1"){          
      if ($.inArray(file.file['type'], ValidImageTypes) < 0) {
        this.fileErrorMsg = "Please select valid Image type"; 
        this.errorGlobalSh8keAnswer['selectedImage'] = true;
        this.isFileValid = true;
      }else{
        this.fileErrorMsg = "required"; 
        this.errorGlobalSh8keAnswer['selectedImage'] = false;
        this.isFileValid = false;
      }
     }else if(this.selectedDevice == "2"){
      if ($.inArray(file.file['type'], ValidAudioTypes) < 0) {
        this.fileErrorMsg = "Please select valid Audio type"; 
        this.errorGlobalSh8keAnswer['selectedImage'] = true;
        this.isFileValid = true;
      }else{
        this.fileErrorMsg = "required"; 
        this.errorGlobalSh8keAnswer['selectedImage'] = false;
        this.isFileValid = false;
      }
    }else if(this.selectedDevice == "3"){
      if ($.inArray(file.file['type'], ValidVideoTypes) < 0) {
        this.fileErrorMsg = "Please select valid Video type"; 
        this.errorGlobalSh8keAnswer['selectedImage'] = true;
        this.isFileValid = true;
      }else{
        this.fileErrorMsg = "required"; 
        this.errorGlobalSh8keAnswer['selectedImage'] = false;
        this.isFileValid = false;
      }
    }
    file.withCredentials = false; 
  };

    this.bool_answer = false;
    this.bool_answerType = false;
    this.bool_answerOther = false;
    this.bool_fileType = false;
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
                '<a href="javascript:void(0);" data-name="edit" data-custom="' + full['id'] + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
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
      //get top global shakes
      this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
      
  }
  
  valueChange(event, type){     
  if(type== 'mainType'){
    setTimeout(function(){
      this.selectedItem = event;
    },1000);
    
    this.selectedDevice = "";
    this.answer_type = "";
    this.otherTextAnswer = "";
    this.answerValue = "";
    $("#avatar").val("");
    this.uploadedFileDetail['base64Code'] = ""; 
        if(event == "Text"){
          this.selectedDevice = "0";
        }else if(event == "Image"){
          this.selectedDevice = "1";
        }else if(event == "Audio"){
          this.selectedDevice = "2";
        }else if(event == "Video"){
          this.selectedDevice = "3";
        }
    //this.selectedDevice = event;
      console.log(this.selectedDevice);
      if(event == "Text"){
        this.bool_answerType = true;
        this.bool_fileType = false;
        this.answer_type = "-1";
      }else{
        this.bool_answer = false;
        this.bool_answerType = false;
        this.bool_answerOther = false;
        this.bool_fileType = true;
        //let x= event;
        this.http.post(PathConfig.GET_GLOBAL_ANSWERS_LIST, {"get_option":"Positive"}).subscribe((response)=>{            
          this.text_Answers = response.data;
          console.log(this.text_Answers);
        }, err=>{
        });
        setTimeout(()=>{
          if(event == "Image"){
            $("#avatar").attr("accept", "image/*") ;
          }else if(event == "Audio"){
            $("#avatar").attr("accept", "audio/*") ;
          }else if(event == "Video"){
            $("#avatar").attr("accept", "video/*") ;
          }
        }, 100);
        
      }
    }else if(type == 'answerType'){
      this.answer_type = event;
      console.log(event);
      if(event != '-1' && event !='Other'){
        this.bool_answer = true;
        this.bool_answerOther = false;
        this.answerValue = "-1";
        this.http.post(PathConfig.GET_GLOBAL_ANSWERS_LIST, {"get_option":event}).subscribe((response)=>{            
            this.text_Answers = response.data;
            console.log(this.text_Answers);

        }, err=>{

        })
      }else{
        this.bool_answer = false;
        this.bool_answerOther = true;
      }
    }else if(type == "answer"){
      this.answerValue = event;
    }
    
  }
      //on Menu Icon selected
  
  //get generalShakes
  getGlobalAnswerList(id:string){
    this.broadcaster.broadcast("SHOW_LOADER",true);
    this.http.get(PathConfig.GET_GLOBAL_SH8KE_ANSWER+id)
      .subscribe((response)=> {
        this.broadcaster.broadcast("SHOW_LOADER",false);
          this.globalsh8keAnswer =  response.data;
          console.log(this.globalsh8keAnswer);
        },
        err => {
        }
      );
  }

  onFileChange(event){
    event = document.getElementById("avatar");
    let self = this
    let fileBase64Code:string;
    var fileReader = new FileReader();
      if (event.files[0]) {
        
        fileReader.onload = function (e) {
          fileBase64Code = String(e.target['result']);
          self.assignValue(fileBase64Code);
        }
        fileReader.readAsDataURL(event.files[0]);
        
        self.uploadedFileDetail['fileName'] = event.files[0].name;         
      }  
    }
    assignValue(baseVal:string){
      this.uploadedFileDetail['base64Code'] = baseVal;
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
   submitAnswer(){
    this.resetErrorObj(this.errorGlobalSh8keAnswer);
    if(!this.selectedDevice || this.selectedDevice == "-1"){
      this.errorGlobalSh8keAnswer['selectedDevice']  = true;
    }
    
    if(this.selectedDevice == "0"){
      if(this.answerValue == "-1"){
        this.errorGlobalSh8keAnswer['answerValue']  = true;
      }
      if(this.answer_type == "-1"){
        this.errorGlobalSh8keAnswer['answer_type']  = true;
      }
           
    }
    if(this.answer_type == "Other"){
      if(!this.otherTextAnswer){
        this.errorGlobalSh8keAnswer['otherTextAnswer'] = true;     
      }
    }
      
    if(this.selectedDevice != "0"){
      if($("input[type='file']").val() == "" ||  this.isFileValid == true)
      {
        this.errorGlobalSh8keAnswer['selectedImage'] = true;
      }
    }
    if(this.allErrorResolved(this.errorGlobalSh8keAnswer)){
      this.broadcaster.broadcast("SHOW_LOADER",true);
      if(this.selectedDevice != "0"){
        this.uploader.cancelAll();
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          var responsePath = JSON.parse(response);
          this.broadcaster.broadcast("SHOW_LOADER",false);
          console.log(responsePath.Status);
          if(responsePath.Status == "Success"){
            this.showSuccess= true;
            this.showError= false;
            this.message = responsePath.SucessMessage;
            this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
          }else if(responsePath.Status == "Error"){
            this.showSuccess= true;
            this.showError= false;
            this.message = responsePath.ErrorMessage;
          }
          this.bool_answer = false;
          this.bool_answerType = false;
          this.bool_answerOther = false;
          this.bool_fileType = false;
          this.selectedItem = "-1";
          $("#avatar").val("");
          };
      }
      else{
          let postData = {};
          let checkBoxFinalAnswer:string;
          checkBoxFinalAnswer = this.finalAnswer?"1":"0";
          console.log(checkBoxFinalAnswer );
          postData["type"] = this.selectedDevice,
          postData["anstype"] = this.answer_type,
          postData["ans"] = this.otherTextAnswer,
          postData["getans"]= this.answerValue,
          postData["qid"]= this.activeRoute.snapshot.params['primeNo'],
          postData["url_link"]=this.link_url,
          postData["finalans"]= checkBoxFinalAnswer,
          postData["img"] = this.uploadedFileDetail['base64Code'];  

          this.http.post(PathConfig.ADD_GLOBAL_SH8KE_ANSWER, postData).subscribe((response)=>{
          console.log(response);
          this.broadcaster.broadcast("SHOW_LOADER",false);
          if(response.Status == "Success"){
            this.showSuccess= true;
            this.showError= false;
            this.message = response.SucessMessage;
            this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
          }else if(response.Status == "Error"){
            this.showSuccess= true;
            this.showError= false;
            this.message = response.ErrorMessage;
          }
          $("#avatar").val("");
          this.bool_answer = false;
          this.bool_answerType = false;
          this.bool_answerOther = false;
          this.bool_fileType = false;
          this.selectedItem = "-1";
        }, err=>{ });
      }
    }
       
  }
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
      GlobalVariableConfig.ANSWER_ID = this.activeRoute.snapshot.params['id'];
      GlobalVariableConfig.QUESTION_ID = this.activeRoute.snapshot.params['primeNo'];

       this.navigateTo('sh8ke/editGlobalAnswer/'+customData);
    }else if(data['clickedOn'] == 'name'){
      this.navigateTo('user/generalCreator');
    }else if (data['clickedOn'] == 'delete') {      
      this.deleteAnswer(data['value']);
    }
  }
  deleteAnswer(id:string){
    var self = this;
    mscConfirm("Are you sure to delete!", function(){
      self.http.get(PathConfig.DELETE_GLOBAL_ANSWER+id).subscribe((response)=>{
        if(response.Status == "Success"){
          self.getGlobalAnswerList(self.activeRoute.snapshot.params['id']);
        }
      },
      err => {
      }
    );
    });
    
  }
  handleVisiblity(){    
    this.visibleElement = !this.visibleElement;
    this.bool_answer = false;
    this.bool_answerType = false;
    this.bool_answerOther = false;
    this.bool_fileType = false;
    this.selectedItem = "-1";
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
  
  
  submitFile(){
    
    console.log(this.uploader.uploadAll());
    
  }
}
