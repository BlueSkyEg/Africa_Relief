import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IconCloseComponent } from '../../icons/close/icon-close.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    IconCloseComponent,
    NgClass,
  ],
  templateUrl: './modal.component.html',
  styles: ``,
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  openModal() {
    this.modalOpened = true;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden'; 
    }
  }

  closeModal() {
    this.modalOpened = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto'; 
    }
  }
}
