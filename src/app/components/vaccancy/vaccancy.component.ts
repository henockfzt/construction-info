import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Company} from '../../models/company';
import {VacancyserviceService} from '../../service/vacancyservice.service';
import {Vacancy} from '../../models/vacancy';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';

import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-vaccancy',
  templateUrl: './vaccancy.component.html',
  styleUrls: ['./vaccancy.component.scss']
})
export class VaccancyComponent implements OnInit {
  vacancies:Vacancy []=[];
  private vacancyToBeEdited: Vacancy;

  createProviderForm:FormGroup;
  public isLoggedIn = false;
  private editVisible: boolean;
  private vacancyId: string;
  public isWoreda = true;


  constructor(private router:Router,private ref: ChangeDetectorRef ,private userService: UserService, private modal: NzModalService,private notification: NzNotificationService, private fb:FormBuilder,private vacancyService:VacancyserviceService) {
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
      title: [null, [Validators.required]],
      experience: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      companyName: [null, [Validators.required]],
    });
    this.getVacancies();


  }
  visible = false;
  title:string;
  experience;
  salary;
  quantity;
  companyName;



  open(): void {
    this.visible = true;
  }
  edit(vacancy){
    console.log(vacancy.id)
    this.vacancyId = vacancy.id;
    this.title = vacancy.title;
    this.experience = vacancy.experience;
    this.salary = vacancy.salary;
    this.quantity = vacancy.quantity;
    this.companyName = vacancy.companyName;
    this.editVisible = true;
  }

  close(): void {
    this.visible = false;
    this.editVisible = false;
  }

  showDeleteConfirm(vacancy:Vacancy): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Vacancy?',
      nzContent: '<b style="color: red;">You will not be able to get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.onDeleteVacancy(vacancy),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  getVacancies(){
    let self=this;

    this.vacancyService.getVacacncies().once('value').then(function(vacancies){
      self.vacancies = [];

      vacancies.forEach(vacancy=>{

        const currentVacancy = vacancy.toJSON() as Vacancy;
        currentVacancy.id = vacancy.key;
        self.vacancies.push(currentVacancy);

      });


    });
  }

  onDeleteVacancy(vacancy:Vacancy) {
    let self = this;
    this.vacancyService.deleteVacancy(vacancy,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getVacancies();
      }
    })
  }
  onUpdateVacancy(){
    let self = this;
    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
    }
    this.vacancyToBeEdited = {id: this.vacancyId, title:this.title,quantity:this.quantity,salary:this.salary,experience:this.experience,companyName:this.companyName} as Vacancy;
    this.vacancyService.updateVacancy(this.vacancyToBeEdited,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getVacancies();
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
  postVacancy(){
    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
    }
    let self = this;
    this.vacancyService.postVacancy(
      {title:this.createProviderForm.controls.title.value, experience:this.createProviderForm.controls.experience.value, salary:this.createProviderForm.controls.salary.value, quantity: this.createProviderForm.controls.quantity.value, companyName:this.createProviderForm.controls.companyName.value} as Vacancy,function (success, message) {
        if(success){
          self.getVacancies();
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
