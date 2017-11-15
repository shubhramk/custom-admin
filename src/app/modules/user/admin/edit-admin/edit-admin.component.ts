import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";
import {Broadcaster} from "../../../../common/services/broadcaster.service";

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  name:string = "";
  email:string = "";
  user_Name:string = "";
  password:string = "";
  imageUrl:string = "";
  user_type:string = "";
  getUserId:string = "";
  showSuccess:boolean = false;
  showError:boolean = false;
  message:string = "";
  constructor(private router:Router, private http:HttpService, private activatedRouteL:ActivatedRoute, private broadcaster:Broadcaster) { }

  ngOnInit() {
    
    console.log(this.activatedRouteL.snapshot.params["id"]);
    this.getAdminUserDetail();
  }
  getAdminUserDetail(){
    this.http.get(PathConfig.GET_ADMIN_USER_EDITABLE_DATA+this.activatedRouteL.snapshot.params["id"]).subscribe((response)=>{
      this.broadcaster.broadcast("SHOW_LOADER",false)
      this.name = response.data['name'];
      this.email = response.data['email'];
      this.getUserId = response.data['id']
      this.user_Name = response.data['username'];
      console.log(this.user_Name);
      //this.imageUrl = response.data['profile_image'];
      this.user_type = response.data['user_type'];
    },err=>{

    })
  }
  saveUpdatedAdminUser(){
    let postData = {};
    postData["id"] = this.getUserId;
    postData["name"] = this.name;
    postData["user_type"]  = this.user_type;
    postData["mail_id"] = this.email;
    postData["password"] = this.password ? "" : this.password;
    postData["username"] = this.user_Name;
    console.log(postData);
    this.broadcaster.broadcast("SHOW_LOADER",true);
    this.http.post(PathConfig.UPDATE_ADMIN_USER_ADMIN, postData).subscribe((response)=>{
      console.log(response);
      this.broadcaster.broadcast("SHOW_LOADER",false)
      if(response.Status == "Success"){
        this.message = " Record Updated Successfully"
        this.showError = false;
        this.showSuccess = true;
      }else{
        this.message = response.data['ErrorMessage'];
        this.showError = true;
        this.showSuccess = false;
      }
    }, err=>{

    });
  }
   //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
  updatedUserType(event){
    this.user_type = event;
  }
}
