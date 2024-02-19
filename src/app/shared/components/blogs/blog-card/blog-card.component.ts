import {Component, Input} from '@angular/core';
import {RouterModule} from "@angular/router";
import {IconArrowRightComponent} from "../../../icons/arrow-right/icon-arrow-right.component";
import {IBlogCard} from "../../../../shared/interfaces/blog/blog-card-interface";

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterModule, IconArrowRightComponent],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
  @Input() blog: IBlogCard;
}
