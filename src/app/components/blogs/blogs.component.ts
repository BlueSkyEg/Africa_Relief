import { Component, OnInit } from '@angular/core';
import { CategoriesFilterComponent } from "../../shared/components/categories-filter/categories-filter.component";
import { BlogsService } from '../../core/services/blogs/blogs.service';
import { ICategory } from '../../shared/interfaces/category-interface';
import { BlogCardComponent } from "../../shared/components/blogs/blog-card/blog-card.component";
import { IBlogCard } from '../../shared/interfaces/blog-card-interface';

@Component({
    selector: 'app-blogs',
    standalone: true,
    templateUrl: './blogs.component.html',
    styleUrl: './blogs.component.scss',
    imports: [CategoriesFilterComponent, BlogCardComponent]
})
export class BlogsComponent implements OnInit {
  blogCategories: ICategory[];
  blogs: IBlogCard[];

  constructor(private blogsService: BlogsService) {}

  ngOnInit(): void {
    this.blogsService.getBlogCategories().subscribe({
      next: (value: ICategory[]) => this.blogCategories = value
    });

    this.blogsService.getBlogs().subscribe({
      next: (value: IBlogCard[]) => this.blogs = value
    });
  }
}
