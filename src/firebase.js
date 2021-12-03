import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD9UKpjDmBOyGSt37i2GvXwFL4BreREtjY',
  authDomain: 'mern-flix.firebaseapp.com',
  projectId: 'mern-flix',
  storageBucket: 'mern-flix.appspot.com',
  messagingSenderId: '519438767197',
  appId: '1:519438767197:web:bc51b8ab9281554259a9b4',
  measurementId: 'G-QV6YN5L8P8',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;
