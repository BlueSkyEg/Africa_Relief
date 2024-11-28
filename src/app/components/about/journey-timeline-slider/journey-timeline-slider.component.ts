import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, PLATFORM_ID, Renderer2, inject, signal } from '@angular/core';
import { IconArrowLeftComponent } from '../../../shared/icons/arrows/arrow-left/icon-arrow-left.component';
import { IconArrowRightComponent } from '../../../shared/icons/arrows/arrow-right/icon-arrow-right.component';
import { SwiperContainer } from 'swiper/element';
import {  SwiperOptions } from 'swiper/types';
import { IconDirective } from '../../../shared/directives/icon.directive';
import { ImgPlaceholderDirective } from '../../../shared/directives/img-placeholder.directive';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Autoplay, Navigation } from 'swiper/modules';
import Swiper from 'swiper';
import { MetaService } from '../../../core/services/meta-data/meta.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-journey-timeline-slider',
  standalone: true,
  templateUrl: './journey-timeline-slider.component.html',
  styles: ``,
  imports: [
    IconDirective,
    IconArrowLeftComponent,
    IconArrowRightComponent,
    ImgPlaceholderDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class JourneyTimeLineSliderComponent implements OnInit {
  router: Router = inject(Router);
  _MetaService: MetaService = inject(MetaService);
  private platformId = inject(PLATFORM_ID);
  private renderer: Renderer2 = inject(Renderer2);
  swiperElement = signal<SwiperContainer | null>(null);

  slides = [
    {
      image: {
        src: 'assets/images/about/timeline/our-journey-2019.webp',
        alt: 'Our Journey 2019',
      },
      year: 2019,
      description:
        'Africa Relief was established with more than 6 motivated members.',
    },
    {
      image: {
        src: 'assets/images/about/timeline/our-journey-2020.webp',
        alt: 'Our Journey 2020',
      },
      year: 2020,
      description:
        'Launched our first fundraising campaign, raising awareness and funds for water and sanitation projects in rural communities.',
    },
    {
      image: {
        src: 'assets/images/about/timeline/our-journey-2021.webp',
        alt: 'Our Journey 2021',
      },
      year: 2021,
      description:
        'Expanded our programs to include educational initiatives, providing scholarships and school supplies to children in need.',
    },
    {
      image: {
        src: 'assets/images/about/timeline/our-journey-2022.webp',
        alt: 'Our Journey 2022',
      },
      year: 2022,
      description:
        'Responded to the COVID-19 pandemic by distributing essential supplies and supporting healthcare facilities across the continent.',
    },
    {
      image: {
        src: 'assets/images/about/timeline/our-journey-2023.webp',
        alt: 'Our Journey 2023',
      },
      year: 2023,
      description:
        'Partnered with local NGOs to implement sustainable agriculture projects, improving food security and livelihoods.',
    },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._MetaService.setCanonicalURL(window.location.href);

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this._MetaService.setCanonicalURL(window.location.href);
        });

      // Initialize Swiper only in the browser
      Swiper.use([Autoplay, Navigation]);
      this.initializeSwiper();
    }
  }
  private initializeSwiper(): void {
    const swiperElementConstructor: SwiperContainer =
      this.renderer.selectRootElement('.journey-timeline-slider', true);

    const swiperOptions: SwiperOptions = {
      slidesPerView: 'auto',
      navigation: {
        enabled: true,
        nextEl: '.timeline-slide-next',
        prevEl: '.timeline-slide-prev',
      },
    };

    Object.assign(swiperElementConstructor, swiperOptions);
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.swiperElement().remove();
    }  }
}
