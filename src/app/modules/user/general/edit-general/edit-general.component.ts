import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import { FileUploader } from 'ng2-file-upload';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  userName:string = "";
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
  self = this;
  selectedPrefrence = [];
  form: FormGroup;
  userForm: any;
  uploader:FileUploader = new FileUploader({
    url:PathConfig.ADD_NEW_CATEGORY_UPLOADED_ITEM
  });

  
  constructor(private router:Router, private http:HttpService, private activatedRouteL:ActivatedRoute, private formBuilder: FormBuilder) { 

    
  }

  ngOnInit() {
    var self = this;

    /* this.uploader.onBuildItemForm = (item, form) => {
      form.append("title_english", this.englishName);
      form.append("title_french" ,this.frenchName);
      form.append("order" ,this.sorting);
    }; */


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
      this.fName = response.data["name"];
      this.surName = response.data["surname"]
      this.userName  = response.data["username"] ;
      this.password = response.data["password"] ;
      this.email = response.data["mail_id"];
      this.phoneNo = response.data["mobile_no"] 
      this.selectedGender  = response.data["gender"] ;
      this.selectedMonth = response.data["birth_month"];
      this.selectedYear = response.data["birth_year"] ;
      this.selectedDate = response.data["birth_day"];
      this.selectIntrest = response.data["intrested_gender"];
      this.selectStatus = response.data["status"];
      
      this.selectedPrefrence = ['Dapper', 'Girly'];

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

  submitEditableData(){
    let postData = {};
   // postData[]
    if($("input[type =file]").val() == ""){
      this.fName = postData["name"];
      this.surName = postData["surname"];
      this.userName  = postData["username"] ;
      this.password = postData["password"] ;
      this.email = postData["mail_id"];
      this.phoneNo = postData["mobile_no"] ;
      this.selectedGender  = postData["gender"] ;
      this.selectedMonth = postData["birth_month"];
      this.selectedYear = postData["birth_year"] ;
      this.selectedDate = postData["birth_day"];
      this.selectIntrest = postData["intrested_gender"];
      this.selectStatus = postData["status"];
    }else{

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
