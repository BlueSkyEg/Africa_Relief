import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-youssef-abdallah',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './youssef-abdallah.component.html',
})
export class YoussefAbdallahComponent implements OnInit {
  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.setMetaData();
  }

  private setMetaData(): void {
    this.title.setTitle('Executive Director | Africa Relief');
  }
}
