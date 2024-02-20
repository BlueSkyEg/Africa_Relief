import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-pin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
      <path [ngClass]="color == 'black' ? 'stroke-gray-dark' : 'stroke-white'" d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path [ngClass]="color == 'black' ? 'stroke-gray-dark' : 'stroke-white'" d="M9 21C13 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 5 17 9 21Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  styles: ``
})
export class IconPinComponent {
  @Input() color: 'black'|'white' = 'white';
}
