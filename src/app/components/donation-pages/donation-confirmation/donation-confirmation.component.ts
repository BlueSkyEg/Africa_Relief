import { Component, inject, PLATFORM_ID, Inject } from '@angular/core';
import { ButtonLinkComponent } from '../../../shared/components/button-link/button-link.component';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';
import { Renderer2 } from '@angular/core';
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
  private platformId = inject(PLATFORM_ID);
  private renderer: Renderer2 = inject(Renderer2);
  // Determine if the user was redirected during the donation
  isUserRedirectedDuringDonation: boolean = false;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const donationStarted = sessionStorage.getItem('donationStarted');
      this.isUserRedirectedDuringDonation = donationStarted
        ? JSON.parse(donationStarted)
        : false;
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateCanonicalURL();

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => this.updateCanonicalURL());
    }
  }

  private updateCanonicalURL(): void {
    if (isPlatformBrowser(this.platformId)) {
      const url = window.location.href;
      const link: HTMLLinkElement =
        this.renderer.selectRootElement("link[rel='canonical']", true) ||
        this.createCanonicalLink();

      this.renderer.setAttribute(link, 'href', url);

      // Set Open Graph URL
      this.metaService.updateTag({
        property: 'og:url',
        content: url,
      });
    }
  }

  private createCanonicalLink(): HTMLLinkElement {
    if (isPlatformBrowser(this.platformId)) {
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'canonical');
      this.renderer.appendChild(document.head, link);
      return link;
    }
    return null as unknown as HTMLLinkElement;
  }
}
