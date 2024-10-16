import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { IconFollowComponent } from '../../../shared/icons/follow/icon-follow.component';
import { IconClickComponent } from '../../../shared/icons/click/icon-click.component';
import { IconSelectComponent } from '../../../shared/icons/select/icon-select.component';
import { ButtonLinkComponent } from '../../../shared/components/button-link/button-link.component';
import { IconArrowRightComponent } from '../../../shared/icons/arrows/arrow-right/icon-arrow-right.component';

@Component({
  selector: 'app-stock-donations',
  standalone: true,
  imports: [BreadcrumbComponent ,IconFollowComponent,IconClickComponent,IconSelectComponent  ,IconArrowRightComponent] ,
  templateUrl: './stock-donations.component.html',
  styleUrl: './stock-donations.component.scss'
})
export class StockDonationsComponent {

}
