import { Component, OnInit } from "@angular/core";

@Component({
    standalone: true,
    template: `<p>Autenticazione in corso...</p>`
})
export class GoogleCallback implements OnInit {

    ngOnInit(): void {
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