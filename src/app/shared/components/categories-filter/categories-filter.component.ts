import { Component, Input } from '@angular/core';
import { ICategory } from '../../interfaces/category-interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-categories-filter',
    standalone: true,
    templateUrl: './categories-filter.component.html',
    styles: ``,
    imports: [RouterModule, CommonModule]
})
export class CategoriesFilterComponent {
  @Input() categories: ICategory[];
  @Input() basePath: string;
  @Input() baseTitle: string;
}
