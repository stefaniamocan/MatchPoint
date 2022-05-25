import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';
import {initializeFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyBsul7IqygJn6hJ2F6SC_6zOm66g8TeBjI',
  authDomain: 'matchpoint-a0006.firebaseapp.com',
  projectId: 'matchpoint-a0006',
  storageBucket: 'matchpoint-a0006.appspot.com',
  messagingSenderId: '917693738479',
  appId: '1:917693738479:web:5405624833828411d81a1a',
  measurementId: 'G-KDMQWQJJK8',
};

//Initialize firebase

const app = initializeApp(firebaseConfig);
const database = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

export const authentication = getAuth(app);
export const db = getFirestore();

export const storage = getStorage(app);
