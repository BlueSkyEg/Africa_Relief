import { Component, OnInit, ViewChild, inject } from '@angular/core';
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

@Component({
    selector: 'app-profile-donations',
    standalone: true,
    templateUrl: './profile-donations.component.html',
    styles: ``,
    imports: [CommonModule, BadgeComponent, ModalComponent, ButtonComponent, IconEnvelopeComponent, IconPhoneComponent, IconPinComponent]
})
export class ProfileDonationsComponent implements OnInit {
  donations: IDonation[];
  donationService: DonationService = inject(DonationService);

  ngOnInit(): void {
    this.donationService.getUserDonations().subscribe({
      next: (res: IApiResponse<IDonation[]>) => {this.donations = res.data

      }
    })
  }

  receiptDonation: IDonation;
  @ViewChild('receiptModal') receiptModal: ModalComponent;

  onViewReceipt(donation: IDonation) {
    this.receiptDonation = donation;
    this.receiptModal.openModal();
  }

}
