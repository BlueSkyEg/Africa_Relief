import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'app-icon-close',
  standalone: true,
  imports: [NgClass],
  template: `
    <svg
      class="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <mask
        id="mask0_1061_3221"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <rect width="32" height="32" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1061_3221)">
        <path
          [ngClass]="color == 'white' ? 'fill-white' : 'fill-gray-dark'"
          d="M11.1997 22.6665L9.33301 20.7998L14.133 15.9998L9.33301 11.2331L11.1997 9.36646L15.9997 14.1665L20.7663 9.36646L22.633 11.2331L17.833 15.9998L22.633 20.7998L20.7663 22.6665L15.9997 17.8665L11.1997 22.6665Z"
        />
      </g>
    </svg>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCloseComponent {
  @Input() color: 'black' | 'white' = 'black';
}
