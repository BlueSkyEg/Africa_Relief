import {  NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-facebook',
  standalone: true,
  imports: [NgClass],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        [ngClass]="color === 'black' ? 'fill-black' : 'fill-white'"
        d="M26.5999 14.0315C26.5999 7.05885 20.9551 1.3999 13.9999 1.3999C7.0447 1.3999 1.3999 7.05885 1.3999 14.0315C1.3999 20.1452 5.7343 25.2357 11.4799 26.4104V17.821H8.9599V14.0315H11.4799V10.8736C11.4799 8.43569 13.4581 6.45253 15.8899 6.45253H19.0399V10.242H16.5199C15.8269 10.242 15.2599 10.8104 15.2599 11.5052V14.0315H19.0399V17.821H15.2599V26.5999C21.6229 25.9683 26.5999 20.5873 26.5999 14.0315Z"
      />
    </svg>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconFacebookComponent {
  @Input() color: 'black' | 'white' = 'black';
}
