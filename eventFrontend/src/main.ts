import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter, withPreloading, withDebugTracing } from '@angular/router';
import { routes } from './app/app.routes';
import { PreloadAllModules } from '@angular/router';

bootstrapApplication(App, {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),  //  specifica la strategia
      withDebugTracing()  // debug rotte, vedi se tenere, optional
    )
  ]
}).catch(err => console.error(err));
