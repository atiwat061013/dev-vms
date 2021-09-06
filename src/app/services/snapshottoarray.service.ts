import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnapshottoarrayService {

  constructor() { }

  objToarray(snapshot) {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });
  
    return returnArr;
  }

}
