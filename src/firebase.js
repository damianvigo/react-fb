// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBhSRWHncaorHecK6iEspm_RwZ7WnWDiW8',
  authDomain: 'react-2022-ed6df.firebaseapp.com',
  projectId: 'react-2022-ed6df',
  storageBucket: 'react-2022-ed6df.appspot.com',
  messagingSenderId: '280267866887',
  appId: '1:280267866887:web:05b144fde874ce1413fba2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
