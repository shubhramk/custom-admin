import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import { FileUploader } from 'ng2-file-upload';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Broadcaster} from "../../../../common/services/broadcaster.service";

declare var $:any;
@Component({
  selector: 'app-edit-general',
  templateUrl: './edit-general.component.html',
  styleUrls: ['./edit-general.component.css']
})
export class EditGeneralComponent implements OnInit {
  preferencesItems = [{name:"Arty", selected:false, disabled:false }, {name:"Girly",selected:false, disabled:false }, {name:"Nerdy",selected:false, disabled:false }, {name:"Craftsman",selected:false, disabled:false }, {name:"Hip-ster",selected:false, disabled:false }, {name:"Old School",selected:false, disabled:false }, {name:"Dapper",selected:false, disabled:false }, {name:"Jock",selected:false, disabled:false}, {name:"Quiet",selected:false, disabled:false}, {name:"Extreme",selected:false, disabled:false}, {name:"Loud",selected:false, disabled:false}, {name:"Romantic",selected:false, disabled:false},
  {name:"Funny",selected:false, disabled:false}, {name:"Manly",selected:false, disabled:false}, {name:"Sassy",selected:false, disabled:false}, {name:"Ditzy",selected:false, disabled:false}, {name:"Social",selected:false, disabled:false}, {name:"Techie",selected:false, disabled:false}];
  
  arr_gender = ["Male", "Female"];
  arr_status = ["Single", "Married", "Divorced", "Open"];

  fName:string = "";
  surName:string = "";
  phoneNo:number;
  email:string = "";
  userName_general:string = "";
  password:string = "";
  selectedGender:string = "";
  selectStatus:string = "";
  selectIntrest:string = "";
  selectedDate:string = "";
  selectedMonth:string = "";
  selectedYear:string = "";
  showSuccess:boolean = false;
  showError:boolean = false;
  message:string = "";
  imageUrl:string="";
  userId = "";
  self = this;
  selectedPrefrence = [];
  form: FormGroup;
  userForm: any;
  uploader:FileUploader = new FileUploader({
    url:PathConfig.UPDATE_GENERAL_USER_WITH_IMAGE
  });

  
  constructor(private router:Router, private broadcaster:Broadcaster, private http:HttpService, private activatedRouteL:ActivatedRoute, private formBuilder: FormBuilder) { 

    
  }

  ngOnInit() {
    var self = this;
    let selectedPrefrences = [];
    this.uploader.onBuildItemForm = (item, form) => {
      selectedPrefrences = [];
      form.append("id", this.userId);
      form.append("name", this.fName);
      form.append("surname" ,this.surName);
      form.append("username" ,this.userName_general);
      form.append('password', this.password);

      form.append("mail_id", this.email);
      form.append("mobile_no" ,this.phoneNo);
      form.append('gender', this.selectedGender);

      form.append("birth_month", this.selectedMonth);
      form.append("birth_year" ,this.selectedYear);
      form.append("birth_day" ,this.selectedDate);
      form.append('intrested_gender', this.selectIntrest);

      form.append("status" ,this.selectStatus);
      this.preferencesItems.forEach((val,key)=>{
        if(val.selected == true){
          
          selectedPrefrences.push(val.name);
        }
      });
      form.append("prefrence" , selectedPrefrences);
    };

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };

