import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import * as firebase from 'firebase';
import {Professional} from '../models/Professional';

@Injectable()
export class ProfessionalService {

  constructor() {
    if (firebase.apps.length==0) {
      firebase.initializeApp(environment.firebaseConfig);
    }
  }
  getProfessionals(){
    return firebase.database().ref().child('Professionals');
  }
  updateProfessional(Professional: Professional,callback) {
    return firebase.database().ref('Professionals/'+Professional.id).set(Professional,function (error) {
      if(error){
        callback(false, 'There was a problem editing the Professional');
        console.log('There was a problem editing the Professional')
      }
      else{
        callback(true,'Professional edited successfully');
        console.log('Professional edited successfully')
      }
    })
  }

  postProfessional(Professional: Professional, callback) {
    return firebase.database().ref('Professionals/').push(Professional,function (error) {
      if(error){
        callback(false, 'There was a problem adding the Professional');
        console.log('There was a problem adding the Professional')
      }
      else{
        callback(true,'Professional added successfully');
        console.log('Professional added successfully')
      }
    });
  }

  deleteProfessional(Professional: Professional,callback) {
    return firebase.database().ref('Professionals/' + Professional.id).remove().then(function () {
      callback(true,'Professional deleted successfully');
    },function () {
      callback(false,'There was a problem deleting the Professional');
      console.log('There was a problem deleting the Professional')
    });
  }

}
