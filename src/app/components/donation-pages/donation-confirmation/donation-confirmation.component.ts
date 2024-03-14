import { Component } from '@angular/core';
import { ButtonLinkComponent } from "../../../shared/components/button-link/button-link.component";

@Component({
    selector: 'app-donation-confirmation',
    standalone: true,
    templateUrl: './donation-confirmation.component.html',
    styles: ``,
    imports: [ButtonLinkComponent]
})
export class DonationConfirmationComponent {

  isUserRedirectedDuringDonation: boolean = JSON.parse(sessionStorage.getItem('donationStarted')) ?? false;
}
