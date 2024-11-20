import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { EmployerComponent } from '../../../shared/icons/employee/icon-employee.component';
import { SubmitIconComponent } from '../../../shared/icons/submit/icon-submit.component';
import { GiftIconComponent } from '../../../shared/icons/gift/icon-gift.component';
import { ScriptLoaderService } from '../../../core/services/script-loader.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

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
  constructor(
    private scriptLoader: ScriptLoaderService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loadScriptOnNavigation();

    // Listen for navigation events and reload the script
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadScriptOnNavigation(); // Ensure script is reloaded when navigating back to this page
      });
  }

  ngAfterViewChecked() {
    // Make sure the donation plugin is initialized after the view is checked
    this.scriptLoader.initializeDonationPlugin();
  }

  loadScriptOnNavigation() {
    if (typeof window !== 'undefined') {
      this.scriptLoader.loadScript();
    }
  }
}
