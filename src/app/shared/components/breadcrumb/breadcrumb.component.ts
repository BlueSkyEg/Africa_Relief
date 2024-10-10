import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconDoubleArrowComponent } from "../../icons/arrows/double-arrow/icon-double-arrow.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  templateUrl: './breadcrumb.component.html',
  styles: ``,
  imports: [RouterModule, CommonModule, IconDoubleArrowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  @Input() basePath: string | null = null;
  @Input() baseName: string;
  @Input() currentName: string;
  @Input() appreance: 'white' | 'primary' = 'primary';
}
