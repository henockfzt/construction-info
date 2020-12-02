import {environment} from '../../environments/environment';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import {Vendor} from '../models/Vendor';
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
  updateVendor(Vendor: Vendor,callback) {
    return firebase.database().ref('MaterialVendor/'+Vendor.id).set(Vendor,function (error) {
      if(error){
        callback(false, 'There was a problem editing the Vendor');
        console.log('There was a problem editing the Vendor')
      }
      else{
        callback(true,'Vendor edited successfully');
        console.log('Vendor edited successfully')
      }
    })
  }

  postVendor(vendor: Vendor, callback) {
    return firebase.database().ref('MaterialVendor/').push(vendor,function (error) {
      if(error){
        callback(false, 'There was a problem adding the Vendor');
        console.log('There was a problem adding the Vendor')
      }
      else{
        callback(true,'Vendor added successfully');
        console.log('Vendor added successfully')
      }
    });
  }

  deleteVendor(vendor: Vendor,callback) {
    return firebase.database().ref('MaterialVendor/' + vendor.id).remove().then(function () {
      callback(true,'Vendor deleted successfully');
    },function () {
      callback(false,'There was a problem deleting the Vendor');
      console.log('There was a problem deleting the Vendor')
    });
  }
}
