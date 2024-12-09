import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { getToken, onMessage } from 'firebase/messaging';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {
    this.requestPermission();
    this.initializeFirebase();
  }

  requestPermission(): void {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  }

  initializeFirebase(): void {
    const app = initializeApp(environment.firebaseConfig);
    const messaging = getMessaging(app);

    navigator.serviceWorker
      .register('/assets/firebase-messaging-sw.js')
      .then((registration) => {
        getToken(messaging, {
          vapidKey: environment.firebaseVapiKey,
          serviceWorkerRegistration: registration,
        }).then((token) => {
          console.log('FCM token:', token);
        }).catch((err) => {
          console.log('Error getting FCM token', err);
        });
      }).catch((err) => {
        console.log('Service Worker registration failed', err);
      });

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon ?? '/assets/images/logo.webp'
      });
    });
  }
}
