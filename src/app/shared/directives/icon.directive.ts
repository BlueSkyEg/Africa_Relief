import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appIcon]',
  standalone: true
})
export class IconDirective implements OnInit {
  @Input() appearance: 'filled'|'outlined';
  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.element.nativeElement, 'width', '48px');
    this.renderer.setStyle(this.element.nativeElement, 'height', '48px');
    this.renderer.setStyle(this.element.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.element.nativeElement, 'padding', '3px');
    this.renderer.setStyle(this.element.nativeElement, 'justify-content', 'center');
    this.renderer.setStyle(this.element.nativeElement, 'align-items', 'center');

    if (this.appearance === 'outlined') {
      this.renderer.setStyle(this.element.nativeElement, 'background-color', 'var(--white-color)');
      this.renderer.setStyle(this.element.nativeElement, 'border', '1px solid var(--light-gray-color)');
    } else {
      this.renderer.setStyle(this.element.nativeElement, 'background-color', 'var(--secondary-color)');
    }
  }

}
