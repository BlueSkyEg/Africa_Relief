import { Directive, ElementRef, Input, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appImgPlaceholder]',
  standalone: true,
})
export class ImgPlaceholderDirective {
  defaultLocalImage = 'assets/images/logo.webp';

  @Input({ required: true }) src: string | null | undefined = null;
  private element: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  ngOnChanges(): void {
    this.initImage();
  }

  private initImage() {
    // show placeholder image before image is loaded
    this.setImage(this.defaultLocalImage);
    this.renderer.addClass(this.element.nativeElement, 'img-placeholder');

    const img = new Image();

    // return on no src
    if (!this.src) {
      return;
    }

    // if possible to load image, set it to img
    img.onload = () => {
      this.setImage(this.resolveImage(this.src));
      this.renderer.removeClass(this.element.nativeElement, 'img-placeholder');
    };

    img.onerror = () => {
      // Set a placeholder image
      this.setImage(this.defaultLocalImage);
      this.renderer.removeClass(this.element.nativeElement, 'img-placeholder');
    };

    // triggers http request to load image
    img.src = this.resolveImage(this.src);
  }

  private setImage(src: string) {
    this.element.nativeElement.setAttribute('src', src);
  }

  private resolveImage(src: string): string {
    if (!src) {
      return this.defaultLocalImage;
    }

    return src;
  }
}
