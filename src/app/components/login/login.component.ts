import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import * as firebase from 'firebase';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailForm: FormGroup;
  phoneForm:FormGroup;

  public isVisible = false;

  submitEmailForm(): void {
    for (const i in this.emailForm.controls) {
      this.emailForm.controls[i].markAsDirty();
      this.emailForm.controls[i].updateValueAndValidity();
      if(this.emailForm.controls[i].errors){
        console.log(this.emailForm.controls[i].errors);
        return;
      }
    }
    this.signInwithEmail(this.emailForm.controls.email.value,this.emailForm.controls.password.value)


  }
  signInwithEmail(email,password){
    const self=this;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
      self.userService.setLoginState(true);
      self.router.navigate(['/company'])
    }).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;

      if(errorCode){
        console.log(errorMessage);
        self.message.create('error', errorMessage );
        return;
      }


    });
  }

  constructor(private fb: FormBuilder,private router:Router,private userService:UserService,private message: NzMessageService ) {
    let self=this;
    this.userService.getLoginState().subscribe(state=>{
      self.isVisible=true;
      this.ngOnInit();
      if(state){
        self.router.navigate(['/company'])
      }
    });
  }

  ngOnInit(): void {
    let self=this;
    // if(self.isVisible){
    //   window['phoneRecaptchaVerifier'] = new firebase.auth.RecaptchaVerifier('phone-sign-in-recaptcha', {
    //     'size': 'invisible',
    //     'callback': function(response) {
    //       //self.router.navigate(['/home'])
    //       console.log(response)
    //     },
    //     'expired-callback': function() {
    //       // Reset reCAPTCHA?
    //       console.log("hol2a")
    //     }
    //   });
    // }





    this.emailForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      // nickname: [null, [Validators.required]],
      // phoneNumberPrefix: ['+86'],
      // phoneNumber: [null, [Validators.required]],
      // website: [null, [Validators.required]],
      // captcha: [null, [Validators.required]],
      // agree: [false]
    });
    this.phoneForm = this.fb.group({
      phoneNumber: [null, [Validators.required]],

    });
  }
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {

      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      if(this.validateForm.controls[i].errors){
        return;
      }
    }
    const self=this;
    const email=this.validateForm.controls.email.value;
    const password=this.validateForm.controls.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
      self.signInwithEmail(email,password);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if(errorCode){

        console.log(errorMessage);
        self.message.create('error', errorMessage);
      }

    });


  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    //Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

}
