import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal} from "@angular/core"
import {IconFoodComponent} from "../../../icons/projects/food/icon-food.component";
import {IconEducationComponent} from "../../../icons/projects/education/icon-education.component";
import {IconMedicalComponent} from "../../../icons/projects/medical/icon-medical.component";
import {IconWaterComponent} from "../../../icons/projects/water/icon-water.component";
import {IconOrphanComponent} from "../../../icons/projects/orphan/icon-orphan.component";
import {IconZakatComponent} from "../../../icons/projects/zakat/icon-zakat.component";
import {IconRamadanComponent} from "../../../icons/projects/ramadan/icon-ramadan.component";
import {ButtonLinkComponent} from "../../button-link/button-link.component";
import {IconArrowLeftComponent} from "../../../icons/arrow-left/icon-arrow-left.component";
import {IconArrowRightComponent} from "../../../icons/arrow-right/icon-arrow-right.component";
import {IconDirective} from "../../../directives/icon.directive";
import {SwiperContainer} from "swiper/swiper-element";
import {SwiperOptions} from "swiper/types";

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
    IconArrowLeftComponent,
    IconArrowRightComponent,
    IconDirective
  ],
  templateUrl: './project-categories-slider.component.html',
  styleUrl: './project-categories-slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectCategoriesSliderComponent implements OnInit {
  swiperElement = signal<SwiperContainer | null>(null);
  ngOnInit(): void {
    const swiperElementConstructor: SwiperContainer = document.querySelector('.project-categories-slider');
    const  swiperOptions: SwiperOptions = {
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 24,
      navigation: {
        enabled: true,
        nextEl: '.category-slide-next',
        prevEl: '.category-slide-prev',
      }
    };
    Object.assign(swiperElementConstructor!, swiperOptions);
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }

  ngOnDestroy(): void {
    this.swiperElement().remove();
  }
}
