import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
declare var $:any
@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    setTimeout(()=>{
       $('#datepicker-autoclose').datepicker({
        autoclose: true,
        todayHighlight: true 
     });
      },200)
  }
     //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
}
