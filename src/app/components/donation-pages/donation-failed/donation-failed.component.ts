import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonLinkComponent } from "../../../shared/components/button-link/button-link.component";
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-donation-failed',
  standalone: true,
  templateUrl: './donation-failed.component.html',
  styles: ``,
  imports: [ButtonLinkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonationFailedComponent {
  metaService: Meta = inject(Meta);
  router: Router = inject(Router);
  ngOnInit(): void {
    this.setCanonicalURL(window.location.href);

    // Update the canonical URL on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setCanonicalURL(window.location.href);
      });
  }
  setCanonicalURL(url: string) {
    let link: HTMLLinkElement =
      document.querySelector("link[rel='canonical']") || null;

    if (link) {
      link.setAttribute('href', url);
    } else {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
    // Set og:url
    this.metaService.updateTag({
      property: 'og:url',
      content: url,
    });
  }
  isUserRedirectedDuringDonation: boolean =
    JSON.parse(sessionStorage.getItem('donationStarted')) ?? false;
}
