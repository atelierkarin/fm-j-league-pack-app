import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare let gtag: any;

@Injectable()
export class GaService {

  constructor() {}

  private useGA(): boolean {
    return typeof gtag !== undefined;
  }

  sendPageView(url: string): void {
    if (!this.useGA()) { return; }
    if (!url.startsWith('/')) { url = '/' + url; }
    gtag('config', environment.analytics.id, {
      'page_path': url
    });
  }

  sendEvent(eventName: string, eventCategory: string, eventAction: string, eventLabel: any): void {
    if (!this.useGA()) { return; }
    gtag('event', eventName, {
      event_category: eventCategory,
      event_action: eventAction,
      event_label: eventLabel
    });
  }
}