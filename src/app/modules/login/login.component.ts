import {Component} from '@angular/core';
import {Router} from "@angular/router";
@Component({
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(
    private router:Router
  ) {}

  //login
  doLogin(){
    this.router.navigate(["home"]);
  }
}