    setTimeout(()=>{
       $('#datepicker-autoclose').datepicker({
        todayHighlight: true 
     }).on('changeDate', function(e) {
      
      let date = new Date(e.date);
      
      self.selectedDate = String(date.getDate());
      self.selectedMonth = String(date.getMonth());
      self.selectedYear = String(date.getFullYear());
      
    });
      },200);
      this.getAdminUserDetail();
  }

  getAdminUserDetail(){
    this.http.get(PathConfig.GET_GENERAL_USER_EDITABLE_DATA+this.activatedRouteL.snapshot.params["id"]).subscribe((response)=>{
      console.log(response);
      this.broadcaster.broadcast("SHOW_LOADER",false);
      this.fName = response.data["name"];
      this.surName = response.data["surname"]
      this.userName_general  = response.data["username"] ;
      this.password = response.data["password"] ;
      this.email = response.data["mail_id"];
      this.phoneNo = response.data["mobile_no"] 
      this.selectedGender  = response.data["gender"] ;
      this.selectedMonth = response.data["birth_month"];
      this.selectedYear = response.data["birth_year"] ;
      this.selectedDate = response.data["birth_day"];
      this.selectIntrest = response.data["intrested_gender"];
      this.selectStatus = response.data["status"];
      this.userId = response.data['id'];
      this.selectedPrefrence = response.data['preference'].split(",");

      this.preferencesItems.forEach((val,key)=>{
        this.selectedPrefrence.forEach((v,k)=>{
          if(v == val.name){
            val.selected = true;
            this.updateCheckedOptions("", true);
          }
        });
      });

      /* this.preferencesItems  =response.data['prefrece'] */
      $("#datepicker-autoclose").datepicker("update", new Date(Number(this.selectedYear),Number(this.selectedMonth),Number(this.selectedDate )));
    },err=>{

    });
  }

  
  addGeneralUserWithoutImage(){
    console.log(this.selectedYear);
    let postData = {};
    let selectedPrefrences = [];
    postData["name"] = this.fName;
    postData["surname"] = this.surName
    postData["username"] = this.userName_general;
    postData["password"] = this.password;
    postData["mail_id"] = this.email;
    postData["mobile_no"] = this.phoneNo
    postData["gender"] = this.selectedGender;
    postData["birth_month"] = this.selectedMonth;
    postData["birth_year"] = this.selectedYear;
    postData["birth_day"] = this.selectedDate;
    postData["intrested_gender"] = this.selectIntrest;
    postData["status"] = this.selectStatus;
    postData['id'] = this.userId;
    this.preferencesItems.forEach((val,key)=>{
      if(val.selected == true){
        selectedPrefrences.push(val.name);
      }
    });
    postData['preference'] = selectedPrefrences;
    console.log(postData);

   this.http.post(PathConfig.UPDATE_GENERAL_USER, postData).subscribe((response)=>{
      console.log(response.SucessMessage, "    ", response.ErrorMessage);
      if(response.Status == "Success"){        
        this.message = response.SucessMessage;
        this.showError = false;
        this.showSuccess = true;
        window.scrollTo(0, 0);
        //this.getGeneralUsersList();
      }else if(response.Status == "Error"){
        this.message = response.ErrorMessage;
        this.showError = true;
        this.showSuccess = false;
        window.scrollTo(0, 0);
      }
    },
    err=>{

    })

  }
  addGeneralUsreWithImage(){
    this.uploader.cancelAll();
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      var responsePath = JSON.parse(response);
      console.log(responsePath.Status);
      if(responsePath.Status == "Success"){
        this.showSuccess= true;
        this.showError= false;
        this.message = responsePath.SucessMessage;
        
        //this.getGeneralUsersList();
       // this.getGlobalAnswerList(this.activeRoute.snapshot.params['id']);
       }else if(responsePath.Status == "Error"){
        this.showSuccess= true;
        this.showError= false;
        this.message = responsePath.ErrorMessage;
       }
       $("#avatar").val("");
    }
  }
  
  submitEditableData(){
    this.broadcaster.broadcast("SHOW_LOADER",true)
    let postData = {};
   // postData[]
   if($("input[type =file]").val() == ""){  
    this.addGeneralUserWithoutImage();  
    this.broadcaster.broadcast("SHOW_LOADER",false)  
    }else{
      this.addGeneralUsreWithImage();
      this.broadcaster.broadcast("SHOW_LOADER",false)
    }
   
  }
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  
  counter = 0;
  updateCheckedOptions(data,event){
    if(event == true){
      this.counter++;
    }else{
      this.counter --;
    }
    if(this.counter == 3){
      this.preferencesItems.forEach((val, key) => {
        if(val.selected == false){
          val.disabled = true;
        } 
      });
    }else{
      this.preferencesItems.forEach((val, key) => {
        //if(val.selected == false){
          val.disabled = false;
        //} 
      });
    }

  }
}
