import { Component, OnInit, inject } from '@angular/core';
import { CategoriesFilterComponent } from "../../../shared/components/categories-filter/categories-filter.component";
import { BlogService } from '../../../core/services/blogs/blog.service';
import { ICategory } from '../../../shared/interfaces/category-interface';
import { BlogCardComponent } from "../../../shared/components/blogs/blog-card/blog-card.component";
import {IBlogCard} from "../../../shared/interfaces/blog/blog-card-interface";
import { ActivatedRoute } from '@angular/router';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { BreadcrumbComponent } from "../../../shared/components/breadcrumb/breadcrumb.component";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { IPaginatedData } from '../../../shared/interfaces/paginated-data.interface';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
    selector: 'app-blogs',
    standalone: true,
    templateUrl: './blogs.component.html',
    styles:``,
    imports: [InfiniteScrollModule, CategoriesFilterComponent, BlogCardComponent, BreadcrumbComponent]
})
export class BlogsComponent implements OnInit {
  blogCategories: ICategory[];
  blogs: IBlogCard[] = [];
  paginationPageNum: number = 1;
  paginationPerPage: number;
  isPaginationLastPage: boolean = false;

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  blogService: BlogService = inject(BlogService);
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  constructor() {
    // Determine pagination perPage number based on screen size
    this.breakpointObserver
      .observe('(min-width: 800px)')
      .subscribe({
        next: (value) => this.paginationPerPage = value.matches ? 9 : 5
      })
  }

  ngOnInit(): void {
    // Get blog categories
    this.blogService.getBlogCategories().subscribe({
      next: (res: IApiResponse<ICategory[]>) => this.blogCategories = res.data
    });

    // Get Blogs
    this.activeRoute.paramMap.subscribe({
      next: () => {
        this.isPaginationLastPage = false;
        this.paginationPageNum = 1;
        this.blogs = [];
        this.onGetBlogs();
      }
    })
  }

  onGetBlogs() {
    if(!this.isPaginationLastPage) {
      const categorySlug = this.activeRoute.snapshot.paramMap.get('slug');
      this.blogService.getBlogs(this.paginationPageNum, this.paginationPerPage, categorySlug).subscribe({
        next: (res: IApiResponse<IPaginatedData<IBlogCard[]>>) => {
          this.blogs.push(...res.data.data);
          if(res.data.pagination.current_page === res.data.pagination.last_page) {
            this.isPaginationLastPage = true;
          }
          this.paginationPageNum++;
        }
      });
    }
  }
}