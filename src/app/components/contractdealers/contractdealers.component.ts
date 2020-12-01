import { Component, OnInit } from '@angular/core';
import {Material} from '../../models/material';
import {MaterialpriceService} from '../../service/materialprice.service';
import {ContractDealer} from '../../models/contractdealer';
import {ContractdealerService} from '../../service/contractdealer.service';

@Component({
  selector: 'app-contractdealers',
  templateUrl: './contractdealers.component.html',
  styleUrls: ['./contractdealers.component.scss']
})
export class ContractdealersComponent implements OnInit {
  contractDealers:ContractDealer[]=[];
  constructor(private contractDealersService:ContractdealerService) { }

  ngOnInit() {
    let self=this;
    this.contractDealersService.getContractDealers().once('value').then(function(dealers){

      dealers.forEach(dealer=>{

        const currentDealer = dealer.toJSON() as ContractDealer;
        self.contractDealers.push(currentDealer);
      })
    });
  }

}
