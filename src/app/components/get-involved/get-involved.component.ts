import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { BecomeVolunteerFormSectionComponent } from "./become-volunteer-form-section/become-volunteer-form-section.component";
import { ButtonLinkComponent } from "../../shared/components/button-link/button-link.component";
import { AccordionComponent } from "../../shared/components/accordion/accordion.component";
import { IContent } from '../../shared/interfaces/content-interface';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
    selector: 'app-get-involved',
    standalone: true,
    templateUrl: './get-involved.component.html',
    styleUrl: './get-involved.component.scss',
    imports: [MatExpansionModule, BreadcrumbComponent, BecomeVolunteerFormSectionComponent, ButtonLinkComponent, AccordionComponent]
})
export class GetInvolvedComponent {
  accordionsContent: IContent[] = [
    {
      heading: "What are employee matching gift programs?",
      description: "Employee matching gift programs are corporate giving programs in which the company matches donations made by employees to eligible nonprofit organizations. It’s an easy way to double your contribution to us!"
    },
    {
      heading: "How do I request a matching gift or volunteer grant?",
      description: "Requesting a matching gift or volunteer grant is normally a five-minute process which must be initiated by the donor/volunteer. You can do this by filling out and submitting a form provided by your employer or through an electronic submission process."
    },
    {
      heading: "What if I still have questions?",
      description: "For questions regarding your company’s programs, please contact your employer’s HR or community-giving department. Much of the necessary information is also available on your companies website."
    },
    {
      heading: "What are volunteer grant programs?",
      description: "Volunteer grant programs are corporate giving programs in which companies provide monetary donations to organizations where employees volunteer regularly. If you volunteer with us, it’s an easy way to provide us with additional financial support!"
    },
    {
      heading: "How is this information obtained?",
      description: "We partner with a company called Double the Donation. If you see anything that should be changed, please email Double the Donation’s team at data@doublethedonation.com"
    }
  ]
}
