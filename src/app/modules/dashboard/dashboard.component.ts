import {Component} from '@angular/core';
import {Router} from "@angular/router";
@Component({
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  constructor(
    private router:Router
  ) {}

  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
}
