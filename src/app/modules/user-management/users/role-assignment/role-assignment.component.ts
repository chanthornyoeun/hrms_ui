import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { Role } from 'src/app/models/role';
import { UserRole } from 'src/app/models/user-role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-assignment',
  templateUrl: './role-assignment.component.html',
  styleUrls: ['./role-assignment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleAssignmentComponent implements OnInit {

  form!: FormGroup;
  role$!: Observable<Role[]>;

  private _previousRoles: { id: number, roleId: number }[] = [];

  constructor(
    private roleService: RoleService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RoleAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm();
    this._previousRoles = data.roles;
  }

  ngOnInit(): void {
    this.role$ = this.getRoles();
    this.form.get('userId')?.setValue(this.data.id);
    this._previousRoles.forEach(role => {
      this.addRole(role.roleId, role.id);
    });
  }

  private getRoles(): Observable<Role[]> {
    return this.roleService.list().pipe(map(res => res.data));
  }

  private buildForm() {
    this.form = this.fb.group({
      userId: [null, Validators.required],
      roles: this.fb.array([])
    });
  }

  toggleRole($event: boolean, role: Role) {
    $event ? this.addRole(role.id) : this.removeRole(role.id);
  }

  private addRole(roleId: number, id: number | null = null) {
    const roleFrom = this.fb.group({ id, roleId });
    this.roleForms().push(roleFrom);
  }

  private roleForms(): FormArray {
    return this.form.get('roles') as FormArray;
  }

  private removeRole(roleId: number) {
    const index: number = this.roleForms().controls.findIndex(role => role.get('roleId')?.value === roleId);
    this.roleForms().removeAt(index);
  }

  isExist(roleId: number): boolean {
    return !!this.roleForms().controls.find(role => role.get('roleId')?.value === roleId);
  }

  closeDialog(action: DialogAction = DialogAction.CANCEL) {
    this.dialogRef.close(action);
  }

  submit() {
    const payload: UserRole = this.form.value;
    payload.roles.forEach(r => {
      const role = this._previousRoles.find(role => r.roleId === role.roleId);
      r.id = role ? role.id : null;
    });

    this.roleService.assignRoles(payload).subscribe(_ => this.closeDialog(DialogAction.SAVE))
  }

}
