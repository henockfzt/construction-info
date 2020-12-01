import { Component, OnInit } from '@angular/core';
import {Vendor} from '../../models/vendor';
import {News} from '../../models/news';
import {MaterialvendorService} from '../../service/materialvendor.service';

@Component({
  selector: 'app-machinevendors',
  templateUrl: './machinevendors.component.html',
  styleUrls: ['./machinevendors.component.scss']
})
export class MaterialVendorComponent implements OnInit {
  vendors:Vendor[]=[];
  constructor(private materialVendorService:MaterialvendorService) { }



  ngOnInit() {
    let self=this;
    this.materialVendorService.getVendors().once('value').then(function(vendors){

      vendors.forEach(vendor=>{


        const currentVendor = vendor.toJSON() as Vendor;

        console.log(currentVendor);
        self.vendors.push(currentVendor);
      })



    });
  }

}
