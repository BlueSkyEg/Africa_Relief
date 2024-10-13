import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styles: ``,
})
export class ErrorComponent {
  @Input() hasError: boolean = true;
}
