import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-right',
  standalone: true,
  imports: [],
  template: `
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="60" height="60" rx="30" fill="#1F1F1F" />
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="30"
        stroke="#FFBD59"
        stroke-width="4"
      />
      <path
        d="M28.0002 37.5598L22.4402 31.9998L20.5469 33.8798L28.0002 41.3331L44.0002 25.3331L42.1202 23.4531L28.0002 37.5598Z"
        fill="#F7F6F5"
      />
    </svg>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconRightComponent {}
