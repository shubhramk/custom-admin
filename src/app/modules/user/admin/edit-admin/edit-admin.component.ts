import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
   //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
}
