
import firebase from 'firebase/app'
import  'firebase/firestore'
import  'firebase/auth'

const config = {
    apiKey: "AIzaSyDQVe6J_WY_-yZY_QRjJ0hgiXRYgKzDjDQ",
    authDomain: "kshop-db.firebaseapp.com",
    databaseURL: "https://kshop-db.firebaseio.com",
    projectId: "kshop-db",
    storageBucket: "kshop-db.appspot.com",
    messagingSenderId: "978375552505",
    appId: "1:978375552505:web:8dca3a7132458a063fa128",
    measurementId: "G-8YD4748TYQ"
  }

  export const createUserProfile = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();

    //console.log('Snapshop data ', snapShot.data())

    if (!snapShot.exists) {
      const { email, displayName } = userAuth;
      const createdAt = new Date();

      try {
        await  userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (err) {
        console.log('error createing user', err.message)
      }
    }
    console.log('user ref ',userRef)

    return userRef;
  };

  export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
  ) => {
    const collectionRef = firestore.collection(collectionKey)
    const batch = firestore.batch()

    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef.obj);
    });

    return await batch.commit();
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //set the auth provider to google, other options include facebook, twitter
  const provider = new firebase.auth.GoogleAuthProvider();
  //set the default action to always show a pop up for gogle account selection
  provider.setCustomParameters({prompt: 'select_account'})
  //signInWithGoogle is the pop up for google account selection
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase;