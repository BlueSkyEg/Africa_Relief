import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { IMetadata } from '../../../shared/interfaces/imetadata';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private _titleService = inject(Title);
  private _metaService = inject(Meta);
  private _location = inject(Location);
  setMetaData(metaData: IMetadata, createdAt?: string): void {
    // <title>meta_title</title>;
    if (metaData.meta_title) {
      this._titleService.setTitle(metaData.meta_title);
      //  <meta property="og:title" content="meta_title" />
      this._metaService.updateTag({
        property: 'og:title',
        content: metaData.meta_title,
      });
      this._metaService.updateTag({
        property: 'twitter:title',
        content: metaData.meta_title,
      });
    }
    //  <meta name="description" content="meta_description" />;
    if (metaData.meta_description) {
      this._metaService.updateTag({
        name: 'description',
        content: metaData.meta_description,
      });
      // <meta property="og:description" content="meta_description" />
      this._metaService.updateTag({
        name: 'og:description',
        content: metaData.meta_description,
      });
      this._metaService.updateTag({
        name: 'twitter:description',
        content: metaData.meta_description,
      });
    }
    if (metaData.meta_keywords) {
      this._metaService.updateTag({
        name: 'keywords',
        content: metaData.meta_keywords,
      });
    }
    //  <meta name="robots" content="meta_robots" />;
    if (metaData.meta_robots) {
      this._metaService.updateTag({
        name: 'robots',
        content: metaData.meta_robots,
      });
    }
    if (metaData.meta_og_type) {
      this._metaService.updateTag({
        property: 'og:type',
        content: metaData.meta_og_type,
      });
    }
    //<link rel="canonical" href="current_url" />
    const currentUrl = this._location.path();
    this._metaService.updateTag({
      rel: 'canonical',
      href: `${environment.appUrl}/${currentUrl}`,
    });
    //<meta property="og:url" content="current_url" />
    this._metaService.updateTag({
      property: 'og:url',
      content: `${environment.appUrl}${currentUrl}`,
    });
    //<meta property="og:updated_time" content="updated_at" />
    if (createdAt) {
      const updatedTime = new Date(createdAt).toISOString();
      this._metaService.updateTag({
        property: 'og:updated_time',
        content: updatedTime,
      });
    }
  }
}
