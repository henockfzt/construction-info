import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import * as firebase from 'firebase';

@Injectable()
export class ContractdealerService {

  constructor() {
    if (firebase.apps.length==0) {
      firebase.initializeApp(environment.firebaseConfig);
    }
  }

  getContractDealers(){
    return firebase.database().ref().child('ContractDealers');
  }
}

