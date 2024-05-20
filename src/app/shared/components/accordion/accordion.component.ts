import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { IconChevronDownComponent } from "../../icons/arrows/chevron-down/icon-chevron-down.component";
import { CommonModule } from '@angular/common';
import { IContent } from '../../interfaces/content-interface';

@Component({
    selector: 'app-accordion',
    standalone: true,
    templateUrl: './accordion.component.html',
    styleUrl: './accordion.component.scss',
    imports: [CommonModule, IconChevronDownComponent]
})
export class AccordionComponent {
  @ViewChildren('accordion') accordionList: QueryList<ElementRef>;
  @Input() summary: string;
  @Input() contentList: IContent[];

  toggolAccordion(e: HTMLElement): void {
    this.accordionList.forEach(ele => ele.nativeElement != e ? ele.nativeElement.classList.remove('active') : '');
    e.classList.toggle('active');
  }
}
