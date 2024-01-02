import { LoginService } from './../../services/login.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import {FloatLabelType} from '@angular/material/form-field'
import {FormGroup,FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OnInit } from '@angular/core';

import { trigger, state, transition, style, animate } from '@angular/animations';

import { interval, Subscription } from 'rxjs';

import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]

})
export class LoginComponent implements OnInit{

  // form: FormGroup = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // });
  ID =new FormControl('', [Validators.required]);
  PW =new FormControl('', [Validators.required]);





    hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  hide = true;

  constructor(private _formBuilder: FormBuilder,
    private LoginService:LoginService,
    private _snackBar: MatSnackBar,
    ) {

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 7000
    });
  }

  ngOnInit() {

  }
Login(event:any){
  event.preventDefault();

  this.LoginService.login_post(this.ID.value, this.PW.value)
  .subscribe(data => {
    console.log('/login 를 불렀습니다.', data)
    if(data == '로그인 실패'){
      this.openSnackBar('올바른 계정을 입력해주세요', '확인')
    } else {
      console.log('성공')
      // this.startLoading();
    window.location.href = "/select"
    }

  })
}
ConfirmAccount(){
  // this.LoginService.login_post(this.ID.value, this.PW.value)
  //     .subscribe(data => {
  //       console.log('/login 를 불렀습니다.', data)
  //       if(data){
  //         console.log('working?')
  //         // this.startLoading();
  //       //  window.location.pathname = '/select';
  //       }

  //     })
}


  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }




}
