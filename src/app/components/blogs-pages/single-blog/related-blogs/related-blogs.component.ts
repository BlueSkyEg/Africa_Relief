import { Component, Input, PLATFORM_ID, inject } from '@angular/core';
import { ButtonLinkComponent } from "../../../../shared/components/button-link/button-link.component";
import { BlogCardComponent } from "../../../../shared/components/blogs/blog-card/blog-card.component";
import { IBlogCard } from '../../../../shared/interfaces/blog/blog-card-interface';
import { BlogService } from '../../../../core/services/blogs/blog.service';
import { IApiResponse } from '../../../../shared/interfaces/api-response-interface';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MetaService } from '../../../../core/services/meta-data/meta.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-related-blogs',
  standalone: true,
  templateUrl: './related-blogs.component.html',
  styles: ``,
  imports: [ButtonLinkComponent, BlogCardComponent],
})
export class RelatedBlogsComponent {
  blogs: IBlogCard[];
  @Input() currentBlogSlug: string;
  blogService: BlogService = inject(BlogService);
  _MetaService: MetaService = inject(MetaService);
  private platformId = inject(PLATFORM_ID);
  router: Router = inject(Router);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._MetaService.setCanonicalURL(window.location.href);

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this._MetaService.setCanonicalURL(window.location.href);
        });
    }
    this.onGetRelatedBlogs();
  }

  onGetRelatedBlogs(): void {
    this.blogService.getRelatedBlogs(this.currentBlogSlug).subscribe({
      next: (res: IApiResponse<IBlogCard[]>) => (this.blogs = res.data),
    });
  }
}
