import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconArrowRightComponent } from '../../../icons/arrows/arrow-right/icon-arrow-right.component';
import { IBlogCard } from '../../../../shared/interfaces/blog/blog-card-interface';
import { CommonModule } from '@angular/common';
import { ImgPlaceholderDirective } from '../../../directives/img-placeholder.directive';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    IconArrowRightComponent,
    ImgPlaceholderDirective,
  ],
  templateUrl: './blog-card.component.html',
  styles: ``,
})
export class BlogCardComponent {
  @Input() blog: IBlogCard;
}
