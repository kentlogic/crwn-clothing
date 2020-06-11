import firebase from 'firebase/app'
import  'firebase/firestore'
import  'firebase/auth'


const firestore = firebase.firestore();

firestore.collection('users').doc('zCNPdWUA3QW2BGvd3gxy').collection('cartItems').doc('BvFBJuCQoTTpNRbEjkic')
firestore.doc('/usrs/BvFBJuCQoTTpNRbEjkic/cartItems/BvFBJuCQoTTpNRbEjkic')
firestore.collection('/usrs/BvFBJuCQoTTpNRbEjkic/cartItems/')
console.log()