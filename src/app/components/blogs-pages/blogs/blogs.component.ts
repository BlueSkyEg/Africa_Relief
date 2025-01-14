import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CategoriesFilterComponent } from '../../../shared/components/categories-filter/categories-filter.component';
import { BlogService } from '../../../core/services/blogs/blog.service';
import { ICategory } from '../../../shared/interfaces/category-interface';
import { BlogCardComponent } from '../../../shared/components/blogs/blog-card/blog-card.component';
import { IBlogCard } from '../../../shared/interfaces/blog/blog-card-interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { IPaginatedData } from '../../../shared/interfaces/paginated-data.interface';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MetaService } from '../../../core/services/meta-data/meta.service';
import { filter } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  templateUrl: './blogs.component.html',
  styles: ``,
  imports: [
    InfiniteScrollModule,
    CategoriesFilterComponent,
    BlogCardComponent,
    BreadcrumbComponent,
  ],
})
export class BlogsComponent implements OnInit {
  blogCategories: ICategory[];
  blogs: IBlogCard[] = [];
  paginationPageNum: number = 1;
  paginationPerPage: number;
  isPaginationLastPage: boolean = false;
  loading: boolean = false;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  blogService: BlogService = inject(BlogService);
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  _MetaService: MetaService = inject(MetaService);
  private platformId = inject(PLATFORM_ID);
  router: Router = inject(Router);
  constructor() {
    // Determine pagination perPage number based on screen size
    this.breakpointObserver.observe('(min-width: 800px)').subscribe({
      next: (value) => (this.paginationPerPage = value.matches ? 9 : 5),
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._MetaService.setCanonicalURL(window.location.href);

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this._MetaService.setCanonicalURL(window.location.href);
        });
    }

    // Get blog categories
    this.blogService.getBlogCategories().subscribe({
      next: (res: IApiResponse<ICategory[]>) =>
        (this.blogCategories = res.data),
    });

    // Get Blogs
    this.activeRoute.paramMap.subscribe({
      next: () => {
        this.isPaginationLastPage = false;
        this.paginationPageNum = 1;
        this.blogs = [];
        this.onGetBlogs();
      },
    });
  }

  //get the param from the link and then check if it exists find that single project and if it exists set its metadata
  onGetBlog(currentSlug: string) {
    if (currentSlug) {
      const matchingProject = this.blogCategories?.find(
        (blog) => blog.slug === currentSlug
      );
      if (matchingProject) {
        this._MetaService.setMetaData(matchingProject.meta_data);
      }
    }
  }
  onGetBlogs() {
    if (!this.isPaginationLastPage && !this.loading) {
      this.loading = true;
      const categorySlug = this.activeRoute.snapshot.paramMap.get('slug');
      this.blogService
        .getBlogs(this.paginationPageNum, this.paginationPerPage, categorySlug)
        .subscribe({
          next: (res: IApiResponse<IPaginatedData<IBlogCard[]>>) => {
            this.blogs.push(...res.data.data);
            this.onGetBlog(categorySlug);

            if (
              res.data.pagination.current_page < res.data.pagination.last_page
            ) {
              this.paginationPageNum++;
            } else {
              this.isPaginationLastPage = true;
            }
          },
          error: (err) => {
            console.error('Error fetching blogs', err);
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }
}
