import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, signal } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { IconArrowLeftComponent } from "../../../shared/icons/arrows/arrow-left/icon-arrow-left.component";
import { IconArrowRightComponent } from "../../../shared/icons/arrows/arrow-right/icon-arrow-right.component";
import { IconDirective } from '../../../shared/directives/icon.directive';

@Component({
    selector: 'app-board-members-slider',
    standalone: true,
    templateUrl: './board-members-slider.component.html',
    styles: ``,
    imports: [IconDirective, IconArrowLeftComponent, IconArrowRightComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BoardMembersSliderComponent implements OnInit {
  members = [
    {
      image: {
        src: "assets/images/about/members/Dr-Abdelmonem-Elhussainy.webp",
        alt: "Dr. Abdelmonem Elhussainy"
      },
      name: 'Dr. Abdelmonem Elhussainy',
      position: "Chairman"
    },
    {
      image: {
        src: "assets/images/about/members/Dr-Mohamed-Moussa.webp",
        alt: "Dr. Mohamed Moussa"
      },
      name: 'Dr. Mohamed Moussa',
      position: "Vice Chairman"
    },
    {
      image: {
        src: "assets/images/about/members/Rahim-Inoussa.webp",
        alt: "Rahim Inoussa"
      },
      name: 'Rahim Inoussa',
      position: "General Secretary"
    },
    {
      image: {
        src: "assets/images/about/members/Ashraf-Soliman.webp",
        alt: "Ashraf Soliman"
      },
      name: 'Ashraf Soliman',
      position: "Treasure"
    },
    {
      image: {
        src: "assets/images/about/members/Dr-Amin-Elmalah.webp",
        alt: "Dr. Amin Elmalah"
      },
      name: 'Dr. Amin Elmalah',
      position: "Member"
    },
    {
      image: {
        src: "assets/images/about/members/Qadri-Abdallah.webp",
        alt: "Qadri Abdallah"
      },
      name: 'Qadri Abdallah',
      position: "Member"
    },
    {
      image: {
        src: "assets/images/about/members/Dr-Hisham-Gadallah.webp",
        alt: "Dr. Hisham Gadallah"
      },
      name: 'Dr. Hisham Gadallah',
      position: "Member"
    },
  ];

  swiperElement = signal<SwiperContainer | null>(null);
  ngOnInit(): void {
    const swiperElementConstructor: SwiperContainer = document.querySelector('.board-members-slider');
    const  swiperOptions: SwiperOptions = {
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 24,
      navigation: {
        enabled: true,
        nextEl: '.member-slide-next',
        prevEl: '.member-slide-prev',
      }
    };
    Object.assign(swiperElementConstructor!, swiperOptions);
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }
}
