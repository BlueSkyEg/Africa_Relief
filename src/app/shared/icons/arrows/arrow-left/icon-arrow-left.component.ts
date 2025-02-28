import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { NgClass} from "@angular/common";

@Component({
  selector: 'app-icon-arrow-left',
  standalone: true,
  imports: [NgClass],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        [ngClass]="color == 'black' ? 'fill-black' : 'fill-primary'"
        d="M10.6694 19.5557C10.6544 19.5708 10.1964 19.6856 9.65151 19.8108C9.1066 19.936 8.65487 20.0194 8.64761 19.9961C8.64041 19.9728 8.58403 19.5946 8.52238 19.1556C8.39854 18.2741 8.09868 17.2449 7.77828 16.6013C6.77956 14.5952 4.98769 13.267 2.81439 12.9218L2.26097 12.8338V11.9477V11.0614L2.76257 10.9773C6.04888 10.4259 8.19139 7.96872 8.59219 4.29151C8.61834 4.05139 8.64962 3.855 8.66165 3.855C8.77249 3.855 10.609 4.29759 10.6437 4.33265C10.6688 4.358 10.6502 4.5831 10.6021 4.83279C10.0707 7.59765 8.54909 9.84749 6.57449 10.7882L6.10084 11.0139L15.841 11.0315L22 11.0427V12.8362L15.8251 12.8474L6.10797 12.8652L6.70595 13.1682C8.25726 13.9541 9.48546 15.4958 10.2087 17.5652C10.4148 18.1547 10.7258 19.4988 10.6694 19.5557Z"
      />
    </svg>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconArrowLeftComponent {
  @Input() color: 'black' | 'primary' = 'black';
}
