import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';
import {Bid} from '../models/bid';
import {AngularFireDatabase, SnapshotAction} from '@angular/fire/database';
import {Observable} from 'rxjs/index';

@Injectable()
export class BidService {

  constructor(private db:AngularFireDatabase) {
    if (firebase.apps.length == 0) {
      firebase.initializeApp(environment.firebaseConfig);
    }
  }
  getBids(){
    return firebase.database().ref().child('Bids');
  }
  postBid(bid:Bid,callback){
    return firebase.database().ref('Bids/').push(bid,function (error) {
      if(error){
        callback(false, 'There was a problem adding the Bid');
        console.log('There was a problem adding the Bid')
      }
      else{
        callback(true,'Bid added successfully');
        console.log('Bid added successfully')
      }
    });
  }

  deleteBid(bid:Bid,callback) {
    return firebase.database().ref('Bids/' + bid.id).remove().then(function () {
      callback(true,'Bid deleted successfully');
      console.log('deleted')
    },function () {
      callback(false,'There was a problem deleting the Bid');
      console.log('There was a problem deleting the Bid')
    });

  }

  updateBid(bid: Bid , callback) {

    return firebase.database().ref('Bids/'+bid.id).set(bid,function (error) {
      if(error){
        callback(false, 'There was a problem editing the bid');
        console.log('There was a problem editing the bid')
      }
      else{
        callback(true,'Bid edited successfully');
        console.log('Bid edited successfully')
      }
    });
  }

}
