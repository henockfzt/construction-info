import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';
import {Material} from '../models/material';


@Injectable()
export class MaterialpriceService {

  constructor() {
    if (firebase.apps.length==0) {
      firebase.initializeApp(environment.firebaseConfig);
    }
  }
  getMaterials(){
    return firebase.database().ref().child('MaterialPrices');
  }

  updateMaterial(material: Material,callback) {
    return firebase.database().ref('MaterialPrices/'+material.id).set(material,function (error) {
      if(error){
        callback(false, 'There was a problem editing the material');
        console.log('There was a problem editing the material')
      }
      else{
        callback(true,'Material edited successfully');
        console.log('Material edited successfully')
      }
    })
  }

  postMaterial(material: Material, callback) {
    return firebase.database().ref('MaterialPrices/').push(material,function (error) {
      if(error){
        callback(false, 'There was a problem adding the material');
        console.log('There was a problem adding the material')
      }
      else{
        callback(true,'Material added successfully');
        console.log('Material added successfully')
      }
    });
  }

  deleteMaterial(material: Material,callback) {
    return firebase.database().ref('MaterialPrices/' + material.id).remove().then(function () {
      callback(true,'Material deleted successfully');
    },function () {
      callback(false,'There was a problem deleting the material');
      console.log('There was a problem deleting the material')
    });
  }
}
