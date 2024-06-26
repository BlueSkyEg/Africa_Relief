import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appFormElement]',
  standalone: true
})
export class FormElementDirective implements OnInit {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(this.element.nativeElement, 'w-full');
    this.renderer.addClass(this.element.nativeElement, 'flex');
    this.renderer.addClass(this.element.nativeElement, 'py-3');
    this.renderer.addClass(this.element.nativeElement, 'px-4');
    this.renderer.addClass(this.element.nativeElement, 'border');
    this.renderer.addClass(this.element.nativeElement, 'border-gray-medium');
    this.renderer.addClass(this.element.nativeElement, 'outline-none');
  }

}
