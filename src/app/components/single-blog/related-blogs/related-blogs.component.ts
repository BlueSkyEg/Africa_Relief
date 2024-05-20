import { Component, Input, inject } from '@angular/core';
import { ButtonLinkComponent } from "../../../shared/components/button-link/button-link.component";
import { BlogCardComponent } from "../../../shared/components/blogs/blog-card/blog-card.component";
import { IBlogCard } from '../../../shared/interfaces/blog/blog-card-interface';
import { BlogService } from '../../../core/services/blogs/blog.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';

@Component({
    selector: 'app-related-blogs',
    standalone: true,
    templateUrl: './related-blogs.component.html',
    styles: ``,
    imports: [ButtonLinkComponent, BlogCardComponent]
})
export class RelatedBlogsComponent {

  blogs: IBlogCard[];
  @Input() currentBlogSlug: string;

  blogService: BlogService = inject(BlogService);

  ngOnInit(): void {
    this.onGetRelatedBlogs();
  }

  onGetRelatedBlogs(): void {
    this.blogService.getRelatedBlogs(this.currentBlogSlug).subscribe({
      next: (res: IApiResponse<IBlogCard[]>) => this.blogs = res.data
    })
  }
}
