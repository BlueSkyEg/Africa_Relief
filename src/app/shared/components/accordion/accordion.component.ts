import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { IconChevronDownComponent } from '../../icons/arrows/chevron-down/icon-chevron-down.component';
import { CommonModule } from '@angular/common';
import { IContent } from '../../interfaces/content-interface';
import { IImage } from '../../interfaces/image-interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // Import DomSanitizer
@Component({
  selector: 'app-accordion',
  standalone: true,
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  imports: [CommonModule, IconChevronDownComponent],
})
export class AccordionComponent {
  @ViewChildren('accordion') accordionList: QueryList<ElementRef>;
  @Input() summary: string;
  @Input() contentList: IContent[];
  @Input() title: string;
  constructor(private sanitizer: DomSanitizer) {}
  //   toggolAccordion(e: HTMLElement): void {
  //     this.accordionList.forEach((ele) =>
  //       ele.nativeElement != e ? ele.nativeElement.classList.remove('active') : ''
  //     );
  //     e.classList.toggle('active');
  //   }

  formatParagraph(text: string): any {
    // Replace "Position" with a styled span
    const boldedPosition = text.replace(
      /(Position)/i,
      '<span class="font-medium">$1</span>'
    );

    const boldedDepartment = boldedPosition.replace(
      /(Department)/i,
      '<span class="font-medium">$1</span>'
    );
    const boldedReports = boldedDepartment.replace(
      /(Reports To)/i,
      '<span class="font-medium">$1</span>'
    );
    const boldedType = boldedReports.replace(
      /(Type)/i,
      '<span class="font-medium">$1</span>'
    );

    // Replace new line characters with <br/>
    const formattedText = boldedType.replace(/\/n/g, '<br/> <br/>');

    // Sanitize the combined result
    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }
}
