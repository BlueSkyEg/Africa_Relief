
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styles: ``,
})
export class BadgeComponent {
  @Input() type: 'success' | 'danger' | 'warning' | 'safe' | 'info';
  @Input() label: string;
}
