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
                '<a href="javascript:void(0);" data-name="edit" data-custom="' + full['rowId'] + '"><span class="fa fa-pencil" aria-hidden="true"></span></a>' +
                '<a href="javascript:void(0);" data-name="delete" data-custom="' + full['rowId'] + '"><span class="fa fa-trash-o" aria-hidden="true"></span></a>' +
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
              if(full['isActive'] == '1'){
                template = '<div class="dt-menu-icons">' +
                '<a href="javascript:void(0);" data-name="status" data-custom="' + full['rowId']  + '"data-creator="' + full['isActive'] + '"><span class="fa fa-check-circle" aria-hidden="true">'+'</span></a>' +
                '</div>';
              }else{
                template = '<div class="dt-menu-icons">' +
                '<a href="javascript:void(0);" data-name="status" data-custom="' + full['rowId']  + '"data-creator="' + full['isActive'] + '"><span class="fa fa-times-circle" aria-hidden="true">'+'</span></a>' +
                '</div>';
              }

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
      
      this.navigateTo('users/edit-admin/'+data['value']);
    }else if(data['clickedOn'] == 'name'){
      this.navigateTo('user/globalCreator/'+data['value']+"/"+data['creatorName']);
    }else if(data['clickedOn'] == 'delete'){
      this.deleteAdminUser(data['value']);
    } else if(data['clickedOn'] == 'status'){
      this.chnageStatus(data['value'], data['creatorName']);
    }    
  }

  chnageStatus(id:string, status){
    let confirmElem  = confirm('sure to change status for this news?');
    
    if(confirmElem== true){
      if(status == "0"){

        status ="1";
      }else{
        status = "0";
      }
      console.log(status);
      //alert(status);
      this.http.post(PathConfig.UPDATE_ADMIN_USER_ISACTIVE, {st:status, id:id}).subscribe((response)=>{
      console.log(response);
      this.getAdminUsers();
    }, err=>{

    });
    }
  } 
//get top20 globalShakes
deleteAdminUser(id){
  let confirmElem = confirm("Are you sure to delete!");
  if (confirmElem == true){
    this.http.get(PathConfig.DELETE_ADMIN_USER+id).subscribe((response)=>{
      if(response.Status == "Success"){
        this.getAdminUsers();
      }
    },
  err=>{

  })
  }  
}
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
