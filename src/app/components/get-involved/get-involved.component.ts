import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { BecomeVolunteerFormSectionComponent } from "./become-volunteer-form-section/become-volunteer-form-section.component";
import { ButtonLinkComponent } from "../../shared/components/button-link/button-link.component";
import { AccordionComponent } from "../../shared/components/accordion/accordion.component";
import {MatExpansionModule} from '@angular/material/expansion';
import { ImgPlaceholderDirective } from '../../shared/directives/img-placeholder.directive';
import { IContent } from '../../shared/interfaces/content-interface';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-get-involved',
  standalone: true,
  templateUrl: './get-involved.component.html',
  styles: ``,
  imports: [
    MatExpansionModule,
    BreadcrumbComponent,
    BecomeVolunteerFormSectionComponent,
    ButtonLinkComponent,
    AccordionComponent,
    ImgPlaceholderDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetInvolvedComponent {
  metaService: Meta = inject(Meta);
  router: Router = inject(Router);
  ngOnInit(): void {
    this.setCanonicalURL(window.location.href);

    // Update the canonical URL on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setCanonicalURL(window.location.href);
      });
  }
  setCanonicalURL(url: string) {
    let link: HTMLLinkElement =
      document.querySelector("link[rel='canonical']") || null;

    if (link) {
      link.setAttribute('href', url);
    } else {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
    // Set og:url
    this.metaService.updateTag({
      property: 'og:url',
      content: url,
    });
  }
  accordionsContent: IContent[] = [
    {
      type: 'heading',
      body: 'What are employee matching gift programs?',
      order: 0,
    },
    {
      type: 'paragraph',
      body: 'Employee matching gift programs are corporate giving programs in which the company matches donations made by employees to eligible nonprofit organizations. It’s an easy way to double your contribution to us!',
      order: 1,
    },
    {
      type: 'heading',
      body: 'How do I request a matching gift or volunteer grant?',
      order: 2,
    },
    {
      type: 'paragraph',
      body: 'Requesting a matching gift or volunteer grant is normally a five-minute process which must be initiated by the donor/volunteer. You can do this by filling out and submitting a form provided by your employer or through an electronic submission process.',
      order: 3,
    },
    {
      type: 'heading',
      body: 'What if I still have questions?',
      order: 4,
    },
    {
      type: 'paragraph',
      body: 'For questions regarding your company’s programs, please contact your employer’s HR or community-giving department. Much of the necessary information is also available on your companies website.',
      order: 5,
    },
    {
      type: 'heading',
      body: 'What are volunteer grant programs?',
      order: 6,
    },
    {
      type: 'paragraph',
      body: 'Volunteer grant programs are corporate giving programs in which companies provide monetary donations to organizations where employees volunteer regularly. If you volunteer with us, it’s an easy way to provide us with additional financial support!',
      order: 7,
    },
    {
      type: 'heading',
      body: 'How is this information obtained?',
      order: 8,
    },
    {
      type: 'paragraph',
      body: 'We partner with a company called Double the Donation. If you see anything that should be changed, please email Double the Donation’s team at data@doublethedonation.com',
      order: 9,
    },
  ];
}
