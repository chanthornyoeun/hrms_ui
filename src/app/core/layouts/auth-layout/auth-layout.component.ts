import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styles: [
    `
      :host {
        display: grid;
        place-content: center;
        height: 100vh;
      }
    `
  ]
})
export class AuthLayoutComponent {}
