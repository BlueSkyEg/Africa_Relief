
import {  Component } from '@angular/core';
import { IconSearchComponent } from '../../icons/search/icon-search.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [IconSearchComponent, FormsModule],
  templateUrl: './search-bar.component.html',
  styles: [],
})
export class SearchBarComponent {
  searchTerm: string = '';
  isNavigated: boolean = true;

  constructor(private _Router: Router) {}

  //if the user click enter on keyboard or search icon will navigate the searchComponent
  onSearch(event?: KeyboardEvent) {
    if (event?.key === 'Enter' || !event) {
      if (this.searchTerm.trim()) {
        this._Router.navigate(['/search', this.searchTerm], {
          queryParams: { type: 'projects' },
        });
        this.isNavigated = false;
      }
    }
  }
}
