import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { SwiperContainer } from 'swiper/swiper-element';
import {  SwiperOptions } from 'swiper/types';
import { IImage } from '../../../../shared/interfaces/image-interface';
import { IconDirective } from '../../../../shared/directives/icon.directive';
import { IconArrowLeftComponent } from '../../../../shared/icons/arrows/arrow-left/icon-arrow-left.component';
import { IconArrowRightComponent } from '../../../../shared/icons/arrows/arrow-right/icon-arrow-right.component';
import { ImgPlaceholderDirective } from '../../../../shared/directives/img-placeholder.directive';
import { Autoplay, Navigation } from 'swiper/modules';
import Swiper from 'swiper';
@Component({
  selector: 'app-blog-slider',
  standalone: true,
  imports: [
    IconDirective,
    IconArrowLeftComponent,
    IconArrowRightComponent,
    ImgPlaceholderDirective,
  ],
  templateUrl: './blog-slider.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogSliderComponent implements OnInit {
  @Input() slides: IImage[];
  swiperElement = signal<SwiperContainer | null>(null);

  ngOnInit(): void {
     Swiper.use([Autoplay, Navigation]);
    const swiperElementConstructor: SwiperContainer = document.querySelector(
      '.blog-slider'
    ) as SwiperContainer;

    if (swiperElementConstructor) {
      const swiperOptions: SwiperOptions = {
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        navigation: {
          enabled: true,
          nextEl: '.member-slide-next',
          prevEl: '.member-slide-prev',
        },
      };

      Object.assign(swiperElementConstructor, swiperOptions);
      this.swiperElement.set(swiperElementConstructor);
      this.swiperElement().initialize();
    } else {
      console.error('Swiper container not found');
    }
  }

  ngOnDestroy(): void {
    if (this.swiperElement()) {
      this.swiperElement().remove();
    }
  }
}
