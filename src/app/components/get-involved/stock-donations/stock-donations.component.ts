import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { IconClickComponent } from '../../../shared/icons/click/icon-click.component';
import { IconArrowRightComponent } from '../../../shared/icons/arrows/arrow-right/icon-arrow-right.component';
import { IconCompleteComponent } from '../../../shared/icons/complete/icon-complete.component';

@Component({
  selector: 'app-stock-donations',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    IconClickComponent,
    IconCompleteComponent,
    IconArrowRightComponent,
  ],
  templateUrl: './stock-donations.component.html',
})
export class StockDonationsComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.setMetaData();
  }

  private setMetaData(): void {
    this.titleService.setTitle(
      'Make a Difference with Stock Donations to ARCD | Africa Relief'
    );
    this.metaService.updateTag({
      name: 'description',
      content:
        "Support ARCD's mission through Stock Donations. Make a lasting impact by donating stocks online and helping drive meaningful change in our communities. Donate today!",
    });
  }
}
