import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { EmployerComponent } from '../../../shared/icons/employee/icon-employee.component';
import { SubmitIconComponent } from '../../../shared/icons/submit/icon-submit.component';
import { GiftIconComponent } from '../../../shared/icons/gift/icon-gift.component';

@Component({
  selector: 'app-gift-matching',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    EmployerComponent,
    SubmitIconComponent,
    GiftIconComponent,
  ],
  templateUrl: './gift-matching.component.html',
})
export class GiftMatchingComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    // Dynamically load the Double the Donation script
    const script = document.createElement('script');
    script.src = "https://doublethedonation.com/api/js/ddplugin.js";
    script.async = true;
    script.onload = () => {
      if (window['doubleDonationWidget']) {
        window['doubleDonationWidget'].init({
          //organizationId: 'YOUR_ORG_ID',
          apiKey: 'RH1iTkwaqpkVBfjB',
        });
      }
    };
    document.body.appendChild(script);
  }
}