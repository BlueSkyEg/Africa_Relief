import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  signal,
  inject,
} from '@angular/core';
import { ButtonLinkComponent } from '../../../shared/components/button-link/button-link.component';
import { IconArrowLeftComponent } from '../../../shared/icons/arrows/arrow-left/icon-arrow-left.component';
import { IconArrowRightComponent } from '../../../shared/icons/arrows/arrow-right/icon-arrow-right.component';
import { IconDirective } from '../../../shared/directives/icon.directive';
import { SwiperContainer } from 'swiper/swiper-element';
import { ICarouselSlide } from '../../../shared/interfaces/carousel-slide.interface';
import { CarouselService } from '../../../core/services/layout/carousel.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { CommonModule } from '@angular/common';
import {  Autoplay, Navigation } from 'swiper/modules';
import Swiper from 'swiper';

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
  slides: ICarouselSlide[] = [];
  swiperElement = signal<SwiperContainer | null>(null);

  private carouselService: CarouselService = inject(CarouselService);

  ngOnInit(): void {
     Swiper.use([Autoplay, Navigation]);
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
    const swiperElementConstructor: SwiperContainer =
      document.querySelector('.main-slider');

    if (swiperElementConstructor) {
      Object.assign(swiperElementConstructor, {
        loop: true,
        lazy: true,
        preloadImages: false,
        autoplay: {
          delay: 3500,
          disableOnInteraction: true,
        },
        slidesPerView: 1,
        navigation: {
          nextEl: '.main-slider-next',
          prevEl: '.main-slider-prev',
        },
      });

      this.swiperElement.set(swiperElementConstructor);
      this.swiperElement().initialize();
    }
  }

  ngOnDestroy(): void {
    this.swiperElement().remove();
  }
}
