import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../common/services/auth.service";
import {LocalStorageService} from "../../common/services/local-storage.service";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {PathConfig} from "../../common/config/path.config";
import {ConstantConfig} from "../../common/config/constant.config";
@Component({
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  loginItem:FormGroup;
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
    console.log(value);

    //dummy call
    this.localStorage.set(ConstantConfig.AUTH_TOKEN,'rtfghuuhhgfd4545cvv' );
    this.router.navigate(['/home']);


    /*
    if(valid){

      this.authService.login(PathConfig.LOGIN_AUTH , {'email':value['email'],'password':value['userPwd'],'status':1})
        .then(data => {
          let response = data['response']['payload'];
          let accessToken = data['token'];
          if(response) {


          }
          if(accessToken){
            this.localStorage.set(ConstantConfig.AUTH_TOKEN,accessToken );
            this.router.navigate(['dashboard/home']);
          }
        })
        .catch(err =>{
          //log error if any
          console.log('login error')
        });
    }*/
  }
}
