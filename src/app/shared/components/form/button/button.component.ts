import {Component, Input} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-form-button',
  standalone: true,
  imports: [NgClass,NgStyle],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() appearance: 'filled' | 'outlined';
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
}
