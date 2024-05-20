import { Component, OnInit, inject } from '@angular/core';
import { BlogService } from '../../core/services/blogs/blog.service';
import { IApiResponse } from '../../shared/interfaces/api-response-interface';
import { IGalleryImage } from '../../shared/interfaces/blog/gallery-image.interface';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IPaginatedData } from '../../shared/interfaces/paginated-data.interface';

@Component({
    selector: 'app-gallery',
    standalone: true,
    templateUrl: './gallery.component.html',
    styles: ``,
    imports: [InfiniteScrollModule, RouterModule, BreadcrumbComponent]
})
export class GalleryComponent implements OnInit {
  gallery: IGalleryImage[] = [];
  paginationPageNum: number = 1;
  paginationPerPage: number;
  isPaginationLastPage: boolean = false;

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
    this.onGetGallery();
  }

  onGetGallery() {
    if(!this.isPaginationLastPage) {
      this.blogService.getBlogsGallery(this.paginationPageNum, this.paginationPerPage).subscribe({
        next: (res: IApiResponse<IPaginatedData<IGalleryImage[]>>) => {
          this.gallery.push(...res.data.data);
          if(res.data.pagination.current_page === res.data.pagination.last_page) {
            this.isPaginationLastPage = true;
          }
          this.paginationPageNum++;
        }
      });
    }
  }
}
