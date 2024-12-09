import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dd-donation',
  standalone: true,
  imports: [],
  templateUrl: './dd-donation.component.html',
})
export class DdDonationComponent implements AfterViewInit, OnDestroy {
  private scriptElementId = 'dd-donation-script';
  private routerSubscription!: Subscription;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    // Initialize the plugin on component load
    this.initializePlugin();

    // Listen for route navigation to reinitialize the plugin
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initializePlugin();
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the router events to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private initializePlugin(): void {
    // Remove existing script if it exists
    const existingScript = document.getElementById(this.scriptElementId);
    if (existingScript) {
      existingScript.remove();
    }

    // Create a new script element
    const script = document.createElement('script');
    script.id = this.scriptElementId;
    script.src = 'https://doublethedonation.com/api/js/ddplugin.js';
    script.async = true;

    script.onload = () => {
      console.log('Double the Donation script loaded.');
      if (window['doubleDonationWidget']) {
        window['doubleDonationWidget'].init({
          apiKey: 'RH1iTkwaqpkVBfjB',
        });
      }
    };

    script.onerror = () => {
      console.error('Failed to load the Double the Donation script.');
    };

    // Append the script to the document body
    document.body.appendChild(script);
  }
}
