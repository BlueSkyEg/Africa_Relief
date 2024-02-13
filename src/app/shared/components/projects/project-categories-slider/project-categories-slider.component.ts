import { Component, ElementRef, ViewChild } from "@angular/core"
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import {IconFoodComponent} from "../../../icons/projects/food/icon-food.component";
import {IconEducationComponent} from "../../../icons/projects/education/icon-education.component";
import {IconMedicalComponent} from "../../../icons/projects/medical/icon-medical.component";
import {IconWaterComponent} from "../../../icons/projects/water/icon-water.component";
import {IconOrphanComponent} from "../../../icons/projects/orphan/icon-orphan.component";
import {IconZakatComponent} from "../../../icons/projects/zakat/icon-zakat.component";
import {IconRamadanComponent} from "../../../icons/projects/ramadan/icon-ramadan.component";
import {ButtonLinkComponent} from "../../button-link/button-link.component";
import {ArrowLeftComponent} from "../../../icons/arrow-left/arrow-left.component";
import {ArrowRightComponent} from "../../../icons/arrow-right/arrow-right.component";
import {IconDirective} from "../../../directives/icon.directive";

@Component({
  selector: 'app-project-categories-slider',
  standalone: true,
  imports: [
    IconFoodComponent,
    IconEducationComponent,
    IconMedicalComponent,
    IconWaterComponent,
    IconOrphanComponent,
    IconZakatComponent,
    IconRamadanComponent,
    ButtonLinkComponent,
    ArrowLeftComponent,
    ArrowRightComponent,
    IconDirective
  ],
  templateUrl: './project-categories-slider.component.html',
  styleUrls: [
    '../../../../../../node_modules/keen-slider/keen-slider.min.css',
    './project-categories-slider.component.scss'
  ]
})
export class ProjectCategoriesSliderComponent {
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
