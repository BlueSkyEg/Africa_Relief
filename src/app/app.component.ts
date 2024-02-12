import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatSidenavModule} from "@angular/material/sidenav";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./components/layout/header/header.component";
import {FooterComponent} from "./components/layout/footer/footer.component";
import {SideNavComponent} from "./components/layout/side-nav/side-nav.component";
import {SideNavService} from "./core/services/layout/side-nav.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, CommonModule, HeaderComponent, FooterComponent, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  opened: boolean = false;

  constructor(private sideNavService: SideNavService) {
  }

  ngOnInit(): void {
    this.sideNavService.sideNav().subscribe({
      next: value => this.opened = value
    })
  }
}
