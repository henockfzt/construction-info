import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import * as firebase from 'firebase';
import {Rentalmachine} from '../models/rentalmachine';

@Injectable()
export class RentalmachineService {

  constructor() {
    if (firebase.apps.length == 0) {
      firebase.initializeApp(environment.firebaseConfig);
    }
  }

  getMachines() {
    return firebase.database().ref().child('RentalMachine/');
  }

  postMachine(rentalMachine:Rentalmachine,callback){
    return firebase.database().ref('RentalMachine/').push(rentalMachine,function (error) {
      if(error){
        callback(false, 'There was a problem adding the Machine');
        console.log('There was a problem adding the Machine')
      }
      else{
        callback(true,'Machine added successfully');
        console.log('Machine added successfully')
      }
    });
  }

  deleteMachine(machine:Rentalmachine,callback) {
    return firebase.database().ref('RetnalMachine/' + machine.id).remove().then(function () {
      callback(true,'Machine deleted successfully');
      console.log('deleted')
    },function () {
      callback(false,'There was a problem deleting the Machine');
      console.log('There was a problem deleting the Machine')
    });

  }

  updateMachine(machine: Rentalmachine , callback) {

    return firebase.database().ref('RentalMachine/'+machine.id).set(machine,function (error) {
      if(error){
        callback(false, 'There was a problem editing the Machine');
        console.log('There was a problem editing the Machine')
      }
      else{
        callback(true,'Machine edited successfully');
        console.log('Machine edited successfully')
      }
    });
  }
}

