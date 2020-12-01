import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';
import {Company} from '../models/company';
import {NzNotificationService} from 'ng-zorro-antd';


@Injectable()
export class CompanyserviceService {

  constructor() {
    if (firebase.apps.length==0) {
      firebase.initializeApp(environment.firebaseConfig);
    }
  }
  getCompanies(){
    return firebase.database().ref().child('ConstructionCompanies');
  }
  postCompany(company:Company,callback){
    return firebase.database().ref('ConstructionCompanies/').push(company,function (error) {
      if(error){
        callback(false, 'There was a problem adding the company');
        console.log('There was a problem adding the company')
      }
      else{
        callback(true,'Company added successfully');
        console.log('Company added successfully')
      }
    });
  }

  deleteCompany(company:Company,callback) {

    console.log(company)
    return firebase.database().ref('ConstructionCompanies/' + company.id).remove().then(function () {
      callback(true,'Company deleted successfully');
      console.log('deleted')
    },function () {
      callback(false,'There was a problem deleting the company');
      console.log('There was a problem deleting the company')
    });

  }

  updateCompany(company: Company , callback) {

    return firebase.database().ref('ConstructionCompanies/'+company.id).set(company,function (error) {
      if(error){
        callback(false, 'There was a problem editing the company');
        console.log('There was a problem editing the company')
      }
      else{
        callback(true,'Company edited successfully');
        console.log('Company edited successfully')
      }
    });
  }
}
