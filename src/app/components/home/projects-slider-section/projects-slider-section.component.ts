import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { IconArrowLeftComponent } from '../../../shared/icons/arrows/arrow-left/icon-arrow-left.component';
import { IconArrowRightComponent } from '../../../shared/icons/arrows/arrow-right/icon-arrow-right.component';
import { ButtonLinkComponent } from '../../../shared/components/button-link/button-link.component';
import { IconDirective } from '../../../shared/directives/icon.directive';
import { RouterModule } from '@angular/router';
import { SwiperContainer } from 'swiper/swiper-element';
import { SwiperOptions } from 'swiper/types';
import { ProjectService } from '../../../core/services/projects/project.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IPaginatedData } from '../../../shared/interfaces/paginated-data.interface';
import { IProjectCard } from '../../../shared/interfaces/project/project-card-interface';
import { ProjectCardComponent } from '../../../shared/components/projects/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ImgPlaceholderDirective } from '../../../shared/directives/img-placeholder.directive';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Autoplay, Navigation } from 'swiper/modules';
import Swiper from 'swiper';
@Component({
  selector: 'app-projects-slider-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProjectCardComponent,
    IconArrowLeftComponent,
    IconArrowRightComponent,
    ButtonLinkComponent,
    IconDirective,
    ImgPlaceholderDirective,
  ],
  templateUrl: './projects-slider-section.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectsSliderSectionComponent implements OnInit {
  projects: IProjectCard[];
  swiperElement = signal<SwiperContainer | null>(null);

  projectService: ProjectService = inject(ProjectService);
  metaService: Meta = inject(Meta);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.setCanonicalURL(window.location.href);

    // Update the canonical URL on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setCanonicalURL(window.location.href);
      });
    Swiper.use([Autoplay, Navigation]);
    this.onGetProjects();
  }
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

  onGetProjects(): void {
    this.projectService.getProjects(1, 5).subscribe({
      next: (res: IApiResponse<IPaginatedData<IProjectCard[]>>) => {
        this.projects = res.data.data;
        this.onLoadSwiperSlider();
      },
    });
  }

  onLoadSwiperSlider(): void {
    const swiperElementConstructor: SwiperContainer =
      document.querySelector('.projects-slider');
    const swiperOptions: SwiperOptions = {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 16,
      navigation: {
        enabled: true,
        nextEl: '.project-slide-next',
        prevEl: '.project-slide-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    };
    Object.assign(swiperElementConstructor!, swiperOptions);
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }
  check() {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'Button Donate Clicked',
    });
  }
  ngOnDestroy(): void {
    this.swiperElement().remove();
  }
}
