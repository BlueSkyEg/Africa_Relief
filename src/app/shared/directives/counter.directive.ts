import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appCounter]',
  standalone: true
})
export class CounterDirective {
@Input() value: number;
element: ElementRef = inject(ElementRef);
renderer: Renderer2 = inject(Renderer2);

@HostListener('document:scroll', ['$event.target'])
onViewportScroll() {
  const windowHeight = window.innerHeight;
  const elementBoundingRect = this.element.nativeElement.getBoundingClientRect();

  if(elementBoundingRect.top >= 0 && elementBoundingRect.bottom <= windowHeight) {
    let currentValue = 0;
    console.log('this.value');
    const interval = setInterval(() => {
      console.log(this.value);
      currentValue++;
      this.element.nativeElement.textContent = currentValue;
      console.log(this.value);
      if (this.value = currentValue) {
        console.log(this.value);
        clearInterval(interval);
      }
    }, 20);
  }
}

}
