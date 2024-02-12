import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SideNavService} from "../../../core/services/layout/side-nav.service";

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

  constructor(private sideNavService: SideNavService) {
  }

  closeSideNav(): void {
      this.sideNavService.sideNavOpened.next(false);
  }
}
