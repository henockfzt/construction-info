import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';
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
}
