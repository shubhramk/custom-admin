import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-global-sh8ke-edit',
  templateUrl: './global-sh8ke-edit.component.html',
  styleUrls: ['./global-sh8ke-edit.component.css']
})
export class GlobalSh8keEditComponent implements OnInit {
categoryItems = ["Daily", "Shakedown", "Private", "Share", "Explode", "Socialize", "Password", "Adult Material"];
  constructor(private router:Router) { }

  ngOnInit() {
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
