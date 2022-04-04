import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/http/authentication.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private messageService: MessageService
  ) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.authService.login(this.signinForm.value).subscribe(_ => {
      const url: string = this.activatedRoute.snapshot.queryParamMap.get('redirect') || '/';
      this.router.navigate([url], { replaceUrl: true });
      this.messageService.show('Login successful');
    });
  }

}
