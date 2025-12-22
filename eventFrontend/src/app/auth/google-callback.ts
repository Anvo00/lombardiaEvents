import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";

@Component({
    standalone: true,
    template: `<p>Autenticazione in corso...</p>`
})
export class GoogleCallback implements OnInit {

    constructor(@Inject(PLATFORM_ID) private platformId : Object){}

    ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token && window.opener) {
            window.opener.postMessage(
                { type: 'google-auth', token },
                window.location.origin
            );
        }

        window.close();
    }
}