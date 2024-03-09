import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, TitleStrategy, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import { CustomTitleService } from './core/services/layout/custom-title.service';
import { RequestOptionsInterceptor } from './core/interceptors/request-options.interceptor';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';

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
    provideHttpClient(withInterceptors([loaderInterceptor, RequestOptionsInterceptor])),
    {provide: TitleStrategy, useClass: CustomTitleService}
  ]
};
