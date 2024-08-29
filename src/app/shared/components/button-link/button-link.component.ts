import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from "@angular/common";
import {RouterModule} from "@angular/router";
import { IconArrowRightComponent } from "../../icons/arrows/arrow-right/icon-arrow-right.component";

@Component({
  selector: 'app-button-link',
  standalone: true,
  templateUrl: './button-link.component.html',
  styleUrl: './button-link.component.scss',
  imports: [CommonModule, RouterModule, IconArrowRightComponent],
})
export class ButtonLinkComponent {
  @Input() label: string;
  @Input() appearance:
    | 'filled-primary'
    | 'filled-secondary'
    | 'outlined-primary'
    | 'outlined-secondary';
  @Input() path: string;
  @Input() icon: boolean = false;
  @Input() fullWidth: boolean = false;
  @Output() buttonClicked = new EventEmitter<void>();

  handleClick(event: Event) {
    event.stopPropagation();
    this.buttonClicked.emit();
  }
}
