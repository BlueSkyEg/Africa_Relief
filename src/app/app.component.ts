import {ChangeDetectorRef, Component,ChangeDetectionStrategy, OnInit, inject} from '@angular/core';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {MatSidenavModule} from "@angular/material/sidenav";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./components/layout/header/header.component";
import {FooterComponent} from "./components/layout/footer/footer.component";
import {SideNavComponent} from "./components/layout/side-nav/side-nav.component";
import {LayoutService} from "./core/services/layout/layout.service";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AuthService } from './core/services/auth/auth.service';
import { IApiResponse } from './shared/interfaces/api-response-interface';
import { IUser } from './shared/interfaces/auth/user.interface';
// import { FirebaseService } from './core/services/firebase/firebase.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    MatProgressBarModule,
  ],
  templateUrl: './app.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  opened: boolean = false;
  displayLoader: boolean = false;
  router: Router = inject(Router);
  layoutService: LayoutService = inject(LayoutService);
  authService: AuthService = inject(AuthService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  // Initialize Google Tag Manager
  gtmService: GoogleTagManagerService = inject(GoogleTagManagerService);

  // Initialize Firebase Notification
  // firebaseService: FirebaseService = inject(FirebaseService);

  constructor() {
    // Add Google Tag Manager Scripts to Dom
    this.gtmService.addGtmToDom();
  }

  ngOnInit(): void {
    // Push Google Tag Manager Page View Event
    this.router.events.forEach((item) => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.url,
        };
        this.gtmService.pushTag(gtmTag);
      }
    });

    // Toggle Side Nav
    this.layoutService.sideNavSubject.asObservable().subscribe({
      next: (value) => (this.opened = value),
    });

    // Display Loader
    this.layoutService.loaderSubject.asObservable().subscribe({
      next: (value) => {
        this.displayLoader = value;
        this.cdr.detectChanges();
      },
    });

    // Get Authed User
    if (this.authService.isUserAuthed()) {
      this.authService.getAuthedUser().subscribe({
        next: (res: IApiResponse<IUser>) =>
          this.authService.authedUserSubject.next(res.data),
      });
    }
  }
}
