import { Component, inject } from '@angular/core';
import { Router, RouterModule} from "@angular/router";
import {LayoutService} from "../../../core/services/layout/layout.service";
import {ButtonLinkComponent} from "../../../shared/components/button-link/button-link.component";
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUser } from '../../../shared/interfaces/auth/user.interface';
import {MatMenuModule} from '@angular/material/menu';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, ButtonLinkComponent, MatMenuModule],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  isUserAuthed: boolean = false;

  router: Router = inject(Router);
  layoutService: LayoutService = inject(LayoutService);
  authService: AuthService = inject(AuthService);

  constructor() {
    this.authService.authedUserSubject.asObservable().subscribe({
      next: (user: IUser) => user ? this.isUserAuthed = true : this.isUserAuthed = false
    })
  }

  openSideNav(): void {
    this.layoutService.sideNavSubject.next(true);
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: (res: IApiResponse<null>) => {
        if(res.success) {
          localStorage.clear();
          this.authService.authedUserSubject.next(null);
          this.router.navigateByUrl('/login');
        }
      }
    })
  }
}
