import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { IconCowComponent } from "../../shared/icons/cows/icon-cow.component";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IconSheepComponent } from "../../shared/icons/sheep/icon-sheep.component";
import { IconMeatComponent } from "../../shared/icons/meat/icon-meat.component";
import { IconCowTwoComponent } from "../../shared/icons/cows/icon-cow-2.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [BreadcrumbComponent, IconCowComponent, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, IconSheepComponent, IconMeatComponent, IconCowTwoComponent ,RouterLink],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss'
})
export class CampaignsComponent {
  value: number | null = null;
  options = [
    { label: 'None', value: null },
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
  ];
  onSelect(value: number | null) {
    console.log(value);
  }
  countries: string[] = [
    'Benin',
    'Burundi',
    'Cameroon',
    'Chad',
    'Djibouti',
    'Ethiopia',
    'Gambia',
    'Ghana',
    'Guinea-Bissau',
    'Guinea-Conakry',
    'Ivory Coast',
    'Kenya',
    'Liberia',
    'Madagascar',
    'Malawi',
    'Mali',
    'Mozambique',
    'Niger',
    'Nigeria',
    'Rwanda',
    'Senegal',
    'Sierra Leone',
    'Somalia',
    'Sudan',
    'Tanzania',
    'Togo',
    'Uganda',
    'Zanzibar',

  ];
}
