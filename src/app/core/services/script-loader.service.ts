// client-script-loader.service.ts
import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root',
})
export class ScriptLoaderService {
  constructor(private platform: Platform) {}

  loadScript() {
   if (this.platform.isBrowser) {
     const configScript = document.createElement('script');
     configScript.innerHTML = `var DDCONF = { API_KEY: "RH1iTkwaqpkVBfjB" };`;
     document.head.appendChild(configScript);
     const script = document.createElement('script');
     script.src = 'https://doublethedonation.com/api/js/ddplugin.js';
     script.async = true;
     script.onload = () => {
       this.initializeDonationPlugin();
     };
     document.head.appendChild(script);
   }
  }
  initializeDonationPlugin() {
    if (typeof window['DD'] === 'function') {
      window['DD']();
    }
  }
}