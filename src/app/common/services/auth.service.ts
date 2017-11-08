import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {LocalStorageService} from "./local-storage.service";
import {ConstantConfig} from "../config/constant.config";
import 'rxjs/add/operator/toPromise';
import {Router} from "@angular/router";



@Injectable()
export class AuthService {
     constructor ( private http:Http , private localStorage:LocalStorageService ,  private router:Router) {}

    //Auth REQUEST
    login(url,obj: Object): Promise<any>{
      let body = JSON.stringify(obj); // Stringify payload
      let options = new RequestOptions({headers: this.getHeaders()}); // Create a request option

      return this.http
        .post(url, body, options)
        .toPromise()
        .then((res) =>{
          return ({'response':res.json(),'token':res.headers.get("access-token")});
        })
        .catch((error) =>{
          return Promise.reject(error.json() || error.json().error || 'Server error')
        });
    }

    //Log Out
    logout(){
      this.localStorage.remove(ConstantConfig.AUTH_TOKEN);
      this.router.navigate(['/login']);
    }

    //set Auth Headers
    getHeaders():Headers{
      let headers = new Headers(); //Set content type to JSON
      headers.append('Content-Type','application/json' );
      return headers;
    }

    //check login status
   isLoggedIn():boolean{
       var data = this.localStorage.get(ConstantConfig.AUTH_TOKEN);
       return data ? true : false ;
   }
}
