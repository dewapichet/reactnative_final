import firebase from 'firebase';

const firebaseConfig: Object = {
    apiKey: "AIzaSyAss9MmrNMuXpW9xPjKzg6CnYj53MPsp9c",
    authDomain: "mc-apichet.firebaseapp.com",
    projectId: "mc-apichet",
    storageBucket: "mc-apichet.appspot.com",
    messagingSenderId: "173839177227",
    appId: "1:173839177227:web:d0bcadfc5fc2aaf106990e"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
