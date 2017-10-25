import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../../common/services/http.service";
import {PathConfig} from "../../../../common/config/path.config";

@Component({
  selector: 'app-global-sh8ke-edit',
  templateUrl: './global-sh8ke-edit.component.html',
  styleUrls: ['./global-sh8ke-edit.component.css']
})
export class GlobalSh8keEditComponent implements OnInit {
categoryItems = [];
  options = ["Daily", "Shakedown", "Private", "Share", "Explode", "Socialize", "Password", "Adult Material"];
  generalSh8keEditableData  = [];
  titleName:string = "";
  constructor(private router:Router, private activateRoute:ActivatedRoute, private http:HttpService) { }

  ngOnInit() {
    this.titleName = this.activateRoute.snapshot.params['name'];
    this.getGlobalSh8keEditableData(this.activateRoute.snapshot.params['id']);
  }
  getGlobalSh8keEditableData(id:string){
    this.http.get(PathConfig.GET_GLOBAL_SH8KE_EDITABLE_DATA+id)
      .subscribe((response)=> {
        this.generalSh8keEditableData = response.data;
        this.categoryItems = (this.generalSh8keEditableData['Category']);
      },
      err => {
          // Log errors if any
      }
    );
  }
  saveGlobalSh8keEditableData(){
    this.http.post(PathConfig.POST_GLOBAL_SH8KE_EDITABLE_DATA, {
        "title": "Daily Art",
        "category_id": 24,
        "id": 12,
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
        this.getGlobalSh8keEditableData(this.activateRoute.snapshot.params['id']);
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
