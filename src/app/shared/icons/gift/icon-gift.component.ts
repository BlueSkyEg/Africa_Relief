import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-gift',
  standalone: true,
  imports: [],
  template: `
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="24" fill="#FFD500" />
      <g clip-path="url(#clip0_3839_3621)">
        <path
          d="M24 36V18M24 18C22.4 14 20.4 12 18 12C17.2044 12 16.4413 12.3161 15.8787 12.8787C15.3161 13.4413 15 14.2044 15 15C15 15.7956 15.3161 16.5587 15.8787 17.1213C16.4413 17.6839 17.2044 18 18 18M24 18C25.6 14 27.6 12 30 12C30.7957 12 31.5587 12.3161 32.1213 12.8787C32.6839 13.4413 33 14.2044 33 15C33 15.7956 32.6839 16.5587 32.1213 17.1213C31.5587 17.6839 30.7957 18 30 18M14.4 24V36H33.6V24M36 18V24H12V18H36Z"
          stroke="#1F1F1F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M37.8829 26.2929L32 32.1758L30.1171 30.2929L29.41 29.5858L28.7029 30.2929L27.2929 31.7029L26.5858 32.41L27.2929 33.1171L31.2929 37.1171L32 37.8242L32.7071 37.1171L40.7071 29.1171L41.4142 28.41L40.7071 27.7029L39.2971 26.2929L38.59 25.5858L37.8829 26.2929Z"
          fill="#1F1F1F"
          stroke="#FFD500"
          stroke-width="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_3839_3621">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(8 8)"
          />
        </clipPath>
      </defs>
    </svg>
  `,
  styles: ``,
})
export class GiftIconComponent {}
