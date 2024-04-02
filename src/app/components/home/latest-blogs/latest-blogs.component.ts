import {Component, OnInit, inject} from '@angular/core';
import {BlogCardComponent} from "../../../shared/components/blogs/blog-card/blog-card.component";
import {ButtonLinkComponent} from "../../../shared/components/button-link/button-link.component";
import {IBlogCard} from "../../../shared/interfaces/blog/blog-card-interface";
import { BlogService } from '../../../core/services/blogs/blog.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';

@Component({
  selector: 'app-latest-blogs',
  standalone: true,
  imports: [BlogCardComponent, ButtonLinkComponent],
  templateUrl: './latest-blogs.component.html',
  styles: ``
})
export class LatestBlogsComponent implements OnInit {
  blogs: IBlogCard[];
  blogService: BlogService = inject(BlogService);

  ngOnInit(): void {
    this.blogService.getLatestBlogs().subscribe({
      next: (res: IApiResponse<IBlogCard[]>) => this.blogs = res.data
    })
  }
}
