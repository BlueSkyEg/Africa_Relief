import {ChangeDetectorRef, Component, OnInit, inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatSidenavModule} from "@angular/material/sidenav";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./components/layout/header/header.component";
import {FooterComponent} from "./components/layout/footer/footer.component";
import {SideNavComponent} from "./components/layout/side-nav/side-nav.component";
import {LayoutService} from "./core/services/layout/layout.service";
import {DonationModalComponent} from "./shared/components/donation-modal/donation-modal.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AuthService } from './core/services/auth/auth.service';
import { IApiResponse } from './shared/interfaces/api-response-interface';
import { IUser } from './shared/interfaces/auth/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, CommonModule, HeaderComponent, FooterComponent, SideNavComponent, DonationModalComponent, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  opened: boolean = false;
  displayLoader: boolean = false;
  layoutService: LayoutService = inject(LayoutService);
  authService: AuthService = inject(AuthService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Toggle Side Nav
    this.layoutService.sideNavSubject.asObservable().subscribe({
      next: value => this.opened = value
    });

    // Display Loader
    this.layoutService.loaderSubject.asObservable().subscribe({
      next: value => {
        this.displayLoader = value
        this.cdr.detectChanges();
      }
    })

    // Get Authed User
    if(this.authService.isUserAuthed()) {
      this.authService.getAuthedUser().subscribe({
        next: (res: IApiResponse<IUser>) => this.authService.authedUserSubject.next(res.data)
      })
    }
  }
}
