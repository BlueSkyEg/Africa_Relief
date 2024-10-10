
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-search',
  standalone: true,
  imports: [],
  template: `
    <svg
      class="cursor-pointer"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_2)">
        <path
          [attr.fill]="color === 'primary' ? '#205926' : '#000000'"
          d="M10.5 20.75C4.85 20.75 0.25 16.15 0.25 10.5C0.25 4.85 4.85 0.25 10.5 0.25C16.15 0.25 20.75 4.85 20.75 10.5C20.75 16.15 16.15 20.75 10.5 20.75ZM10.5 1.75C5.67 1.75 1.75 5.68 1.75 10.5C1.75 15.32 5.67 19.25 10.5 19.25C15.33 19.25 19.25 15.32 19.25 10.5C19.25 5.68 15.33 1.75 10.5 1.75Z"
        />
        <path
          [attr.fill]="color === 'primary' ? '#205926' : '#000000'"
          d="M21 21.7499C20.81 21.7499 20.62 21.6799 20.47 21.5299L18.47 19.5299C18.18 19.2399 18.18 18.7599 18.47 18.4699C18.76 18.1799 19.24 18.1799 19.53 18.4699L21.53 20.4699C21.82 20.7599 21.82 21.2399 21.53 21.5299C21.38 21.6799 21.19 21.7499 21 21.7499Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect width="22" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconSearchComponent {
  @Input() color: 'primary' | 'black' = 'primary';
}
