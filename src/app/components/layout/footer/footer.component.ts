import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonLinkComponent } from '../../../shared/components/button-link/button-link.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconLinkedinComponent } from '../../../shared/icons/social-media/linkedin/icon-linkedin.component';
import { IconYoutubeComponent } from '../../../shared/icons/social-media/youtube/icon-youtube.component';
import { IconInstagramComponent } from '../../../shared/icons/social-media/instagram/icon-instagram.component';
import { IconFacebookComponent } from '../../../shared/icons/social-media/facebook/icon-facebook.component';
import { IconDirective } from '../../../shared/directives/icon.directive';
import { ButtonComponent } from '../../../shared/components/form/button/button.component';
import { NewsletterService } from '../../../core/services/newsletter/newsletter.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styles: ``,
  imports: [
    CommonModule,
    RouterModule,
    ButtonLinkComponent,
    ReactiveFormsModule,
    IconLinkedinComponent,
    IconYoutubeComponent,
    IconInstagramComponent,
    IconFacebookComponent,
    IconDirective,
    ButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  openExploreAccordion: boolean = false;
  openProjectsAccordion: boolean = false;
  newsletterFormDisabled: boolean = false;
  fb: FormBuilder = inject(FormBuilder);
  newsletterService: NewsletterService = inject(NewsletterService);
  _snackBar: MatSnackBar = inject(MatSnackBar);

  newsletterForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmitNewsLetterForm() {
    this.newsletterFormDisabled = true;
    this.newsletterService
      .subscribeToNewsletter(this.newsletterForm.getRawValue())
      .subscribe({
        next: (res: IApiResponse<null>) => {
          if (res.success) {
            this.newsletterForm.reset();
            this._snackBar.open(
              'Thank you for joining our family. Stay tuned for the latest updates!',
              '✖',
              { panelClass: 'success-snackbar' }
            );
          } else if (res.message == 'validation error') {
            this._snackBar.open(res.errors['email'][0], '✖', {
              panelClass: 'failure-snackbar',
            });
          }
          this.newsletterFormDisabled = false;
        },
      });
  }
}
