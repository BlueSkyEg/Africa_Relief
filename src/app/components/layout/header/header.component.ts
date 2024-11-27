import {
  Component,
  inject,
  HostListener,
  Renderer2,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LayoutService } from '../../../core/services/layout/layout.service';
import { ButtonLinkComponent } from '../../../shared/components/button-link/button-link.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUser } from '../../../shared/interfaces/auth/user.interface';
import { MatMenuModule } from '@angular/material/menu';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IconHamburgerComponent } from '../../../shared/icons/hamburger/icon-hamburger.component';
import { IconProfileComponent } from '../../../shared/icons/profile/icon-profile.component';
import { IconSearchComponent } from '../../../shared/icons/search/icon-search.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    IconHamburgerComponent,
    IconProfileComponent,
    IconSearchComponent,
    SearchBarComponent,
  ],
})
export class HeaderComponent {
  isUserAuthed: boolean = false;
  isSearchBarVisible: boolean = false;
  isAboutMenuVisible: boolean = false;
  isGetInvolvedMenuVisible: boolean = false;
  router: Router = inject(Router);
  layoutService: LayoutService = inject(LayoutService);
  authService: AuthService = inject(AuthService);
  private renderer: Renderer2 = inject(Renderer2);
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  constructor() {
    this.authService.authedUserSubject.asObservable().subscribe({
      next: (user: IUser) =>
        user ? (this.isUserAuthed = true) : (this.isUserAuthed = false),
    });
  }

  toggleSearchBar() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  closeSearchBar() {
    this.isSearchBarVisible = false;
  }

  openSideNav(): void {
    this.layoutService.sideNavSubject.next(true);
  }

  toggleAboutMenu() {
    this.isAboutMenuVisible = !this.isAboutMenuVisible;
  }

  toggleGetInvolvedMenu() {
    this.isGetInvolvedMenuVisible = !this.isGetInvolvedMenuVisible;
  }

  closeAboutMenu() {
    this.isAboutMenuVisible = false;
  }

  closeGetInvolvedMenu() {
    this.isGetInvolvedMenuVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const target = event.target as HTMLElement;

    const aboutUsButton = this.renderer.selectRootElement(
      '.about-us-button',
      true
    );
    const aboutUsMenu = this.renderer.selectRootElement('.about-us-menu', true);

    const getInvolvedButton = this.renderer.selectRootElement(
      '.get-involved-button',
      true
    );
    const getInvolvedMenu = this.renderer.selectRootElement(
      '.get-involved-menu',
      true
    );

    if (
      aboutUsButton &&
      !aboutUsButton.contains(target) &&
      aboutUsMenu &&
      !aboutUsMenu.contains(target) &&
      this.isAboutMenuVisible
    ) {
      this.closeAboutMenu();
    }

    if (
      getInvolvedButton &&
      !getInvolvedButton.contains(target) &&
      getInvolvedMenu &&
      !getInvolvedMenu.contains(target) &&
      this.isGetInvolvedMenuVisible
    ) {
      this.closeGetInvolvedMenu();
    }
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: (res: IApiResponse<null>) => {
        if (res.success) {
          if (this.isBrowser) {
            localStorage.clear();
          }
          this.authService.authedUserSubject.next(null);
          this.router.navigateByUrl('/login');
        }
      },
    });
  }
}
