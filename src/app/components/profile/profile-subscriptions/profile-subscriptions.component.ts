import { Component, OnInit, inject } from '@angular/core';
import { BadgeComponent } from "../../../shared/components/badge/badge.component";
import { SubscriptionService } from '../../../core/services/subscription/subscription.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { ISubscription } from '../../../shared/interfaces/subscription.interface';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile-subscriptions',
    standalone: true,
    templateUrl: './profile-subscriptions.component.html',
    styles: ``,
    imports: [CommonModule, BadgeComponent]
})
export class ProfileSubscriptionsComponent implements OnInit {

  subscriptions: ISubscription[];
  subscriptionService: SubscriptionService = inject(SubscriptionService);

  ngOnInit(): void {
    this.subscriptionService.getUserSubscriptions().subscribe({
      next: (res: IApiResponse<ISubscription[]>) => this.subscriptions = res.data
    })
  }
}
