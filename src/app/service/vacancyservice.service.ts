import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';
import {Vacancy} from '../models/vacancy';
@Injectable()


export class VacancyserviceService {

  constructor() {
    if (firebase.apps.length==0) {
      firebase.initializeApp(environment.firebaseConfig);
    }

  }
  getVacacncies(){
    return firebase.database().ref().child('Vacancies');
  }
  postVacancy(vacancy:Vacancy,callback){
    return firebase.database().ref('Vacancies/').push(vacancy,function (error) {
      if(error){
        callback(false, 'There was a problem adding the Vacancy');
        console.log('There was a problem adding the Vacancy')
      }
      else{
        callback(true,'Vacancy added successfully');
        console.log('Vacancy added successfully')
      }
    });
  }

  deleteVacancy(vacancy:Vacancy,callback) {
    return firebase.database().ref('Vacancies/' + vacancy.id).remove().then(function () {
      callback(true,'Vacancy deleted successfully');
      console.log('deleted')
    },function () {
      callback(false,'There was a problem deleting the Vacancy');
      console.log('There was a problem deleting the Vacancy')
    });

  }

  updateVacancy(vacancy: Vacancy , callback) {

    return firebase.database().ref('Vacancies/'+vacancy.id).set(vacancy,function (error) {
      if(error){
        callback(false, 'There was a problem editing the Vacancy');
        console.log('There was a problem editing the Vacancy')
      }
      else{
        callback(true,'Vacancy edited successfully');
        console.log('Vacancy edited successfully')
      }
    });
  }
}
