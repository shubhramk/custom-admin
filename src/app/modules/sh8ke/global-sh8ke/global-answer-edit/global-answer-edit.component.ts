import {Component, AfterViewInit, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import { FileUploader } from 'ng2-file-upload';
import {Broadcaster} from "../../../../common/services/broadcaster.service";
import {GlobalVariableConfig} from "../../../../common/config/globalVariable.config";

declare var $:any;

@Component({
  selector: 'app-global-answer-edit',
  templateUrl: './global-answer-edit.component.html',
  styleUrls: ['./global-answer-edit.component.css']
})
export class GlobalAnswerEditComponent implements OnInit, AfterViewInit {
  globalsh8keAnswer = [];
  dtConfig:Object = {};
 visibleElement:boolean = false;
text_mainType = ["Text", "Image", "Audio", "Video"];
 text_AnswerType =["Positive", "Negative", "Neutral", "8Ball", "Other"]; 
 text_Answers = [];
 bool_answerType:boolean = false;
 bool_answer:boolean = false;
 bool_answerOther:boolean = false;
 selectedDevice:string = "-1";
 bool_fileType = false;

 uploadedFileDetail = {'base64Code':""};
 link_url:string = "";

 answer_type:string = "";
 answerValue:string = "";
 otherTextAnswer:string = ""; 
 finalAnswer:boolean = false;

 selectedItem:string = "1";
 showSuccess= false;
 showError= false;
 message:string = "";
 uploader:FileUploader = new FileUploader({
  url:PathConfig.UPDATE_SH8KE_GLOBAL_ANSWER_UPLOADED_ITEM
});
recieved_url = "";
question_id:string = ""; 

  constructor(private router:Router, private http:HttpService, private activeRoute:ActivatedRoute, private broadcaster:Broadcaster) { }
  ngAfterViewInit(){
    
    
    
  }
  ngOnInit(){
    this.bool_answer = false;
    this.bool_answerType = false;
    this.bool_answerOther = false;
    this.bool_fileType = false;
    
    this.uploader.onBuildItemForm = (item, form) => {
      //form.append('key1', 'S');
      //form.append('key2', 'K');
      //let postData = {};
      let checkBoxFinalAnswer:string;
      checkBoxFinalAnswer = this.finalAnswer?"1":"0";
     // alert(this.selectedDevice);
     if(this.answerValue == ""){
      this.answerValue = this.otherTextAnswer;
     }
      form.append("type", this.selectedDevice);
      form.append("anstype" , this.answer_type);
      form.append("ans" ,this.otherTextAnswer);
      form.append("getans", this.answerValue);
      form.append("qid" , this.question_id);
      form.append("url_link",this.link_url);
      form.append("finalans", checkBoxFinalAnswer);
      form.append("id" , this.activeRoute.snapshot.params['id']);
      form.append("old_url" , this.recieved_url);
      console.log(this.selectedDevice, "    ",this.answer_type,"    ", this.otherTextAnswer, "    ",this.answerValue, "    ",this.question_id,"    ", this.link_url, "    ",checkBoxFinalAnswer ,"    ", this.activeRoute.snapshot.params['id'], "    ", this.recieved_url);
    };

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
      this.getEditableAnswer(this.activeRoute.snapshot.params['id']);
      //this.getEditableAnswer("1");
  }
  getEditableAnswer(id:string){
   
    this.http.get(PathConfig.GET_EDITABLE_GLOBAL_ANSWER+id).subscribe((response)=>{
      this.broadcaster.broadcast("SHOW_LOADER",false);
      if(response.Status == "Success"){
        console.log(response);
        
        this.selectedDevice = response.data['type'];
        this.otherTextAnswer = response.data['text_english'];
        this.recieved_url = response.data['url'];
        this.question_id = response.data['question_id'];  
        if(this.selectedDevice == "0"){
          this.answer_type = "Other";
        }
        this.setOnAnswerLoad(this.selectedDevice, 'mainType');
        
        
      }      
    }, err=>{

    })
  }
  valueChange(event, type){     
    if(type== 'mainType'){
      setTimeout(function(){
        this.selectedItem = event;
      },1000);
      
      this.selectedDevice = event;
      this.answer_type = "";
      this.otherTextAnswer = "";
      this.answerValue = "";
      $("#avatar").val("");
      this.uploadedFileDetail['base64Code'] = ""; 
          if(event == "0"){
            this.selectedDevice = "0";
          }else if(event == "Image"){
            this.selectedDevice = "1";
          }else if(event == "Audio"){
            this.selectedDevice = "2";
          }else if(event == "Video"){
            this.selectedDevice = "3";
          }
          console.log(event + " EVENT");
          setTimeout(()=>{
            if(event == "1"){
              $("#avatar").attr("accept", "image/*") ;
            }else if(event == "2"){
              $("#avatar").attr("accept", "audio/*") ;
            }else if(event == "3"){
              $("#avatar").attr("accept", "video/*") ;
            }
          }, 100);
      //this.selectedDevice = event;
        console.log(this.selectedDevice);
        if(event == "0"){
          this.bool_answerType = true;
          this.bool_fileType = false;
          this.bool_answerOther = false;
        }else{
          this.bool_answer = true;
          this.bool_answerType = false;
          this.bool_answerOther = false;
          this.bool_fileType = true;
          //let x= event;
          this.http.post(PathConfig.GET_GLOBAL_ANSWERS_LIST, {"get_option":"Positive"}).subscribe((response)=>{            
            this.text_Answers = response.data;
            console.log(this.text_Answers);
          }, err=>{
          });
  
          if(event == "1"){
            $("#avatar").attr("accept", "image/*") ;
          }else if(event == "2"){
            $("#avatar").attr("accept", "audio/*") ;
          }else if(event == "3"){
            $("#avatar").attr("accept", "video/*") ;
          }
        }
      }else if(type == 'answerType'){
        this.answer_type = event;
        console.log(event);
        if(event != '-1' && event !='Other'){
          this.bool_answer = true;
          this.bool_answerOther = false;
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
      this.http.get(PathConfig.GET_GLOBAL_SH8KE_ANSWER+id)
        .subscribe((response)=> {
            this.globalsh8keAnswer =  response.data;
            console.log(this.globalsh8keAnswer);
          },
          err => {
          }
        );
    }
  
  setOnAnswerLoad(event, type){
      if(type== 'mainType'){
        setTimeout(function(){
          
        },1000);        
        this.selectedItem = "1";
        this.selectedDevice = event;
        
        this.uploadedFileDetail['base64Code'] = ""; 
          if(event == "0"){
            this.bool_answerType = true;
            this.bool_fileType = false;
            this.bool_answer = false;
            this.answerValue = "";
            this.bool_answerOther = true;
            //this.selectedDevice = event;
          }else{
            this.bool_answer = false;
            this.bool_answerType = false;
            this.bool_answerOther = false;
            this.bool_fileType = true;
            this.bool_answerOther = true;
            //let x= event;
            this.http.post(PathConfig.GET_GLOBAL_ANSWERS_LIST, {"get_option":"Positive"}).subscribe((response)=>{            
              this.text_Answers = response.data;
              console.log(this.text_Answers);
            }, err=>{
            });
            
            if(event == "1"){
              $("#avatar").attr("accept", "image/*") ;
            }else if(event == "Audio"){
              $("#avatar").attr("accept", "audio/*") ;
            }else if(event == "Video"){
              $("#avatar").attr("accept", "video/*") ;
            }
          }
        }else if(type == 'answerType'){
          this.answer_type = event;
          console.log(event);
          if(event != '-1' && event !='Other'){
            this.bool_answer = true;
            this.bool_answerOther = false;
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
    submitAnswer(){
      this.broadcaster.broadcast("SHOW_LOADER",true);
    if($("input[type =file]").val() != ""  && $("input[type =file]").val() != undefined ){
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
        this.bool_answer = false;
        this.bool_answerType = false;
        this.bool_answerOther = false;
        this.bool_fileType = false;
        this.selectedItem = "-1";
        $("#avatar").val("");
        };
    }else{
  
     let postData = {};
     let checkBoxFinalAnswer:string;
     checkBoxFinalAnswer = this.finalAnswer?"1":"0";
     console.log(checkBoxFinalAnswer );
     postData["type"] = this.selectedDevice;
     postData["anstype"] = this.answer_type;
     postData["ans"] = this.otherTextAnswer;
     postData["getans"]= this.answerValue;
     postData["qid"]= this.question_id;
     postData["url_link"]=this.link_url;
     postData["finalans"]= checkBoxFinalAnswer;
     postData['id'] = this.activeRoute.snapshot.params['id']; 
     console.log(postData);
  
     this.http.post(PathConfig.UPDATE_SH8KE_GLOBAL_ANSWER_TEXT, postData).subscribe((response)=>{
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
      this.bool_answer = false;
      this.bool_answerType = false;
      this.bool_answerOther = false;
      this.bool_fileType = false;
      this.selectedItem = "-1";
     }, err=>{
       
       })
      }   
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
  cancelBtnHandler(){
    this.navigateTo('/sh8ke/globalAnswer/'+GlobalVariableConfig.ANSWER_ID+"/"+GlobalVariableConfig.QUESTION_ID);
    GlobalVariableConfig.ANSWER_ID = "";
    GlobalVariableConfig.QUESTION_ID = "";
  }
  navigateTo(url:string){
    this.router.navigate([url]);
  }


}
