import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appIcon]',
  standalone: true
})
export class IconDirective implements OnInit {
  @Input() appearance: 'filled'|'outlined';
  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(this.element.nativeElement, 'w-12');
    this.renderer.addClass(this.element.nativeElement, 'h-12');
    this.renderer.addClass(this.element.nativeElement, 'flex');
    this.renderer.addClass(this.element.nativeElement, 'p-1');
    this.renderer.addClass(this.element.nativeElement, 'justify-center');
    this.renderer.addClass(this.element.nativeElement, 'items-center');

    if (this.appearance === 'outlined') {
      this.renderer.addClass(this.element.nativeElement, 'bg-white');
      this.renderer.addClass(this.element.nativeElement, 'border');
      this.renderer.addClass(this.element.nativeElement, 'border-gray-light');
    } else {
      this.renderer.addClass(this.element.nativeElement, 'bg-primary');
    }
  }
}
