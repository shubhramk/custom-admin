import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";

@Component({
  selector: 'app-genral-sh8ke-edit',
  templateUrl: './genral-sh8ke-edit.component.html',
  styleUrls: ['./genral-sh8ke-edit.component.css']
})
export class GenralSh8keEditComponent implements OnInit {

  categoryItems = [];
  options = ["Daily", "Shakedown", "Private", "Share", "Explode", "Socialize", "Password", "Adult Material"];
  generalSh8keEditableData  = [];
  titleName:string = "";
  constructor(private router:Router, private activateRoute:ActivatedRoute, private http:HttpService) { }

  ngOnInit() {
    this.titleName = this.activateRoute.snapshot.params['name'];
    this.getGeneralSh8keEditableData(this.activateRoute.snapshot.params['id']);
  }
  //get Data from server
  getGeneralSh8keEditableData(id:string){
    this.http.get(PathConfig.GET_GENERAL_SH8KE_EDITABLE_DATA+id)
      .subscribe((response)=> {
        this.generalSh8keEditableData = response.data;
        this.categoryItems = (this.generalSh8keEditableData['Category']);
      },
      err => {
          // Log errors if any
      }
    );
  }
  saveGeneralSh8keEditableData(){
    this.http.post(PathConfig.POST_GENERAL_SH8KE_EDITABLE_DATA, {
        "title": "hi all",
        "category_id": 3,
        "id": this.activateRoute.snapshot.params['id'],
        "admin_id": 1,
        "daily": "",
        "Private": "",
        "Explode": "",
        "pass": "",
        "Shakedown": "1",
        "Share": "1",
        "Socialize": "1",
        "Adult": "1"
      })
      .subscribe((response)=> {
        console.log(response);
        this.getGeneralSh8keEditableData(this.activateRoute.snapshot.params['id']);
      },
      err => {
          // Log errors if any
      }
    );
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
}
