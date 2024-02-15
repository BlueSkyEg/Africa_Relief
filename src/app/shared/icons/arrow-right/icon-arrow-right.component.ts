import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-icon-arrow-right',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path [ngClass]="color == 'black' ? 'fill-black' : 'fill-primary'" d="M13.3306 19.5557C13.3456 19.5708 13.8036 19.6856 14.3485 19.8108C14.8934 19.936 15.3451 20.0194 15.3524 19.9961C15.3596 19.9728 15.416 19.5946 15.4776 19.1556C15.6015 18.2741 15.9013 17.2449 16.2217 16.6013C17.2204 14.5952 19.0123 13.267 21.1856 12.9218L21.739 12.8338V11.9477V11.0614L21.2374 10.9773C17.9511 10.4259 15.8086 7.96872 15.4078 4.29151C15.3817 4.05139 15.3504 3.855 15.3383 3.855C15.2275 3.855 13.391 4.29759 13.3563 4.33265C13.3312 4.358 13.3498 4.5831 13.3979 4.83279C13.9293 7.59765 15.4509 9.84749 17.4255 10.7882L17.8992 11.0139L8.15903 11.0315L2 11.0427V12.8362L8.17488 12.8474L17.892 12.8652L17.2941 13.1682C15.7427 13.9541 14.5145 15.4958 13.7913 17.5652C13.5852 18.1547 13.2742 19.4988 13.3306 19.5557Z"/>
    </svg>
  `,
  styles: ``
})
export class IconArrowRightComponent {
  @Input() color: 'black'|'primary' = 'primary';
}
