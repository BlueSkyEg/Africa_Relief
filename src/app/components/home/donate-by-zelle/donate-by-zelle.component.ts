import { Component } from '@angular/core';
import {IconZelleComponent} from "../../../shared/icons/zelle/icon-zelle.component";
import {IconEnvelopeComponent} from "../../../shared/icons/envelope/icon-envelope.component";
import {IconPinComponent} from "../../../shared/icons/pin/icon-pin.component";

@Component({
  selector: 'app-donate-by-zelle',
  standalone: true,
  imports: [
    IconZelleComponent,
    IconEnvelopeComponent,
    IconPinComponent
  ],
  templateUrl: './donate-by-zelle.component.html',
  styleUrl: './donate-by-zelle.component.scss'
})
export class DonateByZelleComponent {

}
