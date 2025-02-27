import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IconFoodComponent } from '../../../icons/projects/food/icon-food.component';
import { IconEducationComponent } from '../../../icons/projects/education/icon-education.component';
import { IconMedicalComponent } from '../../../icons/projects/medical/icon-medical.component';
import { IconWaterComponent } from '../../../icons/projects/water/icon-water.component';
import { IconOrphanComponent } from '../../../icons/projects/orphan/icon-orphan.component';
import { IconZakatComponent } from '../../../icons/projects/zakat/icon-zakat.component';
import { IconRamadanComponent } from '../../../icons/projects/ramadan/icon-ramadan.component';
import { ButtonLinkComponent } from '../../button-link/button-link.component';
import { IconArrowLeftComponent } from '../../../icons/arrows/arrow-left/icon-arrow-left.component';
import { IconArrowRightComponent } from '../../../icons/arrows/arrow-right/icon-arrow-right.component';
import { IconDirective } from '../../../directives/icon.directive';
import { SwiperContainer } from 'swiper/swiper-element';
import { SwiperOptions } from 'swiper/types';
import { Autoplay, Navigation } from 'swiper/modules';
import Swiper from 'swiper';

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
    IconDirective,
  ],
  templateUrl: './project-categories-slider.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectCategoriesSliderComponent implements OnInit, OnDestroy {
  swiperElement = signal<SwiperContainer | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Swiper.use([Autoplay, Navigation]);

      const swiperElementConstructor: SwiperContainer = document.querySelector(
        '.project-categories-slider'
      );
      const swiperOptions: SwiperOptions = {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 24,
        navigation: {
          enabled: true,
          nextEl: '.category-slide-next',
          prevEl: '.category-slide-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      };

      Object.assign(swiperElementConstructor!, swiperOptions);
      this.swiperElement.set(swiperElementConstructor as SwiperContainer);
      this.swiperElement()?.initialize();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.swiperElement()) {
      this.swiperElement().remove();
    }
  }
}
