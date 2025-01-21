import { ApplicationConfig } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, TitleStrategy, provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { CustomTitleService } from './core/services/layout/custom-title.service';
import { RequestOptionsInterceptor } from './core/interceptors/request-options.interceptor';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { provideNgxStripe } from 'ngx-stripe';
import { environment } from '../environments/environment';
import { AuthorizeInterceptor } from './core/interceptors/authorize.interceptor';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled'
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature),
    provideAnimationsAsync(),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true
      })
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loaderInterceptor,
        RequestOptionsInterceptor,
        AuthorizeInterceptor,
      ])
    ),
    // Provide Stripe
    provideNgxStripe(environment.stripePublicKey),
    // Provide Custom Title Tag for pages
    { provide: TitleStrategy, useClass: CustomTitleService },
    // Configure Default Date Format to display date time depends on user time zone
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'MMM d, y, h:mm a',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    },
    // Configure Google Tag Manager
    { provide: 'googleTagManagerId', useValue: 'GTM-K9JD3XLD' },
  ],
};
