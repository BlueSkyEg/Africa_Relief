import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';
import { BadgeComponent } from "../../../shared/components/badge/badge.component";
import { DonationService } from '../../../core/services/donation/donation.service';
import { IDonation } from '../../../shared/interfaces/donation/donation.interface';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ButtonComponent } from "../../../shared/components/form/button/button.component";
import { IconEnvelopeComponent } from "../../../shared/icons/envelope/icon-envelope.component";
import { IconPhoneComponent } from "../../../shared/icons/phone/icon-phone.component";
import { IconPinComponent } from "../../../shared/icons/pin/icon-pin.component";
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-profile-donations',
  standalone: true,
  templateUrl: './profile-donations.component.html',
  styles: ``,
  imports: [
    CommonModule,
    BadgeComponent,
    ModalComponent,
    ButtonComponent,
    IconEnvelopeComponent,
    IconPhoneComponent,
    IconPinComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileDonationsComponent implements OnInit {
  donations: IDonation[];
  donationService: DonationService = inject(DonationService);
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

    this.donationService.getUserDonations().subscribe({
      next: (res: IApiResponse<IDonation[]>) => {
        this.donations = res.data;
      },
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
  receiptDonation: IDonation;
  @ViewChild('receiptModal') receiptModal: ModalComponent;

  onViewReceipt(donation: IDonation) {
    this.receiptDonation = donation;
    this.receiptModal.openModal();
  }
}
