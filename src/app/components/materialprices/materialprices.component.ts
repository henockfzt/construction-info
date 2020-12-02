import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NzMarks, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Bid} from '../../models/bid';
import {MaterialpriceService} from '../../service/materialprice.service';
import {Material} from '../../models/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';




@Component({
  selector: 'app-materialprices',
  templateUrl: './materialprices.component.html',
  styleUrls: ['./materialprices.component.scss']
})
export class MaterialpricesComponent implements OnInit {

  materials:Material []=[];
  private materialToBeEdited: Material;
  createProviderForm:FormGroup;
  public isLoggedIn = false;
  private editVisible: boolean;
  private materialId: string;
  private allMaterials: Material [] = [];




  constructor(private ref: ChangeDetectorRef ,private userService: UserService, private modal: NzModalService,private notification: NzNotificationService, private fb:FormBuilder,private materialPriceService:MaterialpriceService) {
    this.userService.getLoginState().subscribe(loginStatus=>{
      this.isLoggedIn = loginStatus;

    });
  }

  ngOnInit() {

    this.createProviderForm = this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      unit: [null, [Validators.required]],
      unitprice: [null, [Validators.required]],
    });
    this.getMaterials();


  }
  visible = false;
  materialType: string;
  materialName: string;
  materialUnit: string;
  materialUnitPrice: string;
  priceRange = [10,100];
  nameFilter='';

  filter(){
    this.materials = [];
    let self = this;
    this.allMaterials.forEach(material=>{
      console.log(material.unitprice);
      if((material.name == this.nameFilter || this.nameFilter=='') && ((this.priceRange[0] * 1000  < material.unitprice) && material.unitprice < this.priceRange[1] *1000)){
        self.materials.push(material);
      }



    })
  }
  open(): void {
    this.visible = true;
  }
  edit(material){
    this.materialId = material.id;
    this.materialUnit = material.unit;
    this.materialType = material.type;
    this.materialUnitPrice = material.unitprice;
    this.materialName = material.name;
    this.editVisible = true;
  }

  close(): void {
    this.visible = false;
  }

  showDeleteConfirm(material:Material): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this material?',
      nzContent: '<b style="color: red;">You will not be able to get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.onDeleteMaterial(material),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  getMaterials(){
    let self=this;
    this.materialPriceService.getMaterials().once('value').then(function(materials){
      self.materials = [];

      materials.forEach(material=>{

        const currentMaterial = material.toJSON() as Material;
        currentMaterial.id = material.key;

        self.materials.push(currentMaterial);
        self.allMaterials.push(currentMaterial);
      })

    });
  }

  onDeleteMaterial(material:Material) {
    let self = this;
    this.materialPriceService.deleteMaterial(material,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getMaterials();
      }
    })
  }
  onUpdateMaterial(){
    let self = this;
    this.materialToBeEdited = {id: this.materialId, name:this.materialName,unit:this.materialUnit,unitprice:this.materialUnitPrice,type:this.materialType} as Material;
    this.materialPriceService.updateMaterial(this.materialToBeEdited,function (success,message) {
      if(success){
        console.log('callback message: '+message);
        self.getMaterials();
        self.createNotification('success',message)
        self.close();
      }
      else{
        console.log('error')
        self.createNotification('error',message)
        self.close();
      }
    })
  }
  postMaterial(){
    for (const i in this.createProviderForm.controls) {

      this.createProviderForm.controls[i].markAsDirty();
      this.createProviderForm.controls[i].updateValueAndValidity();
      if(this.createProviderForm.controls[i].errors){
        console.log('errors');
        return;
      }
    }
    let self = this;
    this.materialPriceService.postMaterial(
      {name:this.createProviderForm.controls.name.value, type:this.createProviderForm.controls.type.value, unit:this.createProviderForm.controls.unit.value, unitprice: this.createProviderForm.controls.unitprice.value} as Material,function (success, message) {
        if(success){
          self.getMaterials();
          self.createNotification('success',message)
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
