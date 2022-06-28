import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { User } from 'src/app/models/user';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { passwordMismatch, validateExistingUser } from '../validators/custom-validator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    public responsive: ResponsiveService
  ) {
    this.buildForm();
    this.userId = +activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    if (this.userId) {
      this.loaderService.show();
      this.userService.get(this.userId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(res => {
          this.userForm.patchValue(res.data);
          this.removePasswordControls();
          this.updateValidation();
        });
    }
  }

  private buildForm() {
    this.userForm = this.fb.group({
      username: ['', Validators.required, validateExistingUser(this.userService)],
      email: ['', [Validators.required, Validators.email], validateExistingUser(this.userService)],
      employeeId: [null, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: passwordMismatch(),
      updateOn: 'blur'
    });
  }

  private removePasswordControls() {
    this.userForm.removeControl('password');
    this.userForm.removeControl('confirmPassword');
    this.userForm.clearValidators();
    this.userForm.updateValueAndValidity();
  }

  private updateValidation() {
    const usernameCtl = this.userForm.get('username')!;
    const emailCtl = this.userForm.get('email')!;
    usernameCtl.clearAsyncValidators();
    usernameCtl.updateValueAndValidity();
    emailCtl.clearAsyncValidators();
    emailCtl.updateValueAndValidity();
  }

  submit() {
    const user: User = this.userForm.value;
    this.userId ? this.update(this.userId, user) : this.save(user);
  }

  private save(user: User) {
    this.userService.save(user)
      .subscribe(_ => {
        this.messageService.show('User has been created successfully!');
        this.navigateToUserList();
      });
  }

  private update(userId: number, user: User) {
    this.userService.update(userId, user)
      .subscribe(_ => {
        this.messageService.show('User has been updated successfully!');
        this.navigateToUserList();
      });
  }

  private navigateToUserList() {
    this.route.navigate(['/users']);
  }

}
