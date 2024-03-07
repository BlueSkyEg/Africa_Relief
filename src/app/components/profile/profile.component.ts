import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BadgeComponent } from "../../shared/components/badge/badge.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styles: ``,
    imports: [RouterModule, CommonModule, BadgeComponent]
})
export class ProfileComponent {

}
