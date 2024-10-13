import { Component, inject, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../../core/services/layout/layout.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './side-nav.component.html',
  styles: ``,
})
export class SideNavComponent {
  openChildMenu: boolean = false;

  router: Router = inject(Router);
  layoutService: LayoutService = inject(LayoutService);

  // Store the current screen size status
  isLargeScreen: boolean = false;

  ngOnInit(): void {
    this.checkScreenSize(); // Check screen size on initialization
  }

  // Listen to window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize(); // Check screen size on resize
  }

  checkScreenSize(): boolean {
    const width = window.innerWidth;
    this.isLargeScreen = width >= 1280; // Define 'xl' as 1280px
    // If screen size is large, close the side nav
    if (this.isLargeScreen) {
      this.closeSideNav();
    }
    return this.isLargeScreen; // Return the screen size status
  }

  onRouterNavigate(route: string) {
    this.closeSideNav(); // Close the side nav when navigating
    this.router.navigateByUrl(route);
  }

  closeSideNav(): void {
    this.layoutService.sideNavSubject.next(false); // Close the side nav
  }
}
