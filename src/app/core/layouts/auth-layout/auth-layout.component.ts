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
        background-image: url('../../../../assets/images/login_background.jpg');
        background-repeat: norepeat;
        background-size: cover;
      }
    `
  ]
})
export class AuthLayoutComponent {}
