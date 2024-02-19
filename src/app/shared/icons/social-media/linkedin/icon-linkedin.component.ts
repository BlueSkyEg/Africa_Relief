import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-linkedin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path [ngClass]="color === 'black' ? 'fill-black' : 'fill-white'" d="M6.02 8.55758C7.42 8.55758 8.54 7.42008 8.54 6.03758C8.54 4.65508 7.4025 3.51758 6.02 3.51758C4.6375 3.51758 3.5 4.65508 3.5 6.03758C3.5 7.42008 4.6375 8.55758 6.02 8.55758ZM10.9375 10.4651V24.5001H15.2775V17.5701C15.2775 15.7326 15.6275 13.9651 17.885 13.9651C20.1425 13.9651 20.1425 16.0651 20.1425 17.6751V24.5001H24.5V16.8001C24.5 13.0201 23.695 10.1151 19.285 10.1151C17.1675 10.1151 15.75 11.2701 15.1725 12.3726H15.12V10.4476H10.955L10.9375 10.4651ZM3.85 10.4651H8.2075V24.5001H3.85V10.4651Z"/>
    </svg>
  `,
  styles: ``
})
export class IconLinkedinComponent {
  @Input() color: 'black'|'white' = 'black';
}
