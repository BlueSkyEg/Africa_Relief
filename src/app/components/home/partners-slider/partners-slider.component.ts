import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal} from '@angular/core';
import {IconArrowLeftComponent} from "../../../shared/icons/arrows/arrow-left/icon-arrow-left.component";
import {IconArrowRightComponent} from "../../../shared/icons/arrows/arrow-right/icon-arrow-right.component";
import {SwiperContainer} from "swiper/swiper-element";
import {SwiperOptions} from "swiper/types";

@Component({
  selector: 'app-partners-slider',
  standalone: true,
  imports: [
    IconArrowLeftComponent,
    IconArrowRightComponent
  ],
  templateUrl: './partners-slider.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PartnersSliderComponent implements OnInit {
  swiperElement = signal<SwiperContainer | null>(null);

  ngOnInit(): void {
    const swiperElementConstructor: SwiperContainer = document.querySelector('.partners-slider');
    const swiperOptions: SwiperOptions = {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: true
      },
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        enabled: true,
        nextEl: '.partner-slide-next',
        prevEl: '.partner-slide-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 4
        },
        1300: {
          slidesPerView: 6
        }
      }
    };
    Object.assign(swiperElementConstructor!, swiperOptions);
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }
}
