import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [BreadcrumbComponent,CommonModule,],
  templateUrl: './privacy.component.html',
})
export class PrivacyComponent {
  openDropdownId: string | null = null;
  toggleDropdown(id: string){
    this.openDropdownId = this.openDropdownId === id ? null : id;
}

}
