import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  signal,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ButtonLinkComponent } from '../../../shared/components/button-link/button-link.component';
import { IconArrowLeftComponent } from '../../../shared/icons/arrows/arrow-left/icon-arrow-left.component';
import { IconArrowRightComponent } from '../../../shared/icons/arrows/arrow-right/icon-arrow-right.component';
import { IconDirective } from '../../../shared/directives/icon.directive';
import { SwiperContainer } from 'swiper/swiper-element';
import { SwiperOptions } from 'swiper/types';
import { ICarouselSlide } from '../../../shared/interfaces/carousel-slide.interface';
import { CarouselService } from '../../../core/services/layout/carousel.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [
    CommonModule,
    ButtonLinkComponent,
    IconArrowLeftComponent,
    IconArrowRightComponent,
    IconDirective,
  ],
  templateUrl: './main-slider.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainSliderComponent implements OnInit {
  slides: ICarouselSlide[];
  swiperElement = signal<SwiperContainer | null>(null);

  carouselService: CarouselService = inject(CarouselService);

  ngOnInit(): void {
    this.onGetHomeCarousel();
  }

  onGetHomeCarousel(): void {
    this.carouselService.getHomeCarousel().subscribe({
      next: (res: IApiResponse<ICarouselSlide[]>) => {
        this.slides = res.data;
        this.onLoadSwiperSlider();
      },
    });
  }

  onLoadSwiperSlider(): void {
    setTimeout(() => {
      const swiperElementConstructor: SwiperContainer =
        document.querySelector('.main-slider');
      const swiperOptions: any = {
        loop: true,
        lazy: true,
        preloadImages: false,
        autoplay: {
          delay: 3500,
          disableOnInteraction: true,
        },
        slidesPerView: 1,
        navigation: {
          enabled: true,
          nextEl: '.main-slider-next',
          prevEl: '.main-slider-prev',
        },
      };

      Object.assign(swiperElementConstructor!, swiperOptions);
      this.swiperElement.set(swiperElementConstructor as SwiperContainer);
      this.swiperElement()?.initialize();
    }, 100);
  }

  ngOnDestroy(): void {
    this.swiperElement().remove();
  }
}
