
import * as firebaseAdmin from 'firebase-admin';
import path from 'path';
import { vars } from './vars';

const serviceAccount = require(path.join(__dirname, '../../', vars.firebase.credsFilePath));

export const firebaseApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

export const collections = {
    USERS: 'users',
    BIDS: 'bids',
    PETS: 'pets'
}
