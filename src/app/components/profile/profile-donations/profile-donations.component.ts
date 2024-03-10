import { Component, OnInit, inject } from '@angular/core';
import { BadgeComponent } from "../../../shared/components/badge/badge.component";
import { DonationService } from '../../../core/services/donation/donation.service';
import { IDonation } from '../../../shared/interfaces/donation.interface';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile-donations',
    standalone: true,
    templateUrl: './profile-donations.component.html',
    styles: ``,
    imports: [CommonModule, BadgeComponent]
})
export class ProfileDonationsComponent implements OnInit {
  donations: IDonation[];
  donationService: DonationService = inject(DonationService);

  ngOnInit(): void {
    this.donationService.getUserDonations().subscribe({
      next: (res: IApiResponse<IDonation[]>) => this.donations = res.data
    })
  }

}
