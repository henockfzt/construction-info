import {ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Bid} from '../../models/bid';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {UserService} from '../../service/user.service';
import {BidService} from '../../service/bid.service';

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
  constructor(private ref: ChangeDetectorRef ,private userService: UserService, private modal: NzModalService,private notification: NzNotificationService, private fb:FormBuilder,private bidService:BidService) {
    this.userService.getLoginState().subscribe(loginStatus=>{
      this.isLoggedIn = loginStatus;

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
    });
    this.getBids();


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
  postBid(){
    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
    }
    let self = this;
    this.bidService.postBid(
      { bidSecurity:this.createProviderForm.controls.bidSecurity.value,deadline:this.createProviderForm.controls.deadline.value,city:this.createProviderForm.controls.city.value,grade:this.createProviderForm.controls.grade.value,tel:this.createProviderForm.controls.tel.value, title:this.createProviderForm.controls.title.value, type:this.createProviderForm.controls.type.value} as Bid,function (success, message) {
        if(success){
          self.getBids();
          self.createNotification('success',message);
          self.close();
        }
        else{
          self.createNotification('error',message)
        }

      })
  }
  createNotification(type: string,message): void {
    this.notification.create(
      type,
      'Notification Title', message    );
  }


  closeEdit() {
    this.editVisible = false;
  }

}
