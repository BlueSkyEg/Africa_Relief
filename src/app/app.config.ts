import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, TitleStrategy, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClientModule} from "@angular/common/http";
import { CustomTitleService } from './core/services/layout/custom-title.service';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    {
      provide: TitleStrategy,
      useClass: CustomTitleService
    }
  ]
};
