import {ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Bid} from '../../models/bid';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {UserService} from '../../service/user.service';
import {BidService} from '../../service/bid.service';
import * as firebase from 'firebase';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss']
})
export class BidsComponent implements OnInit {


  bids:Bid[]=[];
  bidSecurity: string;
  city: string='';
  deadline:string;
  grade:string;
  tel:string;
  title:string;
  type:string;
  visible: boolean = false;
  private bidToBeEdited: Bid;
  createProviderForm:FormGroup;
  public isLoggedIn = false;
  private editVisible: boolean;
  private bidId: string;
  private titleFilter='';
  private allBids: Bid[] = [];
  uploadProgress: number = 0;
  private selectedFile: any;
  private fileDetected=false;
  constructor(private router: Router,private ref: ChangeDetectorRef ,private userService: UserService, private modal: NzModalService,private notification: NzNotificationService, private fb:FormBuilder,private bidService:BidService) {
    this.userService.getLoginState().subscribe(loginStatus=>{
      this.isLoggedIn = loginStatus;

    });
    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          console.log('called');
          this.isLoggedIn = this.userService.getLoginStatus();
          this.userService.getLoginState().subscribe(loginStatus=>{
            this.isLoggedIn = loginStatus;
            console.log('called' + this.isLoggedIn);


          });

        }
      });
  }

  ngOnInit() {

    this.createProviderForm = this.fb.group({
      bidSecurity: [null, [Validators.required]],
      city: [null, [Validators.required]],
      deadline: [null, [Validators.required]],
      grade: [null, [Validators.required]],
      tel: [null, [Validators.required]],
      title: [null, [Validators.required]],
      type: [null, [Validators.required]],
      image:[null,[Validators.required]]
    });
    this.getBids();


  }
  filter():void{
    this.bids = [];
    let self = this;
    this.allBids.forEach(bid=>{
      console.log(bid);
      if((bid.title.toLowerCase().includes(this.titleFilter.toLowerCase()) || this.titleFilter=='')){
        self.bids.push(bid);

      }
    })
  }
  open(): void {
    this.visible = true;
  }
  edit(bid){
    this.editVisible = true;
    this.bidId = bid.id;
    this.bidSecurity = bid.bidSecurity;
    this.city = bid.city;
    this.deadline = bid.deadline;
    this.grade = bid.grade;
    this.tel = bid.tel;
    this.title = bid.title;
    this.type = bid.type;
  }

  close(): void {
    this.visible = false;
    this.editVisible = false;
  }

  showDeleteConfirm(bid:Bid): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this bid?',
      nzContent: '<b style="color: red;">You will not be able to get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.onDeleteBid(bid),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  getBids(){
    let self=this;

    this.bidService.getBids().once('value').then(function(bids){
      self.bids = [];

      bids.forEach(bid=>{

        const currentBid = bid.toJSON() as Bid;
        currentBid.id = bid.key;

        self.bids.push(currentBid);
        self.allBids.push(currentBid);
      })

    });
  }

  onDeleteBid(bid:Bid) {
    let self = this;
    this.bidService.deleteBid(bid,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getBids();
      }
    })
  }
  onUpdateBids(){
    let self = this;
    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
    }
    this.bidToBeEdited = {id: this.bidId, bidSecurity:this.bidSecurity,deadline:this.deadline,city:this.city,grade:this.grade,tel:this.tel, title:this.title, type:this.type} as Bid;
    this.bidService.updateBid(this.bidToBeEdited,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getBids();
        self.createNotification('success',message);
        self.close();
      }
      else{
        console.log('error')
        self.createNotification('error',message);
        self.close();
      }
    })
  }
  detectFile($event) {
    this.selectedFile=$event.target.files.item(0);

    this.fileDetected=true;
  }
  postBid(){

    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
      if(!this.fileDetected){
        this.createNotification('error','Please upload the bid document');
        return;
      }
    }
    console.log('outsie')
    let storage = firebase.storage();
    let storageRef = storage.ref();
    let spaceRef = storageRef.child('Bids');
    console.log(this.selectedFile)
    let uploadTask = spaceRef.put(this.selectedFile);
    let self=this;
    console.log('outsie')
    uploadTask.on('state_changed', function(snapshot){
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      self.uploadProgress=progress;
      console.log('inside')
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
    }, function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        self.bidService.postBid(
          { bidSecurity:self.createProviderForm.controls.bidSecurity.value,deadline:self.createProviderForm.controls.deadline.value,city:self.createProviderForm.controls.city.value,grade:self.createProviderForm.controls.grade.value,tel:self.createProviderForm.controls.tel.value, title:self.createProviderForm.controls.title.value, type:self.createProviderForm.controls.type.value,docurl:downloadURL} as Bid,function (success, message) {
            if(success){
              self.getBids();
              self.createNotification('success',message);
              self.close();
            }
            else{
              self.createNotification('error',message)
            }

          })

      });
    });

  }
  createNotification(type: string,message): void {
    this.notification.create(
      type,
      'Notification', message    );
  }


  closeEdit() {
    this.editVisible = false;
  }

}
