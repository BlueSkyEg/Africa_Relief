import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScriptLoaderService {
  private scriptLoaded = false;

  loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject('Not running in a browser environment');
        return;
      }

      // Force reload the script every time
      const existingScript = document.querySelector(`script[src="${url}"]`);
      if (existingScript) {
        existingScript.remove();
        this.scriptLoaded = false; // Mark as not loaded
      }

      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      script.onerror = () => reject(`Failed to load script: ${url}`);
      document.body.appendChild(script);
    });
  }

  initializeDonationPlugin() {
    if (typeof window['DD'] === 'function') {
      console.log('Donation Plugin Initialized');
      window['DD'](); // Call the DD initialization function
    } else {
      console.log('Donation Plugin not available yet');
    }
  }

  injectDDConfig() {
    if (document.getElementById('dd-config')) {
      return; // Config already added
    }

    const configScript = document.createElement('script');
    configScript.id = 'dd-config';
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      var DDCONF = {
        API_KEY: "RH1iTkwaqpkVBfjB"
      };
    `;
    document.head.appendChild(configScript);
  }
}
