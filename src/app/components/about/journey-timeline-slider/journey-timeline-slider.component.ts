import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, signal } from '@angular/core';
import { IconArrowLeftComponent } from '../../../shared/icons/arrows/arrow-left/icon-arrow-left.component';
import { IconArrowRightComponent } from '../../../shared/icons/arrows/arrow-right/icon-arrow-right.component';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { IconDirective } from '../../../shared/directives/icon.directive';

@Component({
  selector: 'app-journey-timeline-slider',
  standalone: true,
  templateUrl: './journey-timeline-slider.component.html',
  styleUrl: './journey-timeline-slider.component.scss',
  imports: [IconDirective, IconArrowLeftComponent, IconArrowRightComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JourneyTimeLineSliderComponent implements OnInit {
  slides = [
    {
      image: {
        src: "assets/images/about/timeline/our-journey-2019.webp",
        alt: "Our Journey 2019"
      },
      year: 2019,
      description: "Africa Relief was established with more than 6 motivated members."
    },
    {
      image: {
        src: "assets/images/about/timeline/our-journey-2020.webp",
        alt: "Our Journey 2020"
      },
      year: 2020,
      description: "Launched our first fundraising campaign, raising awareness and funds for water and sanitation projects in rural communities."
    },
    {
      image: {
        src: "assets/images/about/timeline/our-journey-2021.webp",
        alt: "Our Journey 2021"
      },
      year: 2021,
      description: "Expanded our programs to include educational initiatives, providing scholarships and school supplies to children in need."
    },
    {
      image: {
        src: "assets/images/about/timeline/our-journey-2022.webp",
        alt: "Our Journey 2022"
      },
      year: 2022,
      description: "Responded to the COVID-19 pandemic by distributing essential supplies and supporting healthcare facilities across the continent."
    },
    {
      image: {
        src: "assets/images/about/timeline/our-journey-2023.webp",
        alt: "Our Journey 2023"
      },
      year: 2023,
      description: "Partnered with local NGOs to implement sustainable agriculture projects, improving food security and livelihoods."
    },
  ];

  swiperElement = signal<SwiperContainer | null>(null);
  ngOnInit(): void {
    const swiperElementConstructor: SwiperContainer = document.querySelector('.journey-timeline-slider');
    const  swiperOptions: SwiperOptions = {
      slidesPerView: "auto",
      navigation: {
        enabled: true,
        nextEl: '.timeline-slide-next',
        prevEl: '.timeline-slide-prev',
      }
    };
    Object.assign(swiperElementConstructor!, swiperOptions);
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }
}