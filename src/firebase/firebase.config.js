// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBsVuTS5EurcvFAG1vMfzbkIhsoCADJHV4",
//   authDomain: "room-rental-service.firebaseapp.com",
//   projectId: "room-rental-service",
//   storageBucket: "room-rental-service.appspot.com",
//   messagingSenderId: "161350097605",
//   appId: "1:161350097605:web:c10ac9ef009a3c8eb5aeac"
// };

// // Initialize Firebase
//  const app = initializeApp(firebaseConfig);





import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
}

export const app = initializeApp(firebaseConfig)
