import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {IconCloseComponent} from "../../icons/close/icon-close.component";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    CommonModule,
    IconCloseComponent,
  ],
  templateUrl: './modal.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 0.75 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
    trigger('modalAnimation', [
      transition(':enter', [
        style({ top: '400px', opacity: 0 }),
        animate('200ms ease-in', style({ top: '120px', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ top: '400px', opacity: 0 })),
      ]),
    ]),
  ],
})
export class ModalComponent {
  modalOpened: boolean = false;
  @Input() title: string;
  @Input() maxWidth: string = '612px';

  openModal() {
    this.modalOpened = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modalOpened = false;
    document.body.style.overflow = 'auto';
  }
}
