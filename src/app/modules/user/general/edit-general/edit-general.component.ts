import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-edit-general',
  templateUrl: './edit-general.component.html',
  styleUrls: ['./edit-general.component.css']
})
export class EditGeneralComponent implements OnInit {

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
