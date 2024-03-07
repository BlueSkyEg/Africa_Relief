import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styles: ``
})
export class BadgeComponent {
  @Input() type: 'success'|'danger'|'warning'|'info';
  @Input() label: string;
}
