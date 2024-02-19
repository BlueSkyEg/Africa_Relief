import { Component, OnInit, inject } from '@angular/core';
import { IconLinkedinComponent } from "../../icons/social-media/linkedin/icon-linkedin.component";
import { IconInstagramComponent } from "../../icons/social-media/instagram/icon-instagram.component";
import { IconFacebookComponent } from "../../icons/social-media/facebook/icon-facebook.component";
import { IconTwitterComponent } from "../../icons/social-media/twitter/icon-twitter.component";

@Component({
    selector: 'app-share-buttons',
    standalone: true,
    templateUrl: './share-buttons.component.html',
    styles: '',
    imports: [IconLinkedinComponent, IconInstagramComponent, IconFacebookComponent, IconTwitterComponent]
})
export class ShareButtonsComponent implements OnInit {
  currentUrl: string;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
  }
}
