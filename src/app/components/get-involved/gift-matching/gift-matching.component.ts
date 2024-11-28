import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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
export class GiftMatchingComponent implements OnInit {

  ngOnInit(): void {
  this.loadScript();
  }

  loadScript() {
    const script = document.createElement('script');
    script.src = 'https://doublethedonation.com/api/js/ddplugin.js';
    script.async = true;
    document.body.appendChild(script);
  }
}