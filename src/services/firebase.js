// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhQq8gNJ-ILs3VGN0VEyrntd5BoUMTfWw",
  authDomain: "automic-site.firebaseapp.com",
  projectId: "automic-site",
  storageBucket: "automic-site.firebasestorage.app",
  messagingSenderId: "336395313611",
  appId: "1:336395313611:web:e14b956773ce2d13a9564e",
  measurementId: "G-7Q6F7ZJVE1"
};

// Inicializa o app do Firebase
const app = initializeApp(firebaseConfig);

// Inicializa e exporta a instância do Firestore para usarmos nos componentes
export const db = getFirestore(app);