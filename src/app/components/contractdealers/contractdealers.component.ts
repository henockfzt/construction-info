import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ContractDealer} from '../../models/contractdealer';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {ContractdealerService} from '../../service/contractdealer.service';
import {NavigationEnd, Router} from '@angular/router';


@Component({
  selector: 'app-contractdealers',
  templateUrl: './contractdealers.component.html',
  styleUrls: ['./contractdealers.component.scss']
})
export class ContractdealersComponent implements OnInit {
  contractDealers:ContractDealer[]=[];
  name:string;
  price:string;
  type:string;
  receipt:string;
  phoneNo:string;
  visible = false;
  private dealerToBeEdited: ContractDealer;
  createProviderForm:FormGroup;
  public isLoggedIn = false;
  private editVisible: boolean;
  private dealerId: string;
  private allContractDealers: ContractDealer[] = [];
  private nameFilter: string = '';
  private typeFilter: string = '';
  public isWoreda: any;

  constructor(private router:Router,private ref: ChangeDetectorRef ,private userService: UserService, private modal: NzModalService,private notification: NzNotificationService, private fb:FormBuilder,private dealerService:ContractdealerService) {
    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          console.log('called');
          this.isLoggedIn = this.userService.getLoginStatus();
          this.userService.getLoginState().subscribe(loginStatus=>{
            this.isLoggedIn = loginStatus;
            console.log('called' + this.isLoggedIn);

          });
          this.userService.getIsWoreda().subscribe(email=>{
            this.isWoreda = email.includes('@gov.et');
            console.log(this.isWoreda)

          });
        }
      });
  }

  ngOnInit() {

    this.createProviderForm = this.fb.group({
      name: [null, [Validators.required]],
      phoneNo: [null, [Validators.required]],
      type: [null, [Validators.required]],
      price: [null],
      receipt: [null, [Validators.required]],
    });
    this.getDealers();


  }
  filter():void{
    this.contractDealers = [];
    let self = this;
    this.allContractDealers.forEach(dealer=>{
      console.log(dealer);
      if((dealer.name.toLowerCase().includes(this.nameFilter.toLowerCase()) || this.nameFilter=='') && (dealer.type.toLowerCase().includes(this.typeFilter.toLowerCase()) || this.typeFilter=='')){
        self.contractDealers.push(dealer);

      }
    })
  }
  open(): void {
    this.visible = true;
  }
  edit(dealer){
    this.dealerId = dealer.id;
    this.name = dealer.name;
    this.price = dealer.price;
    this.type = dealer.type;
    this.receipt = dealer.receipt;
    this.phoneNo = dealer.phoneNo;
    this.editVisible = true;
  }

  close(): void {
    this.visible = false;
    this.editVisible = false;
  }

  showDeleteConfirm(dealer:ContractDealer): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this dealer?',
      nzContent: '<b style="color: red;">You will not be able to get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.onDeletedealer(dealer),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  getDealers(){
    let self=this;

    this.dealerService.getContractDealers().once('value').then(function(dealers){
      self.contractDealers = [];

      dealers.forEach(dealer=>{

        const currentdealer = dealer.toJSON() as ContractDealer;
        currentdealer.id = dealer.key;

        self.contractDealers.push(currentdealer);
        self.allContractDealers.push(currentdealer)
      })

    });
  }

  onDeletedealer(dealer:ContractDealer) {
    let self = this;
    this.dealerService.deleteDealer(dealer,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getDealers();
      }
    })
  }
  onUpdateDealer(){
    let self = this;
    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
    }
    this.dealerToBeEdited = {id: this.dealerId, name:this.name,type:this.type,receipt:this.receipt,phoneNo:this.phoneNo,price:this.price} as ContractDealer;
    this.dealerService.updateDealer(this.dealerToBeEdited,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getDealers();
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
  postDealer(){
    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
    }
    let self = this;
    this.dealerService.postDealer(
      { name:this.createProviderForm.controls.name.value,type:this.createProviderForm.controls.type.value,receipt:this.createProviderForm.controls.receipt.value,phoneNo:this.createProviderForm.controls.phoneNo.value,price:this.createProviderForm.controls.price.value} as ContractDealer,function (success, message) {
        if(success){
          self.getDealers();
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
      'Notification', message    );
  }


  closeEdit() {
    this.editVisible = false;
  }

}
