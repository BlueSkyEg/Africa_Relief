import { Component, OnInit, inject } from '@angular/core';
import { BlogService } from '../../core/services/blogs/blog.service';
import { IApiResponse } from '../../shared/interfaces/api-response-interface';
import { IGalleryImage } from '../../shared/interfaces/blog/gallery-image.interface';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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

  blogService: BlogService = inject(BlogService);

  ngOnInit(): void {
    this.onGetGallery();
  }

  onGetGallery() {
    this.blogService.getGalleryImages(this.paginationPageNum).subscribe({
      next: (res: IApiResponse<IGalleryImage[]>) => {
        this.gallery.push(...res.data);
        this.paginationPageNum++;
      }
    });
  }
}
