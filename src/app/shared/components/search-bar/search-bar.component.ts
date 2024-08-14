import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconSearchComponent } from '../../icons/search/icon-search.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, IconSearchComponent ,FormsModule],
  templateUrl: './search-bar.component.html',
  styles: []
})
export class SearchBarComponent {
    searchTerm: string = '';

    constructor(private _Router: Router) {}
  
    onSearch(event: KeyboardEvent) {
      if (event.key === 'Enter' && this.searchTerm.trim()) {
        this._Router.navigate(['/search', this.searchTerm]);
      }
    }
}
