import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

import { IconArrowLeftComponent } from '../../../shared/icons/arrows/arrow-left/icon-arrow-left.component';
import { IconArrowRightComponent } from '../../../shared/icons/arrows/arrow-right/icon-arrow-right.component';
import { IconDirective } from '../../../shared/directives/icon.directive';
import { ImgPlaceholderDirective } from '../../../shared/directives/img-placeholder.directive';
import { Meta } from '@angular/platform-browser';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions} from 'swiper/types';
import { Autoplay, Navigation } from 'swiper/modules';
import Swiper from 'swiper';
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
    RouterLink,
    RouterOutlet,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  metaService: Meta = inject(Meta);
  router: Router = inject(Router);

  setCanonicalURL(url: string) {
    let link: HTMLLinkElement =
      document.querySelector("link[rel='canonical']") || null;

    if (link) {
      link.setAttribute('href', url);
    } else {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
    // Set og:url
    this.metaService.updateTag({
      property: 'og:url',
      content: url,
    });
  }
  ngOnInit(): void {
    this.setCanonicalURL(window.location.href);

    // Update the canonical URL on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setCanonicalURL(window.location.href);
      });
     Swiper.use([Autoplay, Navigation]);
    const swiperElementConstructor: SwiperContainer = document.querySelector(
      '.board-members-slider'
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
    Object.assign(swiperElementConstructor!, swiperOptions);
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }
  redirectToTarget() {
    this.router.navigate(['/about/executive-director']);
  }
  ngOnDestroy(): void {
    this.swiperElement().remove();
  }
}
