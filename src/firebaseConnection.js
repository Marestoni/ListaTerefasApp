import firebase, { initializeApp } from 'firebase/app';
import 'firebase/database';

let firebaseConfig = {
    //conexão firebase
  };

  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

  export default firebase;