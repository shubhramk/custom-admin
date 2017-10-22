import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from "../../../common/services/http.service";
import {PathConfig} from "../../../common/config/path.config";
@Component({
  styleUrls: ['./admin.component.scss'],
  templateUrl: './admin.component.html'
})
export class AdminUserComponent implements OnInit {
  visibleElement:boolean = false;
  adminUserList = [];
  dtConfigAdminUser:object = {};
  constructor(private router:Router, private http:HttpService) {}
ngOnInit(){
     //general data table
      this.dtConfigAdminUser =  {
        "columnDefs": [
          {
            "targets": 0,
            "orderable": false,
          },
          {
            "targets": 5,
            "width": "10%",
            "orderable": false,
            "className": "noPadding",
            "render": function (data, type, full, meta) {
              var template = '';

              let val = data;
              template = '<div class="dt-menu-icons">' +
                '<a href="javascript:void(0);" data-name="edit" data-custom="' + val + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
                '<a href="javascript:void(0);" data-name="delete" data-custom="' + val + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
                '</div>';

              return template;
            }
          },
          {
            "targets": 0,
            "width": "10%",
            "orderable": false,
            "className": "noPadding",
            "render": function (data, type, full, meta) {
              var template = '';

              let val = data;
              template = '<a href="javascript:void(0);" data-name="name" data-custom="' + full['rowId'] + '" data-creator="' + data + '">'+val+'</a>';

              return template;
            }
          },{
            "targets": 4,
            "width": "10%",
            "orderable": false,
            "className": "noPadding",
            "render": function (data, type, full, meta) {
              var template = '';

              let val = data;
              template = '<div class="dt-menu-icons">' +
                '<span class="fa fa-thumbs-o-up" aria-hidden="true" *ngIf="'+val+'">'+'</span>' +
                '</div>';

              return template;
            }
          }

        ],
        "columns": [
          { "title": 'Name', "data": "name" },
          { "title": 'Username', "data": "username" },
          { "title": 'Email', "data": "email" },
          { "title": 'User Type', "data": "user_type" },
          { "title": 'isActive', "data": "isActive" }
        ]
      }
      //get top global shakes
      this.getAdminUsers();
  }      //on Menu Icon selected
  onMenuSelect(data: any) {
    if (data['clickedOn'] == 'edit') {
      let customData = data['value'];
      this.navigateTo('users/edit-admin');
    }else if(data['clickedOn'] == 'name'){
      this.navigateTo('user/globalCreator/'+data['value']+"/"+data['creatorName']);
    }
  }
//get top20 globalShakes
  getAdminUsers(){
    
    this.http.get(PathConfig.GET_ADMIN_USER)
      .subscribe((response)=> {
          this.adminUserList =  response.data;
          console.log(this.adminUserList);
        },
        err => {
        }
      );
  }
  //navigate to page
  navigateTo(url:string){
    this.router.navigate([url]);
  }
}
