import { Component, OnInit, AfterViewChecked } from '@angular/core';
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
  private readonly pluginUrl =
    'https://doublethedonation.com/api/js/ddplugin.js';

  constructor(
    private scriptLoader: ScriptLoaderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAndInitializePlugin();

    // Reload script on navigation to this component
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadAndInitializePlugin();
      });
  }

  private loadAndInitializePlugin() {
    this.scriptLoader.injectDDConfig(); // Ensure the config is loaded first

    this.scriptLoader
      .loadScript(this.pluginUrl)
      .then(() => {
        console.log('Donation Plugin Script loaded successfully');
        this.scriptLoader.initializeDonationPlugin(); // Initialize after load
      })
      .catch((err) =>
        console.error('Error loading Donation Plugin Script:', err)
      );
  }
}