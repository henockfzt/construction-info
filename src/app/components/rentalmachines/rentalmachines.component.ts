import { Component, OnInit } from '@angular/core';
import {Professional} from '../../models/professional';
import {RentalmachineService} from '../../service/rentalmachine.service';
import {Rentalmachine} from '../../models/rentalmachine';

@Component({
  selector: 'app-prices',
  templateUrl: './rentalmachines.component.html',
  styleUrls: ['./rentalmachines.component.scss']
})
export class RentalmachinesComponent implements OnInit {
  items = ['Grader ','Loader ','Excavator ','','','','','','','',''];
  rentalMachines:Rentalmachine[]=[];
  constructor(private rentalMachineService:RentalmachineService) { }

  ngOnInit() {
    let self=this;
    this.rentalMachineService.getMachines().once('value').then(function(professionals){

      professionals.forEach(machine=>{

        const currentMachine = machine.toJSON() as Rentalmachine;
        console.log(currentMachine);
        self.rentalMachines.push(currentMachine);
      })



    });
  }

}
