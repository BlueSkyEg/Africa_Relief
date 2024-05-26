/*
  ***
  *** DON'T DELETE THIS FILE ***
  ***
*/

/*
  From Cloud Messaging Docs:

  FCM requires a "firebase-messaging-sw.js" file.
  Unless you already have a "firebase-messaging-sw.js" file,
  Create an empty file with that name and place it in the root of your domain before retrieving a token.
  You can add meaningful content to the file later in the client setup process.
*/

// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId
firebase.initializeApp({
  apiKey: "AIzaSyD7r8IkddHE6OoX_-PGkLug-IgIMCI31vc",
  authDomain: "africa-relief-413f9.firebaseapp.com",
  databaseURL: "https://africa-relief-413f9-default-rtdb.firebaseio.com",
  projectId: "africa-relief-413f9",
  storageBucket: "africa-relief-413f9.appspot.com",
  messagingSenderId: "1015741521572",
  appId: "1:1015741521572:web:0b1b778fd0f69b6c341031",
  measurementId: "G-FNEMBK1XQ4"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/images/logo.webp'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
