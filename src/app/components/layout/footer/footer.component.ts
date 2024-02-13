import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonLinkComponent} from "../../../shared/components/button-link/button-link.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {IconLinkedinComponent} from "../../../shared/icons/social-media/linkedin/icon-linkedin.component";
import {IconYoutubeComponent} from "../../../shared/icons/social-media/youtube/icon-youtube.component";
import {IconInstagramComponent} from "../../../shared/icons/social-media/instagram/icon-instagram.component";
import {IconFacebookComponent} from "../../../shared/icons/social-media/facebook/icon-facebook.component";
import {IconDirective} from "../../../shared/directives/icon.directive";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonLinkComponent,
    ReactiveFormsModule,
    IconLinkedinComponent,
    IconYoutubeComponent,
    IconInstagramComponent,
    IconFacebookComponent,
    IconDirective
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private fb: FormBuilder) {
  }

  openExploreAccordion: Boolean = false;
  openProjectsAccordion: Boolean = false;

  newsLetterForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit(formValue: any) {
    console.log(formValue);
  }
}
