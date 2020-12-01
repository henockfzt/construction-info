import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company';
import {VacancyserviceService} from '../../service/vacancyservice.service';
import {Vacancy} from '../../models/vacancy';

@Component({
  selector: 'app-vaccancy',
  templateUrl: './vaccancy.component.html',
  styleUrls: ['./vaccancy.component.scss']
})
export class VaccancyComponent implements OnInit {
  items = ['Junior Civil Engineer  ','Labour  ','ለሳኝ  ','ተሸካሚ ','ባለ ልምድ ኢንጂኔር  ','ጸሃፊ ','ሳይት ሃላፊ ',''];
  vacancies:Vacancy[]=[];
  constructor(private vacancyService:VacancyserviceService) { }

  ngOnInit() {
    let self=this;
    this.vacancyService.getVacacncies().once('value').then(function(vacancies){

      vacancies.forEach(vacancy=>{

        const currentvacancy = vacancy.toJSON() as Vacancy;
        console.log(currentvacancy);
        self.vacancies.push(currentvacancy);
      })



    });
  }

}
