import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Woreda} from '../models/Woreda';
import {WoredaserviceService} from '../service/woredaservice.service';

@Component({
  selector: 'app-woreda',
  templateUrl: './woreda.component.html',
  styleUrls: ['./woreda.component.scss']
})
export class WoredaComponent implements OnInit {
  woredas:Woreda []=[];
  private woredaToBeEdited: Woreda;

  createProviderForm:FormGroup;
  public isLoggedIn = false;
  private editVisible: boolean;
  private woredaId: string;


  constructor(private ref: ChangeDetectorRef ,private userService: UserService, private modal: NzModalService,private notification: NzNotificationService, private fb:FormBuilder,private woredaService:WoredaserviceService) {
    this.userService.getLoginState().subscribe(loginStatus=>{
      this.isLoggedIn = loginStatus;

    });
  }

  ngOnInit() {

    this.createProviderForm = this.fb.group({
      no: [null, [Validators.required]],
      subcity: [null, [Validators.required]],
      region: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
    this.getWoredas();


  }
  visible = false;
  no:string;
  subcity;
  region;
  phone;
  id;



  open(): void {
    this.visible = true;
  }
  edit(woreda){
    this.woredaId = woreda.id;
    this.no = woreda.no;
    this.subcity = woreda.subcity;
    this.region = woreda.region;
    this.phone = woreda.phone;
    this.editVisible = true;
  }

  close(): void {
    this.visible = false;
    this.editVisible = false;
  }

  showDeleteConfirm(woreda:Woreda): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Woreda?',
      nzContent: '<b style="color: red;">You will not be able to get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.onDeleteWoreda(woreda),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  getWoredas(){
    let self=this;

    this.woredaService.getWoredas().once('value').then(function(woredas){
      self.woredas = [];

      woredas.forEach(woreda=>{

        const currentWoreda = woreda.toJSON() as Woreda;
        currentWoreda.id = woreda.key;
        self.woredas.push(currentWoreda);

      });


    });
  }

  onDeleteWoreda(woreda:Woreda) {
    let self = this;
    this.woredaService.deleteWoreda(woreda,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getWoredas();
      }
    })
  }
  onUpdateWoreda(){
    let self = this;
    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
    }
      this.woredaToBeEdited = {id: this.woredaId, no:this.no, subcity:this.subcity,phone:this.phone,region:this.region} as Woreda;
    this.woredaService.updateWoreda(this.woredaToBeEdited,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getWoredas();
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
  postWoreda(){
    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
    }
    let self = this;
    this.woredaService.postWoreda(
      {no:this.createProviderForm.controls.no.value, subcity:this.createProviderForm.controls.subcity.value, region:this.createProviderForm.controls.region.value,phone: this.createProviderForm.controls.phone.value } as Woreda,function (success, message) {
        if(success){
          self.getWoredas();
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
