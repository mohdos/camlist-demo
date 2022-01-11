
import { errorManager } from './errorManager';
import { collections, firebaseApp } from './firebase';
import { vars } from './vars';

BigInt.prototype['toJSON'] = function() { return this.toString()  }

const firestore = firebaseApp.firestore();
const dbCollections = collections;
export {
  vars,
  errorManager,
  firestore,
  dbCollections
}