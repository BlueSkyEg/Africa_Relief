import { Component, Input } from '@angular/core';
import { ButtonLinkComponent } from "../../button-link/button-link.component";
import { IProjectCard } from '../../../interfaces/project-card-interface';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-project-card',
    standalone: true,
    templateUrl: './project-card.component.html',
    styleUrl: './project-card.component.scss',
    imports: [RouterModule, ButtonLinkComponent]
})
export class ProjectCardComponent {
  @Input() project: IProjectCard;
}