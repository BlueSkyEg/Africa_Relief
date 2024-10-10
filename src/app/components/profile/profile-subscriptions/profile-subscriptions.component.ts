import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';
import { BadgeComponent } from "../../../shared/components/badge/badge.component";
import { SubscriptionService } from '../../../core/services/subscription/subscription.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { ISubscription } from '../../../shared/interfaces/subscription.interface';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-profile-subscriptions',
  standalone: true,
  templateUrl: './profile-subscriptions.component.html',
  styles: ``,
  imports: [CommonModule, BadgeComponent, ModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSubscriptionsComponent implements OnInit {
  subscriptions: ISubscription[];
  subscriptionNeedToCanceled: ISubscription;
  subscriptionService: SubscriptionService = inject(SubscriptionService);
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
