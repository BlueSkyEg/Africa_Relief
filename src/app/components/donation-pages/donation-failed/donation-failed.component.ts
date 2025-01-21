import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonLinkComponent } from '../../../shared/components/button-link/button-link.component';

@Component({
  selector: 'app-donation-failed',
  standalone: true,
  templateUrl: './donation-failed.component.html',
  styles: ``,
  imports: [ButtonLinkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonationFailedComponent {
  isUserRedirectedDuringDonation: boolean = false;
}
