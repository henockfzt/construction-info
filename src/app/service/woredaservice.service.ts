import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import * as firebase from 'firebase';
import {Woreda} from '../models/woreda';

@Injectable()
export class WoredaserviceService {

  constructor() {
    if (firebase.apps.length==0) {
      firebase.initializeApp(environment.firebaseConfig);
    }

  }
  getWoredas(){
    return firebase.database().ref().child('Woreda');
  }
  postWoreda(woreda:Woreda,callback){
    return firebase.database().ref('Woreda/').push(woreda,function (error) {
      if(error){
        callback(false, 'There was a problem adding the Woreda');
        console.log('There was a problem adding the Woreda')
      }
      else{
        callback(true,'Woreda added successfully');
        console.log('Woreda added successfully')
      }
    });
  }

  deleteWoreda(woreda:Woreda,callback) {
    return firebase.database().ref('Woreda/' + woreda.id).remove().then(function () {
      callback(true,'Woreda deleted successfully');
      console.log('deleted')
    },function () {
      callback(false,'There was a problem deleting the Woreda');
      console.log('There was a problem deleting the Woreda')
    });

  }

  updateWoreda(woreda: Woreda , callback) {

    return firebase.database().ref('Woreda/'+woreda.id).set(woreda,function (error) {
      if(error){
        callback(false, 'There was a problem editing the Woreda');
        console.log('There was a problem editing the Woreda')
      }
      else{
        callback(true,'Woreda edited successfully');
        console.log('Woreda edited successfully')
      }
    });
  }
}
