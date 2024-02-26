import {Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, signal} from '@angular/core';
import {IMainSliderSlide} from "../../../core/interfaces/home/main-slider-slide-interface";
import {HomeService} from "../../../core/services/home/home.service";
import {ButtonLinkComponent} from "../../../shared/components/button-link/button-link.component";
import {IconArrowLeftComponent} from "../../../shared/icons/arrows/arrow-left/icon-arrow-left.component";
import {IconArrowRightComponent} from "../../../shared/icons/arrows/arrow-right/icon-arrow-right.component";
import {IconDirective} from "../../../shared/directives/icon.directive";
import {SwiperContainer} from "swiper/swiper-element";
import {SwiperOptions} from "swiper/types";

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [
    ButtonLinkComponent,
    IconArrowLeftComponent,
    IconArrowRightComponent,
    IconDirective
  ],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainSliderComponent implements OnInit {
  constructor(private homeService: HomeService) {
  }

  slides: IMainSliderSlide[];
  swiperElement = signal<SwiperContainer | null>(null);

  ngOnInit(): void {
    this.homeService.getMainSliderSlides()
      .subscribe({
        next: (res: IMainSliderSlide[]) => {
          this.slides = res;

          // Handel Slider Options
          const swiperElementConstructor: SwiperContainer = document.querySelector('.main-slider');
          const  swiperOptions: SwiperOptions = {
            loop: true,
            autoplay: {
              delay: 3500,
              disableOnInteraction: true
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
        }
      });
  }

  onSlideChange() {
    console.log('changed')
  }
}
