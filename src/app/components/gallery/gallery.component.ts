import { Component, OnInit, inject } from '@angular/core';
import { BlogService } from '../../core/services/blogs/blog.service';
import { IApiResponse } from '../../shared/interfaces/api-response-interface';
import { IGalleryImage } from '../../shared/interfaces/blog/gallery-image.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './gallery.component.html',
  styles: ``
})
export class GalleryComponent implements OnInit {
  gallery: IGalleryImage[];
  blogService: BlogService = inject(BlogService);

  ngOnInit(): void {
    this.blogService.getGalleryImages().subscribe({
      next: (res: IApiResponse<IGalleryImage[]>) => this.gallery = res.data
    })
  }

}
