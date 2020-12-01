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
  getBids():Observable<SnapshotAction<any>[]>{
    return this.db.list('Bids').snapshotChanges();
  }
  postBid(bid:Bid){
    return firebase.database().ref().child('Bids');
    // const bidsReference=firebase.database().ref();
    // const key=bidsReference.child('Bids').push().key;
    // return bidsReference.child('Bids'). child(key).set(bid);

  }

}
