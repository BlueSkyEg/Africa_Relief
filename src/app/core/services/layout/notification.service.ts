import { Injectable, inject } from '@angular/core';
import Echo from "laravel-echo"
import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../../../shared/interfaces/auth/user.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  echo: Echo;
  authService: AuthService = inject(AuthService);

  constructor() {
    this.showNotification();
  }

  private showNotification() {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
    }

    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        this.setupWebSocket();
      }
    });
  }

  private setupWebSocket() {
    const options = {
      broadcaster: 'pusher',
      cluster: 'mt1',
      key: '654SD877fjk7fgf8d788',
      wsHost: '10.1.1.71',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true
    };

    const authOptions = this.authService.isUserAuthed() ? {
      authEndpoint: `${environment.apiUrl}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    } : {};

    this.echo = new Echo({...options, ...authOptions});

    this.websocketPublicChannelListening();
    this.websocketPrivateChannelListening();
  }

  private websocketPublicChannelListening() {
    this.echo.channel('public-notifications')
    .listen('PublicNotificationSent', (res) => {
      console.log('Public Channel Data : ', res)
      new Notification(res.message, { body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' });
    })
  }

  private websocketPrivateChannelListening() {
    this.authService.authedUserSubject.asObservable().subscribe({
      next: (user: IUser) => {
        if(Notification.permission === "granted" && user !== null) {
          this.echo.private('App.Models.User.' + user.id)
          .notification((res) => {
            console.log('Project Notification Data', res);
            new Notification(res.message, { body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' });
          });
        }
      }
    })
  }
}
