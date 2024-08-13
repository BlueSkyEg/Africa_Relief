import {Component, Input} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styles: ``,
  animations: [
    trigger('errorAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ErrorComponent {
  @Input() hasError: boolean = true;
}
