import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyBWUY5CFx7Ja2F4gAK2ynRrSwlH1xoO5mM",
	authDomain: "house-market-4957d.firebaseapp.com",
	projectId: "house-market-4957d",
	storageBucket: "house-market-4957d.appspot.com",
	messagingSenderId: "619231968278",
	appId: "1:619231968278:web:a6b2e2755b3e915ebb4937",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
