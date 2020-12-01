import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import * as firebase from 'firebase';

@Injectable()
export class RentalmachineService {

  constructor() {
    if (firebase.apps.length == 0) {
      firebase.initializeApp(environment.firebaseConfig);
    }
  }

  getMachines() {
    return firebase.database().ref().child('RentalMachines');
  }

  postDealer() {



  }
}

