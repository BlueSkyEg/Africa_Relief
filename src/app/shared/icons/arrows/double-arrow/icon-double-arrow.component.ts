import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-double-arrow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        [ngClass]="color == 'gray' ? 'fill-gray-dark' : 'fill-white'"
        d="M0.041748 11.8334L4.20841 6.00008L0.041748 0.166748H2.08341L6.25008 6.00008L2.08341 11.8334H0.041748ZM5.00008 11.8334L9.16675 6.00008L5.00008 0.166748H7.04175L11.2084 6.00008L7.04175 11.8334H5.00008Z"
      />
    </svg>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconDoubleArrowComponent {
  @Input() color: 'white' | 'gray' = 'gray';
}
