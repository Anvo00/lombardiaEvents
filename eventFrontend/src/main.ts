import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

/*
bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),  //  specifica la strategia
      withDebugTracing()  // debug rotte, vedi se tenere, optional
    )
  ]
}).catch(err => console.error(err));
*/

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));
