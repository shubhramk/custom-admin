import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService , private router: Router,) {}
  canActivate() {
    let isLoggedIn = this.authService.isLoggedIn();
    if(isLoggedIn){
      this.router.navigate(['/home']);
      return false;
    }else{
      //this.router.navigate(['/login']);
      return true;
    }

  }

  canActivateChild() {
    let isLoggedIn = this.authService.isLoggedIn();
    if(isLoggedIn){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}
