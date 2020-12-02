import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Professional} from '../../models/professional';
import {ProfessionalService} from '../../service/professional.service';
import {UserService} from '../../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.scss']
})
export class ProfessionalsComponent implements OnInit {

  professionals:Professional []=[];
  private professionalToBeEdited: Professional;

  createProviderForm:FormGroup;
  public isLoggedIn = false;
  private editVisible: boolean;
  private professionalId: string;


  constructor(private ref: ChangeDetectorRef ,private userService: UserService, private modal: NzModalService,private notification: NzNotificationService, private fb:FormBuilder,private professionalService:ProfessionalService) {
    this.userService.getLoginState().subscribe(loginStatus=>{
      this.isLoggedIn = loginStatus;

    });
  }

  ngOnInit() {

    this.createProviderForm = this.fb.group({
      name: [null, [Validators.required]],
      phoneNo: [null, [Validators.required]],
      speciality: [null, [Validators.required]],
      educationalStatus: [null, [Validators.required]],
    });
    this.getProfessionals();


  }
  visible = false;
  speciality: string;
  educationalStatus: string;
  phoneNo: string;
  name: string;


  open(): void {
    this.visible = true;
  }
  edit(professional){
    this.professionalId = professional.id;
    this.name = professional.name;
    this.phoneNo = professional.phoneNo;
    this.speciality = professional.speciality;
    this.educationalStatus = professional.educationalStatus;
    this.editVisible = true;
  }

  close(): void {
    this.visible = false;
    this.editVisible = false;
  }

  showDeleteConfirm(professional:Professional): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this professional?',
      nzContent: '<b style="color: red;">You will not be able to get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.onDeleteProfessional(professional),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  getProfessionals(){
    let self=this;

    this.professionalService.getProfessionals().once('value').then(function(professionals){
      self.professionals = [];

      professionals.forEach(professional=>{

        const currentProfessional = professional.toJSON() as Professional;
        currentProfessional.id = professional.key;

        self.professionals.push(currentProfessional);
      })

    });
  }

  onDeleteProfessional(professional:Professional) {
    let self = this;
    this.professionalService.deleteProfessional(professional,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getProfessionals();
      }
    })
  }
  onUpdateProfessional(){
    let self = this;
    this.professionalToBeEdited = {id: this.professionalId, name:this.name,educationalStatus:this.educationalStatus,speciality:this.speciality,phoneNo:this.phoneNo} as Professional;
    this.professionalService.updateProfessional(this.professionalToBeEdited,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getProfessionals();
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
  postProfessional(){
    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
    }
    let self = this;
    this.professionalService.postProfessional(
      {name:this.createProviderForm.controls.name.value, educationalStatus:this.createProviderForm.controls.educationalStatus.value, speciality:this.createProviderForm.controls.speciality.value, phoneNo: this.createProviderForm.controls.phoneNo.value} as Professional,function (success, message) {
        if(success){
          self.getProfessionals();
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
