import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-submit',
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
      <path
        d="M30 35.1798L27.41 32.5898L26 33.9998L30 37.9998L38 29.9998L36.59 28.5898L30 35.1798Z"
        fill="#1F1F1F"
      />
      <path
        d="M33 13H30V12C29.9984 11.4701 29.7872 10.9623 29.4125 10.5875C29.0377 10.2128 28.5299 10.0016 28 10H20C19.4701 10.0016 18.9623 10.2128 18.5875 10.5875C18.2128 10.9623 18.0016 11.4701 18 12V13H15C14.4701 13.0016 13.9623 13.2128 13.5875 13.5875C13.2128 13.9623 13.0016 14.4701 13 15V36C13.0016 36.5299 13.2128 37.0377 13.5875 37.4125C13.9623 37.7872 14.4701 37.9984 15 38H24V36H15V15H18V18H30V15H33V26H35V15C34.9984 14.4701 34.7872 13.9623 34.4125 13.5875C34.0377 13.2128 33.5299 13.0016 33 13ZM28 16H20V12H28V16Z"
        fill="#1F1F1F"
        stroke="#1F1F1F"
        stroke-width="0.5"
      />
      <line
        x1="18"
        y1="22.25"
        x2="30"
        y2="22.25"
        stroke="#1F1F1F"
        stroke-width="1.5"
      />
      <line
        x1="18"
        y1="25.75"
        x2="30"
        y2="25.75"
        stroke="#1F1F1F"
        stroke-width="1.5"
      />
      <line
        x1="18"
        y1="29.25"
        x2="30"
        y2="29.25"
        stroke="#1F1F1F"
        stroke-width="1.5"
      />
    </svg>
  `,
  styles: ``,
})
export class SubmitIconComponent {}
