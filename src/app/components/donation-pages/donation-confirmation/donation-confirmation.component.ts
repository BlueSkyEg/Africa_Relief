import {  Component, inject } from '@angular/core';
import { ButtonLinkComponent } from '../../../shared/components/button-link/button-link.component';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-donation-confirmation',
  standalone: true,
  templateUrl: './donation-confirmation.component.html',
  styles: ``,
  imports: [ButtonLinkComponent],
})
export class DonationConfirmationComponent {
  private metaService: Meta = inject(Meta);
  private router: Router = inject(Router);

  // Determine if the user was redirected during the donation
  isUserRedirectedDuringDonation: boolean = JSON.parse(
    sessionStorage.getItem('donationStarted') || 'false'
  );

  ngOnInit(): void {
    this.updateCanonicalURL();

    // Update the canonical URL on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateCanonicalURL());
  }

  private updateCanonicalURL(): void {
    const url = window.location.href;
    const link: HTMLLinkElement =
      document.querySelector("link[rel='canonical']") ||
      this.createCanonicalLink();
    link.setAttribute('href', url);
    // Set Open Graph URL
    this.metaService.updateTag({
      property: 'og:url',
      content: url,
    });
  }
  private createCanonicalLink(): HTMLLinkElement {
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
    return link;
  }
}
