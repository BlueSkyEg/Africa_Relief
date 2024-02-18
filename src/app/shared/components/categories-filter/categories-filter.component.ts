import { Component, Input } from '@angular/core';
import { ICategory } from '../../interfaces/category-interface';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-categories-filter',
    standalone: true,
    templateUrl: './categories-filter.component.html',
    styles: ``,
    imports: [RouterModule]
})
export class CategoriesFilterComponent {
  @Input() categories: ICategory[];
}
