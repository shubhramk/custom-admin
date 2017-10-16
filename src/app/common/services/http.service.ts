
import {Injectable, Inject}     from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {LocalStorageService} from "./local-storage.service";
import {ConstantConfig} from "../config/constant.config";

@Injectable()
export class HttpService {
  // Resolve HTTP using the constructor
  constructor (private http: Http,@Inject(LocalStorageService)private localStorage:LocalStorageService) {}

  // GET REQUEST
  get(url) : Observable<any>{

    let options = new RequestOptions({ headers: this.getAuthHeaders()}); // Create a request option

    //using get request
    return this.http.get(url,options)
    // and calling .json() on the response to return data
      .map((res:Response) => res.json())
      // errors if any
      .catch((error:any) => Observable.throw(error.json() || error.json().error ||'Server error'));

  }

  //POST REQUEST
  post(url,obj: Object): Observable<any> {

    let body    = JSON.stringify(obj); // Stringify payload
    let options = new RequestOptions({ headers: this.getAuthHeaders() }); // Create a request option

    //using post request
    return this.http.post(url, body, options) //using post request
      .map((res:Response) => res.json()) //and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json() || error.json().error || 'Server error')); //errors if any
  }


  //POST REQUEST for file upload
  postFileUpload(url,obj: Object , type:string): Observable<any> {

    let body    = obj; // Stringify payload
    let options = new RequestOptions({ headers: this.getAuthHeadersFileUpload() }); // Create a request option

    if(type == 'JSON'){
       body    = JSON.stringify(obj); // Stringify payload
       options = new RequestOptions({ headers: this.getAuthHeaders() }); // Create a request option
    }
    //using post request
    return this.http.post(url, body, options) //using post request
      .map((res:Response) => res.json()) //and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json() || error.json().error || 'Server error')); //errors if any
  }

  //PUT Request
  put(url,obj: Object): Observable<any> {

    let body    = JSON.stringify(obj); //Stringify payload
    let options = new RequestOptions({ headers: this.getAuthHeaders() }); // Create a request option

    //using put request
    return this.http.put(url, body, options) //using put request
      .map((res:Response) => res.json()) //and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json() || error.json().error || 'Server error')); //errors if any
  }

  // DELETE Request
  delete (url,id:string): Observable<any> {
    let options = new RequestOptions({ headers: this.getAuthHeaders() }); // Create a request option

    return this.http.delete(`${url}/${id}`,options) //using delete request
      .map((res:Response) => res.json()) // and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json() || error.json().error || 'Server error')); //errors if any
  }

  //set headers
  getAuthHeaders():Headers{
    let headers = new Headers(); //set content type to JSON
    headers.append('Content-Type','application/json' );
   // headers.append('Authorization',  this.localStorage.get(ConstantConfig.AUTH_TOKEN));
    return headers;
  }
  //set headers
  getAuthHeadersFileUpload():Headers{
    let headers = new Headers(); //set content type to JSON
    headers.append('Authorization',  this.localStorage.get(ConstantConfig.AUTH_TOKEN));
    return headers;
  }
}
