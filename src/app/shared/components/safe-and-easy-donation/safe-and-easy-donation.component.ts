import { Component } from '@angular/core';
import {IconMissionComponent} from "../../icons/mission/icon-mission.component";
import {IconDirective} from "../../directives/icon.directive";
import {IconVisionComponent} from "../../icons/vision/icon-vision.component";
import {IconObjectiveComponent} from "../../icons/objective/icon-objective.component";
import { ImgPlaceholderDirective } from '../../directives/img-placeholder.directive';

@Component({
  selector: 'app-safe-and-easy-donation',
  standalone: true,
  imports: [IconMissionComponent, IconDirective, IconVisionComponent, IconObjectiveComponent, ImgPlaceholderDirective],
  templateUrl: './safe-and-easy-donation.component.html',
  styles: ''
})
export class SafeAndEasyDonationComponent {

}
