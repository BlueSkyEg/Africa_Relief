import { Component, Input } from '@angular/core';
import { ButtonLinkComponent } from '../../button-link/button-link.component';
import { IProjectCard } from '../../../interfaces/project/project-card-interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImgPlaceholderDirective } from '../../../directives/img-placeholder.directive';

@Component({
  selector: 'app-project-card',
  standalone: true,
  templateUrl: './project-card.component.html',
  styles: ``,
  imports: [
    RouterModule,
    CommonModule,
    ButtonLinkComponent,
    ImgPlaceholderDirective,
  ],
})
export class ProjectCardComponent {
  @Input() project: IProjectCard;
}
