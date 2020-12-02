import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MaterialvendorService} from '../../service/materialvendor.service';
import {Vendor} from '../../models/vendor';
import {UserService} from '../../service/user.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-machinevendors',
  templateUrl: './machinevendors.component.html',
  styleUrls: ['./machinevendors.component.scss']
})
export class MaterialVendorComponent implements OnInit {

  vendors:Vendor []=[];
  private vendorToBeEdited: Vendor;

  createProviderForm:FormGroup;
  public isLoggedIn = false;
  private editVisible: boolean;
  private vendorId: string;


  constructor(private ref: ChangeDetectorRef ,private userService: UserService, private modal: NzModalService,private notification: NzNotificationService, private fb:FormBuilder,private vendorService:MaterialvendorService) {
    this.userService.getLoginState().subscribe(loginStatus=>{
      this.isLoggedIn = loginStatus;

    });
  }

  ngOnInit() {

    this.createProviderForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      location: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
    this.getVendors();


  }
  visible = false;
  location: string;
  type: string;
  phone: string;
  name: string;


  open(): void {
    this.visible = true;
  }
  edit(vendor){
    this.vendorId = vendor.id;
    this.name = vendor.name;
    this.phone = vendor.phone;
    this.location = vendor.location;
    this.type = vendor.type;
    this.editVisible = true;
  }

  close(): void {
    this.visible = false;
    this.editVisible = false;
  }

  showDeleteConfirm(vendor:Vendor): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Vendor?',
      nzContent: '<b style="color: red;">You will not be able to get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.onDeleteVendor(vendor),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  getVendors(){
    let self=this;

    this.vendorService.getVendors().once('value').then(function(vendors){
      self.vendors = [];

      vendors.forEach(vendor=>{

        const currentVendor = vendor.toJSON() as Vendor;
        currentVendor.id = vendor.key;

        self.vendors.push(currentVendor);
      })

    });
  }

  onDeleteVendor(vendor:Vendor) {
    let self = this;
    this.vendorService.deleteVendor(vendor,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getVendors();
      }
    })
  }
  onUpdateVendor(){
    let self = this;
    this.vendorToBeEdited = {id: this.vendorId, name:this.name,type:this.type,location:this.location,phone:this.phone} as Vendor;
    this.vendorService.updateVendor(this.vendorToBeEdited,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getVendors();
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
  postVendor(){
    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
    }
    let self = this;
    this.vendorService.postVendor(
      {name:this.createProviderForm.controls.name.value, type:this.createProviderForm.controls.type.value, location:this.createProviderForm.controls.location.value, phone: this.createProviderForm.controls.phone.value} as Vendor,function (success, message) {
        if(success){
          self.getVendors();
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
