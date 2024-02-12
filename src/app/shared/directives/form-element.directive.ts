import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appFormElement]',
  standalone: true
})
export class FormElementDirective implements OnInit {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.element.nativeElement, 'width', '100%');
    this.renderer.setStyle(this.element.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.element.nativeElement, 'padding', '12px 16px');
    this.renderer.setStyle(this.element.nativeElement, 'outline', 'none');
    this.renderer.setStyle(this.element.nativeElement, 'border', '1px solid var(--medium-gray-color)');
    this.renderer.setStyle(this.element.nativeElement, 'background-color', 'var(--white-color)');
  }

}
