import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }

}
