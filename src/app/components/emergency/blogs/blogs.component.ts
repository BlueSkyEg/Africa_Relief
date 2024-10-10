import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [],
  templateUrl: './blogs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsComponent {}
