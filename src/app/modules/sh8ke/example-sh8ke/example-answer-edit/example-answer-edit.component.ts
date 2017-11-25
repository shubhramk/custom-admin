import {Component, AfterViewInit, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import { FileUploader } from 'ng2-file-upload';
import {Broadcaster} from "../../../../common/services/broadcaster.service";
declare var $:any;

@Component({
  selector: 'app-example-answer-edit',
  templateUrl: './example-answer-edit.component.html',
  styleUrls: ['./example-answer-edit.component.css']
})
export class ExampleAnswerEditComponent implements OnInit {

  answerType = ["Text", "Image", "Audio", "Video"];
  updatedText:string = "";
  textSelectedBool = true;
  defualtSelectedBool = false;
  selectedDevice:string;
  otherTextAnswer:string = "";
  bool_fileType:boolean = false;
  bool_answerOther:boolean = false;
  showSuccess= false;
  showError= false;
  message:string = "";
  answer_id:string = "";
  uploader:FileUploader = new FileUploader({
   url:PathConfig.UPDATE_SH8KE_EXAMPLE_ANSWER_UPLOADED_ITEM
 });

 errorValidationObj = {
  'selectedItem':false,
  'otherTextAnswer':false,
  'selectedImage':false
}
  constructor(private router:Router, private http:HttpService, private activeRoute:ActivatedRoute, private broadcaster:Broadcaster) { }

  ngOnInit() {
    //this.selectedDevice = this.answerType[0];
    
    this.uploader.onBuildItemForm = (item, form) => {
      
      let checkBoxFinalAnswer:string;
      form.append("type", this.selectedDevice);
      form.append("ans" ,this.otherTextAnswer);
      form.append("qid" ,this.question_id);
      form.append("id" ,this.answer_id);
    };

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.getEditableAnswer(this.activeRoute.snapshot.params['id']);

  }

  question_id:string = "";

  getEditableAnswer(id:string){
    this.broadcaster.broadcast("SHOW_LOADER",false);
    
    this.http.get(PathConfig.GET_EDITABLE_EXAMPLE_ANSWER+id).subscribe((response)=>{
      if(response.Status == "Success"){
        console.log(response);
        this.selectedDevice = response.data['type'];
        this.otherTextAnswer = response.data['text_field'];
        this.question_id = response.data['question_id'];
        this.answer_id = response.data['id'];
        this.setOnAnswerLoad(this.selectedDevice);
      }      
    }, err=>{

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

  saveGeneralSh8keEditableData(){
    this.resetErrorObj(this.errorValidationObj);
    
    if(!this.selectedDevice || this.selectedDevice == "-1"){
      this.errorValidationObj['selectedItem']  = true;
    }
    if(!this.otherTextAnswer){
      this.errorValidationObj['otherTextAnswer'] = true;
    }
    if(this.selectedDevice != "0"){
      if($("input[type='file']").val() == "")
      {
        this.errorValidationObj['selectedImage'] = true;
      }
    }
    
    if(this.allErrorResolved(this.errorValidationObj)){
      this.broadcaster.broadcast("SHOW_LOADER",true);
      
      if(this.selectedDevice != "0"){
        this.uploader.cancelAll();
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          var responsePath = JSON.parse(response);
          this.broadcaster.broadcast("SHOW_LOADER",false);
          
          if(responsePath.Status == "Success"){
            this.showSuccess= true;
            this.showError= false;
            this.message = responsePath.SucessMessage;
           // this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
           }else if(responsePath.Status == "Error"){
            this.showSuccess= true;
            this.showError= false;
            this.message = responsePath.ErrorMessage;
           }
          this.bool_answerOther = false;
          this.bool_fileType = false;
          $("#avatar").val("");
          };
      }else{
    
       let postData = {};
       postData["type"] = this.selectedDevice;
       postData["ans"] = this.otherTextAnswer;
       postData["qid"]= this.question_id;
       postData['id'] = this.answer_id; 
       console.log(postData);
    
       this.http.post(PathConfig.UPDATE_SH8KE_EXAMPLE_ANSWER, postData).subscribe((response)=>{
         console.log(response);
         this.broadcaster.broadcast("SHOW_LOADER",false);
         
         if(response.Status == "Success"){
          this.showSuccess= true;
          this.showError= false;
          this.message = response.SucessMessage;
          //this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
         }else if(response.Status == "Error"){
          this.showSuccess= true;
          this.showError= false;
          this.message = response.ErrorMessage;
         }
         $("#avatar").val("");
        this.bool_answerOther = false;
        this.bool_fileType = false;
       }, err=>{
         
         })
        }   
      
    }
    
  }
  setOnAnswerLoad(event){
      this.selectedDevice = event;      
        if(event == "0"){
          this.bool_fileType = false;
          this.bool_answerOther = true;
          //this.selectedDevice = event;
        }else{
          this.bool_answerOther = false;
          this.bool_fileType = true;
          
          if(event == "1"){
            $("#avatar").attr("accept", "image/*") ;
          }else if(event == "Audio"){
            $("#avatar").attr("accept", "audio/*") ;
          }else if(event == "Video"){
            $("#avatar").attr("accept", "video/*") ;
          }
        }
  
}
navigateTo(url:string){
  this.router.navigate([url]);
}
  updatedCategory(event){
   
    if(event == "1"){
      this.textSelectedBool = true;
      this.defualtSelectedBool = true;
    }else if(event == "2" || event == "3" || event == "4"){
      this.textSelectedBool = false;
      this.defualtSelectedBool = true;
    }else{
      this.defualtSelectedBool = false;
    }
  }

}
