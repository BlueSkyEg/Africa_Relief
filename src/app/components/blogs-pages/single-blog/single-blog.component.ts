import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DonationCardComponent } from '../../../shared/components/donation-card/donation-card.component';
import { IconQuoteComponent } from '../../../shared/icons/quote/icon-quote.component';
import { ShareButtonsComponent } from '../../../shared/components/share-buttons/share-buttons.component';
import { IBlog } from '../../../shared/interfaces/blog/blog-interface';
import { BlogService } from '../../../core/services/blogs/blog.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { BlogSliderComponent } from './blog-slider/blog-slider.component';
import { RelatedBlogsComponent } from './related-blogs/related-blogs.component';
import { ImgPlaceholderDirective } from '../../../shared/directives/img-placeholder.directive';
import { MetaService } from '../../../core/services/meta-data/meta.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-single-blog',
  standalone: true,
  templateUrl: './single-blog.component.html',
  styles: ``,
  imports: [
    RouterModule,
    CommonModule,
    BreadcrumbComponent,
    DonationCardComponent,
    IconQuoteComponent,
    ShareButtonsComponent,
    BlogSliderComponent,
    RelatedBlogsComponent,
    ImgPlaceholderDirective,
  ],
})
export class SingleBlogComponent {
  blog: IBlog;
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  blogService: BlogService = inject(BlogService);
  _MetaService: MetaService = inject(MetaService);
  private platformId = inject(PLATFORM_ID);
  isDontationForm = signal<Boolean>(false);
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._MetaService.setCanonicalURL(window.location.href);
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this._MetaService.setCanonicalURL(window.location.href);
        });
    }
    this.activeRoute.paramMap.subscribe({
      next: (route) => {
        this.blogService.getBlog(route.get('slug')).subscribe({
          next: (res: IApiResponse<IBlog | null>) => {
            if (res.success) {
              this.blog = res.data;

              this._MetaService.setMetaData(
                this.blog.meta_data,
                this.blog.created_at,
                this.blog.featured_image
              );
              this.processBlogContents();
            } else {
              this.router.navigate(['/404']);
            }
          },
        });
      }
    });
  }
  processBlogContents(): void {
    this.blog.contents.forEach((content) => {
      if (
        content.type === 'paragraph' &&
        content.body.includes('\n“') &&
        content.body.includes('”')
      ) {
        const startChar = '\n“';
        const endChar = '”';

        const startIndex = content.body.indexOf(startChar);
        const endIndex = content.body.indexOf(endChar);

        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
          content.beforeQuote = content.body.substring(0, startIndex);
          content.quotedText = content.body.substring(
            startIndex + startChar.length,
            endIndex
          );
          content.afterQuote = content.body.substring(
            endIndex + endChar.length
          );
        }
      }
    });
  }

  formatItem(item: string): string {
    const boldPattern = /\*(.*?)\*/;
    return item
      .replace(boldPattern, '<span class="font-medium ">$1</span>')
      .replace(/\*\*/g, '');
  }
}