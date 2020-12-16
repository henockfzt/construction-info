import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {BidService} from '../../service/bid.service';
import {Rentalmachine} from '../../models/rentalmachine';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {RentalmachineService} from '../../service/rentalmachine.service';
import {Bid} from '../../models/bid';
import * as firebase from 'firebase';
import {fromDocRef} from '@angular/fire/firestore';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-prices',
  templateUrl: './rentalmachines.component.html',
  styleUrls: ['./rentalmachines.component.scss']
})
export class RentalmachinesComponent implements OnInit {
  machines:Rentalmachine[]=[];
  name;
  price;
  img;
  phone;
  id;
  visible: boolean = false;
  private machineToBeEdited: Rentalmachine;
  createProviderForm:FormGroup;
  public isLoggedIn = false;
  private editVisible: boolean;
  private machineId: string;
  private titleFilter='';
  private allMachines: Rentalmachine[] = [];
  uploadProgress: number = 0;
  private selectedFile: any;
  private fileDetected=false;
  public isWoreda: any;
  constructor(private router:Router,private ref: ChangeDetectorRef ,private userService: UserService, private modal: NzModalService,private notification: NzNotificationService, private fb:FormBuilder,private machineService:RentalmachineService) {
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
      price: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
    this.getMachines();


  }
  filter():void{
    this.machines = [];
    let self = this;
    this.allMachines.forEach(machine=>{
      console.log(machine);
      if((machine.name.toLowerCase().includes(this.titleFilter.toLowerCase()) || this.titleFilter=='')){
        self.machines.push(machine);

      }
    })
  }
  open(): void {
    this.visible = true;
  }
  edit(machine){
    this.editVisible = true;
    this.machineId = machine.id;
    this.name = machine.name;
    this.phone = machine.phone;
    this.price = machine.price;
    this.img = machine.img;
  }

  close(): void {
    this.visible = false;
    this.editVisible = false;
  }

  showDeleteConfirm(machine:Rentalmachine): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this machine?',
      nzContent: '<b style="color: red;">You will not be able to get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.onDeleteMachine(machine),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  getMachines(){
    let self=this;

    this.machineService.getMachines().once('value').then(function(machines){
      self.machines = [];

      machines.forEach(machine=>{

        const currentMachine = machine.toJSON() as Rentalmachine;
        currentMachine.id = machine.key;

        self.machines.push(currentMachine);
        self.allMachines.push(currentMachine);
      })

    });
  }

  onDeleteMachine(machine:Rentalmachine) {
    let self = this;
    this.machineService.deleteMachine(machine,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getMachines();
      }
    })
  }
  onUpdateMachines(){
    let self = this;
    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      console.log(this.createProviderForm.controls[i])
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }

    }
    this.machineToBeEdited = {id: this.machineId, name:this.name, phone:this.phone,price:this.price,img:this.img} as Rentalmachine;
    this.machineService.updateMachine(this.machineToBeEdited,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getMachines();
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
  postMachine(){

    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();

      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
      if(!this.fileDetected){
        this.createNotification('error','Please upload an Image');
        return;
      }
    }
    let storage = firebase.storage();
    let storageRef = storage.ref();
    let spaceRef = storageRef.child('Machine').child(this.createProviderForm.controls.name.value + this.createProviderForm.controls.price.value + this.createProviderForm.controls.phone.value);
    let uploadTask = spaceRef.put(this.selectedFile);
    let self=this;
    uploadTask.on('state_changed', function(snapshot){
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      self.uploadProgress=progress;
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
        self.machineService.postMachine(
          { name:self.createProviderForm.controls.name.value,phone:self.createProviderForm.controls.phone.value,price:self.createProviderForm.controls.price.value,img:downloadURL} as Rentalmachine,function (success, message) {
            if(success){
              self.getMachines();
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
