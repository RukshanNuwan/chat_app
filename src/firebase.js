import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBD5fl67rqUojDdlVGhP6wsI1umhlUkNOE",
  authDomain: "chat-app-cd964.firebaseapp.com",
  projectId: "chat-app-cd964",
  storageBucket: "chat-app-cd964.appspot.com",
  messagingSenderId: "438440875825",
  appId: "1:438440875825:web:a94e2600a823bbebab0210"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();