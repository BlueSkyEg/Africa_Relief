import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DonationCardComponent } from "../../shared/components/donation-card/donation-card.component";
import { IconQuoteComponent } from "../../shared/icons/quote/icon-quote.component";
import { ShareButtonsComponent } from "../../shared/components/share-buttons/share-buttons.component";
import { IBlog } from '../../shared/interfaces/blog/blog-interface';
import { BlogService } from '../../core/services/blogs/blog.service';
import { IApiResponse } from '../../shared/interfaces/api-response-interface';
import { BlogSliderComponent } from "./blog-slider/blog-slider.component";

@Component({
    selector: 'app-single-blog',
    standalone: true,
    templateUrl: './single-blog.component.html',
    styleUrl: './single-blog.component.scss',
    imports: [RouterModule, CommonModule, BreadcrumbComponent, DonationCardComponent, IconQuoteComponent, ShareButtonsComponent, BlogSliderComponent]
})
export class SingleBlogComponent {
  blog: IBlog;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  blogService: BlogService = inject(BlogService);

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: route => {
        this.blogService.getBlog(route.get('slug')).subscribe({
          next: (res: IApiResponse<IBlog>) => this.blog = res.data
        });
      }
    });
  }
}