import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-button-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-link.component.html',
  styleUrl: './button-link.component.scss'
})
export class ButtonLinkComponent {
  @Input() label: string;
  @Input() appearance: 'filled-primary'|'filled-secondary'|'outlined-primary'|'outlined-secondary';
  @Input() path: string;
  @Input() icon: boolean = false;
  @Input() fullWidth: boolean = false;
}
