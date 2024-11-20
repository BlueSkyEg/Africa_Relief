import {
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { ButtonLinkComponent } from '../../../shared/components/button-link/button-link.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { MetaService } from '../../../core/services/meta-data/meta.service';

@Component({
  selector: 'app-donation-failed',
  standalone: true,
  templateUrl: './donation-failed.component.html',
  styles: ``,
  imports: [ButtonLinkComponent],
})
export class DonationFailedComponent {
  _MetaService: MetaService = inject(MetaService);
  private platformId = inject(PLATFORM_ID);
  router: Router = inject(Router);

  isUserRedirectedDuringDonation: boolean = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._MetaService.setCanonicalURL(window.location.href);

      const donationStarted = sessionStorage.getItem('donationStarted');
      this.isUserRedirectedDuringDonation =
        JSON.parse(donationStarted) ?? false;

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this._MetaService.setCanonicalURL(window.location.href);
        });
    }
  }
}
