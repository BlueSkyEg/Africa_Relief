import {Component, ElementRef, ViewChild} from '@angular/core';
import KeenSlider, {KeenSliderInstance} from "keen-slider";
import {IconArrowLeftComponent} from "../../../shared/icons/arrow-left/icon-arrow-left.component";
import {IconArrowRightComponent} from "../../../shared/icons/arrow-right/icon-arrow-right.component";
import {ButtonLinkComponent} from "../../../shared/components/button-link/button-link.component";
import {IconDirective} from "../../../shared/directives/icon.directive";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-projects-slider-section',
  standalone: true,
  imports: [
    RouterModule,
    IconArrowLeftComponent,
    IconArrowRightComponent,
    ButtonLinkComponent,
    IconDirective
  ],
  templateUrl: './projects-slider-section.component.html',
  styleUrls: [
    '../../../../../node_modules/keen-slider/keen-slider.min.css',
    './projects-slider-section.component.scss'
  ]
})
export class ProjectsSliderSectionComponent {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>

  slider: KeenSliderInstance = null;

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      breakpoints: {
        "(min-width: 700px)": {
          slides: { perView: 2 },
        },
        "(min-width: 1100px)": {
          slides: { perView: 3 },
        },
        "(min-width: 1400px)": {
          slides: { perView: 4 },
        },
      },
      slides: { perView: 1 },
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
