import { Component, Input } from '@angular/core';
import { IconDoubleArrowComponent } from "../../icons/double-arrow/icon-double-arrow.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss',
    imports: [RouterModule, IconDoubleArrowComponent]
})
export class BreadcrumbComponent {
  @Input() basePath: string|null = null
  @Input() baseName: string
  @Input() currentName: string
}