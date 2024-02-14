import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal} from '@angular/core';
import {IconArrowLeftComponent} from "../../../shared/icons/arrow-left/icon-arrow-left.component";
import {IconArrowRightComponent} from "../../../shared/icons/arrow-right/icon-arrow-right.component";
import {ButtonLinkComponent} from "../../../shared/components/button-link/button-link.component";
import {IconDirective} from "../../../shared/directives/icon.directive";
import {RouterModule} from "@angular/router";
import {SwiperContainer} from "swiper/swiper-element";
import {SwiperOptions} from "swiper/types";

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
  styleUrl: './projects-slider-section.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectsSliderSectionComponent implements OnInit {
  swiperElement = signal<SwiperContainer | null>(null);
  ngOnInit(): void {
    const swiperElementConstructor: SwiperContainer = document.querySelector('swiper-container');
    const  swiperOptions: SwiperOptions = {
      loop: true,
      speed: 500,
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        enabled: true,
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    };
    Object.assign(swiperElementConstructor!, swiperOptions);
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }
}
