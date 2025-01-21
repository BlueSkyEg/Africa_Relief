import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  inject,
  signal,
} from '@angular/core';

import { IconArrowLeftComponent } from '../../../shared/icons/arrows/arrow-left/icon-arrow-left.component';
import { IconArrowRightComponent } from '../../../shared/icons/arrows/arrow-right/icon-arrow-right.component';
import { IconDirective } from '../../../shared/directives/icon.directive';
import { ImgPlaceholderDirective } from '../../../shared/directives/img-placeholder.directive';
import { Router } from '@angular/router';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { Autoplay, Navigation } from 'swiper/modules';
import Swiper from 'swiper';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-board-members-slider',
  standalone: true,
  templateUrl: './board-members-slider.component.html',
  styles: ``,
  imports: [
    IconDirective,
    IconArrowLeftComponent,
    IconArrowRightComponent,
    ImgPlaceholderDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BoardMembersSliderComponent implements OnInit {
  members = [
    {
      image: {
        src: 'assets/images/about/members/Executive-Director.webp',
        alt: 'Yousef Abdallah',
      },
      name: 'Yousef Abdallah',
      position: 'Executive Director',
    },
    {
      image: {
        src: 'assets/images/about/members/Dr-Mohamed-Moussa.webp',
        alt: 'Dr. Mohamed Moussa',
      },
      name: 'Dr. Mohamed Moussa',
      position: 'President ',
    },
    {
      image: {
        src: 'assets/images/about/members/Dr-Abdelmonem-Elhussainy.webp',
        alt: 'Dr. Abdelmonem Elhussainy',
      },
      name: 'Dr. Abdelmonem Elhussainy',
      position: 'Chairman',
    },
    {
      image: {
        src: 'assets/images/about/members/Dr-Hisham-Gadallah.webp',
        alt: 'Dr. Hisham Gadallah',
      },
      name: 'Dr. Hisham Gadallah',
      position: 'Vice Chairman',
    },
    {
      image: {
        src: 'assets/images/about/members/Ashraf-Soliman.webp',
        alt: 'Ashraf Soliman',
      },
      name: 'Ashraf Soliman',
      position: 'Treasurer',
    },
    {
      image: {
        src: 'assets/images/about/members/Rahim-Inoussa.webp',
        alt: 'Rahim Inoussa',
      },
      name: 'Rahim Inoussa',
      position: 'General Secretary',
    },

    {
      image: {
        src: 'assets/images/about/members/Dr-Amin-Elmalah.webp',
        alt: 'Dr. Amin Elmalah',
      },
      name: 'Dr. Amin Elmalah',
      position: 'Member',
    },
    {
      image: {
        src: 'assets/images/about/members/Qadri-Abdallah.webp',
        alt: 'Qadri Abdallah',
      },
      name: 'Qadri Abdallah',
      position: 'Member',
    },
    {
      image: {
        src: 'assets/images/about/members/Mirvat-Kaddour.webp',
        alt: 'Mirvat Kaddour',
      },
      name: 'Mirvat Kaddour',
      position: 'Member',
    },
  ];

  swiperElement = signal<SwiperContainer | null>(null);
  router: Router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private renderer: Renderer2 = inject(Renderer2);
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize Swiper only in the browser
      Swiper.use([Autoplay, Navigation]);
      this.initializeSwiper();
    }
  }
  private initializeSwiper(): void {
    const swiperElementConstructor = this.renderer.selectRootElement(
      '.board-members-slider',
      true
    );

    const swiperOptions: SwiperOptions = {
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 24,
      navigation: {
        enabled: true,
        nextEl: '.board-member-slide-next',
        prevEl: '.board-member-slide-prev',
      },
    };

    Object.assign(swiperElementConstructor, swiperOptions);
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }
  redirectToTarget() {
    this.router.navigate(['/about/executive-director']);
  }
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.swiperElement().remove();
    }  }
}
