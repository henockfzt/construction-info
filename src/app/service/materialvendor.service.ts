import {environment} from '../../environments/environment';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
@Injectable()
export class MaterialvendorService {

  constructor() {
    if (firebase.apps.length==0) {
      firebase.initializeApp(environment.firebaseConfig);
    }

  }
  getVendors(){
    return firebase.database().ref().child('MaterialVendor');
  }
}
