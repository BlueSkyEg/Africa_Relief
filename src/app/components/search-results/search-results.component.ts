import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BlogService } from '../../core/services/blogs/blog.service';
import { IBlogCard } from '../../shared/interfaces/blog/blog-card-interface';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { BlogCardComponent } from '../../shared/components/blogs/blog-card/blog-card.component';
import { NotFoundIconComponent } from '../../shared/icons/search/not-found-icon-search.component';
import { NotFoundSearchResultComponent } from '../../shared/components/not-found-search-result/not-found-search-result.component';
import { ProjectService } from '../../core/services/projects/project.service';
import { IProjectCard } from '../../shared/interfaces/project/project-card-interface';
import { ProjectCardComponent } from '../../shared/components/projects/project-card/project-card.component';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MetaService } from '../../core/services/meta-data/meta.service';
@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    BlogCardComponent,
    CommonModule,
    BreadcrumbComponent,
    NotFoundIconComponent,
    NotFoundSearchResultComponent,
    RouterLink,
    RouterLinkActive,
    ProjectCardComponent,
  ],
  templateUrl: './search-results.component.html',
})
export class SearchResultsComponent implements OnInit {
  blogs: IBlogCard[] = [];
  projects: IProjectCard[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  isLoading: boolean = true;
  type: string = 'projects';

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private projectService: ProjectService
  ) {}
  _MetaService: MetaService = inject(MetaService);
  private platformId = inject(PLATFORM_ID);
  router: Router = inject(Router);
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this._MetaService.setCanonicalURL(window.location.href);

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this._MetaService.setCanonicalURL(window.location.href);
        });
    }
    this.activatedRoute.params.subscribe((params) => {
      this.searchTerm = params['term'] || '';
      this.currentPage = 1;
      this.getResults(this.currentPage);
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.type = params['type'];
      this.currentPage = 1;
      this.getResults(this.currentPage);
    });
  }

  getResults(page: number) {
    this.isLoading = true;
    if (this.type === 'blogs') {
      this.blogService.searchBlogs(this.searchTerm, page).subscribe(
        (response) => {
          this.blogs = response.data.data;
          this.currentPage = response.data.pagination.current_page;
          this.totalPages = response.data.pagination.last_page;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching blogs:', error);
          this.blogs = [];
          this.isLoading = false;
        }
      );
    } else if (this.type === 'projects') {
      this.projectService.searchProjects(this.searchTerm, page).subscribe(
        (response) => {
          this.projects = response.data.data;
          this.currentPage = response.data.pagination.current_page;
          this.totalPages = response.data.pagination.last_page;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching projects:', error);
          this.projects = [];
          this.isLoading = false;
        }
      );
    }
  }
  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getResults(this.currentPage);
    }
  }
}
