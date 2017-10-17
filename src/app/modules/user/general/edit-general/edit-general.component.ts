import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-edit-general',
  templateUrl: './edit-general.component.html',
  styleUrls: ['./edit-general.component.css']
})
export class EditGeneralComponent implements OnInit {
  preferencesItems = ["Arty", "Girly", "Nerdy", "Craftsman", "Hip-ster", "Old School", "Dapper", "Jock", "Quiet", "Extreme", "Loud", "Romantic",
  "Funny", "Manly", "Sassy", "Ditzy", "Social", "Techie"];
  constructor(private router:Router) { }

  ngOnInit() {
    setTimeout(()=>{
       $('#datepicker-autoclose').datepicker({
        todayHighlight: true 
     });
      },200)
  }
  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
