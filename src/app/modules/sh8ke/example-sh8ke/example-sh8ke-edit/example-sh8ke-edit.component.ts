import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-example-sh8ke-edit',
  templateUrl: './example-sh8ke-edit.component.html',
  styleUrls: ['./example-sh8ke-edit.component.css']
})
export class ExampleSh8keEditComponent implements OnInit {
categoryItems = ["Daily", "Shakedown", "Private", "Share", "Explode", "Socialize", "Password", "Adult Material"];
  constructor(private router:Router) { }

  ngOnInit() {
  }
   //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
