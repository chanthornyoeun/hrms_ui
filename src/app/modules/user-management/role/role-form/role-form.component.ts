import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  roleForm!: FormGroup;
  private roleId: number;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private messageService: MessageService,
    private loaderService: LoaderService
  ) {
    this.buildForm();
    this.roleId = +activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    if (this.roleId) {
      this.loaderService.show();
      this.roleService.get(this.roleId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(res => {
          const role: Role = res.data as Role;
          this.roleForm.patchValue(role);
        });
    }
  }

  private buildForm() {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required],
      description: ''
    });
  }

  submitForm() {
    const role: Role = this.roleForm.value;
    this.roleId ? this.update(this.roleId, role) : this.save(role);
  }

  private save(position: Role) {
    this.roleService.save(position)
      .subscribe(_ => {
        this.messageService.show('Role has been created successfully!');
        this.navigateToRoleList();
      })
  }

  private update(roleId: number, role: Role) {
    this.roleService.update(roleId, role)
      .subscribe(_ => {
        this.messageService.show('Role has been updated successfully!');
        this.navigateToRoleList();
      })
  }

  private navigateToRoleList() {
    this.route.navigate(['/roles']);
  }
}
