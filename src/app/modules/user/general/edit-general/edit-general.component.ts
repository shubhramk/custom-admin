import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";

declare var $:any;
@Component({
  selector: 'app-edit-general',
  templateUrl: './edit-general.component.html',
  styleUrls: ['./edit-general.component.css']
})
export class EditGeneralComponent implements OnInit {
  preferencesItems = ["Arty", "Girly", "Nerdy", "Craftsman", "Hip-ster", "Old School", "Dapper", "Jock", "Quiet", "Extreme", "Loud", "Romantic",
  "Funny", "Manly", "Sassy", "Ditzy", "Social", "Techie"];
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
  

  constructor(private router:Router, private http:HttpService, private activatedRouteL:ActivatedRoute) { }

  ngOnInit() {
    var self = this;
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
      $("#datepicker-autoclose").datepicker("update", new Date(Number(this.selectedYear),Number(this.selectedMonth),Number(this.selectedDate )));
    },err=>{

    });
  }

  submitEditableData(){

  }
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  updateCheckedOptions(data, type){
    
  }
}
