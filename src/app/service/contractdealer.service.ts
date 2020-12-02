import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import * as firebase from 'firebase';
import {ContractDealer} from '../models/contractdealer';

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
  updateDealer(dealer: ContractDealer,callback) {
    return firebase.database().ref('ContractDealers/'+dealer.id).set(dealer,function (error) {
      if(error){
        callback(false, 'There was a problem editing the Dealer');
        console.log('There was a problem editing the Dealer')
      }
      else{
        callback(true,'Dealer edited successfully');
        console.log('Dealer edited successfully')
      }
    })
  }

  postDealer(dealer: ContractDealer, callback) {
    return firebase.database().ref('ContractDealers/').push(dealer,function (error) {
      if(error){
        callback(false, 'There was a problem adding the Dealer');
        console.log('There was a problem adding the Dealer')
      }
      else{
        callback(true,'Dealer added successfully');
        console.log('Dealer added successfully')
      }
    });
  }

  deleteDealer(dealer: ContractDealer,callback) {
    return firebase.database().ref('ContractDealers/' + dealer.id).remove().then(function () {
      callback(true,'Dealer deleted successfully');
    },function () {
      callback(false,'There was a problem deleting the Dealer');
      console.log('There was a problem deleting the Dealer')
    });
  }
}

