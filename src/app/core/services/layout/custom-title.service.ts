import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomTitleService extends TitleStrategy {

  constructor(private titleService: Title) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);

    if(title) {
      this.titleService.setTitle(`${title} | Africa Relief`)
    } else {
      this.titleService.setTitle(`${snapshot.url.split('/').pop().split('-').join(' ')} | Africa Relief`)
    }
  }
}
