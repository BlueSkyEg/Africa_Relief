import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {LayoutService} from "../../../core/services/layout/layout.service";

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './side-nav.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {
  openChildMenu: Boolean = false;

  router: Router = inject(Router);
  layoutService: LayoutService = inject(LayoutService);

  onRouterNavigate(route: string) {
    this.closeSideNav();
    this.router.navigateByUrl(route);
  }

  closeSideNav(): void {
    this.layoutService.sideNavSubject.next(false);
  }
}
