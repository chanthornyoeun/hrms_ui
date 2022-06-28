importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyD6AiLKPTm_nl3gEEVlhzPXyEy19lfqlOo",
  authDomain: "hrms-815a7.firebaseapp.com",
  projectId: "hrms-815a7",
  storageBucket: "hrms-815a7.appspot.com",
  messagingSenderId: "870690161174",
  appId: "1:870690161174:web:8404a87e361234ff346b37",
  measurementId: "G-MXGF4NV9FM"
});
const messaging = firebase.messaging();
