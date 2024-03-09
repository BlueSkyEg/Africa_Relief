import { Component, inject } from '@angular/core';
import {RouterModule} from "@angular/router";
import {LayoutService} from "../../../core/services/layout/layout.service";
import {ButtonLinkComponent} from "../../../shared/components/button-link/button-link.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, ButtonLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  layoutService: LayoutService = inject(LayoutService);

  openSideNav(): void {
    this.layoutService.sideNavSubject.next(true);
  }
}
