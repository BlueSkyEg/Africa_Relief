import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ButtonLinkComponent } from "../../../../shared/components/button-link/button-link.component";
import { BlogCardComponent } from "../../../../shared/components/blogs/blog-card/blog-card.component";
import { IBlogCard } from '../../../../shared/interfaces/blog/blog-card-interface';
import { BlogService } from '../../../../core/services/blogs/blog.service';
import { IApiResponse } from '../../../../shared/interfaces/api-response-interface';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-related-blogs',
  standalone: true,
  templateUrl: './related-blogs.component.html',
  styles: ``,
  imports: [ButtonLinkComponent, BlogCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedBlogsComponent {
  blogs: IBlogCard[];
  @Input() currentBlogSlug: string;

  blogService: BlogService = inject(BlogService);
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

    this.onGetRelatedBlogs();
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
  onGetRelatedBlogs(): void {
    this.blogService.getRelatedBlogs(this.currentBlogSlug).subscribe({
      next: (res: IApiResponse<IBlogCard[]>) => (this.blogs = res.data),
    });
  }
}
