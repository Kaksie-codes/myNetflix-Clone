import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDeYK5-WmmVIMeWiy5H3QhuPSk6H-xbtQ",
  authDomain: "mynetflix-5c7ff.firebaseapp.com",
  projectId: "mynetflix-5c7ff",
  storageBucket: "mynetflix-5c7ff.appspot.com",
  messagingSenderId: "429874238111",
  appId: "1:429874238111:web:00807eb0aeed9962b5c8aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth };
export default db;
 