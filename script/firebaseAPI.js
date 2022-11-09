var firebaseConfig = {
    apiKey: "AIzaSyAxhv5pnb6aKFhEV48lquBqv75IOOFh_iE",
    authDomain: "baseballgame-2ed1e.firebaseapp.com",
    projectId: "baseballgame-2ed1e",
    storageBucket: "baseballgame-2ed1e.appspot.com",
    messagingSenderId: "940161176275",
    appId: "1:940161176275:web:261020b5e0b3823983fa26"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();