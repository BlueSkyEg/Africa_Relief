import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../core/services/blogs/blog.service';
import { IBlogCard } from '../../shared/interfaces/blog/blog-card-interface';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { BlogCardComponent } from '../../shared/components/blogs/blog-card/blog-card.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [BlogCardComponent, CommonModule, BreadcrumbComponent],
  templateUrl: './search-results.component.html',
})
export class SearchResultsComponent implements OnInit {
  blogs: IBlogCard[];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _BlogService: BlogService
  ) {}

  ngOnInit() {
    this.onGetResults();
  }
  onGetResults() {
    this._ActivatedRoute.params.subscribe((params) => {
      this.searchTerm = params['term'];
      this.getBlogs(this.currentPage);
    });
  }

  getBlogs(page: number) {
    this._BlogService.searchBlogs(this.searchTerm, page).subscribe(
      (response) => {
        this.blogs = response.data.data;
        this.currentPage = response.data.pagination.current_page;
        this.totalPages = response.data.pagination.last_page;
      },
      (error) => {
        console.error('Error fetching blogs:', error);
      }
    );
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      console.log(this.totalPages)
      this.currentPage = page;
      this.getBlogs(this.currentPage);
    }
  }
}

