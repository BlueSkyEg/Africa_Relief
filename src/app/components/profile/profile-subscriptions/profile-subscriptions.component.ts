import {
  Component,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { SubscriptionService } from '../../../core/services/subscription/subscription.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { ISubscription } from '../../../shared/interfaces/subscription.interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MetaService } from '../../../core/services/meta-data/meta.service';
@Component({
  selector: 'app-profile-subscriptions',
  standalone: true,
  templateUrl: './profile-subscriptions.component.html',
  styles: ``,
  imports: [CommonModule, BadgeComponent, ModalComponent],
})
export class ProfileSubscriptionsComponent implements OnInit {
  subscriptions: ISubscription[];
  subscriptionNeedToCanceled: ISubscription;
  subscriptionService: SubscriptionService = inject(SubscriptionService);
  _MetaService: MetaService = inject(MetaService);
  private platformId = inject(PLATFORM_ID);
  router: Router = inject(Router);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._MetaService.setCanonicalURL(window.location.href);

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this._MetaService.setCanonicalURL(window.location.href);
        });
    }

    this.subscriptionService.getUserSubscriptions().subscribe({
      next: (res: IApiResponse<ISubscription[]>) => {
        this.subscriptions = res.data;
      },
    });
  }

  @ViewChild('cancelSubscriptionModal') cancelSubscriptionModal: ModalComponent;

  onOpenCancelSubscriptionModal(subscription: ISubscription) {
    this.subscriptionNeedToCanceled = subscription;
    this.cancelSubscriptionModal.openModal();
  }

  onCancelSubcription() {
    this.cancelSubscriptionModal.closeModal();
    this.subscriptionService
      .cancelSubscription(
        this.subscriptionNeedToCanceled.stripe_subscription_id
      )
      .subscribe({
        next: (res: IApiResponse<null>) => {
          if (res.success) {
            const canceledSubscriptionIndex = this.subscriptions.findIndex(
              (subscription) => subscription == this.subscriptionNeedToCanceled
            );
            this.subscriptions[canceledSubscriptionIndex].status = 'canceled';
          }
        },
      });
  }
}
