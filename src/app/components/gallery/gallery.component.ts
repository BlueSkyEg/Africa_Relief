import { Component, OnInit, inject } from '@angular/core';
import { BlogService } from '../../core/services/blogs/blog.service';
import { IApiResponse } from '../../shared/interfaces/api-response-interface';
import { IGalleryImage } from '../../shared/interfaces/blog/gallery-image.interface';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IPaginatedData } from '../../shared/interfaces/paginated-data.interface';
import { ImgPlaceholderDirective } from '../../shared/directives/img-placeholder.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styles: ``,
  imports: [
    CommonModule,
    InfiniteScrollModule,
    RouterModule,
    BreadcrumbComponent,
    ImgPlaceholderDirective,
  ],
})
export class GalleryComponent implements OnInit {
  gallery1: IGalleryImage[] = [];
  gallery2: IGalleryImage[] = [];
  gallery3: IGalleryImage[] = [];
  gallery4: IGalleryImage[] = [];
  paginationPageNum: number = 1;
  paginationPerPage: number;
  isPaginationLastPage: boolean = false;
  loading: boolean = false;
  blogService: BlogService = inject(BlogService);
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  constructor() {
    // Determine pagination perPage number based on screen size
    this.breakpointObserver.observe('(min-width: 800px)').subscribe({
      next: (value) => (this.paginationPerPage = value.matches ? 16 : 8),
    });
  }

  ngOnInit(): void {
    this.onGetGallery();
  }

  onGetGallery() {
    if (!this.isPaginationLastPage && !this.loading) {
      this.loading = true;
      this.blogService
        .getBlogsGallery(this.paginationPageNum, this.paginationPerPage)
        .subscribe({
          next: (res: IApiResponse<IPaginatedData<IGalleryImage[]>>) => {
            res.data.data.filter((e, i) => {
              switch (i % 4) {
                case 0:
                  this.gallery1.push(e);
                  break;
                case 1:
                  this.gallery2.push(e);
                  break;
                case 2:
                  this.gallery3.push(e);
                  break;
                case 3:
                  this.gallery4.push(e);
                  break;
              }
            });

            if (
              res.data.pagination.current_page < res.data.pagination.last_page
            ) {
              this.paginationPageNum++;
            } else {
              this.isPaginationLastPage = true;
            }
          },
          error: (err) => {
            console.error('Error loading gallery:', err);
          },
          complete: () => {
            this.loading = false; 
          },
        });
    }
  }
}
