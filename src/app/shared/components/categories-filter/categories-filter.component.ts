import {
  Component,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ICategory } from '../../interfaces/category-interface';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-categories-filter',
  standalone: true,
  templateUrl: './categories-filter.component.html',
  styleUrl: './categories-filter.component.scss',
  imports: [RouterModule, CommonModule, NgScrollbarModule],
})
export class CategoriesFilterComponent {
  @Input() categories: ICategory[];
  @Input() basePath: string;
  @Input() baseTitle: string;

  private isDragging = false;
  private startX: number;
  private scrollLeft: number;

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  startDrag(event: MouseEvent) {
    if (event.button === 0) {
      // Left mouse button
      this.isDragging = true;
      const container =
        this.elementRef.nativeElement.querySelector('.container');
      container.classList.add('dragging');
      this.startX = event.pageX - container.getBoundingClientRect().left;
      this.scrollLeft = container.scrollLeft;
      event.preventDefault(); // Prevent default context menu
    }
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    const container = this.elementRef.nativeElement.querySelector('.container');
    const x = event.pageX - container.getBoundingClientRect().left;
    const walk = (x - this.startX) * 2; // Adjust scroll speed
    container.scrollLeft = this.scrollLeft - walk;
  }

  endDrag() {
    if (this.isDragging) {
      this.isDragging = false;
      if (isPlatformBrowser(this.platformId)) {
        const container =
          this.elementRef.nativeElement.querySelector('.container');
        container.classList.remove('dragging');
      }
    }
  }
}
