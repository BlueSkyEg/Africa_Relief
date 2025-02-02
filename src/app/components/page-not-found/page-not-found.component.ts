import { ChangeDetectionStrategy, Component, Inject, inject, Optional, PLATFORM_ID } from '@angular/core';
import { ButtonLinkComponent } from '../../shared/components/button-link/button-link.component';
import { isPlatformServer } from '@angular/common';
import { Response } from 'express';
import { RESPONSE } from '../../../../server.token';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  templateUrl: './page-not-found.component.html',
  styles: ``,
  imports: [ButtonLinkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {
  private platformId = inject(PLATFORM_ID);
  constructor(@Optional() @Inject(RESPONSE) private response: Response) {
    // Only executes server-side
    if (isPlatformServer(this.platformId)) {
      this.response?.status(404);
    }
  }
}
