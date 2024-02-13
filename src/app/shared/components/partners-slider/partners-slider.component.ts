import {Component, ElementRef, ViewChild} from '@angular/core';
import KeenSlider, {KeenSliderInstance} from "keen-slider";
import {IconArrowLeftComponent} from "../../icons/arrow-left/icon-arrow-left.component";
import {IconArrowRightComponent} from "../../icons/arrow-right/icon-arrow-right.component";

@Component({
  selector: 'app-partners-slider',
  standalone: true,
  imports: [
    IconArrowLeftComponent,
    IconArrowRightComponent
  ],
  templateUrl: './partners-slider.component.html',
  styleUrls: [
    '../../../../../node_modules/keen-slider/keen-slider.min.css',
    './partners-slider.component.scss'
  ]
})
export class PartnersSliderComponent {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>

  slider: KeenSliderInstance = null;

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      breakpoints: {
        "(min-width: 700px)": {
          slides: { perView: 4 },
        },
        "(min-width: 1100px)": {
          slides: { perView: 5 },
        },
        "(min-width: 1400px)": {
          slides: { perView: 6 },
        },
      },
      slides: { perView: 1 },
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
