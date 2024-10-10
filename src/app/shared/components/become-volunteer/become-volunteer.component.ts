import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-become-volunteer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './become-volunteer.component.html',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BecomeVolunteerComponent {}
