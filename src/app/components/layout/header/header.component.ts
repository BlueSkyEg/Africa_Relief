import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {SideNavService} from "../../../core/services/layout/side-nav.service";
import {ButtonLinkComponent} from "../../../shared/components/button-link/button-link.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, ButtonLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private sideNavService: SideNavService) {
  }

  openSideNav(): void {
    this.sideNavService.sideNavOpened.next(true);
  }
}
