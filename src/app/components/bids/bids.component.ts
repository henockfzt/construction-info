import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Vacancy} from '../../models/vacancy';
import {BidService} from '../../service/bid.service';
import {Bid} from '../../models/bid';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Promise} from 'q';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss']
})
export class BidsComponent implements OnInit {
  @ViewChild('mytmp',{static:false}) mytmp: TemplateRef<any>;
  bids:Bid[]=[];
  private isVisible: boolean;
  constructor(private bidService:BidService,private fb: FormBuilder,private notificationService: NzNotificationService) {
    this.notificationService.template(this.mytmp, {  });
  }


  showModal(): void {
    this.isVisible = true;
  }


  handleOk(): void {
    this.submitForm();

  }

  handleCancel(): void {
    this.isVisible = false;
  }
  validateForm: FormGroup;

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    let controls=this.validateForm.controls;
    let bid=new Bid(controls.title.value, controls.type.value,controls.grade.value,controls.tel.value,controls.deadline.value,controls.bidSecurity.value);
    let self=this;
    return this.bidService.postBid(bid).push(bid,function (err) {
      if(err){
        console.log(err);

        self.isVisible = false;
      }
      else{
        console.log("success");
        self.isVisible = false;
      }
    });



  }




  getCaptcha(e: MouseEvent,): void {
    e.preventDefault();
  }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [ Validators.required]],
      type: [null, [Validators.required]],
      grade: [null, [Validators.required]],
      tel: [null, [Validators.required]],
      city: ['+86'],
      deadline: [null, [Validators.required]],
      bidSecurity: [null, [Validators.required]],

    });
    let self=this;

    this.bidService.getBids().subscribe(bids=>{
      this.bids=[];
      bids.forEach(bid=>{

        const currentBid = bid.payload.toJSON() as Bid;
        self.bids.push(currentBid);
      });
      this.bids.reverse();
    })

  }

}
