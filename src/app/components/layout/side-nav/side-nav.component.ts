import { Component, inject } from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {LayoutService} from "../../../core/services/layout/layout.service";

@Component({
  selector: 'app-side-nav',
  standalone: true,
    imports: [
        RouterModule,
        CommonModule
    ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  openChildMenu: Boolean = false;
  layoutService: LayoutService = inject(LayoutService);

  closeSideNav(): void {
      this.layoutService.sideNavSubject.next(false);
  }
}
