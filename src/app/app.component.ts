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
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.layoutService.sideNavSubject.asObservable().subscribe({
      next: value => this.opened = value
    });

    this.layoutService.loaderSubject.asObservable().subscribe({
      next: value => {
        this.displayLoader = value
        this.cdr.detectChanges();
      }
    })
  }
}
