import { Component } from '@angular/core';
import { ButtonLinkComponent } from "../../../shared/components/button-link/button-link.component";

@Component({
    selector: 'app-donation-failed',
    standalone: true,
    templateUrl: './donation-failed.component.html',
    styles: ``,
    imports: [ButtonLinkComponent]
})
export class DonationFailedComponent {

  isUserRedirectedDuringDonation: boolean = JSON.parse(sessionStorage.getItem('donationStarted')) ?? false;
}
