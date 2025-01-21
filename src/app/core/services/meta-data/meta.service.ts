import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { IMetadata } from '../../../shared/interfaces/imetadata';
import { Location, DOCUMENT } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private _titleService = inject(Title);
  private _meta = inject(Meta);
  private _location = inject(Location);
  private _document = inject(DOCUMENT);

  private title: string = 'Africa Relief';
  private description: string = 'Africa Relief is dedicated to supporting communities in need across Africa, Sudan, Gaza, and beyond.';
  private image: string = `${environment.appUrl}/assets/images/logo.webp`;
  private keywords: string = '';
  private robots: string = 'index, follow';
  private ogType: string = 'website';
  private updatedAt: string = 'Wed Aug 21 2024 03:00:00 GMT+0300 (Eastern European Summer Time)';

  setMetaData(metaData: IMetadata, updatedAt?: string, featured_image?: any): void {
    this._titleService.setTitle(metaData.meta_title ?? this.title);
    this._meta.updateTag({ name: 'description', content: metaData.meta_description ?? this.description });
    this._meta.updateTag({ name: 'keywords', content: metaData.meta_keywords ?? this.keywords });
    this._meta.updateTag({ name: 'robots', content: metaData.meta_robots ?? this.robots });
    this._meta.updateTag({ name: 'twitter:title', content: metaData.meta_title ?? this.title });
    this._meta.updateTag({ name: 'twitter:description', content: metaData.meta_description ?? this.description });
    this._meta.updateTag({ name: 'twitter:image', content: featured_image?.src ?? this.image });
    this._meta.updateTag({ property: 'og:type', content: metaData.meta_og_type ?? this.ogType });
    this._meta.updateTag({ property: 'og:title', content: metaData.meta_title ?? this.title });
    this._meta.updateTag({ property: 'og:description', content: metaData.meta_description ?? this.description });
    this._meta.updateTag({ property: 'og:url', content: `${environment.appUrl}${this._location.path()}` });
    this._meta.updateTag({ property: 'og:image', content: featured_image?.src ?? this.image });
    this._meta.updateTag({ property: 'og:updated_time', content: updatedAt ? new Date(updatedAt).toString() : this.updatedAt });
  }

  setCanonicalURL(url?: string): void {
    const currentUrl = `${environment.appUrl}${this._location.path()}`;
    let link: HTMLLinkElement = this._document.querySelector("link[rel='canonical']") || null;
    if (link) {
      link.setAttribute('href', currentUrl);
    } else {
      link = this._document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', currentUrl);
      this._document.head.appendChild(link);
    }
  }
}
