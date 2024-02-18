import {Component, OnInit} from '@angular/core';
import {BlogCardComponent} from "../../../shared/components/blogs/blog-card/blog-card.component";
import {ButtonLinkComponent} from "../../../shared/components/button-link/button-link.component";
import {IBlogCard} from "../../../shared/interfaces/blog-card-interface";
import {HomeService} from "../../../core/services/home/home.service";

@Component({
  selector: 'app-latest-blogs',
  standalone: true,
  imports: [
    BlogCardComponent,
    ButtonLinkComponent
  ],
  templateUrl: './latest-blogs.component.html',
  styleUrl: './latest-blogs.component.scss'
})
export class LatestBlogsComponent implements OnInit {
  blogs: IBlogCard[];

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.getLatestBlogs().subscribe({
      next: (value: IBlogCard[]) => this.blogs = value
    })
  }
}
