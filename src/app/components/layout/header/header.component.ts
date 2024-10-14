import {
  ChangeDetectionStrategy,
  Component,
  inject,
  HostListener,
} from '@angular/core';
import { Router, RouterModule} from "@angular/router";
import {LayoutService} from "../../../core/services/layout/layout.service";
import {ButtonLinkComponent} from "../../../shared/components/button-link/button-link.component";
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUser } from '../../../shared/interfaces/auth/user.interface';
import {MatMenu,MatMenuTrigger} from '@angular/material/menu';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IconHamburgerComponent } from "../../../shared/icons/hamburger/icon-hamburger.component";
import { IconProfileComponent } from "../../../shared/icons/profile/icon-profile.component";
import { IconSearchComponent } from '../../../shared/icons/search/icon-search.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    RouterModule,
    ButtonLinkComponent,
    IconHamburgerComponent,
    IconProfileComponent,
    IconSearchComponent,
    SearchBarComponent,
    MatMenu,
    MatMenuTrigger,
    NgClass,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isUserAuthed: boolean = false;
  // Boolean flag to control the visibility of the search bar
  isSearchBarVisible = false;
  isAboutMenuVisible = false;
  router: Router = inject(Router);
  layoutService: LayoutService = inject(LayoutService);
  authService: AuthService = inject(AuthService);

  constructor() {
    this.authService.authedUserSubject.asObservable().subscribe({
      next: (user: IUser) =>
        user ? (this.isUserAuthed = true) : (this.isUserAuthed = false),
    });
  }
  // Toggles the visibility of the search bar
  toggleSearchBar() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }
  // Close search bar when i go to new path
  closeSearchBar() {
    this.isSearchBarVisible = false;
  }
  openSideNav(): void {
    this.layoutService.sideNavSubject.next(true);
  }
  toggleAboutMenu() {
    this.isAboutMenuVisible = !this.isAboutMenuVisible;
  }
  closeAboutMenu() {
    this.isAboutMenuVisible = false;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menuButton = document.querySelector('.relative button');
    const menu = document.querySelector('.relative ul');

    if (
      menuButton &&
      !menuButton.contains(target) &&
      menu &&
      !menu.contains(target)
    ) {
      this.closeAboutMenu();
    }
  }
  onLogout() {
    this.authService.logout().subscribe({
      next: (res: IApiResponse<null>) => {
        if (res.success) {
          localStorage.clear();
          this.authService.authedUserSubject.next(null);
          this.router.navigateByUrl('/login');
        }
      },
    });
  }
}
