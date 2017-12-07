import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../common/services/auth.service";
import {LocalStorageService} from "../../common/services/local-storage.service";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {PathConfig} from "../../common/config/path.config";
import {ConstantConfig} from "../../common/config/constant.config";
import {GlobalVariableConfig} from "../../common/config/globalVariable.config";
@Component({
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  loginItem:FormGroup;
  message:string = '';
  constructor(
    private router:Router,
    private authService:AuthService,
    private localStorage: LocalStorageService,
  ) {}

  ngOnInit() {
    //Form Validation
    this.loginItem = new FormGroup({
      email: new FormControl({value: '', disabled: false}, [Validators.required]),
      userPwd:new FormControl({value: '', disabled: false}, [Validators.required]),
    });


  }

  //on Form Submit
  onSubmit({ value, valid }: { value: any, valid: boolean }) {


    //dummy call
    //this.localStorage.set(ConstantConfig.AUTH_TOKEN,'rtfghuuhhgfd4545cvv' );
    //this.router.navigate(['/home']);

    if(!value['email']){
      this.message = "Please provide username.";
      return false;
    }else if(!value['userPwd']){
      this.message = "Please provide password.";
      return false;
    }

    if(valid){
      this.message = '';
      this.authService.login(PathConfig.LOGIN_AUTH , {'username':value['email'],'password':value['userPwd']})
        .then(response => {
          console.log(response);
          let data = response['data'];
          let code = response['MessageCode'];
         
          
          if(code == "400"){
            this.loginItem.reset();
            this.message = response['ErrorMessage'];
            this.message = this.message.split(";")[0];
            return true;
          }

          let accessToken = data['token'];
          let profile_image = data['profile_image'];
          let name = data['name'];
          let userId = data['id'];
          if(accessToken){
            this.localStorage.set(ConstantConfig.AUTH_TOKEN,accessToken );
           // this.localStorage.set(ConstantConfig.AUTH_TOKEN,userId );
            this.localStorage.set(ConstantConfig.USER_DETAIL,JSON.stringify(
              {
              "name":name ,
              "img":profile_image,
              "userId":userId
              }
            ));
            this.router.navigate(['/home']);
          }
        })
        .catch(err =>{
          //log error if any
          console.log('login error')
        });
    }
  }
}
