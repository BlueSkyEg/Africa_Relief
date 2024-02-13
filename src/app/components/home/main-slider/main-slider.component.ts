import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import {IMainSliderSlide} from "../../../core/interfaces/home/main-slider-slide-interface";
import {HomeService} from "../../../core/services/home/home.service";
import {ButtonIconComponent} from "../../../shared/components/button-icon/button-icon.component";
import {ButtonLinkComponent} from "../../../shared/components/button-link/button-link.component";
import {ArrowLeftComponent} from "../../../shared/icons/arrow-left/arrow-left.component";
import {ArrowRightComponent} from "../../../shared/icons/arrow-right/arrow-right.component";

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [
    ButtonIconComponent,
    ButtonLinkComponent,
    ArrowLeftComponent,
    ArrowRightComponent
  ],
  templateUrl: './main-slider.component.html',
  styleUrls: [
    '../../../../../node_modules/keen-slider/keen-slider.min.css',
    './main-slider.component.scss'
  ]
})
export class MainSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private homeService: HomeService) {
  }

  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;

  loaded: boolean[] = [true]
  slider: KeenSliderInstance = null;
  slides: IMainSliderSlide[];

  ngOnInit(): void {
    this.homeService.getMainSliderSlides()
      .subscribe({
        next: (res: IMainSliderSlide[]) => this.slides = res
      })
  }

  ngAfterViewInit() {
    this.slider = new KeenSlider(
      this.sliderRef.nativeElement,
      {
        animationEnded: (s) => {
          const idx = s.track.details.rel
          this.loaded[idx] = true
        },
        loop: true,
        initial: 0,
      },
      [
        (slider) => {
          let timeout;
          let mouseOver: boolean = false;
          function clearNextTimeout() {
            clearTimeout(timeout)
          }
          function nextTimeout() {
            clearTimeout(timeout)
            if (mouseOver) return
            timeout = setTimeout(() => {
              slider.next()
            }, 5000)
          }
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", (e) => {
              mouseOver = true
              clearNextTimeout()
            })
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false
              nextTimeout()
            })
            nextTimeout()
          })
          slider.on("dragStarted", clearNextTimeout)
          slider.on("animationEnded", nextTimeout)
          slider.on("updated", nextTimeout)
        },
      ]
    )
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
