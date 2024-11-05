import { isPlatformServer } from '@angular/common';
import { Directive, ElementRef, Input, PLATFORM_ID, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appImgPlaceholder]',
  standalone: true,

})

export class ImgPlaceholderDirective {

  /**
   * Every time the src input changes, we will try to resolve the resource (url or image location)
   * When using SSR, the initImage method will not try to resolve the image
   * Attaching the g-skeleton css class we create some grey pulsing background, indicating to the user that the image is loading
   * When the img.src is resolved we display the image or a placeholder when it fails
   */

  defaultLocalImage = 'assets/images/logo.webp';

  @Input({ required: true }) src: string | null | undefined = null;
  private platformId: Object = inject(PLATFORM_ID);
  private element: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  ngOnChanges(): void {
    this.initImage();
  }

  private initImage() {
    if (isPlatformServer(this.platformId)) {
      return;
    }

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
