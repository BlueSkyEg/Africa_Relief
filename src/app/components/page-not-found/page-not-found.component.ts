import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ButtonLinkComponent } from '../../shared/components/button-link/button-link.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { MetaService } from '../../core/services/meta-data/meta.service';
@Component({
  selector: 'app-page-not-found',
  standalone: true,
  templateUrl: './page-not-found.component.html',
  styles: ``,
  imports: [ButtonLinkComponent],
})
export class PageNotFoundComponent {
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
  }
}
