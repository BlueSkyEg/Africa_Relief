import {Component, Input} from '@angular/core';
import {RouterModule} from "@angular/router";
import {IconArrowRightComponent} from "../../../icons/arrows/arrow-right/icon-arrow-right.component";
import {IBlogCard} from "../../../../shared/interfaces/blog/blog-card-interface";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterModule, CommonModule, IconArrowRightComponent],
  templateUrl: './blog-card.component.html',
  styles: ``
})
export class BlogCardComponent {
  @Input() blog: IBlogCard;
}
