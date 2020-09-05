import firebase from 'firebase';



// const firebaseConfig = {
//     apiKey: "AIzaSyBTRRopAUnRu521t_ZpgJBeRlImli8FkXM",
//     authDomain: "instagram-clone-9d7db.firebaseapp.com",
//     databaseURL: "https://instagram-clone-9d7db.firebaseio.com",
//     projectId: "instagram-clone-9d7db",
//     storageBucket: "instagram-clone-9d7db.appspot.com",
//     messagingSenderId: "831073944587",
//     appId: "1:831073944587:web:ef86edc33438194b24f30e",
//     measurementId: "G-JB6MT8XX5K"
// };

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBTRRopAUnRu521t_ZpgJBeRlImli8FkXM",
    authDomain: "instagram-clone-9d7db.firebaseapp.com",
    databaseURL: "https://instagram-clone-9d7db.firebaseio.com",
    projectId: "instagram-clone-9d7db",
    storageBucket: "instagram-clone-9d7db.appspot.com",
    messagingSenderId: "831073944587",
    appId: "1:831073944587:web:ef86edc33438194b24f30e",
    measurementId: "G-JB6MT8XX5K"
});


const  db  = firebaseApp.firestore();
const auth  = firebase.auth();
const storage = firebase.storage();

export { db,auth,storage};

