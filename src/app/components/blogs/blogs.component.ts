import { Component, OnInit, inject } from '@angular/core';
import { CategoriesFilterComponent } from "../../shared/components/categories-filter/categories-filter.component";
import { BlogService } from '../../core/services/blogs/blog.service';
import { ICategory } from '../../shared/interfaces/category-interface';
import { BlogCardComponent } from "../../shared/components/blogs/blog-card/blog-card.component";
import {IBlogCard} from "../../shared/interfaces/blog/blog-card-interface";
import { ActivatedRoute } from '@angular/router';
import { IApiResponse } from '../../shared/interfaces/api-response-interface';

@Component({
    selector: 'app-blogs',
    standalone: true,
    templateUrl: './blogs.component.html',
    styleUrl: './blogs.component.scss',
    imports: [CategoriesFilterComponent, BlogCardComponent]
})
export class BlogsComponent implements OnInit {
  blogCategories: ICategory[];
  blogs: IBlogCard[];
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  blogService: BlogService = inject(BlogService);

  ngOnInit(): void {
    // Get blog categories
    this.blogService.getBlogCategories().subscribe({
      next: (res: IApiResponse<ICategory[]>) => this.blogCategories = res.data
    });

    // Get Blogs
    this.activeRoute.paramMap.subscribe({
      next: (route) => {
        this.blogService.getBlogs(route.get('slug')).subscribe({
          next: (res: IApiResponse<IBlogCard[]>) => this.blogs = res.data
        });
      }
    })
  }
}
