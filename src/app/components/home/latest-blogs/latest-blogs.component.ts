import {Component, OnInit} from '@angular/core';
import {BlogCardComponent} from "../../../shared/components/blogs/blog-card/blog-card.component";
import {ButtonLinkComponent} from "../../../shared/components/button-link/button-link.component";
import {IBlog} from "../../../shared/interfaces/blog-interface";
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
  blogs: IBlog[];

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.getLatestBlogs().subscribe({
      next: (value: IBlog[]) => this.blogs = value
    })
  }
}
