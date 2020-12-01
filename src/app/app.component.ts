import { Component } from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from './service/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = ['ግሬደር ','ሎደር ','ኤክስካቬተር ','','','','','','','',''];
  public email:string;
  public isLoggedIn=false;
  logout(){
    const self = this;
    if(this.isLoggedIn) {
      console.log("logging out");

      firebase.auth().signOut().then(function () {
        self.userService.setLoginState(false);
        //self.router.navigate(['login'])
      }, function (err) {
        console.log(err);
      })
    }
    else{
      self.router.navigate(['login'])
    }
  }
  constructor(private userService:UserService,private router:Router){


  }
  ngOnInit(): void {
    this.userService.getLoginState().subscribe(loginStatus=>{
      this.isLoggedIn=loginStatus;
      if(this.isLoggedIn){
        this.email=firebase.auth().currentUser.email!=null?firebase.auth().currentUser.email:'Unknown User';
      }
      else{
        this.email = ''
      }
    });
  }
}
