import {Component, Input} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {IconCloseComponent} from "../../icons/close/icon-close.component";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatAutocompleteModule, CommonModule, IconCloseComponent],
  templateUrl: './modal.component.html',
  styles: ``,
  animations: [
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 0.75 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('modalAnimation', [
      transition(':enter', [
        style({ top: '400px' }),
        animate('200ms', style({ top: '120px'}))
      ]),
      transition(':leave', [
        animate('200ms', style({ top: '400px' }))
      ])
    ])
  ]
})
export class ModalComponent {

  @Input() modalOpened: boolean = false;
  @Input() title: string;
  @Input() maxWidth: string = '612px';

  openModal() {
    this.modalOpened = true;
  }

  closeModal() {
    this.modalOpened = false;
  }
}
