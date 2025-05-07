import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  initializeAuth,  // @ts-ignore
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyASxkvlf1-7SipvafgRf00OiqdLVQI6U9U",
  authDomain: "kanbanapp-e0748.firebaseapp.com",
  databaseURL: "https://kanbanapp-e0748-default-rtdb.firebaseio.com",
  projectId: "kanbanapp-e0748",
  storageBucket: "kanbanapp-e0748.appspot.com",
  messagingSenderId: "52846899837",
  appId: "1:52846899837:web:6e5384c763d757fe5ab714"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth con persistencia de sesión
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inicializar Firestore
export const db = getFirestore(app);
